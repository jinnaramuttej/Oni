import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClinicOverview from './components/ClinicOverview';
import Specialties from './components/Specialties';
import Doctors from './components/Doctors';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Appointment from './components/Appointment';
import Insurance from './components/Insurance';
import FAQ from './components/FAQ';
import Articles from './components/Articles';
import LocationHours from './components/LocationHours';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ClinicOverview />
        <Specialties />
        <Doctors />
        <Services />
        <Testimonials />
        <Appointment />
        <Insurance />
        <Articles />
        <LocationHours />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
