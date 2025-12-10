// Timetable Data parsed from XLSX
const TIMETABLE_DB = {
    "\u039c1": {
        "Monday": [
            "CL",
            "CL",
            "E",
            "T",
            "M",
            "PT",
            "CT"
        ],
        "Tuesday": [
            "M",
            "E",
            "C",
            "P",
            "MT",
            "Free",
            "Free"
        ],
        "Wednesday": [
            "M",
            "E",
            "C",
            "P",
            "IT",
            "T",
            "Free"
        ],
        "Thursday": [
            "PL",
            "PL",
            "CT",
            "T",
            "MT",
            "E",
            "PT"
        ],
        "Friday": [
            "M",
            "C",
            "ITL",
            "ITL",
            "P",
            "Free",
            "Free"
        ],
        "Saturday": [
            "IT",
            "P",
            "M",
            "ET",
            "C",
            "Free",
            "Free"
        ]
    },
    "\u039c2": {
        "Monday": [
            "PL",
            "PL",
            "CT",
            "PT",
            "T",
            "M",
            "E"
        ],
        "Tuesday": [
            "IT",
            "M",
            "E",
            "C",
            "P",
            "Free",
            "Free"
        ],
        "Wednesday": [
            "T",
            "M",
            "E",
            "C",
            "P",
            "MT",
            "Free"
        ],
        "Thursday": [
            "CL",
            "CL",
            "PT",
            "CT",
            "T",
            "MT",
            "E"
        ],
        "Friday": [
            "P",
            "M",
            "C",
            "Free",
            "ITL",
            "ITL",
            "Free"
        ],
        "Saturday": [
            "C",
            "IT",
            "P",
            "M",
            "ET",
            "Free",
            "Free"
        ]
    },
    "\u039c3": {
        "Monday": [
            "E",
            "PT",
            "CL",
            "CL",
            "CT",
            "T",
            "M"
        ],
        "Tuesday": [
            "P",
            "IT",
            "M",
            "E",
            "C",
            "Free",
            "Free"
        ],
        "Wednesday": [
            "P",
            "T",
            "M",
            "ET",
            "C",
            "Free",
            "Free"
        ],
        "Thursday": [
            "E",
            "PT",
            "PL",
            "PL",
            "CT",
            "IT",
            "MT"
        ],
        "Friday": [
            "T",
            "P",
            "M",
            "C",
            "Free",
            "MT",
            "Free"
        ],
        "Saturday": [
            "E",
            "C",
            "ITL",
            "ITL",
            "P",
            "M",
            "Free"
        ]
    },
    "\u039c4": {
        "Monday": [
            "M",
            "E",
            "PL",
            "PL",
            "PT",
            "CT",
            "T"
        ],
        "Tuesday": [
            "M",
            "P",
            "IT",
            "MT",
            "E",
            "C",
            "Free"
        ],
        "Wednesday": [
            "C",
            "P",
            "T",
            "MT",
            "ET",
            "Free",
            "Free"
        ],
        "Thursday": [
            "M",
            "E",
            "CL",
            "CL",
            "PT",
            "CT",
            "T"
        ],
        "Friday": [
            "ITL",
            "ITL",
            "P",
            "M",
            "C",
            "Free",
            "Free"
        ],
        "Saturday": [
            "M",
            "E",
            "C",
            "IT",
            "Free",
            "P",
            "Free"
        ]
    },
    "\u039c5": {
        "Monday": [
            "T",
            "M",
            "E",
            "PT",
            "CL",
            "CL",
            "CT"
        ],
        "Tuesday": [
            "C",
            "E",
            "P",
            "IT",
            "M",
            "Free",
            "Free"
        ],
        "Wednesday": [
            "M",
            "C",
            "P",
            "T",
            "MT",
            "ET",
            "Free"
        ],
        "Thursday": [
            "PT",
            "M",
            "E",
            "Free",
            "PL",
            "PL",
            "CT"
        ],
        "Friday": [
            "C",
            "T",
            "Free",
            "P",
            "MT",
            "IT",
            "Free"
        ],
        "Saturday": [
            "P",
            "M",
            "E",
            "C",
            "ITL",
            "ITL",
            "Free"
        ]
    },
    "\u039c6": {
        "Monday": [
            "CT",
            "T",
            "M",
            "E",
            "PL",
            "PL",
            "PT"
        ],
        "Tuesday": [
            "E",
            "C",
            "M",
            "P",
            "IT",
            "Free",
            "Free"
        ],
        "Wednesday": [
            "E",
            "MT",
            "C",
            "P",
            "T",
            "Free",
            "Free"
        ],
        "Thursday": [
            "CT",
            "T",
            "M",
            "E",
            "IT",
            "Free",
            "PT"
        ],
        "Friday": [
            "M",
            "C",
            "ITL",
            "ITL",
            "P",
            "MT",
            "Free"
        ],
        "Saturday": [
            "CL",
            "CL",
            "M",
            "ET",
            "C",
            "P",
            "Free"
        ]
    },
    "\u039c7": {
        "Monday": [
            "M",
            "E",
            "C",
            "P",
            "MT",
            "Free",
            "Free"
        ],
        "Tuesday": [
            "CL",
            "CL",
            "CT",
            "E",
            "M",
            "ET",
            "PT"
        ],
        "Wednesday": [
            "ITL",
            "ITL",
            "P",
            "M",
            "C",
            "Free",
            "Free"
        ],
        "Thursday": [
            "M",
            "IT",
            "Free",
            "P",
            "C",
            "T",
            "E"
        ],
        "Friday": [
            "PL",
            "PL",
            "CT",
            "T",
            "MT",
            "Free",
            "PT"
        ],
        "Saturday": [
            "M",
            "E",
            "C",
            "P",
            "IT",
            "T",
            "Free"
        ]
    },
    "\u039c8": {
        "Monday": [
            "IT",
            "M",
            "E",
            "C",
            "P",
            "Free",
            "Free"
        ],
        "Tuesday": [
            "PL",
            "PL",
            "PT",
            "CT",
            "ET",
            "M",
            "Free"
        ],
        "Wednesday": [
            "C",
            "T",
            "Free",
            "P",
            "MT",
            "E",
            "Free"
        ],
        "Thursday": [
            "IT",
            "M",
            "C",
            "Free",
            "P",
            "CL",
            "CL"
        ],
        "Friday": [
            "ITL",
            "ITL",
            "PT",
            "CT",
            "T",
            "M",
            "E"
        ],
        "Saturday": [
            "T",
            "M",
            "E",
            "C",
            "P",
            "MT",
            "Free"
        ]
    },
    "\u039c9": {
        "Monday": [
            "P",
            "IT",
            "M",
            "E",
            "C",
            "Free",
            "Free"
        ],
        "Tuesday": [
            "E",
            "PT",
            "CL",
            "CL",
            "CT",
            "Free",
            "M"
        ],
        "Wednesday": [
            "E",
            "C",
            "ITL",
            "ITL",
            "P",
            "M",
            "Free"
        ],
        "Thursday": [
            "C",
            "T",
            "M",
            "P",
            "Free",
            "MT",
            "Free"
        ],
        "Friday": [
            "E",
            "PT",
            "PL",
            "PL",
            "CT",
            "T",
            "MT"
        ],
        "Saturday": [
            "IT",
            "T",
            "M",
            "ET",
            "C",
            "P",
            "Free"
        ]
    },
    "\u039c10": {
        "Monday": [
            "M",
            "P",
            "IT",
            "MT",
            "E",
            "C",
            "Free"
        ],
        "Tuesday": [
            "M",
            "E",
            "PL",
            "PL",
            "PT",
            "CT",
            "Free"
        ],
        "Wednesday": [
            "M",
            "E",
            "C",
            "Free",
            "T",
            "P",
            "Free"
        ],
        "Thursday": [
            "IT",
            "C",
            "T",
            "MT",
            "Free",
            "P",
            "Free"
        ],
        "Friday": [
            "M",
            "E",
            "CL",
            "CL",
            "PT",
            "CT",
            "T"
        ],
        "Saturday": [
            "ITL",
            "ITL",
            "P",
            "M",
            "ET",
            "C",
            "Free"
        ]
    },
    "\u03a61": {
        "Monday": [
            "C",
            "E",
            "P",
            "IT",
            "M",
            "Free",
            "Free"
        ],
        "Tuesday": [
            "T",
            "M",
            "E",
            "PT",
            "CL",
            "CL",
            "CT"
        ],
        "Wednesday": [
            "P",
            "M",
            "E",
            "C",
            "ITL",
            "ITL",
            "Free"
        ],
        "Thursday": [
            "P",
            "IT",
            "C",
            "T",
            "MT",
            "Free",
            "Free"
        ],
        "Friday": [
            "T",
            "M",
            "E",
            "PT",
            "PL",
            "PL",
            "CT"
        ],
        "Saturday": [
            "M",
            "C",
            "Free",
            "P",
            "MT",
            "ET",
            "Free"
        ]
    },
    "\u03a62": {
        "Monday": [
            "E",
            "C",
            "Free",
            "P",
            "IT",
            "MT",
            "Free"
        ],
        "Tuesday": [
            "CT",
            "T",
            "M",
            "E",
            "PL",
            "PL",
            "PT"
        ],
        "Wednesday": [
            "C",
            "P",
            "M",
            "E",
            "Free",
            "Free",
            "Free"
        ],
        "Thursday": [
            "M",
            "P",
            "IT",
            "C",
            "T",
            "MT",
            "Free"
        ],
        "Friday": [
            "CT",
            "T",
            "M",
            "ET",
            "CL",
            "CL",
            "PT"
        ],
        "Saturday": [
            "E",
            "P",
            "ITL",
            "ITL",
            "C",
            "M",
            "Free"
        ]
    },
    "\u03a63": {
        "Monday": [
            "CT",
            "P",
            "M",
            "E",
            "B",
            "PT",
            "Free"
        ],
        "Tuesday": [
            "CT",
            "M",
            "E",
            "PT",
            "Free",
            "CL",
            "CL"
        ],
        "Wednesday": [
            "IT",
            "M",
            "T",
            "P",
            "BL",
            "BL",
            "C"
        ],
        "Thursday": [
            "T",
            "B",
            "M",
            "C",
            "E",
            "MT",
            "P"
        ],
        "Friday": [
            "ITL",
            "ITL",
            "B",
            "C",
            "P",
            "M",
            "E"
        ],
        "Saturday": [
            "PL",
            "PL",
            "C",
            "T",
            "IT",
            "ET",
            "MT"
        ]
    },
    "F04": {
        "Monday": [
            "P",
            "T",
            "M",
            "ET",
            "C",
            "Free",
            "Free"
        ],
        "Tuesday": [
            "P",
            "Free",
            "M",
            "E",
            "C",
            "Free",
            "IT"
        ],
        "Wednesday": [
            "E",
            "CT",
            "CL",
            "CL",
            "PT",
            "IT",
            "M"
        ],
        "Thursday": [
            "Free",
            "P",
            "M",
            "C",
            "T",
            "MT",
            "Free"
        ],
        "Friday": [
            "E",
            "C",
            "ITL",
            "ITL",
            "P",
            "MT",
            "Free"
        ],
        "Saturday": [
            "E",
            "CT",
            "PL",
            "PL",
            "PT",
            "T",
            "M"
        ]
    },
    "F05": {
        "Monday": [
            "M",
            "P",
            "T",
            "MT",
            "E",
            "C",
            "Free"
        ],
        "Tuesday": [
            "IT",
            "P",
            "C",
            "M",
            "ET",
            "Free",
            "Free"
        ],
        "Wednesday": [
            "CT",
            "E",
            "PL",
            "PL",
            "M",
            "PT",
            "T"
        ],
        "Thursday": [
            "ITL",
            "ITL",
            "P",
            "MT",
            "C",
            "Free",
            "Free"
        ],
        "Friday": [
            "IT",
            "E",
            "C",
            "M",
            "Free",
            "P",
            "Free"
        ],
        "Saturday": [
            "CT",
            "E",
            "CL",
            "CL",
            "M",
            "PT",
            "T"
        ]
    },
    "F06": {
        "Monday": [
            "T",
            "ET",
            "P",
            "C",
            "MT",
            "Free",
            "Free"
        ],
        "Tuesday": [
            "M",
            "C",
            "P",
            "T",
            "MT",
            "E",
            "Free"
        ],
        "Wednesday": [
            "Free",
            "M",
            "E",
            "CT",
            "CL",
            "CL",
            "PT"
        ],
        "Thursday": [
            "P",
            "Free",
            "T",
            "C",
            "M",
            "IT",
            "Free"
        ],
        "Friday": [
            "P",
            "M",
            "E",
            "C",
            "ITL",
            "ITL",
            "Free"
        ],
        "Saturday": [
            "IT",
            "M",
            "E",
            "CT",
            "PL",
            "PL",
            "PT"
        ]
    },
    "F07": {
        "Monday": [
            "E",
            "C",
            "Free",
            "P",
            "T",
            "M",
            "Free"
        ],
        "Tuesday": [
            "E",
            "IT",
            "C",
            "P",
            "T",
            "MT",
            "Free"
        ],
        "Wednesday": [
            "PT",
            "Free",
            "M",
            "E",
            "PL",
            "PL",
            "CT"
        ],
        "Thursday": [
            "M",
            "C",
            "ITL",
            "ITL",
            "P",
            "MT",
            "Free"
        ],
        "Friday": [
            "IT",
            "P",
            "M",
            "E",
            "C",
            "Free",
            "Free"
        ],
        "Saturday": [
            "PT",
            "T",
            "M",
            "ET",
            "CL",
            "CL",
            "CT"
        ]
    },
    "F08": {
        "Monday": [
            "P",
            "M",
            "E",
            "CT",
            "ITL",
            "ITL",
            "Free"
        ],
        "Tuesday": [
            "M",
            "E",
            "IT",
            "CT",
            "PL",
            "PL",
            "PT"
        ],
        "Wednesday": [
            "CL",
            "CL",
            "P",
            "M",
            "MT",
            "C",
            "Free"
        ],
        "Thursday": [
            "T",
            "IT",
            "C",
            "E",
            "M",
            "PT",
            "Free"
        ],
        "Friday": [
            "Free",
            "C",
            "T",
            "P",
            "M",
            "E",
            "Free"
        ],
        "Saturday": [
            "P",
            "C",
            "T",
            "MT",
            "ET",
            "Free",
            "Free"
        ]
    },
    "F09": {
        "Monday": [
            "E",
            "CT",
            "M",
            "Free",
            "PL",
            "PL",
            "PT"
        ],
        "Tuesday": [
            "Free",
            "M",
            "E",
            "PT",
            "ITL",
            "ITL",
            "CT"
        ],
        "Wednesday": [
            "IT",
            "M",
            "T",
            "P",
            "BL",
            "BL",
            "C"
        ],
        "Thursday": [
            "B",
            "T",
            "M",
            "C",
            "E",
            "MT",
            "P"
        ],
        "Friday": [
            "CL",
            "CL",
            "C",
            "B",
            "P",
            "M",
            "E"
        ],
        "Saturday": [
            "T",
            "P",
            "C",
            "B",
            "IT",
            "ET",
            "MT"
        ]
    }
};
