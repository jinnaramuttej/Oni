import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedProperties from './components/FeaturedProperties';
import AdvancedSearch from './components/AdvancedSearch';
import PropertyCategories from './components/PropertyCategories';
import Neighborhoods from './components/Neighborhoods';
import LifestyleGallery from './components/LifestyleGallery';
import LifestyleBanner from './components/LifestyleBanner';
import AgentProfiles from './components/AgentProfiles';
import RecentlySold from './components/RecentlySold';
import Testimonials from './components/Testimonials';
import MarketInsights from './components/MarketInsights';
import BuyingGuide from './components/BuyingGuide';
import ConsultationBooking from './components/ConsultationBooking';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <main>
        <Hero />
        <FeaturedProperties />
        <AdvancedSearch />
        <PropertyCategories />
        <Neighborhoods />
        <LifestyleGallery />
        <LifestyleBanner />
        <AgentProfiles />
        <RecentlySold />
        <Testimonials />
        <MarketInsights />
        <BuyingGuide />
        <ConsultationBooking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
