// DOM Elements
const sidebarMenu = document.getElementById('sidebar-menu');
const contentArea = document.getElementById('content-area');

// State
let currentSemester = 'semester1';
let currentCourseId = null;

// Initialize
// Initialize
function init() {
    // Initialize Data Sync (Loads from LocalStorage if available)
    if (typeof DBSync !== 'undefined') DBSync.init();

    // Check URL Params
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    const yearParam = urlParams.get('year') || 'puc2'; // Default

    // Set Global Data for Year (DBSync might have updated syllabusData)
    window.currentYearKey = yearParam;
    window.currentYearData = syllabusData[yearParam];
    if (!window.currentYearData) {
        console.warn(`Year ${yearParam} not found, defaulting to puc2`);
        window.currentYearKey = 'puc2';
        window.currentYearData = syllabusData['puc2'];
    }

    // Customize Interface for All Years
    document.querySelector('.sidebar').style.display = 'none';
    contentArea.style.padding = '0'; // Reset padding for full control
    loadSemesterLanding();
}

// Helper to Render Timetable Section
function renderTimetableSection() {
    console.log("Attempting to render timetable...");

    if (typeof TIMETABLE_DB === 'undefined') {
        console.error("TIMETABLE_DB is undefined");
        return `<div style="padding: 20px; text-align: center; color: red;">Error: System Error - Timetable Database not loaded. Please refresh the page.</div>`;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        console.error("User not found in localStorage");
        return `<div style="padding: 20px; text-align: center; color: red;">Error: User session not found. Please login again.</div>`;
    }

    if (!user.class) {
        console.error("User class not defined", user);
        return `<div style="padding: 20px; text-align: center; color: red;">Error: User class information missing.</div>`;
    }

    // Normalization Logic
    let classKey = user.class.replace(/[- ]/g, '').toUpperCase();
    if (classKey.startsWith("PHI")) {
        classKey = classKey.replace("PHI", "\u03a6");
    } else if (classKey.startsWith("MUE")) {
        classKey = classKey.replace("MUE", "\u039c");
    }

    const schedule = TIMETABLE_DB[classKey];

    if (!schedule) {
        console.warn(`Timetable not found for key: ${classKey}`);
        return `
            <div style="max-width: 800px; width: 100%; margin: 40px auto; text-align: center; padding: 20px; background: #fff1f2; border-radius: 12px; color: #e11d48;">
                <i class="fas fa-exclamation-circle"></i> Timetable not found for class: <strong>${user.class}</strong>
                <div style="font-size: 0.8rem; margin-top: 5px; opacity: 0.8;">(Key: ${classKey})</div>
            </div>
        `;
    }

    // Timings Configuration
    // Start 8:30, 60min periods. 
    // Breaks: after P2 (10min), after P4 (Lunch 60min), after P6 (10min)
    const periods = [
        { name: "P1", start: "08:30", end: "09:30" },
        { name: "P2", start: "09:30", end: "10:30" },
        { name: "P3", start: "10:40", end: "11:40" },
        { name: "P4", start: "11:40", end: "12:40" },
        { name: "P5", start: "13:40", end: "14:40" },
        { name: "P6", start: "14:40", end: "15:40" },
        { name: "P7", start: "15:50", end: "16:50" }
    ];

    // Helper to Determine Current Active Period
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Monday"
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentTimeVal = currentHour * 60 + currentMin; // Minutes from midnight

    let activePeriodIndex = -1;
    let ongoingSubject = null;

    // Check if today is a weekday in the schedule
    if (schedule[currentDay]) {
        periods.forEach((p, index) => {
            const [sh, sm] = p.start.split(':').map(Number);
            const [eh, em] = p.end.split(':').map(Number);
            const startVal = sh * 60 + sm;
            const endVal = eh * 60 + em;

            if (currentTimeVal >= startVal && currentTimeVal < endVal) {
                activePeriodIndex = index;
                ongoingSubject = schedule[currentDay][index];
            }
        });
    }

    // Subject Name Mapping
    const subjectMap = {
        'M': 'Mathematics',
        'P': 'Physics',
        'C': 'Chemistry',
        'B': 'Biology',
        'E': 'English',
        'T': 'Telugu',
        'IT': 'IT Workshop',
        'MT': 'Maths Tutorial',
        'PT': 'Physics Tutorial',
        'CT': 'Chemistry Tutorial',
        'ET': 'English Tutorial',
        'BT': 'Biology Tutorial',
        'CL': 'Chemistry Lab',
        'PL': 'Physics Lab',
        'ITL': 'IT Lab',
        'BL': 'Biology Lab',
        'Free': 'Free',
        '': 'Free'
    };

    // Next Period Logic
    let nextPeriodIndex = -1;
    let nextSubject = null;
    let nextDay = currentDay;

    // Logic to find next period (same day)
    if (activePeriodIndex !== -1 && activePeriodIndex < periods.length - 1) {
        nextPeriodIndex = activePeriodIndex + 1;
        nextSubject = schedule[currentDay][nextPeriodIndex];
    } else if (schedule[currentDay]) {
        for (let i = 0; i < periods.length; i++) {
            const [sh, sm] = periods[i].start.split(':').map(Number);
            const startVal = sh * 60 + sm;
            if (currentTimeVal < startVal) {
                nextPeriodIndex = i;
                nextSubject = schedule[currentDay][i];
                break;
            }
        }
    }

    // Top Banner Renderer Helper
    const renderBanner = (periodIndex, subjectCode, day, isNext = false, hasToggle = false) => {
        const p = periods[periodIndex];
        const fullSubjectName = subjectMap[subjectCode] || subjectCode;

        let toggleBtn = '';
        if (hasToggle) {
            toggleBtn = `
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.2); text-align: right;">
                    <button onclick="window.togglePeriodBanner()" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 20px; border-radius: 50px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                        ${isNext ? '<i class="fas fa-arrow-left"></i> Show Present Period' : 'Show Next Period <i class="fas fa-arrow-right"></i>'}
                    </button>
                </div>
            `;
        }

        let content = '';
        if (subjectCode && subjectCode !== 'Free' && subjectCode !== '') {
            content = `
                <div style="background: ${isNext ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #10b981, #059669)'}; color: white; padding: 30px; border-radius: 24px; box-shadow: 0 10px 30px -5px ${isNext ? 'rgba(59, 130, 246, 0.4)' : 'rgba(16, 185, 129, 0.4)'}; text-align: left;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <div style="font-size: 0.9rem; font-weight: 600; opacity: 0.9; margin-bottom: 5px; letter-spacing: 1px; text-transform: uppercase;">${isNext ? 'COMING UP NEXT' : 'HAPPENING NOW'}</div>
                            <div style="font-size: 2.5rem; font-weight: 700; font-family: 'Outfit', sans-serif; margin-bottom: 5px;">${fullSubjectName}</div>
                            <div style="font-size: 1.1rem; opacity: 0.95; font-weight: 500;"><i class="fas fa-clock"></i> ${p.start} - ${p.end}</div>
                        </div>
                        <div style="font-size: 4rem; opacity: 0.2;">
                            <i class="fas ${isNext ? 'fa-hourglass-start' : 'fa-chalkboard-teacher'}"></i>
                        </div>
                    </div>
                    ${toggleBtn}
                </div>
            `;
        } else {
            content = `
                <div style="background: var(--bg-light); color: var(--text-light); padding: 25px; border-radius: 20px; text-align: center; border: 1px solid var(--glass-border);">
                    <div style="font-size: 1.2rem; font-weight: 500;"><i class="fas fa-coffee"></i> Free Period (${p.name})</div>
                     ${hasToggle ? `
                        <div style="margin-top: 15px;">
                             <button onclick="window.togglePeriodBanner()" class="btn-sm btn-outline" style="background: var(--bg-white); border-radius: 50px; padding: 8px 20px; font-size: 0.9rem;">
                                ${isNext ? '<i class="fas fa-arrow-left"></i> Show Present' : 'Show Next <i class="fas fa-arrow-right"></i>'}
                            </button>
                        </div>
                     ` : ''}
                </div>
            `;
        }
        return content;
    };

    let bannerHTML = '';

    // Case 1: Active Period Exists
    if (activePeriodIndex !== -1) {
        const hasNext = nextPeriodIndex !== -1;

        if (hasNext) {
            const currentBanner = renderBanner(activePeriodIndex, ongoingSubject, currentDay, false, true);
            const nextBanner = renderBanner(nextPeriodIndex, nextSubject, currentDay, true, true);

            bannerHTML = `
                <div id="timetable-banners" style="margin-bottom: 30px;">
                    <div id="current-period-banner" style="display: block; animation: fadeIn 0.4s;">
                        ${currentBanner}
                    </div>
                    <div id="next-period-banner" style="display: none; animation: fadeIn 0.4s;">
                        ${nextBanner}
                    </div>
                </div>
            `;
        } else {
            const currentBanner = renderBanner(activePeriodIndex, ongoingSubject, currentDay, false, false);
            bannerHTML = `<div style="margin-bottom: 30px;">${currentBanner}</div>`;
        }

    } else if (nextPeriodIndex !== -1) {
        // No active period now, but there is a next one coming up today
        const nextBanner = renderBanner(nextPeriodIndex, nextSubject, currentDay, true, false);
        bannerHTML = `<div style="margin-bottom: 30px;">${nextBanner}</div>`;
    } else {
        bannerHTML = `
            <div style="background: var(--bg-light); color: var(--text-light); padding: 25px; border-radius: 20px; margin-bottom: 30px; text-align: center;">
                <i class="fas fa-moon"></i> No classes right now.
            </div>
        `;
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return `
        <div style="max-width: 1000px; width: 100%; margin-top: 20px; padding: 0 20px; animation: fadeIn 1s ease-out;">
            
            ${bannerHTML}

            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="font-family: 'Playfair Display', serif; color: var(--text-dark); margin-bottom: 10px;">Weekly Timetable</h2>
                <div style="display: inline-block; padding: 5px 15px; background: #dbeafe; color: #1e40af; border-radius: 20px; font-weight: 600; font-size: 0.9rem;">
                    Class: ${user.class}
                </div>
            </div>
            
            <div style="overflow-x: auto; background: var(--bg-white); border-radius: 20px; box-shadow: var(--shadow-lg); border: 1px solid var(--glass-border);">
                <table style="width: 100%; border-collapse: collapse; min-width: 900px;">
                    <thead>
                        <tr style="background: var(--bg-light); border-bottom: 2px solid var(--glass-border);">
                            <th style="padding: 15px 20px; text-align: left; color: var(--text-dark); font-weight: 700;">Day</th>
                            ${periods.map(p => `
                                <th style="padding: 15px; text-align: center; color: var(--text-dark); font-weight: 600;">
                                    ${p.name}
                                    <div style="font-size: 0.75rem; color: var(--text-light); font-weight: 400; margin-top: 4px;">${p.start} - ${p.end}</div>
                                </th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${days.map(day => {
        const dayPeriods = schedule[day] || ['-', '-', '-', '-', '-', '-', '-'];
        const isToday = day === currentDay;

        return `
                                <tr style="border-bottom: 1px solid var(--bg-light); transition: background 0.2s; ${isToday ? 'background: var(--bg-light);' : ''}" onmouseover="this.style.background='var(--bg-light)'" onmouseout="this.style.background='${isToday ? 'var(--bg-light)' : 'transparent'}'">
                                    <td style="padding: 15px 20px; font-weight: 600; color: var(--primary-color); border-right: 1px solid var(--bg-light);">
                                        ${day}
                                        ${isToday ? '<span style="display:block; font-size: 0.7rem; color: #10b981;">TODAY</span>' : ''}
                                    </td>
                                    ${dayPeriods.map((subjectCode, idx) => {
            const cleanCode = subjectCode.trim();
            const isActive = isToday && idx === activePeriodIndex;
            const isNext = isToday && idx === nextPeriodIndex;

            // Style logic: Active takes precedence, then Next
            let cellStyle = 'color: var(--text-dark);';
            let cellClass = '';

            if (isActive) {
                cellStyle = 'background: #dbeafe; color: #1e40af; border: 2px solid #3b82f6;';
                cellClass = 'active-period-cell';
            } else if (isNext) {
                cellStyle = 'background: #eff6ff; color: #3b82f6; border: 2px dashed #93c5fd;';
            }

            return `
                                        <td style="padding: 15px; text-align: center; ${cellStyle} border-radius: ${isActive || isNext ? '8px' : '0'};">
                                            ${(cleanCode === 'Free' || cleanCode === '') ? '<span style="color: #cbd5e1;">-</span>' : `<span style="font-weight: 500;">${cleanCode}</span>`}
                                        </td>
                                    `}).join('')}
                                </tr>
                            `;
    }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Helper to Render Timetable View (Full Page)
function loadTimetableView() {
    const tableHTML = renderTimetableSection();

    // Check if error message returned (starts with <div...Error...)
    // If renderTimetableSection returns empty due to undefined user/class, we handle it.
    let content = tableHTML;
    if (!content) {
        content = `<div style="text-align:center; padding: 50px;">Timetable not available for your class.</div>`;
    }

    contentArea.innerHTML = `
        <div style="animation: fadeIn 0.5s ease-out; max-width: 1200px; margin: 0 auto; padding: 40px; min-height: 80vh;">
            <div style="display: flex; align-items: center; margin-bottom: 30px;">
                <button onclick="loadSemesterLanding()" class="btn btn-outline" style="margin-right: 20px; padding: 10px 20px;">
                    <i class="fas fa-arrow-left"></i> Back
                </button>
                <div>
                     <h1 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 5px;">Class Timetable</h1>
                     <p style="color: var(--text-light);">Weekly Schedule</p>
                </div>
            </div>
            
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: var(--shadow-lg);">
                ${content.replace('max-width: 1000px; width: 100%; margin-top: 50px;', 'width: 100%;')} 
                <!-- Stripping the inline margin from helper since we are wrapping it -->
            </div>
        </div>
    `;
}

// Helper to get time-based greeting
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
}

// Load Semester Selection Landing
function loadSemesterLanding() {
    const yearTitle = window.currentYearKey === 'puc2' ? "PUC 2" : window.currentYearKey.toUpperCase() + " Academic Year";

    contentArea.innerHTML = `
        <div style="min-height: 100vh; padding: 40px 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at center, #f8fafc, #e2e8f0); position: relative;">
            <!-- Greeting (Top Left) -->
            <div style="position: absolute; top: 30px; left: 30px; z-index: 100; text-align: left; color: var(--text-dark); animation: slideInLeft 0.8s ease-out;">
                <div style="font-size: 0.9rem; font-weight: 500; opacity: 0.8; letter-spacing: 0.5px;">${getGreeting()},</div>
                <div style="font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; background: linear-gradient(135deg, var(--primary-color), #4f46e5); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    ${JSON.parse(localStorage.getItem('user'))?.name || JSON.parse(localStorage.getItem('user'))?.id || 'Student'}
                </div>
            </div>

            <!-- Profile Dropdown (Top Right) -->
            <div class="user-dropdown" style="position: absolute; top: 30px; right: 30px; z-index: 100;">
                <button class="user-icon-btn" onclick="toggleDashboardDropdown(event)" style="width: 50px; height: 50px; font-size: 1.2rem; box-shadow: var(--shadow-lg);">
                    <i class="fas fa-user"></i>
                </button>
                <div id="dashboard-dropdown" class="dropdown-menu" style="right: 0; top: 60px; width: 200px;">
                    <div class="dropdown-item" onclick="loadProfile()">
                        <i class="fas fa-id-card"></i> Profile
                    </div>
                    
                    <div class="dropdown-item" onclick="logout()" style="color: #ef4444;">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-bottom: 40px; animation: fadeIn 0.8s ease-out;">
                <div style="width: 80px; height: 80px; background: var(--bg-white); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 2.5rem; color: var(--primary-color); box-shadow: var(--shadow-lg); margin-bottom: 15px;">
                    <i class="fas fa-university"></i>
                </div>
                <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; margin-bottom: 10px; color: var(--text-dark);">${yearTitle}</h1>
                <p style="font-size: 1.1rem; color: var(--text-light); max-width: 600px; margin: 0 auto;">${window.currentYearData.description.substring(0, 100)}...</p>

            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; max-width: 1000px; width: 100%; padding: 0 20px;">
                <!-- Semester 1 Card -->
                <div onclick="loadSemesterSubjects('sem1', 'Semester 1')" style="cursor: pointer; background: var(--bg-white); padding: 30px; border-radius: 20px; box-shadow: var(--shadow-lg); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-align: center; border: 1px solid var(--glass-border);" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #FF6B6B, #EE5253); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; margin-bottom: 0 auto 15px;">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <h2 style="font-size: 1.6rem; margin-bottom: 8px; color: var(--text-dark);">Semester 1</h2>
                    <p style="color: var(--text-light); font-size: 0.9rem;">View Subjects</p>
                </div>

                <!-- Semester 2 Card -->
                <div onclick="loadSemesterSubjects('sem2', 'Semester 2')" style="cursor: pointer; background: var(--bg-white); padding: 30px; border-radius: 20px; box-shadow: var(--shadow-lg); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-align: center; border: 1px solid var(--glass-border);" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                     <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4834d4, #686de0); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; margin-bottom: 0 auto 15px;">
                        <i class="fas fa-book-reader"></i>
                    </div>
                    <h2 style="font-size: 1.6rem; margin-bottom: 8px; color: var(--text-dark);">Semester 2</h2>
                    <p style="color: var(--text-light); font-size: 0.9rem;">View Subjects</p>
                </div>

                <!-- Timetable Card -->
                <div onclick="loadTimetableView()" style="cursor: pointer; background: var(--bg-white); padding: 30px; border-radius: 20px; box-shadow: var(--shadow-lg); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-align: center; border: 1px solid var(--glass-border);" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                     <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; margin-bottom: 0 auto 15px;">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <h2 style="font-size: 1.6rem; margin-bottom: 8px; color: var(--text-dark);">Timetable</h2>
                    <p style="color: var(--text-light); font-size: 0.9rem;">View Schedule</p>
                </div>
            </div>

            <!-- Removed Inline Timetable Section -->

            <!-- Resources / Downloads -->
            ${window.currentYearData.resources && window.currentYearData.resources.length > 0 ? (() => {
            const videos = window.currentYearData.resources.filter(r => r.type === 'video');
            const others = window.currentYearData.resources.filter(r => r.type !== 'video');

            return `
                <div style="max-width: 800px; width: 100%; margin-top: 40px; padding: 0 20px; animation: fadeIn 1s ease-out;">
                    <h3 style="color: var(--text-dark); margin-bottom: 20px; font-family: 'Playfair Display', serif;">Course Resources</h3>
                    
                    <!-- Videos Section -->
                    ${videos.length > 0 ? `
                        <div style="display: grid; gap: 20px; margin-bottom: 30px;">
                            ${videos.map(vid => `
                                <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-lg);">
                                    <div style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                                        <h4 style="margin: 0; color: var(--primary-color);"><i class="fas fa-play-circle"></i> ${vid.title}</h4>
                                        <a href="${vid.url.replace('/preview', '/view')}" target="_blank" class="btn btn-sm btn-outline" style="font-size: 0.8rem;">
                                            <i class="fas fa-external-link-alt"></i> Open in Drive
                                        </a>
                                    </div>
                                    <div style="position: relative; padding-bottom: 56.25%; height: 0; background: #000;">
                                        <iframe src="${vid.url}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <!-- Files List -->
                    ${others.length > 0 ? `
                        <h4 style="margin-bottom: 10px; color: var(--text-light);">Downloads</h4>
                        <div style="background: white; border-radius: 12px; box-shadow: var(--shadow-lg); overflow: hidden;">
                            ${others.map(res => `
                                <a href="${res.url}" target="_blank" style="display: flex; align-items: center; padding: 15px 20px; border-bottom: 1px solid #eee; text-decoration: none; color: var(--text-dark); transition: background 0.2s;">
                                    <div style="width: 40px; height: 40px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px; color: #ef4444;">
                                        <i class="fas ${res.type === 'file' ? 'fa-file-pdf' : 'fa-link'}"></i>
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600;">${res.title}</div>
                                        <div style="font-size: 0.8rem; color: var(--text-light); text-transform: uppercase;">${res.type === 'file' ? 'PDF Document' : 'External Link'}</div>
                                    </div>
                                    <i class="fas fa-chevron-right" style="color: var(--text-light);"></i>
                                </a>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                `;
        })() : ''}
        </div>
    `;
}

// Load Year Overview
function loadYearOverview(description) {
    const yearTitle = document.querySelector('.sidebar-header h2')?.innerText || "Academic Year";

    contentArea.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; animation: fadeIn 0.5s ease-out;">
            <div class="syllabus-card" style="padding: 60px 40px; text-align: center;">
                <div style="width: 100px; height: 100px; background: #e0f2fe; color: #0284c7; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 30px;">
                    <i class="fas fa-university"></i>
                </div>
                
                <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; margin-bottom: 20px; color: var(--text-dark);">
                    Overview
                </h1>
                
                <p style="font-size: 1.3rem; line-height: 1.8; color: var(--text-light);">
                    ${description}
                </p>

                <div style="margin-top: 40px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; text-align: left;">
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                         <h3 style="margin-bottom: 10px; color: var(--primary-color);"><i class="fas fa-book-open"></i> Semester 1</h3>
                         <p style="color: var(--text-light); font-size: 0.9rem;">View subjects and syllabus for the first half of the academic year.</p>
                    </div>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                         <h3 style="margin-bottom: 10px; color: var(--primary-color);"><i class="fas fa-book-reader"></i> Semester 2</h3>
                         <p style="color: var(--text-light); font-size: 0.9rem;">View subjects and syllabus for the second half of the academic year.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Sidebar Navigation
// Render Sidebar Navigation
// Render Sidebar Navigation
function renderSidebar() {
    sidebarMenu.innerHTML = '';
    const data = window.currentYearData;
    if (!data) return;

    // Overview Item (Skip for PUC2)
    if (window.currentYearKey !== 'puc2') {
        const overviewItem = document.createElement('div');
        overviewItem.className = 'menu-item';
        if (!currentCourseId) overviewItem.classList.add('active'); // Active if no course selected
        overviewItem.style.fontWeight = '600';
        overviewItem.style.marginBottom = '20px';
        overviewItem.innerHTML = `<i class="fas fa-info-circle"></i> Year Overview`;
        overviewItem.onclick = () => {
            currentCourseId = null;
            renderSidebar(); // Re-render to update active states
            loadYearOverview(data.description);
        };
        sidebarMenu.appendChild(overviewItem);
    }

    // Helper to render semester group
    const renderSemester = (semKey, title, iconClass) => {
        const isPuc2 = window.currentYearKey === 'puc2';
        const isSemActive = isPuc2 ? false : data[semKey].some(c => c.id === currentCourseId); // No active expanded state for PUC2 sidebar

        // Semester Header
        const semTitle = document.createElement('div');
        semTitle.className = `menu-item semester-header`;
        semTitle.style.fontWeight = '600';
        semTitle.style.marginTop = '15px';
        semTitle.style.display = 'flex';
        semTitle.style.justifyContent = 'space-between';
        semTitle.style.alignItems = 'center';
        semTitle.style.cursor = 'pointer';

        if (isPuc2) {
            semTitle.innerHTML = `<span><i class="${iconClass}"></i> ${title}</span>`;
            semTitle.onclick = () => {
                document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
                semTitle.classList.add('active');
                loadSemesterSubjects(semKey, title);
            };
            sidebarMenu.appendChild(semTitle);
            return; // Stop here for PUC2 (don't render subjects in sidebar)
        }

        // Standard Accordion Behavior for others
        semTitle.innerHTML = `
            <span><i class="${iconClass}"></i> ${title}</span>
            <i class="fas fa-chevron-down" style="font-size: 0.8em; transition: transform 0.3s; transform: ${isSemActive ? 'rotate(180deg)' : 'rotate(0deg)'}"></i>
        `;
        sidebarMenu.appendChild(semTitle);

        // Subjects Container
        const subContainer = document.createElement('div');
        subContainer.style.paddingLeft = '15px';
        subContainer.style.display = isSemActive ? 'block' : 'none'; // Auto-open if active
        subContainer.style.overflow = 'hidden';
        subContainer.style.transition = 'all 0.3s ease';

        // Toggle Logic
        semTitle.onclick = () => {
            const isHidden = subContainer.style.display === 'none';
            subContainer.style.display = isHidden ? 'block' : 'none';
            semTitle.querySelector('.fa-chevron-down').style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        };

        data[semKey].forEach(course => {
            const item = document.createElement('div');
            item.className = 'menu-item';
            if (course.id === currentCourseId) item.classList.add('active');
            item.innerHTML = `<i class="fas fa-file-alt" style="font-size: 0.9em;"></i> <span style="font-size: 0.9em">${course.code}</span>`;
            item.style.padding = '8px 12px';

            item.onclick = (e) => {
                e.stopPropagation();
                currentCourseId = course.id;
                renderSidebar(); // Re-render to update highlighting
                loadCourse(course);
            };
            subContainer.appendChild(item);
        });
        sidebarMenu.appendChild(subContainer);
    };

    renderSemester('sem1', 'Semester 1', 'fas fa-book-open');
    renderSemester('sem2', 'Semester 2', 'fas fa-book-reader');
}

// Load Semester Subjects (Grid View)
function loadSemesterSubjects(semKey, title) {
    const subjects = window.currentYearData[semKey];

    contentArea.innerHTML = `
        <div style="animation: fadeIn 0.5s ease-out; max-width: 1200px; margin: 0 auto; padding: 40px;">
            <div style="display: flex; align-items: center; margin-bottom: 30px;">
                <button onclick="loadSemesterLanding()" class="btn btn-outline" style="margin-right: 20px; padding: 10px 20px;">
                    <i class="fas fa-arrow-left"></i> Back
                </button>
                <div>
                    <h1 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 5px; color: var(--text-dark);">${title} Subjects</h1>
                    <p style="color: var(--text-light);">Select a subject to view its syllabus.</p>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px;">
                ${subjects.map(subject => `
                    <div onclick="loadCourseByCode('${subject.code}')" class="course-card" style="
                        background: var(--bg-white);
                        backdrop-filter: blur(10px);
                        border-radius: 20px;
                        padding: 30px;
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
                        border: 1px solid var(--glass-border);
                        cursor: pointer;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        position: relative;
                        overflow: hidden;
                    " onmouseover="this.style.transform='translateY(-8px) scale(1.02)'; this.style.boxShadow='var(--shadow-lg)';" 
                      onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='var(--shadow-soft)';">
                        
                        <!-- Decorative Abstract Shape -->
                        <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: linear-gradient(135deg, var(--primary-color), #4f46e5); opacity: 0.1; border-radius: 50%;"></div>
                        
                        <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                            <div style="
                                width: 55px; height: 55px;
                                background: linear-gradient(135deg, #eff6ff, #dbeafe);
                                color: var(--primary-color);
                                border-radius: 16px;
                                display: flex; align-items: center; justify-content: center;
                                font-size: 1.5rem;
                                box-shadow: inset 0 2px 4px 0 rgba(255, 255, 255, 0.6);
                            ">
                                <i class="fas fa-book"></i>
                            </div>
                            <div style="margin-left: 15px;">
                                <div style="font-size: 0.85rem; font-weight: 600; color: var(--primary-color); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">${subject.code}</div>
                                <div style="font-size: 0.8rem; color: var(--text-light); font-weight: 500;">Credit: ${subject.credits}</div>
                            </div>
                        </div>

                        <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.4rem; font-weight: 700; color: var(--text-dark); margin-bottom: 12px; line-height: 1.3;">
                            ${subject.title}
                        </h3>
                        
                        <p style="font-size: 0.95rem; color: var(--text-light); line-height: 1.6; margin-bottom: 25px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                            ${subject.description}
                        </p>
                        
                        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--glass-border); padding-top: 20px;">
                            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-light);">
                                <i class="fas fa-layer-group" style="margin-right: 6px; color: var(--text-light);"></i> ${subject.units ? subject.units.length : 0} Units
                            </div>
                            <div style="
                                width: 32px; height: 32px;
                                background: var(--text-dark);
                                color: white;
                                border-radius: 50%;
                                display: flex; align-items: center; justify-content: center;
                                font-size: 0.9rem;
                                transition: transform 0.2s;
                            ">
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Helper to load course from ID (needed for the click handler)
function loadCourseByCode(code) {
    const sem1 = window.currentYearData.sem1 || [];
    const sem2 = window.currentYearData.sem2 || [];
    const course = sem1.find(c => c.code === code) || sem2.find(c => c.code === code);
    if (course) {
        currentCourseId = course.id;
        renderSidebar();
        loadCourse(course);
    }
}

// Helper for onclick string injection
window.loadCourseWithId = (id, semKey, semTitle) => {
    // Find course in current data
    const sem1 = window.currentYearData.sem1.find(c => c.id === id);
    const sem2 = window.currentYearData.sem2.find(c => c.id === id);
    const course = sem1 || sem2;
    if (course) {
        currentCourseId = course.id;
        loadCourse(course, semKey, semTitle);
    }
};

// Load Course Content into Main Area
function loadCourse(course, semKey, semTitle) {
    currentCourseId = course.id;

    contentArea.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; animation: fadeIn 0.3s ease-out;">
             <div style="margin-bottom: 20px;">
                <button onclick="loadSemesterSubjects('${semKey}', '${semTitle}')" class="btn btn-outline" style="padding: 8px 16px; font-size: 0.9rem;">
                    <i class="fas fa-arrow-left"></i> Back to Subjects
                </button>
             </div>

            <div class="content-header">
                <div>
                    <h1 style="font-size: 2.5rem; font-family: 'Playfair Display', serif;">${course.title}</h1>
                    <p style="color: var(--text-light);">${course.code} • ${course.credits} Credits</p>
                </div>
                <button class="btn btn-primary" onclick="alert('Download feature coming soon!')">
                    <i class="fas fa-download"></i> Syllabus
                </button>
            </div>
            
            <!-- Rest of the syllabus card content -->
            <div class="syllabus-card">
                <h2 style="margin-bottom: 15px;">Course Description</h2>
                <p>${course.description}</p>
            </div>

            <div class="syllabus-card">
                <h2 style="margin-bottom: 20px;">Units & Topics</h2>
                <div class="units-list">
                    ${course.units ? course.units.map((unit, index) => `
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: var(--primary-color); margin-bottom: 8px;">${unit.title}</h4>
                            <ul style="padding-left: 20px; color: var(--text-dark);">
                                ${unit.topics.map(topic => `<li>${topic}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('') : '<p>Detailed syllabus not available yet.</p>'}
                </div>
            </div>

            <div class="syllabus-card">
                <h2 style="margin-bottom: 15px;">Reference Books</h2>
                <ul style="padding-left: 20px; color: var(--text-dark);">
                    ${course.books ? course.books.map(book => `<li style="margin-bottom: 10px;">${book}</li>`).join('') : '<li>Reference materials pending.</li>'}
                </ul>
            </div>
        </div>
    `;
}

// Toggle Banner Helper
window.togglePeriodBanner = function () {
    const current = document.getElementById('current-period-banner');
    const next = document.getElementById('next-period-banner');

    if (current && next) {
        if (current.style.display !== 'none') {
            current.style.display = 'none';
            next.style.display = 'block';
        } else {
            current.style.display = 'block';
            next.style.display = 'none';
        }
    }
};

// Run
document.addEventListener('DOMContentLoaded', init);

// Load Full Profile View
function loadProfile() {
    // Reset sidebar active state
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));

    // Get User Data
    const user = JSON.parse(localStorage.getItem('user'));
    const campus = localStorage.getItem('selectedCampus') || 'RGUKT';

    contentArea.innerHTML = `
        <div style="max-width: 1000px; margin: 0 auto; animation: fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); padding-bottom: 60px;">
            <button onclick="loadSemesterLanding()" class="btn btn-outline" style="margin: 30px 0 20px 30px; position: absolute; top: 0; left: 0; z-index: 20; background: var(--bg-white); border: none; box-shadow: var(--shadow-soft); border-radius: 15px; padding: 12px 24px; font-weight: 600; color: var(--text-dark);">
                <i class="fas fa-arrow-left"></i> Back
            </button>
            
            <div class="profile-card">
                <div class="profile-cover">
                    <!-- Campus Badge -->
                    <div class="profile-header-badge">
                        <i class="fas fa-university"></i> ${campus} Campus
                    </div>
                    
                    <!-- University Branding Overlay -->
                    <div style="position: absolute; top: 30px; right: 30px; color: rgba(255,255,255,0.9); font-family: 'Outfit', sans-serif; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; font-size: 0.85rem; border: 1px solid rgba(255,255,255,0.4); padding: 8px 16px; border-radius: 50px; backdrop-filter: blur(10px);">
                        RGUKT University
                    </div>
                </div>
                
                <div class="profile-avatar-large">
                    <div class="profile-avatar-inner">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                </div>
                
                <!-- Action Buttons (Floating Control Bar) -->
                <div style="position: absolute; top: 200px; right: 40px; display: flex; flex-direction: column; gap: 15px; z-index: 20;">
                     <button onclick="loadResetPassword()" class="btn-icon-soft" title="Reset Password" style="box-shadow: var(--shadow-lg);">
                        <i class="fas fa-key"></i>
                    </button>
                    <button onclick="loadEditProfile()" class="btn-icon-soft" title="Edit Profile" style="box-shadow: var(--shadow-lg);">
                        <i class="fas fa-pen"></i>
                    </button>
                </div>
                
                <div style="padding: 100px 50px 60px 50px; text-align: center;">
                    <h1 style="font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 2.2rem; color: var(--text-dark); margin-bottom: 2px; letter-spacing: -0.5px;">${user.name}</h1>
                    <p style="font-size: 1.5rem; color: var(--primary-color); font-weight: 600; margin-bottom: 8px; letter-spacing: 0.5px;">${user.id}</p>
                    <div style="display: inline-block; padding: 8px 24px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); color: var(--primary-color); border-radius: 50px; font-weight: 600; font-size: 0.95rem; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                        <i class="fas fa-graduation-cap"></i> ${user.class}
                    </div>
                    
                    <div class="profile-stats-grid">
                         <div class="stat-item">
                            <i class="fas fa-check-circle" style="font-size: 2rem; color: #10b981; margin-bottom: 15px;"></i>
                            <div class="stat-label">Academic Status</div>
                            <div class="stat-value" style="color: #10b981;">Active</div>
                        </div>
                        <div class="stat-item">
                             <i class="fas fa-envelope" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 15px;"></i>
                            <div class="stat-label">Official Email</div>
                            <div class="stat-value" style="font-size: 1.1rem; font-family: 'Outfit', sans-serif;">${user.email}</div>
                        </div>
                        <div class="stat-item" style="grid-column: span 2;">
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px;">
                                <div style="text-align: left;">
                                    <div class="stat-label">Library Account</div>
                                    <div class="stat-value" style="font-size: 1.5rem; font-family: 'Outfit', sans-serif;">No Dues Pending</div>
                                </div>
                                <i class="fas fa-book-reader" style="font-size: 3rem; color: #e2e8f0;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load Edit Profile Form
function loadEditProfile() {
    const user = JSON.parse(localStorage.getItem('user'));

    contentArea.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto; animation: fadeIn 0.5s ease-out; padding-top: 40px; padding-bottom: 40px;">
             <button onclick="loadProfile()" class="btn btn-outline" style="margin-bottom: 20px; background: white; border: none; box-shadow: var(--shadow-soft);">
                <i class="fas fa-arrow-left"></i> Cancel
            </button>
            
            <div class="profile-card" style="padding: 40px; text-align: left;">
                <h2 style="font-family: 'Outfit', sans-serif; margin-bottom: 30px; text-align: center; color: var(--text-dark); font-size: 2rem; font-weight: 700; letter-spacing: -0.5px;">Edit Profile</h2>
                
                <form onsubmit="saveProfile(event)">
                    <div style="margin-bottom: 25px;">
                        <label style="display: block; margin-bottom: 10px; color: var(--text-light); font-weight: 500; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">Student ID</label>
                        <input type="text" value="${user.id}" disabled style="width: 100%; padding: 14px 18px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f1f5f9; color: var(--text-light); cursor: not-allowed; font-size: 1rem; font-family: 'Outfit', sans-serif;">
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <label style="display: block; margin-bottom: 10px; color: var(--text-dark); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">Full Name</label>
                        <input type="text" id="edit-name" value="${user.name}" required style="width: 100%; padding: 14px 18px; border: 1px solid #cbd5e1; border-radius: 12px; font-size: 1rem; transition: all 0.3s ease; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); font-family: 'Outfit', sans-serif;" onfocus="this.style.borderColor='var(--primary-color)'; this.style.boxShadow='0 0 0 4px rgba(65, 105, 225, 0.1)'" onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='inset 0 2px 4px rgba(0,0,0,0.02)'">
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <label style="display: block; margin-bottom: 10px; color: var(--text-dark); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">Class / Designation</label>
                        <input type="text" id="edit-class" value="${user.class}" required style="width: 100%; padding: 14px 18px; border: 1px solid #cbd5e1; border-radius: 12px; font-size: 1rem; transition: all 0.3s ease; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); font-family: 'Outfit', sans-serif;" onfocus="this.style.borderColor='var(--primary-color)'; this.style.boxShadow='0 0 0 4px rgba(65, 105, 225, 0.1)'" onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='inset 0 2px 4px rgba(0,0,0,0.02)'">
                    </div>
                    
                    <div style="margin-bottom: 35px;">
                        <label style="display: block; margin-bottom: 10px; color: var(--text-light); font-weight: 500; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">Email</label>
                        <input type="text" value="${user.email}" disabled style="width: 100%; padding: 14px 18px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f1f5f9; color: var(--text-light); cursor: not-allowed; font-size: 1rem; font-family: 'Outfit', sans-serif;">
                    </div>

                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 16px; border-radius: 50px; font-size: 1.1rem; font-weight: 600; letter-spacing: 0.5px; box-shadow: 0 10px 25px -5px rgba(65, 105, 225, 0.4);">
                        <i class="fas fa-save"></i> Save Changes
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Save Profile Changes
function saveProfile(event) {
    event.preventDefault();

    // Get new values
    const newName = document.getElementById('edit-name').value.trim();
    const newClass = document.getElementById('edit-class').value.trim();

    // Get current user
    let user = JSON.parse(localStorage.getItem('user'));


    // Update object
    user.name = newName;
    user.class = newClass;

    // Update LocalStorage 'user' (current session)
    localStorage.setItem('user', JSON.stringify(user));

    // Update Global DB via DBSync
    // Ensure window.users is initialized
    if (!window.users || window.users.length === 0) {
        if (typeof STUDENT_DB !== 'undefined') window.users = JSON.parse(JSON.stringify(STUDENT_DB)); // Deep copy if needed, or just link
    }

    // Find index in global array
    const index = window.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
        window.users[index] = user;
        // Save to LocalStorage DB (persistence)
        if (typeof DBSync !== 'undefined') {
            DBSync.saveUsers(window.users);
        }
    } else {
        console.error("User not found in global DB");
    }

    // Reload Profile View
    alert("Profile updated successfully!");
    loadProfile();
}

// Load Reset Password Form
function loadResetPassword() {
    contentArea.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto; animation: fadeIn 0.5s ease-out; padding-top: 40px; padding-bottom: 40px;">
             <button onclick="loadProfile()" class="btn btn-outline" style="margin-bottom: 20px; background: white; border: none; box-shadow: var(--shadow-soft);">
                <i class="fas fa-arrow-left"></i> Cancel
            </button>
            
            <div class="profile-card" style="padding: 40px; text-align: left;">
                <h2 style="font-family: 'Outfit', sans-serif; margin-bottom: 30px; text-align: center; color: var(--text-dark); font-size: 2rem; font-weight: 700; letter-spacing: -0.5px;">Reset Password</h2>
                
                <form onsubmit="savePassword(event)">
                    <div style="margin-bottom: 25px;">
                        <label style="display: block; margin-bottom: 10px; color: var(--text-dark); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">New Password</label>
                        <input type="password" id="reset-pass" required placeholder="Enter new password" style="width: 100%; padding: 14px 18px; border: 1px solid #cbd5e1; border-radius: 12px; font-size: 1rem; transition: all 0.3s ease; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); font-family: 'Outfit', sans-serif;" onfocus="this.style.borderColor='var(--primary-color)'; this.style.boxShadow='0 0 0 4px rgba(65, 105, 225, 0.1)'" onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='inset 0 2px 4px rgba(0,0,0,0.02)'">
                    </div>
                    
                    <div style="margin-bottom: 35px;">
                        <label style="display: block; margin-bottom: 10px; color: var(--text-dark); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">Confirm Password</label>
                        <input type="password" id="reset-pass-confirm" required placeholder="Confirm new password" style="width: 100%; padding: 14px 18px; border: 1px solid #cbd5e1; border-radius: 12px; font-size: 1rem; transition: all 0.3s ease; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); font-family: 'Outfit', sans-serif;" onfocus="this.style.borderColor='var(--primary-color)'; this.style.boxShadow='0 0 0 4px rgba(65, 105, 225, 0.1)'" onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='inset 0 2px 4px rgba(0,0,0,0.02)'">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 16px; border-radius: 50px; font-size: 1.1rem; font-weight: 600; letter-spacing: 0.5px; box-shadow: 0 10px 25px -5px rgba(65, 105, 225, 0.4);">
                        <i class="fas fa-key"></i> Update Password
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Save Password Changes
function savePassword(event) {
    event.preventDefault();

    const newPass = document.getElementById('reset-pass').value;
    const confirmPass = document.getElementById('reset-pass-confirm').value;

    if (newPass !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }

    if (newPass.length < 4) {
        alert("Password must be at least 4 characters long.");
        return;
    }

    // Get current user
    let user = JSON.parse(localStorage.getItem('user'));
    user.password = newPass;

    // Update LocalStorage 'user'
    localStorage.setItem('user', JSON.stringify(user));

    // Update Global DB via DBSync
    if (!window.users || window.users.length === 0) {
        if (typeof STUDENT_DB !== 'undefined') window.users = JSON.parse(JSON.stringify(STUDENT_DB));
    }

    const index = window.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
        window.users[index] = user;
        if (typeof DBSync !== 'undefined') {
            DBSync.saveUsers(window.users);
        }
    }

    alert("Password updated successfully! Please login again.");
    logout();
}

// Dashboard Dropdown Toggle
function toggleDashboardDropdown(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('dashboard-dropdown');
    dropdown.classList.toggle('show');
}

// Close Dropdown on Click Outside
window.addEventListener('click', (event) => {
    const dropdown = document.getElementById('dashboard-dropdown');
    if (dropdown && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
});
