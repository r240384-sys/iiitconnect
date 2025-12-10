import zipfile
import xml.etree.ElementTree as ET

def dump_rows(filename):
    try:
        z = zipfile.ZipFile(filename)
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            with z.open('xl/sharedStrings.xml') as f:
                tree = ET.parse(f)
                root = tree.getroot()
                ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                for si in root.findall('ns:si', ns):
                    t = si.find('ns:t', ns)
                    shared_strings.append(t.text if t is not None else "")
        
        # We know there is only sheet1.xml
        path = 'xl/worksheets/sheet1.xml'
        if path in z.namelist():
            with z.open(path) as f:
                tree = ET.parse(f)
                root = tree.getroot()
                ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                sheetData = root.find('ns:sheetData', ns)
                
                output_lines = []
                output_lines.append(f"--- Dumping first 20 rows of {filename} ---")
                count = 0
                for row in sheetData.findall('ns:row', ns):
                    if count >= 20: break
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
                        row_data[col] = val
                    output_lines.append(f"Row {count+1}: {row_data}")
                    count += 1
                
                with open('timetable_dump.txt', 'w') as f:
                    f.write('\n'.join(output_lines))
                print("Dumped to timetable_dump.txt")
    except Exception as e:
        print(e)

if __name__ == "__main__":
    dump_rows('Time Table.xlsx')
