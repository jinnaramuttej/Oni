import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Barbers from "./components/Barbers";
import Services from "./components/Services";
import Ritual from "./components/Ritual";
import Plans from "./components/Plans";
import Showcase from "./components/Showcase";
import Convert from "./components/Convert";
import { Footer, Visit } from "./components/Footer";
import { Divider } from "./components/ui";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink font-sans text-bone">
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Divider />
        <Barbers />
        <Services />
        <Ritual />
        <Plans />
        <Showcase />
        <Convert />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
