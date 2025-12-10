const fs = require('fs');
const path = require('path');

// Read users.js content
const usersJsPath = path.join(__dirname, 'js', 'users.js');
let usersJsContent = fs.readFileSync(usersJsPath, 'utf8');

// Mock window and localStorage
const window = {
    users: []
};
const localStorage = {
    getItem: () => null
};

// Evaluate the file content to load functions and data into this scope
// We need to strip the 'const STUDENT_DB' and replace it with 'var STUDENT_DB' or just eval it and access it.
// Or just eval it.
eval(usersJsContent);

// Test Cases
function runTest(name, result, expectedSuccess, expectedMsgPartial) {
    console.log(`Test: ${name}`);
    if (result.success === expectedSuccess) {
        if (!expectedSuccess && expectedMsgPartial && !result.message.includes(expectedMsgPartial)) {
            console.log(`  FAILED: Expected message containing "${expectedMsgPartial}", got "${result.message}"`);
            return;
        }
        console.log(`  PASSED`);
    } else {
        console.log(`  FAILED: Expected success=${expectedSuccess}, got ${result.success}. Msg: ${result.message}`);
    }
}

// Find one RKV user and one Ongole user
const rkvUser = STUDENT_DB.find(u => u.campus === 'rkvalley');
const ongUser = STUDENT_DB.find(u => u.campus === 'ong');

if (!rkvUser || !ongUser) {
    console.error("Could not find sample users for both campuses!");
    process.exit(1);
}

console.log(`Testing with RKV User: ${rkvUser.id} and Ong User: ${ongUser.id}`);

// 1. Valid RKV Login
runTest("Valid RKV Login", validateLogin(rkvUser.id, rkvUser.password, 'rkvalley'), true);

// 2. Valid Ong Login
runTest("Valid Ong Login", validateLogin(ongUser.id, ongUser.password, 'ong'), true);

// 3. RKV User trying to login as Ong
runTest("RKV User -> Ong Campus", validateLogin(rkvUser.id, rkvUser.password, 'ong'), false, "Access Denied");

// 4. Ong User trying to login as RKV
runTest("Ong User -> RKV Campus", validateLogin(ongUser.id, ongUser.password, 'rkvalley'), false, "Access Denied");

// 5. Invalid Password
runTest("Invalid Password", validateLogin(rkvUser.id, "wrongpass", 'rkvalley'), false, "Invalid password");

// 6. Invalid User
runTest("Invalid User", validateLogin("ZZZ999", "pass", 'rkvalley'), false, "Student ID not found");

console.log("Verification Complete");
