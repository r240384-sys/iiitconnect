import zipfile
import xml.etree.ElementTree as ET
import json
import re
import os

def get_shared_strings(z):
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        with z.open('xl/sharedStrings.xml') as f:
            tree = ET.parse(f)
            root = tree.getroot()
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            for si in root.findall('ns:si', ns):
                t = si.find('ns:t', ns)
                val = t.text if t is not None else ""
                shared_strings.append(val)
    return shared_strings

def get_sheet_data(z, sheet_path, shared_strings):
    if sheet_path not in z.namelist():
        return []
    
    with z.open(sheet_path) as f:
        tree = ET.parse(f)
        root = tree.getroot()
        ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        
        data = []
        sheetData = root.find('ns:sheetData', ns)
        
        for row in sheetData.findall('ns:row', ns):
            r_idx = int(row.get('r'))
            row_data = {}
            for c in row.findall('ns:c', ns):
                coord = c.get('r')
                col_letter = ''.join(filter(str.isalpha, coord))
                
                t_type = c.get('t')
                v = c.find('ns:v', ns)
                val = v.text if v is not None else ""
                
                if t_type == 's':
                    try:
                        val = shared_strings[int(val)]
                    except:
                        val = ""
                
                row_data[col_letter] = val
            data.append(row_data)
        return data

def parse_rkv(filename):
    print(f"Parsing RKV file: {filename}")
    try:
        z = zipfile.ZipFile(filename)
        shared_strings = get_shared_strings(z)
        rows = get_sheet_data(z, 'xl/worksheets/sheet1.xml', shared_strings)
        
        users = []
        # Skip header (approx first 2 rows, RKV data starts row 3 usually)
        # RKV Map: C=Name, D=Class, E=Email, F=Password
        for row in rows:
            # Simple heuristic: check if email column has '@'
            email = row.get('E', '').strip()
            if '@' not in email: 
                continue

            raw_name = row.get('C', '').strip()
            raw_class = row.get('D', '').strip()
            password = row.get('F', '').strip()
            
            student_id = email.split('@')[0].upper()
            name = raw_name if raw_name else student_id
            student_class = raw_class if raw_class else "Student"
            
            users.append({
                "id": student_id,
                "name": name,
                "class": student_class,
                "email": email,
                "password": password,
                "campus": "rkvalley"
            })
        return users
    except Exception as e:
        print(f"Error parsing RKV: {e}")
        return []

def parse_ong(filename):
    print(f"Parsing Ongole file: {filename}")
    try:
        z = zipfile.ZipFile(filename)
        shared_strings = get_shared_strings(z)
        rows = get_sheet_data(z, 'xl/worksheets/sheet1.xml', shared_strings)
        
        users = []
        # Ongole Map based on peek: 
        # B=ID, C=Name, D=Class, E=Email, F=Password
        # Data starts around row 3
        for row in rows:
            # Heuristic: check if F (password) or E (email) exists
            pword = row.get('F', '').strip()
            email_raw = row.get('E', '').strip()
            
            if not pword and not email_raw:
                continue
                
            # Attempt to extract ID
            raw_id = row.get('B', '').strip()
            
            # If ID is empty, try extracting from Email or Password
            if not raw_id:
                # E.g. S240549rguktong.ac.in -> S240549
                # Simple regex to find ID-like pattern (start with letter, then digits)
                match = re.search(r'([A-Za-z]\d{6})', email_raw)
                if match:
                    raw_id = match.group(1)
                else:
                    match = re.search(r'([A-Za-z]\d{6})', pword)
                    if match:
                        raw_id = match.group(1)
            
            if not raw_id:
                continue # Skip if no ID found
                
            student_id = raw_id.upper()
            
            # Name
            name = row.get('C', '').strip()
            if not name: name = student_id
            
            # Class
            student_class = row.get('D', '').strip()
            if not student_class: student_class = "Ongole"
            
            # Email - fix missing @ if needed
            email = email_raw
            if '@' not in email and 'rgukt' in email:
                 # Likely 'o24...rguktong'
                 # Insert @ before 'rgukt'
                 email = email.replace('rgukt', '@rgukt')
            
            if not email:
                email = f"{student_id}@rguktong.ac.in"

            # Password
            password = pword if pword else f"ong{student_id}"

            users.append({
                "id": student_id,
                "name": name,
                "class": student_class,
                "email": email,
                "password": password,
                "campus": "ong"
            })
            
        return users
            
    except Exception as e:
        print(f"Error parsing Ongole: {e}")
        return []

def main():
    all_users = []
    
    # 1. RKV Data
    rkv_file = 'R24B P2S1 EST_ELE.BIO&Bio_1-12-25-SEATING.xlsx'
    if os.path.exists(rkv_file):
        all_users.extend(parse_rkv(rkv_file))
    else:
        print(f"Warning: {rkv_file} not found.")

    # 2. Ongole Data
    ong_file = 'ong.xlsx'
    if os.path.exists(ong_file):
        all_users.extend(parse_ong(ong_file))
    else:
         print(f"Warning: {ong_file} not found.")
         
    # Deduplicate by ID
    unique_users = {}
    for u in all_users:
        unique_users[u['id']] = u
    
    final_list = list(unique_users.values())
    
    print(f"Total students parsed: {len(final_list)}")
    
    # Write to JS
    js_content = f"// Student Data parsed from XLSX (RKV + Ongole)\nconst STUDENT_DB = {json.dumps(final_list, indent=4)};\n\n"
    js_content += """
function findUser(studentId) {
    if (!studentId) return null;
    const uid = studentId.toUpperCase();
    
    // 1. Check Dynamic DB (edits) - loaded from LocalStorage
    if (typeof window !== 'undefined' && window.users && window.users.length > 0) {
        const user = window.users.find(u => u.id === uid);
        if (user) return user;
    }
    
    // 2. Fallback to Static DB (Excel Data)
    if (typeof STUDENT_DB !== 'undefined') {
        return STUDENT_DB.find(u => u.id === uid);
    }
    
    return null;
}

function validateLogin(studentId, password, selectedCampus) {
    const user = findUser(studentId);
    if (!user) return { success: false, message: "Student ID not found." };
    
    // Check Campus
    if (user.campus && user.campus !== selectedCampus) {
         return { success: false, message: "Access Denied: User belongs to " + user.campus };
    }

    // Check against the password from the Excel file
    // Simple direct comparison
    if (password === user.password) {
        return { success: true, user: user };
    } else {
        return { success: false, message: "Invalid password." };
    }
}
"""
    with open('js/users.js', 'w') as f:
        f.write(js_content)
    print("Updated js/users.js")

if __name__ == "__main__":
    main()
