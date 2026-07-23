import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white">
      <Navbar />
      <Hero />
      
      <section className="px-8 py-24">
        <h2 className="text-6xl font-black mb-16">Selected Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard title="Echoes of Light" category="Branding" image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" />
          <ProjectCard title="Digital Soul" category="UI/UX" image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" />
        </div>
      </section>
      <Services />
      <Footer />
    </main>
  );
}

export default App;
