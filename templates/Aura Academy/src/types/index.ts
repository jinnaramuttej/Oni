export type GradeLevel = 'Middle School (Grades 6-8)' | 'High School (Grades 9-10)' | 'Senior Prep (Grades 11-12)' | 'College Prep / Gap Year';

export type Category = 'STEM & Olympiads' | 'SAT / ACT Test Prep' | 'AP & IB Diploma' | 'University & Medical Prep' | 'Foundational Honors';

export interface Instructor {
  id: string;
  name: string;
  title: string;
  almaMater: string;
  experienceYears: number;
  avatar: string;
  bio: string;
  specialties: string[];
  rating: number;
  studentsTaught: number;
}

export interface SyllabusModule {
  title: string;
  weeks: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  gradeLevel: GradeLevel;
  duration: string;
  hoursPerWeek: string;
  level: 'Foundational' | 'Advanced' | 'Elite Mastery';
  instructor: Instructor;
  description: string;
  outcomes: string[];
  highlights: string[];
  batchRatio: string;
  avgScoreIncrease: string;
  syllabus: SyllabusModule[];
  priceMonthly: number;
  nextBatchDate: string;
  popular?: boolean;
  seatsLeft: number;
  featuredImage: string;
}

export interface SuccessStory {
  id: string;
  studentName: string;
  avatar: string;
  school: string;
  targetUniversity: string;
  admittedUniversity: string;
  scoreImprovement: {
    exam: string;
    before: string;
    after: string;
  };
  quote: string;
  parentQuote?: string;
  category: string;
  videoThumbUrl?: string;
  badge: string;
}

export interface Batch {
  id: string;
  courseTitle: string;
  gradeLevel: string;
  mode: 'In-Person Campus' | 'Live Interactive Online' | 'Hybrid Flex';
  days: string;
  timing: string;
  startDate: string;
  instructorName: string;
  totalSeats: number;
  seatsOccupied: number;
  location: string;
}

export interface FAQItem {
  id: string;
  category: 'Admissions' | 'Pedagogy' | 'Results & Guarantees' | 'Parents & Portal';
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
