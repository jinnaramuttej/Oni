import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import SignatureCakes from './components/SignatureCakes';
import PastriesSection from './components/PastriesSection';
import ArtisanBreads from './components/ArtisanBreads';
import DessertsSection from './components/DessertsSection';
import SeasonalSpecials from './components/SeasonalSpecials';
import CustomCakes from './components/CustomCakes';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import OrderSection from './components/OrderSection';
import DeliveryInfo from './components/DeliveryInfo';
import VisitUs from './components/VisitUs';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <main>
        <Hero />
        <BrandStory />
        <SignatureCakes />
        <PastriesSection />
        <ArtisanBreads />
        <DessertsSection />
        <SeasonalSpecials />
        <CustomCakes />
        <Testimonials />
        <Gallery />
        <OrderSection />
        <DeliveryInfo />
        <VisitUs />
      </main>
      <Footer />
    </div>
  );
}
