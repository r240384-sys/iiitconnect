import json
import re

def load_users():
    with open('js/users.js', 'r') as f:
        content = f.read()
    
    # Extract JSON array
    match = re.search(r'const STUDENT_DB = (\[.*?\]);', content, re.DOTALL)
    if not match:
        raise ValueError("Could not find STUDENT_DB in js/users.js")
    
    return json.loads(match.group(1))

def validate_login(users, student_id, password, selected_campus):
    # Mimic JS logic
    user = next((u for u in users if u['id'] == student_id), None)
    
    if not user:
        return {"success": False, "message": "Student ID not found."}
    
    if user.get('campus') and user['campus'] != selected_campus:
        return {"success": False, "message": f"Access Denied: User belongs to {user['campus']}"}
        
    if password == user['password']:
         return {"success": True, "user": user}
    else:
         return {"success": False, "message": "Invalid password."}

def run_test(name, result, expected_success, expected_msg_partial=None):
    print(f"Test: {name}")
    if result['success'] == expected_success:
        if not expected_success and expected_msg_partial and expected_msg_partial not in result['message']:
             print(f"  FAILED: Expected message containing '{expected_msg_partial}', got '{result['message']}'")
             return
        print("  PASSED")
    else:
        print(f"  FAILED: Expected success={expected_success}, got {result['success']}. Msg: {result['message']}")

def main():
    try:
        users = load_users()
        print(f"Loaded {len(users)} users.")
        
        rkv_user = next((u for u in users if u.get('campus') == 'rkvalley'), None)
        ong_user = next((u for u in users if u.get('campus') == 'ong'), None)
        
        if not rkv_user or not ong_user:
            print("Could not find sample users for both campuses!")
            return

        print(f"Testing with RKV: {rkv_user['id']} and Ong: {ong_user['id']}")

        # 1. Valid RKV Login
        run_test("Valid RKV Login", validate_login(users, rkv_user['id'], rkv_user['password'], 'rkvalley'), True)

        # 2. Valid Ong Login
        run_test("Valid Ong Login", validate_login(users, ong_user['id'], ong_user['password'], 'ong'), True)

        # 3. RKV User -> Ong Campus
        run_test("RKV User -> Ong Campus", validate_login(users, rkv_user['id'], rkv_user['password'], 'ong'), False, "Access Denied")

        # 4. Ong User -> RKV Campus
        run_test("Ong User -> RKV Campus", validate_login(users, ong_user['id'], ong_user['password'], 'rkvalley'), False, "Access Denied")

        # 5. Invalid Password
        run_test("Invalid Password", validate_login(users, rkv_user['id'], "wrongpass", 'rkvalley'), False, "Invalid password")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
