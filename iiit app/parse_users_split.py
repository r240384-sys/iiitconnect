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
        for row in rows:
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
                "password": password
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
        for row in rows:
            pword = row.get('F', '').strip()
            email_raw = row.get('E', '').strip()
            
            if not pword and not email_raw:
                continue
                
            raw_id = row.get('B', '').strip()
            
            if not raw_id:
                match = re.search(r'([A-Za-z]\d{6})', email_raw)
                if match:
                    raw_id = match.group(1)
                else:
                    match = re.search(r'([A-Za-z]\d{6})', pword)
                    if match:
                        raw_id = match.group(1)
            
            if not raw_id:
                continue 
                
            student_id = raw_id.upper()
            name = row.get('C', '').strip()
            if not name: name = student_id
            student_class = row.get('D', '').strip()
            if not student_class: student_class = "Ongole"
            
            email = email_raw
            if '@' not in email and 'rgukt' in email:
                 email = email.replace('rgukt', '@rgukt')
            
            if not email:
                email = f"{student_id}@rguktong.ac.in"

            password = pword if pword else f"ong{student_id}"

            users.append({
                "id": student_id,
                "name": name,
                "class": student_class,
                "email": email,
                "password": password
            })
            
        return users
            
    except Exception as e:
        print(f"Error parsing Ongole: {e}")
        return []

def write_js_file(users, filename, context_name):
    js_content = f"// {context_name} Student Data parsed from XLSX\nconst STUDENT_DB = {json.dumps(users, indent=4)};\n\n"
    js_content += """
function findUser(studentId) {
    if (!studentId) return null;
    const uid = studentId.toUpperCase();
    
    // 1. Check Dynamic DB (edits) - loaded from LocalStorage (if unified or separate logic needed)
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

function validateLogin(studentId, password) {
    const user = findUser(studentId);
    if (!user) return { success: false, message: "Student ID not found." };
    
    if (password === user.password) {
        return { success: true, user: user };
    } else {
        return { success: false, message: "Invalid password." };
    }
}
"""
    with open(filename, 'w') as f:
        f.write(js_content)
    print(f"Written {len(users)} users to {filename}")

def main():
    # 1. RKV
    rkv_users = []
    rkv_file = 'R24B P2S1 EST_ELE.BIO&Bio_1-12-25-SEATING.xlsx'
    if os.path.exists(rkv_file):
        rkv_users = parse_rkv(rkv_file)
        # Dedupe RKV
        unique_rkv = list({u['id']: u for u in rkv_users}.values())
        write_js_file(unique_rkv, 'js/users_rkv.js', "RK Valley")

    # 2. Ongole
    ong_users = []
    ong_file = 'ong.xlsx'
    if os.path.exists(ong_file):
        ong_users = parse_ong(ong_file)
        unique_ong = list({u['id']: u for u in ong_users}.values())
        write_js_file(unique_ong, 'js/users_ong.js', "Ongole")

if __name__ == "__main__":
    main()
