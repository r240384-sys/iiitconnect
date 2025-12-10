
import zipfile
import xml.etree.ElementTree as ET

def peek_xlsx(filename):
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

        if 'xl/worksheets/sheet1.xml' in z.namelist():
            with z.open('xl/worksheets/sheet1.xml') as f:
                tree = ET.parse(f)
                root = tree.getroot()
                ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                sheetData = root.find('ns:sheetData', ns)
                
                print(f"--- {filename} First 5 Rows ---")
                for i, row in enumerate(sheetData.findall('ns:row', ns)):
                    if i >= 5: break
                    row_vals = []
                    for c in row.findall('ns:c', ns):
                        t_type = c.get('t')
                        v = c.find('ns:v', ns)
                        val = v.text if v is not None else ""
                        if t_type == 's':
                            try:
                                val = shared_strings[int(val)]
                            except:
                                pass
                        coord = c.get('r')
                        row_vals.append(f"{coord}={val}")
                    print(f"Row {i+1}: {', '.join(row_vals)}")

    except Exception as e:
        print(e)

peek_xlsx('ong.xlsx')
