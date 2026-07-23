import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import Courses from './components/Courses';
import Subjects from './components/Subjects';
import Methodology from './components/Methodology';
import Educators from './components/Educators';
import Testimonials from './components/Testimonials';
import Stats from './components/Stats';
import Batches from './components/Batches';
import FAQ from './components/FAQ';
import Enrollment from './components/Enrollment';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <a
        href="#courses"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-blue-royal focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Navigation />
      <main>
        <Hero />
        <TrustBadges />
        <Courses />
        <Subjects />
        <Methodology />
        <Educators />
        <Testimonials />
        <Stats />
        <Batches />
        <FAQ />
        <Enrollment />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
