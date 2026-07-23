import React, { useState, useEffect } from 'react';

// Types
interface Treatment {
  id: number;
  category: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  benefits: string[];
  image: string;
}

interface Product {
  id: number;
  name: string;
  size: string;
  price: number;
  description: string;
  image: string;
}

interface Therapist {
  id: number;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
  experience: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  treatment: string;
}

interface CartItem {
  type: 'treatment' | 'product';
  id: number;
  name: string;
  price: number;
  quantity: number;
  details?: string;
}

// Luxury Color Palette (used via Tailwind + CSS vars)

// Curated Luxury Treatments
const treatments: Treatment[] = [
  {
    id: 1,
    category: "Signature",
    name: "The LUNÉA Ritual",
    duration: "150 min",
    price: 385,
    description: "Our signature full-body journey combining warm stone massage, botanical body polish, and restorative scalp therapy. A complete restoration of body and spirit.",
    benefits: ["Deep tissue release", "Lymphatic drainage", "Nervous system reset"],
    image: "https://images.pexels.com/photos/7598366/pexels-photo-7598366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 2,
    category: "Signature",
    name: "Golden Hour Renewal",
    duration: "120 min",
    price: 320,
    description: "An immersive experience featuring 24k gold leaf facial and warm honey body wrap. Inspired by the quiet luxury of golden hour in nature.",
    benefits: ["Skin luminosity", "Anti-inflammatory", "Cellular renewal"],
    image: "https://images.pexels.com/photos/21316247/pexels-photo-21316247.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 3,
    category: "Massage",
    name: "Deep Stone & Somatic",
    duration: "90 min",
    price: 245,
    description: "Heated basalt stones paired with slow, intuitive deep tissue work. Designed to release chronic holding patterns and restore profound stillness.",
    benefits: ["Muscle tension relief", "Joint mobility", "Grounding"],
    image: "https://images.pexels.com/photos/9146378/pexels-photo-9146378.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 4,
    category: "Massage",
    name: "Linen & Breathwork",
    duration: "75 min",
    price: 195,
    description: "A meditative massage performed with warm linen compresses infused with wild lavender and sacred frankincense. Breath-guided throughout.",
    benefits: ["Stress reduction", "Sleep support", "Emotional balance"],
    image: "https://images.pexels.com/photos/3757657/pexels-photo-3757657.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 5,
    category: "Facial",
    name: "Botanical Bio-Lift Facial",
    duration: "80 min",
    price: 225,
    description: "A results-driven facial using organic botanicals, micro-current, and lymphatic drainage to visibly lift and restore radiance.",
    benefits: ["Firmness", "Brightening", "Hydration"],
    image: "https://images.pexels.com/photos/19242408/pexels-photo-19242408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 6,
    category: "Facial",
    name: "The Crystalline Facial",
    duration: "65 min",
    price: 175,
    description: "Gentle but transformative. Infused with rare botanical extracts and quartz crystal massage for a luminous, calm complexion.",
    benefits: ["Calming", "Anti-redness", "Barrier repair"],
    image: "https://images.pexels.com/photos/21316247/pexels-photo-21316247.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 7,
    category: "Body",
    name: "Mineral Salt & Clay Wrap",
    duration: "70 min",
    price: 185,
    description: "A deeply detoxifying wrap using Himalayan salts and French marine clay. Followed by a warm oil massage and steam.",
    benefits: ["Detoxification", "Skin softening", "Circulation"],
    image: "https://images.pexels.com/photos/33074595/pexels-photo-33074595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 8,
    category: "Body",
    name: "Warm Sand & Oil Ritual",
    duration: "95 min",
    price: 265,
    description: "An ancient-inspired body treatment using heated sand poultices and hand-pressed olive and neroli oils to melt tension.",
    benefits: ["Deep warmth", "Muscle release", "Skin nourishment"],
    image: "https://images.pexels.com/photos/7598366/pexels-photo-7598366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 9,
    category: "Aromatherapy",
    name: "Sacred Scent Ceremony",
    duration: "60 min",
    price: 165,
    description: "A personalized olfactory journey. Custom-blended essential oils are incorporated into an aromatic massage and steam inhalation.",
    benefits: ["Mental clarity", "Emotional release", "Respiratory ease"],
    image: "https://images.pexels.com/photos/6707564/pexels-photo-6707564.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 10,
    category: "Ritual",
    name: "The Water Temple",
    duration: "110 min",
    price: 295,
    description: "Private hydrotherapy experience: mineral soaks, cascading water massage, and a full body aromatic massage in our marble sanctuary.",
    benefits: ["Circulatory boost", "Joint relief", "Deep relaxation"],
    image: "https://images.pexels.com/photos/20200269/pexels-photo-20200269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
];

// Spa Packages
const packages = [
  {
    id: 101,
    name: "The Retreat Day",
    duration: "6 hours",
    price: 645,
    description: "Full-day sanctuary experience: signature ritual, private hydrotherapy, lunch, and access to our thermal lounges.",
    includes: ["LUNÉA Ritual", "Water Temple", "Private lunch", "Lounge access"],
  },
  {
    id: 102,
    name: "The Couple's Escape",
    duration: "3.5 hours",
    price: 580,
    description: "An intimate shared journey. Two simultaneous signature treatments followed by a private mineral soak and champagne.",
    includes: ["2 Signature Rituals", "Private soak", "Private terrace", "Light refreshments"],
  },
  {
    id: 103,
    name: "The Reawakening",
    duration: "4 hours",
    price: 495,
    description: "A focused reset for mind and body: Bio-Lift Facial, Deep Stone massage, and guided breathwork in our meditation chamber.",
    includes: ["Bio-Lift Facial", "Deep Stone Massage", "Breathwork", "Tea ceremony"],
  },
];

// Premium Skincare Products
const products: Product[] = [
  {
    id: 201,
    name: "Wild Rose Facial Oil",
    size: "30 ml",
    price: 98,
    description: "Cold-pressed rosehip, pomegranate, and frankincense. A daily ritual for luminous, resilient skin.",
    image: "https://images.pexels.com/photos/7615819/pexels-photo-7615819.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 202,
    name: "Sacred Cedar Bath Oil",
    size: "100 ml",
    price: 76,
    description: "Grounding blend of Atlas cedar, cypress, and sandalwood. Perfect for an at-home sanctuary bath.",
    image: "https://images.pexels.com/photos/19572632/pexels-photo-19572632.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
  {
    id: 203,
    name: "Linen Mist & Pillow Spray",
    size: "100 ml",
    price: 58,
    description: "Delicate lavender, vetiver, and neroli. Creates a restful atmosphere at home.",
    image: "https://images.pexels.com/photos/6707564/pexels-photo-6707564.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1200",
  },
];

// Therapists
const therapists: Therapist[] = [
  {
    id: 1,
    name: "Elena Voss",
    title: "Lead Somatic Therapist",
    bio: "Twenty-two years guiding clients into deep states of release. Trained in Esalen, biodynamic craniosacral, and Japanese anma.",
    specialties: ["Deep Tissue", "Craniosacral", "Trauma-informed"],
    image: "https://images.pexels.com/photos/5659003/pexels-photo-5659003.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=960&w=960",
    experience: "22 years",
  },
  {
    id: 2,
    name: "Amara Sato",
    title: "Facial & Skin Alchemist",
    bio: "Former botanical perfumer and clinical aesthetician. Her facials are slow, intuitive, and profoundly transformative.",
    specialties: ["Botanical Skincare", "Lymphatic", "Microcurrent"],
    image: "https://images.pexels.com/photos/6628654/pexels-photo-6628654.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=960&w=960",
    experience: "15 years",
  },
  {
    id: 3,
    name: "Julian Moreau",
    title: "Hydrotherapy & Ritual Guide",
    bio: "A steward of water rituals. Julian studied mineral therapy in the Alps and creates deeply personal journeys in our Water Temple.",
    specialties: ["Hydrotherapy", "Aromatherapy", "Sound healing"],
    image: "https://images.pexels.com/photos/8312892/pexels-photo-8312892.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=960&w=960",
    experience: "18 years",
  },
  {
    id: 4,
    name: "Sofia Laurent",
    title: "Body & Breathwork Practitioner",
    bio: "Combines classical massage with somatic breathwork and ancient movement traditions for complete nervous system restoration.",
    specialties: ["Breathwork", "Warm Oil", "Bodywork"],
    image: "https://images.pexels.com/photos/6628816/pexels-photo-6628816.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=960&w=960",
    experience: "14 years",
  },
];

// Testimonials
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Camille Laurent",
    location: "Paris",
    quote: "LUNÉA is not a spa — it is a temple. The attention to detail, the silence, the warmth… I left lighter than I have felt in years.",
    treatment: "The LUNÉA Ritual",
  },
  {
    id: 2,
    name: "Dr. Marcus Hale",
    location: "New York",
    quote: "I have visited many world-class wellness destinations. LUNÉA surpasses them all in quiet sophistication and genuine care.",
    treatment: "Deep Stone & Somatic + Facial",
  },
  {
    id: 3,
    name: "Isabelle Chen",
    location: "Singapore",
    quote: "The therapists truly listen. My body felt completely recalibrated. I have booked my next stay before leaving the property.",
    treatment: "The Water Temple",
  },
];

// Membership Tiers
const memberships = [
  {
    name: "The Resident",
    price: 290,
    period: "month",
    description: "For those who wish to make LUNÉA a part of their rhythm.",
    benefits: [
      "One 90-minute treatment monthly",
      "20% off all retail and add-ons",
      "Exclusive seasonal rituals",
      "Priority booking access",
    ],
  },
  {
    name: "The Steward",
    price: 680,
    period: "month",
    description: "Our most cherished tier. Unlimited access to the sanctuary.",
    benefits: [
      "Two treatments per month",
      "Full access to thermal suites",
      "Complimentary partner visits",
      "Private lounge & morning tea",
      "Annual bespoke wellness day",
    ],
  },
];

// Navigation links
const navLinks = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Experiences", href: "#experiences" },
  { label: "Therapists", href: "#therapists" },
  { label: "Shop", href: "#shop" },
  { label: "Memberships", href: "#memberships" },
  { label: "Book", href: "#booking" },
];

const App: React.FC = () => {
  // State
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    guests: '1',
    notes: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Scroll handler for nav
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '-30px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Filter treatments
  const filteredTreatments = activeFilter === 'All' 
    ? treatments 
    : treatments.filter(t => t.category === activeFilter);

  const categories = ['All', 'Signature', 'Massage', 'Facial', 'Body', 'Aromatherapy', 'Ritual'];

  // Add to cart
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.findIndex(
        (i) => i.id === item.id && i.type === item.type
      );
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + 1 };
        return updated;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  // Remove from cart
  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Update cart quantity
  const updateCartQuantity = (index: number, qty: number) => {
    if (qty < 1) return;
    setCart((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: qty };
      return updated;
    });
  };

  // Cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Open booking modal
  const openBooking = (treatment?: Treatment, pkg?: any) => {
    if (treatment) {
      setSelectedTreatment(treatment);
      setSelectedPackage(null);
    } else if (pkg) {
      setSelectedPackage(pkg);
      setSelectedTreatment(null);
    } else {
      setSelectedTreatment(null);
      setSelectedPackage(null);
    }
    setBookingForm({ date: '', time: '', guests: '1', notes: '' });
    setBookingSuccess(false);
    setBookingModalOpen(true);
    setMobileMenuOpen(false);
  };

  // Handle booking submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingForm.date || !bookingForm.time) {
      alert("Please select a date and time.");
      return;
    }

    // Add to cart as booked treatment or package
    if (selectedTreatment) {
      addToCart({
        type: 'treatment',
        id: selectedTreatment.id,
        name: selectedTreatment.name,
        price: selectedTreatment.price,
        details: `${selectedTreatment.duration} • ${bookingForm.date} at ${bookingForm.time}`,
        quantity: parseInt(bookingForm.guests),
      });
    } else if (selectedPackage) {
      addToCart({
        type: 'treatment',
        id: selectedPackage.id,
        name: selectedPackage.name,
        price: selectedPackage.price,
        details: `${selectedPackage.duration} • ${bookingForm.date} at ${bookingForm.time}`,
        quantity: 1,
      });
    } else {
      // General booking
      addToCart({
        type: 'treatment',
        id: 999,
        name: "LUNÉA Day Experience",
        price: 420,
        details: `Private booking • ${bookingForm.date} at ${bookingForm.time}`,
        quantity: 1,
      });
    }

    setBookingSuccess(true);
    
    // Auto close after success
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookingSuccess(false);
      setSelectedTreatment(null);
      setSelectedPackage(null);
    }, 1650);
  };

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 84;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Format price
  const formatPrice = (price: number) => `$${price}`;

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#3B3B3B] overflow-x-hidden">
      {/* Premium Sticky Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 nav-transparent ${scrolled ? 'nav-scrolled' : ''}`}
        style={{ backgroundColor: scrolled ? 'rgba(252,251,248,0.94)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-[88px]">
          {/* Logo */}
          <div className="flex items-center gap-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-full border border-[#C9A96E] flex items-center justify-center">
              <span className="text-[#C9A96E] text-xl tracking-[-1.5px] font-medium serif">L</span>
            </div>
            <div>
              <div className="font-medium tracking-[-1.1px] text-2xl serif text-[#3B3B3B]">LUNÉA</div>
              <div className="text-[9px] text-[#A7B09E] -mt-1 tracking-[3px]">EST 2009</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-x-10 text-[15px] tracking-[-0.1px]">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="nav-link text-[#3B3B3B] hover:text-[#3B3B3B] font-light transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-x-2 px-5 py-2 text-sm font-medium border border-[#D8D1C7] rounded-[20px] hover:bg-[#F8F5F1] transition-all active:bg-[#E9E1D6]"
            >
              <span>Reservations</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center bg-[#C9A96E] text-[#FCFBF8] text-[10px] font-medium rounded-full h-5 min-w-[20px] px-1.5 tracking-tighter">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => openBooking()}
              className="btn btn-primary px-7 py-[13px] text-sm font-medium hidden md:block"
            >
              Book Now
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center border border-[#D8D1C7] rounded-full"
              aria-label="Toggle menu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FCFBF8] border-t border-[#D8D1C7] px-8 py-9">
            <div className="flex flex-col gap-y-6 text-lg font-light">
              {navLinks.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="text-left">
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-[#D8D1C7]">
                <button onClick={() => openBooking()} className="btn btn-primary w-full py-3.5 text-base">
                  Book Your Experience
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO — Fullscreen Immersive */}
      <section className="relative h-[100dvh] min-h-[720px] flex items-center justify-center pt-16 bg-[#F8F5F1]">
        <div className="absolute inset-0 bg-[#3B3B3B]/30 z-10" />
        
        {/* Hero Image — High-end spa interior */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7031713/pexels-photo-7031713.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=2000"
            alt="LUNÉA Luxury Spa — serene indoor thermal lounge with warm natural light, heated stone loungers, and peaceful atmosphere"
            className="object-cover w-full h-full"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3B3B3B]/20 via-[#3B3B3B]/25 to-[#F8F5F1]/90" />
        </div>

        <div className="relative z-20 max-w-5xl px-8 text-center">
          <div className="inline-block mb-6 px-5 py-1 border border-[#C9A96E]/60 rounded-full text-xs tracking-[3px] text-[#C9A96E] font-medium">EST. 2009 — SWITZERLAND</div>
          
          <h1 className="serif text-[84px] md:text-[96px] lg:text-[108px] leading-[0.86] tracking-[-5.6px] text-white mb-5 font-medium">
            Time<br />to return<br />to yourself.
          </h1>
          
          <p className="max-w-lg mx-auto text-xl md:text-2xl text-[#F8F5F1] tracking-tight font-light mb-10">
            A sanctuary of quiet luxury where time slows, the body softens, and the spirit is restored.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('#booking')}
              className="btn btn-primary px-10 py-[17px] text-[15px] font-medium tracking-[0.2px] w-full sm:w-auto"
            >
              Book Your Treatment
            </button>
            <button
              onClick={() => scrollTo('#experiences')}
              className="btn btn-secondary px-9 py-[17px] text-[15px] font-medium tracking-[0.2px] w-full sm:w-auto bg-white/80 backdrop-blur text-[#3B3B3B] border-white/70 hover:bg-white hover:border-[#C9A96E]"
            >
              Explore Experiences
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-16 text-[#F8F5F1]/90 text-sm tracking-widest">
            <div className="flex items-center gap-x-2">
              <div className="w-px h-2.5 bg-[#C9A96E]/70" /> CERTIFIED THERAPISTS
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-px h-2.5 bg-[#C9A96E]/70" /> ORGANIC &amp; WILD-HARVESTED
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-px h-2.5 bg-[#C9A96E]/70" /> FIVE-STAR HOSPITALITY
            </div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <button 
          onClick={() => scrollTo('#philosophy')} 
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-y-1.5 text-[#F8F5F1]/70 text-[10px] tracking-[3px] hover:text-[#F8F5F1] transition-colors"
        >
          SCROLL TO BEGIN
          <div className="scroll-indicator">
            <svg width="15" height="22" viewBox="0 0 15 22" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M7.5 2V19M7.5 19L2 13.5M7.5 19L13 13.5" />
            </svg>
          </div>
        </button>
      </section>

      {/* BRAND PHILOSOPHY */}
      <section id="philosophy" className="section max-w-5xl mx-auto px-8">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-16 items-center">
          <div className="md:col-span-5">
            <div className="uppercase tracking-[4px] text-xs mb-5 text-[#C9A96E]">Our Philosophy</div>
            <h2 className="serif text-[52px] leading-[0.92] tracking-[-2.4px] text-balance">
              The art of<br />unhurried<br />restoration.
            </h2>
          </div>
          <div className="md:col-span-7 text-[17px] text-[#3B3B3B] leading-relaxed font-light tracking-tight max-w-3xl">
            <p className="mb-6">
              LUNÉA exists for those who seek more than a treatment. We offer a sanctuary of refined presence — 
              a place where stillness is cultivated with intention, and every detail is designed to return you to yourself.
            </p>
            <p>
              Inspired by the quiet rigor of Japanese minimalism and the warmth of alpine retreat traditions, we believe true luxury is found in the absence of distraction.
            </p>
            <div className="mt-10 flex items-center gap-x-3 text-sm tracking-widest text-[#A7B09E]">
              <div className="h-px w-8 bg-[#D8D1C7]" /> HANDCRAFTED IN THE MOUNTAINS
            </div>
          </div>
        </div>

        {/* Philosophy visual statement */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Stillness", text: "We believe in the power of deep rest and the courage to do less." },
            { title: "Craft", text: "Each ritual is carefully composed by master therapists using the finest natural elements." },
            { title: "Presence", text: "Time here is generous. You are held with grace and complete attention." },
          ].map((item, i) => (
            <div key={i} className="px-9 py-9 border border-[#D8D1C7] rounded-[22px] bg-white">
              <div className="text-[#C9A96E] font-medium tracking-[1.5px] text-xs mb-4">{(i + 1).toString().padStart(2, '0')}</div>
              <div className="serif text-3xl tracking-tight mb-4">{item.title}</div>
              <p className="text-[#3B3B3B] font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* SIGNATURE EXPERIENCES — Treatments Grid */}
      <section id="experiences" className="section max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-y-4">
          <div>
            <div className="uppercase text-xs tracking-[4px] text-[#C9A96E] mb-3">THE COLLECTION</div>
            <h2 className="serif text-6xl md:text-7xl tracking-[-3.4px]">Signature Experiences</h2>
          </div>
          <p className="max-w-[33ch] text-lg text-[#3B3B3B]/90 font-light">
            Each treatment is a meditation in motion. Thoughtfully composed to restore balance.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-x-2 gap-y-2 mb-10 border-b pb-5 border-[#D8D1C7]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 text-sm tracking-wide rounded-full transition-all ${activeFilter === cat 
                ? 'bg-[#3B3B3B] text-[#FCFBF8]' 
                : 'bg-white hover:bg-[#F8F5F1] border border-[#D8D1C7] text-[#3B3B3B]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <div key={treatment.id} className="lux-card group bg-white border border-[#E9E1D6] overflow-hidden flex flex-col">
              <div className="relative overflow-hidden aspect-[16/10] bg-[#F8F5F1]">
                <img 
                  src={treatment.image} 
                  alt={treatment.name} 
                  className="img-zoom absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-5 right-5 px-5 py-1 bg-white/95 rounded-full text-sm font-medium tracking-tight">
                  {treatment.duration}
                </div>
              </div>
              
              <div className="flex-1 px-8 pt-8 pb-9 flex flex-col">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <div className="uppercase tracking-[2.5px] text-[#C9A96E] text-xs">{treatment.category}</div>
                    <h3 className="serif text-[27px] leading-none tracking-[-1.3px] mt-1.5 pr-2">{treatment.name}</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-medium tabular-nums tracking-tight">{formatPrice(treatment.price)}</div>
                  </div>
                </div>

                <p className="text-[15px] text-[#3B3B3B] font-light leading-relaxed mt-1 mb-auto pr-1">
                  {treatment.description}
                </p>

                <div className="pt-6 flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#A7B09E]">
                  {treatment.benefits.map((b, idx) => (
                    <span key={idx} className="px-4 py-1 bg-[#F8F5F1] rounded-full">{b}</span>
                  ))}
                </div>

                <div className="pt-7 mt-auto flex items-center gap-3">
                  <button
                    onClick={() => openBooking(treatment)}
                    className="btn btn-primary flex-1 py-[15px] text-[14.5px] font-medium"
                  >
                    Reserve this treatment
                  </button>
                  <button 
                    onClick={() => addToCart({ type: 'treatment', id: treatment.id, name: treatment.name, price: treatment.price, details: treatment.duration, quantity: 1 })}
                    className="btn btn-secondary px-6 py-[15px] text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPA PACKAGES */}
      <section className="bg-[#F8F5F1] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-xs tracking-[4px] text-[#C9A96E] mb-3">CURATED JOURNEYS</div>
              <h2 className="serif text-6xl tracking-[-3.2px]">Signature Packages</h2>
            </div>
            <p className="hidden md:block max-w-xs text-[#3B3B3B]/70">Extended rituals for complete renewal. The most beloved experiences at LUNÉA.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <div key={idx} className="lux-card bg-white border border-[#E9E1D6] p-9 flex flex-col rounded-[22px]">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h4 className="serif tracking-[-1.2px] text-[28px]">{pkg.name}</h4>
                    <div className="font-medium tabular-nums text-right text-2xl">{formatPrice(pkg.price)}</div>
                  </div>
                  <div className="text-sm text-[#A7B09E] mt-1 tracking-wide">{pkg.duration}</div>
                </div>
                
                <p className="mt-8 font-light leading-relaxed text-[15.2px] text-[#3B3B3B]">{pkg.description}</p>
                
                <ul className="mt-8 space-y-[13px] text-sm border-t border-[#D8D1C7] pt-6 flex-1">
                  {pkg.includes.map((inc: string, i: number) => (
                    <li key={i} className="flex items-start gap-x-3 text-[#3B3B3B]">
                      <span className="mt-[7px] block w-1 h-px bg-[#C9A96E] flex-shrink-0" />
                      {inc}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => openBooking(undefined, pkg)} 
                  className="mt-9 btn btn-secondary py-4 w-full text-sm font-medium tracking-[0.2px]"
                >
                  Reserve this journey
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASSAGE • FACIALS • BODY • AROMATHERAPY — Detailed Editorial */}
      <section className="max-w-6xl mx-auto px-8 section">
        <div className="text-center mb-16">
          <div className="text-[#C9A96E] tracking-[4px] text-xs mb-3">THE CRAFT</div>
          <h2 className="serif text-6xl tracking-[-2.6px]">Wellness Rituals</h2>
        </div>

        <div className="space-y-6">
          {[
            { title: "Massage Therapies", desc: "Deep, intentional work that meets your body where it is. Slow hands. Heated stones. Warm linen compresses." },
            { title: "Facial Treatments", desc: "Skin rituals that honor both the science and the poetry of touch. Botanical actives. Gentle sculpting. Lasting calm." },
            { title: "Body Therapies", desc: "Mineral-rich wraps, warm oil anointings, and steam rituals that dissolve the weight of the world." },
            { title: "Aromatherapy & Rituals", desc: "Custom scent journeys. The Water Temple. Private moments of complete sensory immersion." },
          ].map((ritual, idx) => (
            <div key={idx} className="treatment-item flex flex-col md:flex-row items-start md:items-center justify-between border border-[#D8D1C7] rounded-[22px] px-9 py-9 gap-y-5">
              <div>
                <div className="serif text-[29px] tracking-tight">{ritual.title}</div>
                <p className="text-[#3B3B3B] mt-1 pr-8 max-w-[54ch] leading-snug">{ritual.desc}</p>
              </div>
              <button 
                onClick={() => scrollTo('#experiences')} 
                className="btn btn-ghost border border-[#D8D1C7] px-9 whitespace-nowrap py-[15px] text-sm"
              >
                View all treatments
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* THERAPISTS — Meet the Team */}
      <section id="therapists" className="section bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-xl mb-14">
            <div className="text-[#C9A96E] text-xs tracking-[4px] mb-3">THE HANDS THAT HEAL</div>
            <h2 className="serif text-[58px] leading-none tracking-[-3.1px]">Meet the Therapists</h2>
            <p className="mt-5 text-lg font-light">Our practitioners are masters of their craft. Each brings decades of devotion to their discipline.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {therapists.map((therapist) => (
              <div key={therapist.id} className="group">
                <div className="overflow-hidden rounded-[22px] aspect-[4/3.4] bg-[#F8F5F1] relative">
                  <img 
                    src={therapist.image} 
                    alt={therapist.name} 
                    className="img-zoom absolute inset-0 w-full h-full object-cover grayscale-[0.12]"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="font-medium tracking-tight text-3xl leading-none">{therapist.name}</div>
                    <div className="text-[#C9A96E] text-sm mt-3 tracking-wide">{therapist.title}</div>
                  </div>
                </div>
                <div className="px-1 pt-6 text-sm">
                  <div className="flex items-center text-[#A7B09E] text-xs mb-3.5 tracking-widest">
                    {therapist.experience} • {therapist.specialties.slice(0, 2).join(" • ")}
                  </div>
                  <p className="leading-relaxed font-light text-[#3B3B3B]">{therapist.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM SKINCARE PRODUCTS */}
      <section id="shop" className="section bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-x-10 items-end mb-14">
            <div className="md:col-span-7">
              <div className="uppercase tracking-[3.5px] text-xs text-[#C9A96E]">THE APOTHECARY</div>
              <h2 className="serif text-7xl tracking-[-3.6px] mt-2">Ritual at home</h2>
            </div>
            <p className="md:col-span-5 md:text-right font-light text-[#3B3B3B] max-w-md md:ml-auto">Thoughtfully formulated products for your daily sanctuary. Same exquisite ingredients we use in the spa.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="product-card group bg-white border border-[#E9E1D6] rounded-[22px] overflow-hidden flex flex-col">
                <div className="h-72 relative bg-[#FCFBF8]">
                  <img src={product.image} alt={product.name} className="img-zoom absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div>
                    <div className="flex justify-between text-sm text-[#A7B09E]">
                      <span>{product.size}</span>
                      <span className="font-medium text-[#3B3B3B] tabular-nums">{formatPrice(product.price)}</span>
                    </div>
                    <h4 className="serif text-[26px] tracking-[-0.8px] mt-1 mb-4 leading-none">{product.name}</h4>
                    <p className="text-[15px] leading-relaxed font-light text-[#3B3B3B]">{product.description}</p>
                  </div>
                  <button 
                    onClick={() => addToCart({ type: 'product', id: product.id, name: product.name, price: product.price, quantity: 1 })}
                    className="mt-auto pt-8 btn btn-secondary text-sm w-full py-[15px]"
                  >
                    Add to Reservation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section max-w-5xl mx-auto px-8">
        <div className="text-center mb-14">
          <div className="text-[#C9A96E] text-xs tracking-[4px]">WORDS FROM OUR GUESTS</div>
          <h2 className="serif text-6xl tracking-[-3px] mt-3">Quietly transformative.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial px-9 py-9 bg-white border border-[#D8D1C7] rounded-[22px] flex flex-col">
              <div className="text-[#C9A96E] text-6xl font-serif leading-none mb-3 tracking-tighter">“</div>
              <p className="text-[15.5px] font-light leading-[1.55] flex-1">{t.quote}</p>
              <div className="pt-8 mt-auto">
                <div className="font-medium tracking-tight">{t.name}</div>
                <div className="text-xs text-[#A7B09E] tracking-wide mt-px">{t.location} — {t.treatment}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIPS */}
      <section id="memberships" className="bg-[#F8F5F1] py-20 section">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-end mb-14">
            <div className="lg:flex-1">
              <div className="text-[#C9A96E] tracking-[3.5px] text-xs mb-2">FOR THE DEVOTED</div>
              <h2 className="serif text-6xl lg:text-[68px] tracking-[-3.8px] leading-none">Become a member of LUNÉA.</h2>
            </div>
            <p className="max-w-sm text-lg font-light text-[#3B3B3B]">A private membership for those who wish to make sanctuary a consistent practice.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {memberships.map((tier, idx) => (
              <div key={idx} className="lux-card bg-white p-10 rounded-[22px] border border-[#D8D1C7]">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="font-medium text-5xl tracking-[-1.4px] serif">{tier.name}</div>
                    <div className="uppercase tracking-widest text-xs mt-2 text-[#C9A96E]">MONTHLY MEMBERSHIP</div>
                  </div>
                  <div>
                    <span className="text-[52px] leading-none font-medium tracking-tighter">{formatPrice(tier.price)}</span>
                    <span className="text-[#A7B09E]">/{tier.period}</span>
                  </div>
                </div>
                <p className="mt-6 text-[#3B3B3B] text-[15px] font-light">{tier.description}</p>

                <ul className="mt-9 mb-10 space-y-3.5 text-sm font-light">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-x-3 items-start">
                      <span className="inline-block mt-2 w-1 h-[1px] bg-[#C9A96E] flex-none" /> {benefit}
                    </li>
                  ))}
                </ul>

                <button onClick={() => openBooking()} className="btn btn-primary w-full py-[17px] text-sm tracking-[0.3px]">
                  JOIN THE {tier.name.toUpperCase()}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="booking" className="section max-w-5xl mx-auto px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-[#C9A96E] text-xs tracking-[4px] mb-3">YOUR ESCAPE AWAITS</div>
          <h2 className="serif text-7xl tracking-[-3.4px]">Reserve your time<br />at LUNÉA.</h2>
          <p className="mt-5 text-lg font-light text-[#3B3B3B]">Every moment here is intentionally crafted. Choose a treatment or simply reserve a private day of rest.</p>
        </div>

        <div className="max-w-md mx-auto">
          <button 
            onClick={() => openBooking()} 
            className="btn btn-primary w-full py-5 text-[15px] tracking-[0.4px] font-medium"
          >
            REQUEST AN APPOINTMENT
          </button>
          <div className="mt-4 text-center text-xs tracking-widest text-[#A7B09E]">OR CALL +41 22 312 88 10 • OPEN DAILY 9AM–8PM</div>
        </div>

        {/* Elegant booking preview grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-6 text-sm">
          {[
            { label: "Private Thermal Suite", time: "2 — 4 guests" },
            { label: "Couples Suite", time: "Available daily" },
            { label: "Meditation Chamber", time: "Complimentary for members" },
          ].map((i, idx) => (
            <div key={idx} className="px-9 py-8 border border-[#D8D1C7] rounded-[22px] flex justify-between items-center bg-white">
              <div>
                <div className="font-medium tracking-tight text-lg">{i.label}</div>
                <div className="text-[#A7B09E] text-sm">{i.time}</div>
              </div>
              <button onClick={() => openBooking()} className="btn btn-ghost text-xs tracking-widest px-6 py-3 border border-[#D8D1C7]">INQUIRE</button>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT & LOCATION */}
      <section className="bg-[#F8F5F1] py-20 border-t border-[#D8D1C7]">
        <div className="max-w-5xl mx-auto px-8 grid md:grid-cols-12 gap-x-12">
          <div className="md:col-span-5">
            <div className="uppercase text-xs tracking-[4px] text-[#C9A96E] mb-3">VISIT US</div>
            <h3 className="serif text-6xl tracking-[-2.8px] leading-none">LUNÉA<br />Spa &amp; Wellness</h3>
            
            <div className="mt-14 space-y-9 text-sm font-light">
              <div>
                <div className="font-medium text-[#3B3B3B] mb-1 tracking-tight">Crans-Montana, Switzerland</div>
                <div>Route de l’Ancien Sanatorium 22<br />3963 Crans-Montana</div>
              </div>
              <div>
                <div className="font-medium mb-1 tracking-tight">Hours</div>
                <div>Daily 9:00 — 20:00<br />Spa Facilities open from 8:00</div>
              </div>
              <div>
                <div className="font-medium tracking-tight mb-1">Contact</div>
                <a href="tel:+41223128810" className="block hover:text-[#C9A96E]">+41 22 312 88 10</a>
                <a href="mailto:hello@lunea.ch" className="block hover:text-[#C9A96E]">hello@lunea.ch</a>
              </div>
            </div>
          </div>

          {/* Beautiful location visual */}
          <div className="md:col-span-7 mt-12 md:mt-0">
            <div className="aspect-[16/10] rounded-[22px] overflow-hidden bg-[#E9E1D6] relative">
              <img 
                src="https://images.pexels.com/photos/20200269/pexels-photo-20200269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400" 
                alt="LUNÉA Spa — peaceful mountain view and stone terrace at the luxury wellness retreat" 
                className="absolute inset-0 w-full h-full object-cover" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-9 left-9 text-white">
                <div className="text-xs tracking-[4px] opacity-90 mb-1">PRIVATE MOUNTAIN ESTATE</div>
                <div className="serif text-5xl tracking-tighter">Alpine Sanctuary</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Footer */}
      <footer className="bg-[#3B3B3B] text-[#F8F5F1] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between gap-y-14 pb-14 border-b border-white/10">
            <div>
              <div className="flex items-center gap-x-3 mb-3">
                <div className="w-7 h-7 rounded-full border border-[#C9A96E] flex items-center justify-center">
                  <span className="text-[#C9A96E] text-[21px] tracking-[-1.5px] font-medium serif">L</span>
                </div>
                <div className="text-3xl serif tracking-[-1.2px]">LUNÉA</div>
              </div>
              <div className="text-[#A7B09E] text-xs tracking-[4px]">A PLACE TO RETURN TO</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-14 gap-y-8 text-sm font-light">
              <div>
                <div className="text-[#A7B09E] tracking-widest text-xs mb-4">EXPERIENCES</div>
                <div className="space-y-[11px]">
                  <div>Signature Rituals</div>
                  <div>Massages</div>
                  <div>Facials</div>
                  <div>Private Retreats</div>
                </div>
              </div>
              <div>
                <div className="text-[#A7B09E] tracking-widest text-xs mb-4">THE HOUSE</div>
                <div className="space-y-[11px]">
                  <div>Our Philosophy</div>
                  <div>The Estate</div>
                  <div>Therapists</div>
                  <div>Journal</div>
                </div>
              </div>
              <div>
                <div className="text-[#A7B09E] tracking-widest text-xs mb-4">VISIT</div>
                <div className="space-y-[11px]">
                  <div>Crans-Montana</div>
                  <div>Private Transfers</div>
                  <div>Accommodations</div>
                </div>
              </div>
              <div>
                <div className="text-[#A7B09E] tracking-widest text-xs mb-4">CONNECT</div>
                <div className="space-y-[11px]">
                  <a href="mailto:hello@lunea.ch" className="block">hello@lunea.ch</a>
                  <div>+41 22 312 88 10</div>
                  <div className="pt-3">Instagram</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 text-[#A7B09E] text-xs flex flex-col md:flex-row justify-between gap-y-1 tracking-wider">
            <div>© {new Date().getFullYear()} LUNÉA. All rights reserved.</div>
            <div className="flex gap-x-5">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL — Elegant & Refined */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4" onClick={() => setBookingModalOpen(false)}>
          <div 
            className="modal w-full max-w-lg bg-[#FCFBF8] rounded-3xl overflow-hidden shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            {!bookingSuccess ? (
              <>
                <div className="px-9 pt-9 pb-8">
                  <button onClick={() => setBookingModalOpen(false)} className="float-right text-[#A7B09E] text-xl leading-none">×</button>
                  
                  <div>
                    <div className="font-medium text-[#C9A96E] tracking-widest text-xs">CONFIRM YOUR EXPERIENCE</div>
                    <h3 className="serif text-[38px] tracking-[-1.6px] mt-2 leading-none">
                      {selectedTreatment ? selectedTreatment.name : selectedPackage ? selectedPackage.name : "Private Sanctuary Day"}
                    </h3>
                    {selectedTreatment && (
                      <div className="mt-2.5 text-[#C9A96E] text-sm">{selectedTreatment.duration} — {formatPrice(selectedTreatment.price)}</div>
                    )}
                    {selectedPackage && (
                      <div className="mt-2.5 text-[#C9A96E] text-sm">{selectedPackage.duration} — {formatPrice(selectedPackage.price)}</div>
                    )}
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="px-9 pb-9">
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#A7B09E] block mb-1.5 tracking-widest">DATE</label>
                        <input 
                          type="date" 
                          required 
                          value={bookingForm.date} 
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} 
                          className="input w-full px-5 py-3 text-sm" 
                          min={new Date().toISOString().split('T')[0]} 
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#A7B09E] block mb-1.5 tracking-widest">TIME</label>
                        <select 
                          required 
                          value={bookingForm.time} 
                          onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })} 
                          className="input w-full px-5 py-3 text-sm"
                        >
                          <option value="">Select time</option>
                          <option value="09:00">09:00</option>
                          <option value="10:30">10:30</option>
                          <option value="12:00">12:00</option>
                          <option value="13:30">13:30</option>
                          <option value="15:00">15:00</option>
                          <option value="16:30">16:30</option>
                          <option value="18:00">18:00</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-[#A7B09E] block mb-1.5 tracking-widest">NUMBER OF GUESTS</label>
                      <select 
                        value={bookingForm.guests} 
                        onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })} 
                        className="input w-full px-5 py-3 text-sm"
                      >
                        {[1,2,3,4].map(n => <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-[#A7B09E] block mb-1.5 tracking-widest">NOTES OR PREFERENCES</label>
                      <textarea 
                        value={bookingForm.notes} 
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })} 
                        placeholder="Any areas of focus, allergies, or special requests..." 
                        rows={3} 
                        className="input w-full px-5 py-4 resize-y text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-x-3 pt-8">
                    <button 
                      type="button" 
                      onClick={() => setBookingModalOpen(false)} 
                      className="btn btn-secondary flex-1 py-[17px] text-sm tracking-wider"
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary flex-1 py-[17px] text-sm tracking-wider font-medium"
                    >
                      CONFIRM RESERVATION
                    </button>
                  </div>
                  <div className="text-center text-[10px] text-[#A7B09E] tracking-widest mt-5">YOU WILL RECEIVE CONFIRMATION WITHIN TWO HOURS</div>
                </form>
              </>
            ) : (
              <div className="px-9 py-14 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#C9A96E] flex items-center justify-center mb-6">
                  <svg width="32" height="32" fill="none" stroke="#FCFBF8" strokeWidth="2.25" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
                  </svg>
                </div>
                <div className="serif text-4xl tracking-tight mb-2">Thank you.</div>
                <p className="text-[#3B3B3B] font-light">Your request has been received.<br />We look forward to welcoming you.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CART / RESERVATIONS DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-[80] bg-black/70 flex justify-end" onClick={() => setCartOpen(false)}>
          <div 
            className="drawer w-full max-w-md bg-[#FCFBF8] h-full overflow-y-auto shadow-xl" 
            onClick={e => e.stopPropagation()}
          >
            <div className="px-8 py-9 border-b border-[#D8D1C7] flex justify-between items-center sticky top-0 bg-[#FCFBF8] z-10">
              <div>
                <div className="text-xs tracking-[3px] text-[#C9A96E]">YOUR RESERVATIONS</div>
                <div className="serif text-[33px] tracking-[-1.3px] leading-none mt-1">Cart</div>
              </div>
              <button onClick={() => setCartOpen(false)} className="text-3xl text-[#A7B09E] leading-none">×</button>
            </div>

            {cart.length === 0 ? (
              <div className="p-8 text-center py-20">
                <div className="mx-auto text-[#C9A96E] mb-3">—</div>
                <p className="font-light">Your cart is empty.</p>
                <button onClick={() => { setCartOpen(false); scrollTo('#experiences'); }} className="mt-7 text-sm underline">Explore treatments</button>
              </div>
            ) : (
              <>
                <div className="p-8 space-y-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-5 border-b border-[#E9E1D6] pb-6 last:border-b-0 last:pb-0">
                      <div className="flex-1">
                        <div className="font-medium tracking-tight">{item.name}</div>
                        {item.details && <div className="text-xs text-[#A7B09E] mt-px">{item.details}</div>}
                        <div className="flex items-center mt-4 gap-x-4 text-sm">
                          <button onClick={() => updateCartQuantity(index, item.quantity - 1)} className="w-7 h-7 border border-[#D8D1C7] rounded-full flex items-center justify-center active:bg-[#F8F5F1]">-</button>
                          <span className="tabular-nums w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(index, item.quantity + 1)} className="w-7 h-7 border border-[#D8D1C7] rounded-full flex items-center justify-center active:bg-[#F8F5F1]">+</button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-medium tabular-nums tracking-tighter">{formatPrice(item.price * item.quantity)}</div>
                        <button onClick={() => removeFromCart(index)} className="text-xs text-[#A7B09E] mt-4 hover:text-red-800">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-8 pt-4 pb-9 border-t border-[#D8D1C7] sticky bottom-0 bg-[#FCFBF8]">
                  <div className="flex justify-between text-lg font-medium mb-7">
                    <span>Total</span>
                    <span className="tabular-nums tracking-tight">{formatPrice(cartTotal)}</span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      alert("Thank you. A reservation confirmation has been sent to your email. We look forward to your arrival at LUNÉA.");
                      setCart([]);
                      setCartOpen(false);
                    }} 
                    className="btn btn-primary w-full py-[18px] text-sm font-medium tracking-[0.3px]"
                  >
                    CONFIRM &amp; SECURE YOUR DATES
                  </button>
                  <p className="text-center mt-4 text-[#A7B09E] text-xs tracking-widest">CANCELLATIONS UP TO 48 HOURS PRIOR</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;