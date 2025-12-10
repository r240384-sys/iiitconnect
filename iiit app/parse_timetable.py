import zipfile
import xml.etree.ElementTree as ET
import json
import re

def parse_timetable(filename):
    timetable_db = {}
    
    try:
        z = zipfile.ZipFile(filename)
        
        # 1. Parse Shared Strings
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            with z.open('xl/sharedStrings.xml') as f:
                tree = ET.parse(f)
                root = tree.getroot()
                ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                for si in root.findall('ns:si', ns):
                    t = si.find('ns:t', ns)
                    shared_strings.append(t.text if t is not None else "")
        
        # 2. Parse Sheet 1
        path = 'xl/worksheets/sheet1.xml'
        if path in z.namelist():
            print("Reading timetable sheet...")
            with z.open(path) as f:
                tree = ET.parse(f)
                root = tree.getroot()
                ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                
                sheetData = root.find('ns:sheetData', ns)
                
                # Column Mappings based on inspection
                # Mon: C-I (3-9 in 1-based, index 2-8 in 0-based list concept but we use letters)
                # We need a helper to map Alpha to Index or just use direct mapping
                
                days_map = {
                    'Monday':    ['C', 'D', 'E', 'F', 'G', 'H', 'I'],
                    'Tuesday':   ['J', 'K', 'L', 'M', 'N', 'O', 'P'],
                    'Wednesday': ['Q', 'R', 'S', 'T', 'U', 'V', 'W'],
                    'Thursday':  ['X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD'],
                    'Friday':    ['AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK'],
                    'Saturday':  ['AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR']
                }

                start_row = 6 # Data starts from Row 6 (index 5 if 0-based, but rows are 1-based in XML)
                
                for row in sheetData.findall('ns:row', ns):
                    r_idx = int(row.get('r'))
                    
                    if r_idx < start_row:
                        continue
                        
                    # Extract Row Data
                    row_data = {}
                    for c in row.findall('ns:c', ns):
                        coord = c.get('r')
                        col = ''.join(filter(str.isalpha, coord))
                        t_type = c.get('t')
                        v = c.find('ns:v', ns)
                        val = v.text if v is not None else ""
                        if t_type == 's':
                            try: val = shared_strings[int(val)]
                            except: pass
                        row_data[col] = val.strip()
                    
                    # Class Name in Column B
                    raw_class = row_data.get('B', '').strip()
                    # Normalize: Remove dash, uppercase
                    class_name = raw_class.replace('-', '').upper() # e.g. 'F04', 'MUE1'
                    
                    # Normalize Greek Transliterations to Unicode (to match Student Data)
                    # MUE -> Μ (GREEK CAPITAL LETTER MU)
                    # PHI -> Φ (GREEK CAPITAL LETTER PHI)
                    # Note: We use the uppercase variants because .upper() was called
                    if class_name.startswith('MUE'):
                        class_name = class_name.replace('MUE', '\u039c')
                    elif class_name.startswith('PHI'):
                        class_name = class_name.replace('PHI', '\u03a6')
                    
                    if not class_name:
                        continue

                    # Build Week Schedule for this class
                    week_schedule = {}
                    
                    for day, cols in days_map.items():
                        day_schedule = []
                        for col in cols:
                            subject = row_data.get(col, '')
                            if subject == '': subject = 'Free'
                            day_schedule.append(subject)
                        week_schedule[day] = day_schedule
                    
                    timetable_db[class_name] = week_schedule
                        
    except Exception as e:
        print(f"Error parsing Timetable: {e}")
        return

    # Write to JS file
    js_content = f"// Timetable Data parsed from XLSX\nconst TIMETABLE_DB = {json.dumps(timetable_db, indent=4)};\n"
    
    with open('js/timetable_data.js', 'w') as f:
        f.write(js_content)
        
    print(f"Successfully parsed timetables for {len(timetable_db)} classes to js/timetable_data.js.")

if __name__ == "__main__":
    parse_timetable('Time Table.xlsx')
