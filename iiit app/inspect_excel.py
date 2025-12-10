import zipfile
import xml.etree.ElementTree as ET

def inspect_xlsx(filename):
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
        
        # List all sheets
        sheets = [n for n in z.namelist() if n.startswith('xl/worksheets/sheet')]
        print(f"Found {len(sheets)} sheets: {sheets}")
        
        for sheet_path in sheets:
            print(f"\n--- Reading {sheet_path} ---")
            with z.open(sheet_path) as f:
                tree = ET.parse(f)
                root = tree.getroot()
                ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                sheetData = root.find('ns:sheetData', ns)
                
                print("--- Analyzing First 50 Rows ---")
                count = 0
                non_empty_counts = {}
                
                for row in sheetData.findall('ns:row', ns):
                    if count >= 50: break
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
                        
                        if val and val.strip():
                            non_empty_counts[col] = non_empty_counts.get(col, 0) + 1

                    # Print a few sample rows from the middle
                    if 5 <= count < 10:
                         print(f"Row {count+1}: {row_data}")
                    
                    count += 1
                
                print("\n--- Non-Empty Cell Counts (First 50 Rows) ---")
                for col in sorted(non_empty_counts.keys()):
                    print(f"Column {col}: {non_empty_counts[col]}")


    except Exception as e:
        print(e)

if __name__ == "__main__":
    inspect_xlsx('Time Table.xlsx')
