import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import Attorneys from './components/Attorneys';
import CaseResults from './components/CaseResults';
import Industries from './components/Industries';
import Testimonials from './components/Testimonials';
import Awards from './components/Awards';
import Insights from './components/Insights';
import Consultation from './components/Consultation';
import FAQ from './components/FAQ';
import Locations from './components/Locations';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Attorneys />
        <CaseResults />
        <Industries />
        <Testimonials />
        <Awards />
        <Insights />
        <Consultation />
        <FAQ />
        <Locations />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
