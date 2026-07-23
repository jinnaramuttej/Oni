import { Course, Instructor } from '../types';

export const INSTRUCTORS: Record<string, Instructor> = {
  dr_chen: {
    id: 'dr_chen',
    name: 'Dr. Evelyn Chen, Ph.D.',
    title: 'Head of STEM & Quantum Physics',
    almaMater: 'MIT & Stanford',
    experienceYears: 14,
    avatar: 'https://images.pexels.com/photos/34761515/pexels-photo-34761515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    bio: 'Former CERN visiting researcher and Olympiad Gold Medalist. Dr. Chen has mentored over 850 students into Top-10 STEM programs nationwide.',
    specialties: ['AP Physics C', 'Calculus BC', 'Quantum Mechanics', 'Olympiad Math'],
    rating: 4.98,
    studentsTaught: 1240,
  },
  prof_marcus: {
    id: 'prof_marcus',
    name: 'Marcus Vance, M.Ed.',
    title: 'Director of Standardized Testing',
    almaMater: 'Harvard University',
    experienceYears: 12,
    avatar: 'https://images.pexels.com/photos/1546912/pexels-photo-1546912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    bio: 'Perfect 1600 SAT scoring strategist who author-edited national SAT/ACT prep workbooks. Master of testing psychology and adaptive pacing strategies.',
    specialties: ['Digital SAT English', 'SAT Math Mastery', 'ACT Strategy', 'Psat National Merit'],
    rating: 4.96,
    studentsTaught: 2100,
  },
  dr_sharma: {
    id: 'dr_sharma',
    name: 'Dr. Rajesh Sharma, MD Ph.D.',
    title: 'Pre-Med & Advanced Bio Lead',
    almaMater: 'Johns Hopkins University',
    experienceYears: 10,
    avatar: 'https://images.pexels.com/photos/17050931/pexels-photo-17050931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    bio: 'Johns Hopkins Pre-Med faculty mentor with deep research experience in cellular genetics. Guides students through AP Biology and Medical Track admissions.',
    specialties: ['AP Biology', 'IB Chemistry HL', 'Medical Prep BMAT/UCAT', 'Genetics'],
    rating: 4.99,
    studentsTaught: 980,
  },
  prof_elena: {
    id: 'prof_elena',
    name: 'Elena Rostova, M.S.',
    title: 'Computer Science & AI Fellow',
    almaMater: 'Carnegie Mellon University',
    experienceYears: 9,
    avatar: 'https://images.pexels.com/photos/8837498/pexels-photo-8837498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    bio: 'Ex-Google AI Engineer turned passionate educator. Specializes in AP Computer Science, Machine Learning, and USACO competitive coding.',
    specialties: ['AP Computer Science A', 'Python Data Science', 'Algorithms', 'USACO Prep'],
    rating: 4.97,
    studentsTaught: 1150,
  },
};

export const COURSES: Course[] = [
  {
    id: 'sat-1600-mastery',
    title: 'Digital SAT 1600 Premier Accelerator',
    subtitle: 'Proven score-boosting framework with predictive digital test simulations',
    category: 'SAT / ACT Test Prep',
    gradeLevel: 'Senior Prep (Grades 11-12)',
    duration: '12 Weeks',
    hoursPerWeek: '4 hrs / week + 2 hrs Office Hours',
    level: 'Elite Mastery',
    instructor: INSTRUCTORS.prof_marcus,
    description: 'Designed for high achievers seeking top 1% score brackets. Combines adaptive question banking, error diagnostics, and rapid timing strategy.',
    outcomes: [
      'Average score improvement of +240 points',
      'Mastery over adaptive digital module pacing',
      'Comprehensive library of 2,500+ realistic SAT items',
      'Weekly 1-on-1 diagnostic review sessions with head tutors'
    ],
    highlights: [
      '1:6 Student-Mentor Ratio',
      'Real-time AI score predictor',
      'Unlimited proctored mock exams',
      'Money-back 150+ point guarantee'
    ],
    batchRatio: '1 : 6 Small Batch',
    avgScoreIncrease: '+240 Pts Avg',
    syllabus: [
      {
        title: 'Module 1: Digital SAT Architecture & Algorithmic Pacing',
        weeks: 'Weeks 1-3',
        topics: ['Adaptive Module Logic', 'Speed Reading & Graph Inference', 'Advanced Heart of Algebra']
      },
      {
        title: 'Module 2: Advanced Problem Solving & Data Analytics',
        weeks: 'Weeks 4-6',
        topics: ['Trigonometry & Complex Equations', 'Passage Synthesis & Rhetoric', 'Error Matrix Profiling']
      },
      {
        title: 'Module 3: High-Yield Precision & Proctored Simulations',
        weeks: 'Weeks 7-12',
        topics: ['Full-length adaptive practice tests', 'Time-pressure drill masterclass', 'Final Score Guarantee Clearance']
      }
    ],
    priceMonthly: 490,
    nextBatchDate: 'Starts Monday, Oct 23',
    popular: true,
    seatsLeft: 3,
    featuredImage: 'https://images.pexels.com/photos/8199603/pexels-photo-8199603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 'ap-physics-c-calculus',
    title: 'AP Physics C & Multivariable Calculus Honors',
    subtitle: 'Rigorous STEM foundation for aspiring Engineers, Scientists & Tech Leaders',
    category: 'STEM & Olympiads',
    gradeLevel: 'Senior Prep (Grades 11-12)',
    duration: '16 Weeks',
    hoursPerWeek: '5 hrs / week',
    level: 'Elite Mastery',
    instructor: INSTRUCTORS.dr_chen,
    description: 'Calculus-based physics covering Mechanics and Electricity & Magnetism. Designed for students targeting 5s on AP exams and admission to top engineering programs.',
    outcomes: [
      'Target score 5 on both AP Physics C Mechanics & E&M',
      'Intuitive grasp of Vector Calculus and Differential Equations',
      'Hands-on computational simulation projects in Python/MATLAB',
      'Direct pathway to National Physics Olympiad (USAPhO)'
    ],
    highlights: [
      '96.2% AP Grade 5 achievement rate',
      'CERN-grade visual learning tools',
      'Recorded lab analysis video breakdowns',
      '1-on-1 problem-solving sessions'
    ],
    batchRatio: '1 : 8 Micro Group',
    avgScoreIncrease: '96.2% Scored 5',
    syllabus: [
      {
        title: 'Module 1: Kinematics & Rotational Dynamics in Vector Form',
        weeks: 'Weeks 1-5',
        topics: ['Integration in Dynamics', 'Momentum & Energy Conservation', 'Harmonic Oscillators']
      },
      {
        title: 'Module 2: Electromagnetism & Maxwell Equations Preview',
        weeks: 'Weeks 6-11',
        topics: ['Gauss Law Applications', 'Magnetic Flux Induction', 'LC/RC Circuit Differential Equations']
      },
      {
        title: 'Module 3: AP Exam Mastery & Olympiad Challenge Drills',
        weeks: 'Weeks 12-16',
        topics: ['Free Response Strategy', 'FRQ Error Deconstruction', 'USAPhO Level Problem Solving']
      }
    ],
    priceMonthly: 520,
    nextBatchDate: 'Starts Oct 28',
    popular: true,
    seatsLeft: 4,
    featuredImage: 'https://images.pexels.com/photos/18870256/pexels-photo-18870256.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 'pre-med-ap-bio-chem',
    title: 'Pre-Med Foundation: AP Biology & Chemistry HL',
    subtitle: 'Cellular biology, biochemistry, and pre-med admissions competitive edge',
    category: 'University & Medical Prep',
    gradeLevel: 'High School (Grades 9-10)',
    duration: '14 Weeks',
    hoursPerWeek: '4.5 hrs / week',
    level: 'Advanced',
    instructor: INSTRUCTORS.dr_sharma,
    description: 'Immerse in molecular genetics, organic chemistry concepts, and medical research methodology. Essential preparation for prospective pre-med students.',
    outcomes: [
      'Top tier score 5 on AP Biology & AP Chemistry',
      'Understanding of university-level research lab methodologies',
      'Clinical case study analysis skills for interviews',
      'Publication-grade scientific paper synthesis'
    ],
    highlights: [
      'Taught by Johns Hopkins MD',
      'Virtual 3D molecular simulation labs',
      'Pre-med mentorship network access',
      'Small group research showcase'
    ],
    batchRatio: '1 : 6 Small Batch',
    avgScoreIncrease: '98% Pass Rate',
    syllabus: [
      {
        title: 'Module 1: Cellular Energetics & Genetic Architecture',
        weeks: 'Weeks 1-4',
        topics: ['Enzyme Kinetics', 'Cell Respiration & Photosynthesis', 'CRISPR Gene Editing Foundations']
      },
      {
        title: 'Module 2: Thermodynamics & Organic Reaction Mechanisms',
        weeks: 'Weeks 5-10',
        topics: ['Acid-Base Equilibrium', 'Chemical Kinetics', 'Biomolecular Structures']
      },
      {
        title: 'Module 3: Pre-Med Case Studies & AP Exam Mastery',
        weeks: 'Weeks 11-14',
        topics: ['Medical Diagnosis Case Debriefs', 'AP FRQ Speed Masterclass', 'Final Evaluation']
      }
    ],
    priceMonthly: 480,
    nextBatchDate: 'Starts Nov 02',
    popular: false,
    seatsLeft: 2,
    featuredImage: 'https://images.pexels.com/photos/6334887/pexels-photo-6334887.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 'cs-ai-usaco',
    title: 'AP Computer Science A & USACO Competitive Coding',
    subtitle: 'From Java Object-Oriented Fundamentals to USACO Silver/Gold Algorithms',
    category: 'STEM & Olympiads',
    gradeLevel: 'High School (Grades 9-10)',
    duration: '12 Weeks',
    hoursPerWeek: '4 hrs / week',
    level: 'Advanced',
    instructor: INSTRUCTORS.prof_elena,
    description: 'Learn computational thinking, data structures, and algorithms through problem-solving drills modeled after Big Tech coding interviews and national olympiads.',
    outcomes: [
      'Mastery of Java, Arrays, Recursion & Object Oriented Design',
      'USACO Silver & Gold division contest readiness',
      'Portfolio project published to GitHub with mentor review',
      'Score 5 guaranteed on AP Computer Science A'
    ],
    highlights: [
      'Ex-Google Lead Educator',
      'Automated code judge testing system',
      'Personalized pull-request code reviews',
      'Algorithmic time complexity drills'
    ],
    batchRatio: '1 : 8 Micro Group',
    avgScoreIncrease: '+82% USACO Rank Lift',
    syllabus: [
      {
        title: 'Module 1: Object-Oriented Java & Data Structures',
        weeks: 'Weeks 1-4',
        topics: ['Classes, Objects & Inheritance', 'ArrayLists & Multi-Dimensional Grids', 'Recursion Mastery']
      },
      {
        title: 'Module 2: Algorithmic Efficiency & USACO Strategies',
        weeks: 'Weeks 5-8',
        topics: ['Binary Search & Prefix Sums', 'Graph Traversal BFS/DFS', 'Greedy Algorithms']
      },
      {
        title: 'Module 3: Live Contest Prep & AP Practice Drills',
        weeks: 'Weeks 9-12',
        topics: ['Mock USACO Contest Simulation', 'AP CS Free Response Speed Runs', 'Portfolio Review']
      }
    ],
    priceMonthly: 460,
    nextBatchDate: 'Starts Oct 25',
    popular: true,
    seatsLeft: 5,
    featuredImage: 'https://images.pexels.com/photos/8199558/pexels-photo-8199558.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 'ap-ib-diploma-mastery',
    title: 'AP & IB Higher Level Exam Mastery Program',
    subtitle: 'Customized subject coaching across IB Math AA HL, AP Micro/Macro, and IB Lit',
    category: 'AP & IB Diploma',
    gradeLevel: 'Senior Prep (Grades 11-12)',
    duration: '14 Weeks',
    hoursPerWeek: '3.5 hrs / week',
    level: 'Elite Mastery',
    instructor: INSTRUCTORS.prof_marcus,
    description: 'Tailored for rigorous IB Diploma candidates and students attempting 4+ AP exams. Structured with subject-specific specialist review sessions.',
    outcomes: [
      'IB Predicted Grades of 7/7 across selected HL subjects',
      'Comprehensive Extended Essay (EE) and Internal Assessment (IA) guidance',
      'AP exam 5 score strategies with past 15 years paper breakdowns',
      'Scholarship application boost'
    ],
    highlights: [
      'Past IB Chief Examiners on faculty',
      'Unlimited draft reviews for IAs',
      'Mock IB/AP oral and paper exam series',
      'Ivy League mentor check-ins'
    ],
    batchRatio: '1 : 5 Micro Group',
    avgScoreIncrease: 'Avg IB 42+ Points',
    syllabus: [
      {
        title: 'Module 1: Core Content Deep Dive & IA Structuring',
        weeks: 'Weeks 1-5',
        topics: ['HL Calculus & Rigorous Proofs', 'Extended Essay Methodology', 'AP Micro/Macro Analytics']
      },
      {
        title: 'Module 2: Paper 1, 2 & 3 Past Paper Mastery',
        weeks: 'Weeks 6-10',
        topics: ['Mark Scheme Decoding', 'Timed Writing Speed Drills', 'Formula Sheet Shortcutting']
      },
      {
        title: 'Module 3: Predicted Grade Final Optimization',
        weeks: 'Weeks 11-14',
        topics: ['Final Mock Exams', 'One-on-One Faculty Score Audits', 'College Admissions Review']
      }
    ],
    priceMonthly: 510,
    nextBatchDate: 'Starts Nov 05',
    popular: false,
    seatsLeft: 3,
    featuredImage: 'https://images.pexels.com/photos/16420352/pexels-photo-16420352.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 'foundational-honors-stem',
    title: 'Young Innovators: Foundational Algebra & Science Honors',
    subtitle: 'Nurturing mathematical curiosity, logical reasoning, and critical problem solving',
    category: 'Foundational Honors',
    gradeLevel: 'Middle School (Grades 6-8)',
    duration: '10 Weeks',
    hoursPerWeek: '3 hrs / week',
    level: 'Foundational',
    instructor: INSTRUCTORS.dr_chen,
    description: 'Inspires early high achievement. Students master Middle School AMC 8, Math Olympiad, and advanced physical sciences through interactive problem solving.',
    outcomes: [
      'Prepares students for High School Honors & AP tracks 2 years early',
      'AMC 8 competition readiness with problem-solving confidence',
      'Solid intuition for equations, functions, geometry, and force',
      'Fun collaborative STEM projects'
    ],
    highlights: [
      'Interactive visual puzzles',
      'Confidence building rewards',
      'Bi-weekly progress updates for parents',
      'Fun science lab experiments'
    ],
    batchRatio: '1 : 8 Micro Group',
    avgScoreIncrease: '+3.2 Grade Level Jump',
    syllabus: [
      {
        title: 'Module 1: Foundations of Algebraic Logic & Numbers',
        weeks: 'Weeks 1-3',
        topics: ['Linear Systems', 'Exponents & Roots', 'AMC 8 Logic Puzzles']
      },
      {
        title: 'Module 2: Visual Geometry & Newton Laws in Action',
        weeks: 'Weeks 4-7',
        topics: ['Triangles & Circles Proofs', 'Force, Energy & Light', 'Hands-on Experiments']
      },
      {
        title: 'Module 3: STEM Capstone & AMC 8 Simulation',
        weeks: 'Weeks 8-10',
        topics: ['Team Problem Solving', 'Junior Olympiad Drills', 'Parent Achievement Presentation']
      }
    ],
    priceMonthly: 380,
    nextBatchDate: 'Starts Nov 01',
    popular: false,
    seatsLeft: 6,
    featuredImage: 'https://images.pexels.com/photos/35745592/pexels-photo-35745592.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  }
];
