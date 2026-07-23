import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustMetricsBar } from './components/TrustMetricsBar';
import { CourseExplorer } from './components/CourseExplorer';
import { CourseDetailModal } from './components/CourseDetailModal';
import { LearningMethodology } from './components/LearningMethodology';
import { EducatorsSection } from './components/EducatorsSection';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { BatchFinderSection } from './components/BatchFinderSection';
import { AcademicAssessmentWidget } from './components/AcademicAssessmentWidget';
import { TuitionCalculator } from './components/TuitionCalculator';
import { FAQSection } from './components/FAQSection';
import { CampusShowcase } from './components/CampusShowcase';
import { EnrollmentModal } from './components/EnrollmentModal';
import { ParentPortalModal } from './components/ParentPortalModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { Course } from './types';

export function App() {
  const [selectedCourseModal, setSelectedCourseModal] = useState<Course | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState<boolean>(false);
  const [preselectedCourseId, setPreselectedCourseId] = useState<string | undefined>(undefined);
  const [preselectedInstructor, setPreselectedInstructor] = useState<string | undefined>(undefined);
  
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isParentPortalOpen, setIsParentPortalOpen] = useState<boolean>(false);

  const handleOpenEnroll = (courseId?: string) => {
    setPreselectedCourseId(courseId);
    setPreselectedInstructor(undefined);
    setIsEnrollModalOpen(true);
  };

  const handleBookInstructor = (instructorName: string) => {
    setPreselectedInstructor(instructorName);
    setPreselectedCourseId(undefined);
    setIsEnrollModalOpen(true);
  };

  const handleClaimScholarship = (_score: number) => {
    setIsEnrollModalOpen(true);
  };

  const handleExploreCoursesScroll = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTakeQuizScroll = () => {
    const el = document.getElementById('quiz');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Sticky Header */}
      <Navbar
        onOpenEnroll={() => handleOpenEnroll()}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenParentPortal={() => setIsParentPortalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSection
          onOpenEnroll={() => handleOpenEnroll()}
          onExploreCourses={handleExploreCoursesScroll}
          onTakeQuiz={handleTakeQuizScroll}
        />

        <TrustMetricsBar />

        <CourseExplorer
          onSelectCourse={(course) => setSelectedCourseModal(course)}
          onEnrollCourse={(courseId) => handleOpenEnroll(courseId)}
        />

        <LearningMethodology />

        <EducatorsSection
          onBookInstructor={handleBookInstructor}
        />

        <SuccessStoriesSection />

        <BatchFinderSection
          onReserveSeat={(batchTitle) => handleOpenEnroll(batchTitle)}
        />

        <AcademicAssessmentWidget
          onClaimScholarship={handleClaimScholarship}
        />

        <TuitionCalculator
          onOpenEnroll={() => handleOpenEnroll()}
        />

        <CampusShowcase />

        <FAQSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onOpenEnroll={() => handleOpenEnroll()}
        onOpenParentPortal={() => setIsParentPortalOpen(true)}
      />

      {/* Interactive Modals */}
      <CourseDetailModal
        course={selectedCourseModal}
        onClose={() => setSelectedCourseModal(null)}
        onEnroll={(courseId) => handleOpenEnroll(courseId)}
      />

      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        preselectedCourseId={preselectedCourseId}
        preselectedInstructorName={preselectedInstructor}
      />

      <ParentPortalModal
        isOpen={isParentPortalOpen}
        onClose={() => setIsParentPortalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectCourse={(course) => setSelectedCourseModal(course)}
      />
    </div>
  );
}

export default App;
