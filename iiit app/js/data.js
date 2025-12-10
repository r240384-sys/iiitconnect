const syllabusData = {
    // Pre-University Course 1
    puc1: {
        description: "Subjects for streams like Science (Physics, Chemistry, Biology, Mathematics) and other possible electives.",
        sem1: [
            {
                id: 'puc1-s1-m1',
                code: 'M101',
                title: 'Mathematics I',
                credits: 4,
                description: 'Calculus and Algebra foundations.',
                units: [
                    { title: 'Unit 1: Functions', topics: ['Types of functions', 'Graphs', 'Limits'] },
                    { title: 'Unit 2: Differentiation', topics: ['Derivatives', 'Chain Rule', 'Applications'] }
                ]
            },
            {
                id: 'puc1-s1-p1',
                code: 'P101',
                title: 'Physics I',
                credits: 4,
                description: 'Mechanics and Kinematics.',
                units: [
                    { title: 'Unit 1: Motion', topics: ['Velocity', 'Acceleration', 'Newton Laws'] },
                    { title: 'Unit 2: Energy', topics: ['Work', 'Power', 'Conservation of Energy'] }
                ]
            },
            {
                id: 'puc1-s1-c1', code: 'C101', title: 'Chemistry I', credits: 4, description: 'Atomic Structure and Bonding.',
                units: [{ title: 'Unit 1: Atoms', topics: ['Protons', 'Electrons', 'Orbitals'] }]
            },
            {
                id: 'puc1-s1-e1', code: 'E101', title: 'English I', credits: 3, description: 'Communication Skills.',
                units: [{ title: 'Unit 1: Grammar', topics: ['Parts of speech', 'Tenses'] }]
            },
            {
                id: 'puc1-s1-it1', code: 'IT101', title: 'IT Workshop', credits: 2, description: 'Basics of Computers.',
                units: [{ title: 'Unit 1: Hardware', topics: ['Components', 'Assembly'] }]
            }
        ],
        sem2: [
            {
                id: 'puc1-s2-m2', code: 'M102', title: 'Mathematics II', credits: 4, description: 'Integration and Vector Algebra.',
                units: [{ title: 'Unit 1: Integration', topics: ['Methods', 'Definite Integrals'] }]
            },
            {
                id: 'puc1-s2-p2', code: 'P102', title: 'Physics II', credits: 4, description: 'Waves and Oscillations.',
                units: [{ title: 'Unit 1: SHM', topics: ['Simple Harmonic Motion', 'Damping'] }]
            },
            {
                id: 'puc1-s2-c2', code: 'C102', title: 'Chemistry II', credits: 4, description: 'States of Matter.',
                units: [{ title: 'Unit 1: Gases', topics: ['Ideal Gas Law', 'Kinetic Theory'] }]
            },
            {
                id: 'puc1-s2-tel', code: 'L101', title: 'Telugu / Sanskrit', credits: 3, description: 'Literature and Poetry.',
                units: [{ title: 'Unit 1: Poetry', topics: ['Classic Poems'] }]
            }
        ]
    },

    // Pre-University Course 2
    puc2: {
        description: "Subjects that are continuation from Class 11, along with additional subjects that may be offered in pre-university courses.",

        sem1: [
            {
                id: 'puc2-s1-m3', code: 'M201', title: 'Mathematics III', credits: 4, description: 'Calculus and Coordinate Geometry.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'puc2-s1-p3', code: 'P201', title: 'Physics III', credits: 4, description: 'Electricity and Magnetism.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'puc2-s1-c3', code: 'C201', title: 'Chemistry III', credits: 4, description: 'Physical and Organic Chemistry.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'puc2-s1-b1', code: 'B201', title: 'Biology I', credits: 4, description: 'Botany and Zoology Basics.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            }
        ],
        sem2: [
            {
                id: 'puc2-s2-m4', code: 'M202', title: 'Mathematics IV', credits: 4, description: 'Probability and Statistics.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'puc2-s2-p4', code: 'P202', title: 'Physics IV', credits: 4, description: 'Modern Physics and Optics.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'puc2-s2-c4', code: 'C202', title: 'Chemistry IV', credits: 4, description: 'Inorganic Chemistry.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'puc2-s2-b2', code: 'B202', title: 'Biology II', credits: 4, description: 'Human Physiology and Genetics.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            }
        ]
    },

    // Engineering Year 1 (E1)
    e1: {
        description: "Core subjects that form the foundation for any engineering discipline, typically including Mathematics, Physics, Chemistry, and Introduction to Programming.",
        sem1: [
            {
                id: 'c1',
                code: 'CS1101',
                title: 'Problem Solving and Programming',
                credits: 4,
                description: 'Problem Solving and Programming involves using computational logic to solve conceptual problems and implementing solutions through coding.',
                units: [
                    {
                        title: 'Unit 1: Introduction to Computers',
                        topics: [
                            'Computer Systems',
                            'Computing Environments',
                            'Computer Languages',
                            'Creating and running programs',
                            'Software Development Method'
                        ]
                    },
                    {
                        title: 'Unit 2: Introduction to C Language',
                        topics: [
                            'Background',
                            'C Programs',
                            'Identifiers',
                            'Types',
                            'Variables',
                            'Constants',
                            'Input/Output',
                            'Operators (Arithmetic, Relational, Logical, Bitwise)',
                            'Expressions',
                            'Precedence and Associativity'
                        ]
                    },
                    {
                        title: 'Unit 3: Control Statements',
                        topics: [
                            'Selection Statements (if, if-else, switch)',
                            'Repetition Statements (while, do-while, for)',
                            'Return statement',
                            'Break and Continue'
                        ]
                    }
                ]
            },
            {
                id: 'c2',
                code: 'MA1101',
                title: 'Engineering Mathematics I',
                credits: 4,
                description: 'Foundational mathematics for engineering.',
                units: [
                    { title: 'Unit 1: Linear Algebra', topics: ['Matrices', 'System of equations'] },
                    { title: 'Unit 2: Calculus', topics: ['Mean value theorems', 'Partial differentiation'] }
                ]
            },
            {
                id: 'e1-s1-eg', code: 'ME1101', title: 'Engineering Graphics', credits: 3, description: 'Visualization and drawing.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e1-s1-bee', code: 'EE1101', title: 'Basic Electrical Engg.', credits: 3, description: 'Circuits and machines.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            }
        ],
        sem2: [
            {
                id: 'c3',
                code: 'CS1201',
                title: 'Data Structures',
                credits: 4,
                description: 'Study of data organization and manipulation.',
                units: [
                    { title: 'Unit 1: Introduction', topics: ['ADTs', 'Arrays', 'Linked Lists'] },
                    { title: 'Unit 2: Stacks & Queues', topics: ['Operations', 'Applications'] }
                ]
            },
            {
                id: 'e1-s2-ds', code: 'MA1201', title: 'Discrete Mathematics', credits: 4, description: 'Logic and Sets.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e1-s2-de', code: 'EC1201', title: 'Digital Electronics', credits: 4, description: 'Boolean algebra and logic gates.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            }
        ]
    },

    // Engineering Year 2 (E2)
    e2: {
        description: "Subjects related to core engineering principles based on the chosen discipline (e.g., Mechanical, Civil, Computer Science, Electronics, etc.).",
        sem1: [
            {
                id: 'e2-s1-daa', code: 'CS2101', title: 'Design Analysis & Algo', credits: 4, description: 'Algorithm analysis.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e2-s1-dbms', code: 'CS2102', title: 'Database Mgmt Systems', credits: 4, description: 'SQL and Normalization.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e2-s1-os', code: 'CS2103', title: 'Operating Systems', credits: 4, description: 'Processes and Memory.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e2-s1-flat', code: 'CS2104', title: 'Formal Lang & Automata', credits: 3, description: 'Turing Machines.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            }
        ],
        sem2: [
            {
                id: 'e2-s2-cn', code: 'CS2201', title: 'Computer Networks', credits: 4, description: 'Layers and Protocols.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e2-s2-se', code: 'CS2202', title: 'Software Engineering', credits: 3, description: 'SDLC and Agile.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e2-s2-wt', code: 'CS2203', title: 'Web Technologies', credits: 3, description: 'HTML, CSS, JS.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e2-s2-co', code: 'CS2204', title: 'Comp. Org. & Arch.', credits: 4, description: 'Processor design.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            }
        ]
    },

    // Engineering Year 3 (E3)
    e3: {
        description: "Advanced courses within the discipline, including specialized topics that deepen understanding and focus on practical application.",
        sem1: [
            {
                id: 'e3-s1-ai', code: 'CS3101', title: 'Artificial Intelligence', credits: 4, description: 'Search and Logic.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e3-s1-cd', code: 'CS3102', title: 'Compiler Design', credits: 4, description: 'Parsing and Lexing.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e3-s1-dw', code: 'CS3103', title: 'Data Warehousing', credits: 3, description: 'Mining and OLAP.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            }
        ],
        sem2: [
            {
                id: 'e3-s2-ml', code: 'CS3201', title: 'Machine Learning', credits: 4, description: 'Supervised and Unsupervised.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e3-s2-cns', code: 'CS3202', title: 'Cryptography & Net Sec', credits: 4, description: 'Encryption and RSA.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e3-s2-cc', code: 'CS3203', title: 'Cloud Computing', credits: 3, description: 'AWS and Azure.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            }
        ]
    },

    // Engineering Year 4 (E4)
    e4: {
        description: "Final-year subjects, including project work, internships, elective courses, and specialized topics leading to graduation.",
        sem1: [
            {
                id: 'e4-s1-bd', code: 'CS4101', title: 'Big Data Analytics', credits: 3, description: 'Hadoop and Spark.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e4-s1-iot', code: 'CS4102', title: 'Internet of Things', credits: 3, description: 'Sensors and Actuators.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e4-s1-proj', code: 'CS4103', title: 'Major Project Phase I', credits: 2, description: 'Project planning.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            }
        ],
        sem2: [
            {
                id: 'e4-s2-proj', code: 'CS4201', title: 'Major Project Phase II', credits: 6, description: 'Final Implementation.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            },
            {
                id: 'e4-s2-sem', code: 'CS4202', title: 'Seminar', credits: 1, description: 'Technical presentation.', units: [
                    { title: 'Unit 1: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 2: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 3: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 4: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 5: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] },
                    { title: 'Unit 6: Consists of 6 units', topics: ['Topic 1', 'Topic 2'] }
                ]
            }
        ]
    }
};
