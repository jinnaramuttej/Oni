import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import Services from './components/Services';
import Expertise from './components/Expertise';
import Process from './components/Process';
import Industries from './components/Industries';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Insights from './components/Insights';
import Consultation from './components/Consultation';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Expertise />
        <Process />
        <Industries />
        <Team />
        <Testimonials />
        <Insights />
        <Consultation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
