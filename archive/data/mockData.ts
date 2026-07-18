import { SuccessStory, Batch, FAQItem, QuizQuestion } from '../types';

export const TRUST_METRICS = [
  { label: 'Ivy League / Top-20 Acceptance Rate', value: '98.6%', suffix: '', subtext: 'Class of 2024–2025' },
  { label: 'Average SAT Score Boost', value: '+240', suffix: ' pts', subtext: 'In 12-week program' },
  { label: 'Students Mentored Nationally', value: '14,200', suffix: '+', subtext: 'Across 32 states' },
  { label: 'Scholarships Secured for Alumni', value: '$14.8M', suffix: '+', subtext: 'Merit & academic grants' },
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    studentName: 'Julian Thorne',
    avatar: 'https://images.pexels.com/photos/19056728/pexels-photo-19056728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    school: 'St. Andrews High School',
    targetUniversity: 'MIT - Computer Science',
    admittedUniversity: 'MIT (Class of 2029)',
    scoreImprovement: {
      exam: 'Digital SAT',
      before: '1310',
      after: '1580 (+270 Pts)'
    },
    quote: 'Aura Academy changed my entire trajectory. Dr. Chen taught me not just how to pass AP Physics C and USACO, but how to think like a researcher. The 1-on-1 mentor calls kept me focused when stress was high.',
    parentQuote: 'As parents, watching Julian gain such deep confidence in his analytical abilities was priceless. The weekly progress updates gave us complete clarity.',
    category: 'Ivy Acceptance',
    badge: 'MIT Class of 2029'
  },
  {
    id: 'story-2',
    studentName: 'Maya Patel',
    avatar: 'https://images.pexels.com/photos/34761515/pexels-photo-34761515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    school: 'Oakridge International',
    targetUniversity: 'Stanford University',
    admittedUniversity: 'Stanford Bioengineering',
    scoreImprovement: {
      exam: 'AP Biology & Chem',
      before: '3 / 3',
      after: '5 / 5 Perfect'
    },
    quote: 'The faculty here treated me like a future scientist from day one. The adaptive question bank identified my exact weak spots in molecular genetics within 20 minutes.',
    parentQuote: 'The small batch size made all the difference. Maya received individualized guidance on her internal assessments that made her application shine.',
    category: 'AP 5s',
    badge: 'Stanford Admit'
  },
  {
    id: 'story-3',
    studentName: 'David K. Lawson',
    avatar: 'https://images.pexels.com/photos/17050931/pexels-photo-17050931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    school: 'Westfield Academy',
    targetUniversity: 'Columbia University',
    admittedUniversity: 'Columbia - Economics',
    scoreImprovement: {
      exam: 'ACT Score',
      before: '27',
      after: '35 (+8 Points)'
    },
    quote: 'Marcus Vance’s testing strategy is pure science. I went from feeling overwhelmed by timing to finishing the math and reading sections with 8 minutes to spare.',
    parentQuote: 'Worth every dollar invested. David went from doubting his Ivy eligibility to receiving early decision admission at Columbia with a merit scholarship!',
    category: 'SAT/ACT Boost',
    badge: 'Columbia Scholar'
  },
  {
    id: 'story-4',
    studentName: 'Sophia Lin',
    avatar: 'https://images.pexels.com/photos/8837498/pexels-photo-8837498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    school: 'Cambridge Prep',
    targetUniversity: 'Oxford University - Mathematics',
    admittedUniversity: 'Oxford University',
    scoreImprovement: {
      exam: 'IB Diploma',
      before: '34 Predicted',
      after: '44 / 45 Final'
    },
    quote: 'Preparing for Oxford MAT required deep proof writing skills that school alone didn’t cover. My mentor at Aura broke down every step until I was solving Olympiad problems with ease.',
    category: 'Olympiad Gold',
    badge: 'Oxford Admit'
  }
];

export const UPCOMING_BATCHES: Batch[] = [
  {
    id: 'b-1',
    courseTitle: 'Digital SAT 1600 Premier Accelerator',
    gradeLevel: 'Grades 11-12',
    mode: 'Hybrid Flex',
    days: 'Mon / Wed / Sat',
    timing: '5:30 PM - 7:30 PM EST',
    startDate: 'October 23, 2025',
    instructorName: 'Marcus Vance, M.Ed.',
    totalSeats: 8,
    seatsOccupied: 6,
    location: 'Boston Downtown Campus & Live Online'
  },
  {
    id: 'b-2',
    courseTitle: 'AP Physics C & Multivariable Calculus Honors',
    gradeLevel: 'Grades 11-12',
    mode: 'In-Person Campus',
    days: 'Tue / Thu / Sun',
    timing: '4:00 PM - 6:30 PM EST',
    startDate: 'October 28, 2025',
    instructorName: 'Dr. Evelyn Chen',
    totalSeats: 8,
    seatsOccupied: 4,
    location: 'Cambridge Innovation Lab'
  },
  {
    id: 'b-3',
    courseTitle: 'Pre-Med Foundation: AP Biology & Chemistry HL',
    gradeLevel: 'Grades 9-10',
    mode: 'Live Interactive Online',
    days: 'Wed / Fri / Sun',
    timing: '6:00 PM - 8:00 PM EST',
    startDate: 'November 02, 2025',
    instructorName: 'Dr. Rajesh Sharma',
    totalSeats: 6,
    seatsOccupied: 4,
    location: 'Global Virtual Studio'
  },
  {
    id: 'b-4',
    courseTitle: 'USACO Competitive Coding & AP Computer Science',
    gradeLevel: 'Grades 9-11',
    mode: 'Live Interactive Online',
    days: 'Tue / Sat',
    timing: '6:00 PM - 8:00 PM EST',
    startDate: 'October 25, 2025',
    instructorName: 'Elena Rostova, M.S.',
    totalSeats: 8,
    seatsOccupied: 3,
    location: 'Tech Learning Portal'
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: '360° Diagnostic & Cognitive Blueprint',
    description: 'We map your student’s precise conceptual gaps, cognitive speed, and test anxiety triggers using proprietary AI diagnostic tools.',
    tag: 'Precision Assessment'
  },
  {
    step: '02',
    title: 'Custom Ivy-Grade Learning Pathway',
    description: 'A bespoke curriculum matched to target goals, whether it’s a 1550+ SAT, AP 5s, or top university research portfolio creation.',
    tag: 'Personalized Strategy'
  },
  {
    step: '03',
    title: 'Small-Batch Masterclasses (Max 1:8 Ratio)',
    description: 'High-engagement collaborative learning led by PhDs, former admissions officers, and Olympiad gold medalists in high-tech classrooms.',
    tag: 'Master Mentorship'
  },
  {
    step: '04',
    title: 'Weekly 1-on-1 Deep Diagnostics & Office Hours',
    description: 'Dedicated 1-on-1 time to dismantle tricky problem sets, refine exam pacing, and build unbreakable academic confidence.',
    tag: 'Direct Mentorship'
  },
  {
    step: '05',
    title: 'Real-Time Parent Transparency Dashboard',
    description: 'Parents receive instant weekly progress digests, mastery velocity charts, score trajectory graphs, and tutor notes.',
    tag: 'Parent Reassurance'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Admissions',
    question: 'How do you determine if my child is suitable for the Premier Program?',
    answer: 'We begin with a complimentary, non-binding 45-minute Diagnostic Diagnostic & Academic Orientation. This evaluates conceptual depth, problem-solving speed, and target university aspirations. We then recommend the exact batch or 1-on-1 track that guarantees optimum growth.'
  },
  {
    id: 'faq-2',
    category: 'Pedagogy',
    question: 'Why are your batch sizes strictly capped at 6 to 8 students?',
    answer: 'Traditional coaching institutes stuff 30-50 students into a room where individual gaps go unnoticed. Our 1:6 and 1:8 micro-batches allow instructors to call on every student, monitor real-time problem solving, and adapt pacing dynamically during every session.'
  },
  {
    id: 'faq-3',
    category: 'Results & Guarantees',
    question: 'Do you offer score growth guarantees?',
    answer: 'Yes! For our SAT Premier Accelerator, we guarantee a minimum 150+ point score increase (or reaching 1500+), provided the student completes assigned diagnostic drills and attendance. If target threshold is not met, we offer free extended 1-on-1 coaching until score goal is achieved.'
  },
  {
    id: 'faq-4',
    category: 'Parents & Portal',
    question: 'How are parents kept informed of student progress?',
    answer: 'Parents receive access to our dedicated Parent Portal app. You get weekly automated performance digests, tutor session feedback, attendance confirmation, and upcoming test readiness scores.'
  },
  {
    id: 'faq-5',
    category: 'Pedagogy',
    question: 'Can students choose between Online, In-Person, and Hybrid formats?',
    answer: 'Absolutely. All physical classrooms are equipped with high-definition multi-camera streaming systems. Students enrolled in Hybrid mode can seamlessly switch between physical campus attendance and live virtual interactive sessions.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    subject: 'Math & Analytical Aptitude',
    question: 'If f(x) = 3x² - 2x + 5, what is the value of f\'(3) - the instantaneous rate of change at x = 3?',
    options: ['A) 16', 'B) 18', 'C) 20', 'D) 12'],
    correctIndex: 0,
    explanation: 'The derivative f\'(x) = 6x - 2. Substituting x = 3 gives f\'(3) = 6(3) - 2 = 18 - 2 = 16.'
  },
  {
    id: 2,
    subject: 'SAT / Standardized Logic',
    question: 'In digital SAT Reading, a passage states that catalyst X lowers activation energy by binding to substrate Y. Which logically follows?',
    options: [
      'A) Reaction rate increases without temperature elevation',
      'B) The reaction becomes endothermic',
      'C) Catalyst X is consumed permanently in the reaction',
      'D) Substrate Y increases in activation energy'
    ],
    correctIndex: 0,
    explanation: 'Lowering activation energy allows a chemical reaction to proceed faster at a given temperature without needing thermal input.'
  },
  {
    id: 3,
    subject: 'Stem Reasoning & Physics',
    question: 'An object undergoes uniform circular motion with constant speed v and radius r. What happens to centripetal acceleration if velocity doubles?',
    options: ['A) Doubles', 'B) Quadruples', 'C) Remains unchanged', 'D) Halves'],
    correctIndex: 1,
    explanation: 'Centripetal acceleration is a = v² / r. If v becomes 2v, a becomes (2v)² / r = 4 (v² / r), so it quadruples.'
  }
];
