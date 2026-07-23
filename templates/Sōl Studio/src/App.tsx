import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Stats from './components/Stats';
import QuoteDivider from './components/QuoteDivider';
import Classes from './components/Classes';
import Breathwork from './components/Breathwork';
import Instructors from './components/Instructors';
import Retreats from './components/Retreats';
import Schedule from './components/Schedule';
import Membership from './components/Membership';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <Hero />
      <Philosophy />
      <Stats />
      <QuoteDivider
        quote="The body benefits from movement, and the mind benefits from stillness."
        attribution="Sakyong Mipham"
      />
      <Classes />
      <Breathwork />
      <QuoteDivider
        quote="In the midst of movement and chaos, keep stillness inside of you."
        attribution="Deepak Chopra"
        bgClass="bg-charcoal"
      />
      <Instructors />
      <Retreats />
      <Schedule />
      <Membership />
      <Testimonials />
      <Gallery />
      <FAQ />
      <Booking />
      <Contact />
      <Footer />
    </div>
  );
}
