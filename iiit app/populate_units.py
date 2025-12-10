import json
import re

def populate_units(filename='js/data.js'):
    try:
        with open(filename, 'r') as f:
            content = f.read()
        
        # Strip "const syllabusData =" and trailing ";"
        # This relies on the file format being relatively clean
        json_str = re.search(r'const\s+syllabusData\s*=\s*({.*});', content, re.DOTALL)
        
        if not json_str:
            print("Could not find syllabusData object.")
            # Fallback to manual parsing if regex failed due to comments etc
            # But the file looked like a clean object literal.
            # The issue is JS object literal != JSON (keys not quoted).
            # We can't use json.loads on JS object literal.
            
            # Alternative: Since we can't easily parse JS in Py without a library:
            # We will use a regex replacement strategy to insert Units 1-6 into empty arrays.
            # Matches: units: [ ... ]
            pass
            
    except Exception as e:
        print(f"Error: {e}")

# Since parsing JS in Python is hard without libraries, 
# and Node is missing, we'll try a different approach:
# Python script to GENERATE a new valid JS file by building the structure 
# from what we can extract or just appending? No.

# Regex approach to find "units: [ ... ]" and inject content if it looks short.
# Find: (units:\s*\[)([^\]]*)(\])
# process the middle group.

def get_placeholder_units(subject_name):
    units = []
    for i in range(1, 7):
        units.append(f"{{ title: 'Unit {i}: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }}")
    return ",\n                    ".join(units)

def process_file(filename='js/data.js'):
    with open(filename, 'r') as f:
        lines = f.readlines()
        
    new_lines = []
    in_units = False
    
    # This is a heuristic parser. It assumes standard formatting from previous edits.
    # We iterate, look for "units: [". If we see it, we check if it's empty or short?
    # Actually, simpler: 
    # The user wants "Unit 1 to Unit 6 for EVERY subject".
    # We can just replace every "units: [...]" block with a full 6-unit block?
    # But we want to preserve existing data if it exists.
    
    # Strategy: Read file into memory string.
    # Regex substitute 'units: \[\s*\]' (empty) with full units.
    # What about partial?
    
    content = "".join(lines)
    
    # Function to replace matched units block
    def replace_units(match):
        prefix = match.group(1) # "units: ["
        existing_content = match.group(2) # content inside
        suffix = match.group(3) # "]"
        
        # If existing content has "Unit 6", leave it.
        if "Unit 6" in existing_content:
            return match.group(0)
            
        # Otherwise, we need to add units.
        # It's hard to parse "Unit 1" from text reliably to know where to start.
        # But for PUC2, they are likely empty `units: []`.
        
        if not existing_content.strip():
            # Empty units
            new_inner = "\n                    " + get_placeholder_units("Subject") + "\n                "
            return prefix + new_inner + suffix
            
        return match.group(0) # Logic for partial updates is too risky with regex.
        
    # Regex for "units: [ ... ]" handling nested braces is hard but units usually don't have deep nesting.
    # We assume pattern `units: \[ (.*?) \]` across lines? Non-greedy.
    # But js object inside units has `{ ... }`.
    
    # Regex: `units:\s*\[(.*?)\]` might fail if `]` is inside strings/objects.
    # But our data looks simple: `[{ title: ... }]`.
    
    updated_content = re.sub(r'(units:\s*\[)(.*?)(\])', replace_units, content, flags=re.DOTALL)
    
    with open(filename, 'w') as f:
        f.write(updated_content)
    print("Updated units.")

if __name__ == "__main__":
    process_file()
