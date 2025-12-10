const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js/data.js');

// Read the file as text
let fileContent = fs.readFileSync(filePath, 'utf8');

// Quick and dirty extraction: Remove the variable assignment to get raw object if possible?
// OR, since it's a valid JS file, we can require it?
// Issues: `e1:` keys might not be quoted JSON.
// Better: Regex find the units arrays.

// Actually, simpler approach:
// 1. Eval the file to get the object (dangerous but we control environment).
// 2. Modify object.
// 3. Serialize back to string format mimicking the original style.

try {
    // Evaluate the content to get the object
    // Remove "const syllabusData =" and ";"
    const objectString = fileContent.replace(/const\s+syllabusData\s*=\s*/, '').replace(/;\s*$/, '');

    // We cannot uses JSON.parse because keys aren't quoted.
    // Let's use `eval` in a vm context or just loose eval.
    let syllabusData;
    eval('syllabusData = ' + objectString);

    // Helper to add units
    const ensureUnits = (course) => {
        if (!course.units) course.units = [];

        // We want Units 1 to 6
        for (let i = 1; i <= 6; i++) {
            const unitTitleStart = `Unit ${i}`;
            const exists = course.units.find(u => u.title.startsWith(unitTitleStart));

            if (!exists) {
                course.units.push({
                    title: `Unit ${i}: ${getGenericTopic(course.title, i)}`,
                    topics: [`Chapter ${i}`, 'Introduction', 'Key Concepts', 'Advanced Topics']
                });
            }
        }

        // Sort units by title just in case
        course.units.sort((a, b) => a.title.localeCompare(b.title));
    };

    const getGenericTopic = (subject, unitNum) => {
        const key = subject.toLowerCase();
        if (key.includes('math')) return ['Calculus', 'Algebra', 'Geometry', 'Statistics', 'Probability', 'Vectors'][unitNum - 1] || 'Advanced Math';
        if (key.includes('phys')) return ['Mechanics', 'Thermodynamics', 'Waves', 'Optics', 'Electromagnetism', 'Modern Physics'][unitNum - 1] || 'Physics';
        if (key.includes('chem')) return ['Atomic Structure', 'Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Kinetics'][unitNum - 1] || 'Chemistry';
        if (key.includes('bio')) return ['Cell Strategy', 'Genetics', 'Evolution', 'Physiology', 'Ecology', 'Biotech'][unitNum - 1] || 'Biology';
        if (key.includes('it') || key.includes('computer') || key.includes('prog')) return ['Variables', 'Loops', 'Arrays', 'Functions', 'Structures', 'Files'][unitNum - 1] || 'Computing';
        return `Core Concepts ${unitNum}`;
    };

    // Iterate
    Object.keys(syllabusData).forEach(yearKey => {
        const yearData = syllabusData[yearKey];
        if (yearData.sem1) yearData.sem1.forEach(ensureUnits);
        if (yearData.sem2) yearData.sem2.forEach(ensureUnits);
    });

    // Write back
    // JSON.stringify will quote all keys, which differs from original style but is valid JS.
    const newContent = `const syllabusData = ${JSON.stringify(syllabusData, null, 4)};`;

    fs.writeFileSync(filePath, newContent);
    console.log("Passed: Updated all subjects with Units 1-6.");

} catch (e) {
    console.error("Error processing data:", e);
}
