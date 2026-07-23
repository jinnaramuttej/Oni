import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Menu, X, ChevronDown, Check, ArrowRight, MapPin, Phone, Mail,
  Clock, Shield, Zap, Dumbbell, HeartPulse, Apple, Users,
  Sparkles, Award, TrendingUp, Star, Target, Move
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Membership', href: '#membership' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-void/85 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-electric flex items-center justify-center shadow-[0_0_20px_rgba(100,255,78,0.35)] group-hover:shadow-[0_0_30px_rgba(100,255,78,0.5)] transition-shadow">
              <Dumbbell className="w-5 h-5 text-void" strokeWidth={2.5} />
            </div>
            <span className="text-xl tracking-[0.2em] font-heading text-cream">FORGE</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-ash hover:text-electric transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#pricing"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-electric text-void text-[11px] font-extrabold uppercase tracking-[0.15em] rounded-[16px] hover:bg-electric-dark hover:scale-[1.03] transition-all shadow-[0_0_20px_rgba(100,255,78,0.25)]"
          >
            Start Membership <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-cream p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-void/98 backdrop-blur-2xl pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-heading tracking-[0.1em] text-cream py-3 border-b border-white/5 hover:text-electric transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="mt-6 px-6 py-4 bg-electric text-void text-center text-sm font-extrabold uppercase tracking-[0.15em] rounded-[16px]"
              >
                Start Membership
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                                 */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-athlete.jpg"
          alt="Athlete training"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(100,255,78,0.08),transparent_60%)]" />
      </div>

      {/* Thin vertical accent line */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 w-px h-48 bg-gradient-to-b from-transparent via-electric/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-electric/20 bg-electric/5 text-electric text-[11px] font-semibold uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Elite Performance Center
          </div>

          <h1 className="font-heading text-[clamp(4rem,14vw,10rem)] leading-[0.85] tracking-[0.02em] text-cream mb-8">
            <span className="block">BUILT FOR</span>
            <span className="block text-electric">STRENGTH.</span>
          </h1>

          <p className="text-lg lg:text-2xl text-ash/80 font-light leading-relaxed max-w-xl mb-12 text-balance">
            Where discipline becomes identity. Train with purpose, recover with intention, and transform with precision.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center gap-3 px-10 py-5 bg-electric text-void text-[13px] font-extrabold uppercase tracking-[0.2em] rounded-[16px] hover:bg-electric-dark hover:scale-[1.04] transition-all duration-300 shadow-[0_0_30px_rgba(100,255,78,0.3)]"
            >
              Start Your Membership <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-10 py-5 border border-white/15 text-cream text-[13px] font-extrabold uppercase tracking-[0.2em] rounded-[16px] hover:border-electric hover:text-electric transition-all duration-300"
            >
              Book Free Trial
            </a>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 flex flex-wrap gap-8 lg:gap-16"
        >
          {[
            { icon: Award, label: 'Certified Trainers' },
            { icon: Clock, label: '24/7 Access' },
            { icon: Shield, label: 'Premium Equipment' },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-carbon border border-white/5 flex items-center justify-center">
                <b.icon className="w-4 h-4 text-electric" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-cream">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#philosophy"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-steel hover:text-electric transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Explore</span>
        <ChevronDown className="w-5 h-5" />
      </motion.a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PHILOSOPHY                                                          */
/* ------------------------------------------------------------------ */
function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="philosophy" ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-electric/20 rounded-tl-3xl" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-6 block">Our Philosophy</span>
            <h2 className="font-heading text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] tracking-[0.01em] text-cream mb-8">
              DISCIPLINE.<br />
              <span className="text-electric">PRECISION.</span><br />
              TRANSFORMATION.
            </h2>
            <p className="text-ash/70 text-base lg:text-lg leading-loose font-light mb-8">
              We believe fitness is not about vanity — it is about capability. Every repetition, every recovery, every meal builds a version of you that outperforms yesterday. Our facility exists to support that process with world-class equipment, expert coaching, and an environment that demands excellence.
            </p>
            <ul className="space-y-3">
              {[
                'Evidence-based programming tailored to your goals',
                'Certified strength, conditioning, and nutrition coaches',
                'Premium equipment maintained to professional standards',
                'A culture of accountability, not excuses',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ash/80">
                  <Check className="w-4 h-4 text-electric shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="/strength-zone.jpg"
              alt="Strength training"
              className="w-full h-[500px] lg:h-[600px] object-cover rounded-[20px] shadow-2xl shadow-black/40"
            />
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-carbon border border-white/5 rounded-[20px] p-6 lg:p-8 shadow-2xl max-w-xs">
              <div className="text-4xl font-heading text-electric mb-1">92%</div>
              <div className="text-xs text-ash/50 uppercase tracking-[0.15em] font-semibold">Members see results in 90 days</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MEMBERSHIP                                                          */
/* ------------------------------------------------------------------ */
function Membership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const plans = [
    {
      name: 'FOUNDATION',
      price: '89',
      period: '/ month',
      desc: 'For committed beginners building a sustainable routine.',
      features: [
        'Unlimited gym access',
        'All group classes included',
        'Standard locker access',
        'Basic nutrition guide',
      ],
      highlighted: false,
    },
    {
      name: 'ELITE',
      price: '149',
      period: '/ month',
      desc: 'The full experience — coaching, recovery, and results.',
      features: [
        'Everything in Foundation',
        '2 personal training sessions / month',
        'Priority class booking',
        'Recovery zone access',
        'Advanced body composition tracking',
        'Nutrition coaching access',
      ],
      highlighted: true,
    },
    {
      name: 'FORGE PRO',
      price: '249',
      period: '/ month',
      desc: 'For serious athletes who demand maximum support.',
      features: [
        'Everything in Elite',
        'Unlimited personal training',
        'Custom macro programming',
        '1-on-1 nutrition coaching / week',
        'Competition prep support',
        'Private recovery suite',
        'Priority parking',
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="membership" ref={ref} className="relative py-32 lg:py-48 bg-carbon">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(100,255,78,0.05),transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-4 block">Membership</span>
          <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.01em] text-cream mb-6">CHOOSE YOUR PATH.</h2>
          <p className="text-ash/60 text-base font-light">No contracts. No hidden fees. Just consistent progress backed by world-class facilities.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-[20px] p-8 lg:p-10 border transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? 'bg-void border-electric/20 shadow-[0_0_40px_rgba(100,255,78,0.08)] scale-[1.01] z-10'
                  : 'bg-graphite border-white/5 hover:border-electric/15 shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-electric text-void text-[10px] font-extrabold uppercase tracking-[0.15em] rounded-full shadow-[0_0_20px_rgba(100,255,78,0.3)] whitespace-nowrap">
                  Recommended
                </div>
              )}

              <h3 className="font-heading text-2xl text-cream tracking-[0.08em] mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-heading text-5xl text-cream">${plan.price}</span>
                <span className="text-ash/40 text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-ash/50 mb-8 leading-relaxed">{plan.desc}</p>

              <ul className="space-y-3.5 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-ash/70">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-electric' : 'text-electric/60'}`} />
                    <span className="font-light">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#pricing"
                className={`block w-full text-center py-4 rounded-[16px] text-[11px] font-extrabold uppercase tracking-[0.15em] transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-electric text-void hover:bg-electric-dark shadow-[0_0_20px_rgba(100,255,78,0.25)] hover:shadow-[0_0_30px_rgba(100,255,78,0.4)]'
                    : 'border border-white/10 text-cream hover:border-electric hover:text-electric'
                }`}
              >
                Select Plan
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FACILITIES                                                          */
/* ------------------------------------------------------------------ */
function Facilities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const zones = [
    {
      title: 'STRENGTH ZONE',
      img: '/strength-zone.jpg',
      desc: 'Competition-grade barbells, calibrated plates, and monolift stations. Built for serious lifters.',
      icon: Dumbbell,
    },
    {
      title: 'CARDIO ZONE',
      img: '/cardio-zone.jpg',
      desc: 'Premium treadmills, Concept2 rowers, assault bikes, and heart-rate-integrated monitoring.',
      icon: HeartPulse,
    },
    {
      title: 'FUNCTIONAL TRAINING',
      img: '/group-class.jpg',
      desc: 'Sled pushes, battle ropes, kettlebell circuits, and open turf space for high-intensity work.',
      icon: Zap,
    },
  ];

  return (
    <section id="facilities" ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-4 block">Facilities</span>
            <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.01em] text-cream">BUILT FOR<br /><span className="text-electric">PERFORMANCE.</span></h2>
          </div>
          <p className="text-ash/50 text-base font-light max-w-md lg:text-right">Every square meter designed for optimal training flow, equipment quality, and athlete focus.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-6">
          {zones.map((z, i) => (
            <motion.a
              href="#contact"
              key={z.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-[20px] h-[520px] block shadow-xl"
            >
              <img
                src={z.img}
                alt={z.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-void/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_20%,rgba(17,17,17,0.8)_100%)]" />

              <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-electric/10 backdrop-blur-md flex items-center justify-center border border-electric/10">
                <z.icon className="w-4 h-4 text-electric" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <h3 className="font-heading text-3xl lg:text-4xl text-cream mb-3 tracking-[0.05em]">{z.title}</h3>
                <p className="text-sm text-ash/50 font-light leading-relaxed">{z.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-electric text-xs font-extrabold uppercase tracking-[0.15em] group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PERSONAL TRAINING                                                  */
/* ------------------------------------------------------------------ */
function Training() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="training" className="relative py-32 lg:py-48 bg-carbon overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <img
              src="/trainer-coach.jpg"
              alt="Personal trainer coaching"
              className="w-full h-[500px] lg:h-[620px] object-cover rounded-[20px] shadow-2xl shadow-black/30"
            />
            <div className="absolute top-6 right-6 lg:-right-4 bg-void/80 backdrop-blur-xl border border-white/5 rounded-[16px] px-6 py-4 max-w-[200px]">
              <div className="text-[10px] text-electric font-extrabold uppercase tracking-[0.2em] mb-1">Certified</div>
              <div className="text-sm font-heading text-cream">Strength & Conditioning</div>
              <div className="text-[10px] text-ash/40">NSCA / ISSA / Precision Nutrition</div>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-4 block">Personal Training</span>
            <h2 className="font-heading text-[clamp(3rem,7vw,5rem)] leading-[0.9] tracking-[0.01em] text-cream mb-8">
              ONE COACH.<br />
              <span className="text-electric">ONE MISSION.</span>
            </h2>
            <p className="text-ash/60 text-base lg:text-lg leading-loose font-light mb-10 text-balance">
              Our trainers are not just certified — they are competitors, researchers, and practitioners. Every session is programmed around your biomechanics, recovery capacity, and long-term performance targets.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, label: 'Progress Tracking', desc: 'Weekly measurements & assessments' },
                { icon: Target, label: 'Goal Programming', desc: 'Custom plans for strength or physique' },
                { icon: Move, label: 'Movement Screening', desc: 'Prevent injury before it starts' },
                { icon: Star, label: 'Form Correction', desc: 'Real-time technique refinement' },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-[16px] bg-graphite border border-white/5 hover:border-electric/10 transition-colors">
                  <item.icon className="w-5 h-5 text-electric mb-3" />
                  <h4 className="text-sm font-bold text-cream mb-1">{item.label}</h4>
                  <p className="text-xs text-ash/40 font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  GROUP CLASSES                                                       */
/* ------------------------------------------------------------------ */
function Classes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const classes = [
    { name: 'FORGE HIIT', time: '6:00 AM / 6:00 PM', desc: 'High-intensity interval circuits combining strength and conditioning.' },
    { name: 'OLYMPIC LIFTING', time: '7:00 AM / 7:00 PM', desc: 'Technique-focused sessions for the snatch and clean & jerk.' },
    { name: 'MOBILITY & RECOVERY', time: '8:00 AM / 8:00 PM', desc: 'Active recovery, mobility flows, and breathwork to accelerate adaptation.' },
    { name: 'STRENGTH ENDURANCE', time: '12:00 PM', desc: 'Volume-focused hypertrophy with strategic rest intervals.' },
  ];

  return (
    <section id="classes" className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(100,255,78,0.04),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-4 block">Group Classes</span>
          <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.01em] text-cream mb-6">TRAIN <span className="text-electric">TOGETHER.</span></h2>
          <p className="text-ash/50 text-base font-light">Structured group sessions led by certified coaches. No guesswork, just progress.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {classes.map((cls, i) => (
            <motion.a
              href="#pricing"
              key={cls.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 lg:p-10 rounded-[20px] bg-graphite border border-white/5 hover:border-electric/20 transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-heading text-2xl text-cream tracking-[0.05em]">{cls.name}</h3>
                <span className="text-xs font-extrabold text-electric/80 uppercase tracking-[0.15em] bg-electric/5 px-3 py-1 rounded-full border border-electric/10 whitespace-nowrap">{cls.time}</span>
              </div>
              <p className="text-sm text-ash/50 font-light leading-relaxed">{cls.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-cream/30 group-hover:text-electric text-xs font-extrabold uppercase tracking-[0.15em] transition-colors">
                Book Class <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  NUTRITION                                                           */
/* ------------------------------------------------------------------ */
function Nutrition() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="nutrition" className="relative py-32 lg:py-48 bg-carbon overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <img
              src="/nutrition.jpg"
              alt="Premium nutrition"
              className="w-full h-[420px] lg:h-[520px] object-cover rounded-[20px] shadow-2xl shadow-black/30"
            />
          </motion.div>

          <div className="order-1 lg:order-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-4 block">Nutrition</span>
            <h2 className="font-heading text-[clamp(3rem,7vw,5rem)] leading-[0.9] tracking-[0.01em] text-cream mb-8">
              FUEL THE<br />
              <span className="text-electric">TRANSFORMATION.</span>
            </h2>
            <p className="text-ash/60 text-base lg:text-lg leading-loose font-light mb-10 text-balance">
              Training pushes the boundary. Nutrition holds it. Our certified nutrition coaches build personalized macro plans, meal timing strategies, and supplementation protocols based on your body composition data and training load.
            </p>

            <div className="space-y-4">
              {[
                { label: 'Body Composition Analysis', desc: 'InBody scans every 4 weeks' },
                { label: 'Macro Programming', desc: 'Calibrated to your energy demands' },
                { label: 'Supplement Strategy', desc: 'Evidence-backed recommendations' },
                { label: 'Meal Timing', desc: 'Optimized for training windows' },
              ].map((item) => (
                <a href="#pricing" key={item.label} className="flex items-center gap-5 p-4 rounded-[14px] bg-graphite border border-white/5 hover:border-electric/15 hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center shrink-0 group-hover:bg-electric/15 transition-colors">
                    <Apple className="w-4 h-4 text-electric" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-cream">{item.label}</h4>
                    <p className="text-xs text-ash/40 font-light">{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TRANSFORMATIONS                                                     */
/* ------------------------------------------------------------------ */
function Transformations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="transformations" ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-4 block">Results</span>
            <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.01em] text-cream">PROVEN <span className="text-electric">TRANSFORMATIONS.</span></h2>
          </div>
          <p className="text-ash/50 text-base font-light max-w-md lg:text-right">Real members. Real results. Real commitment.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-[20px] shadow-2xl lg:row-span-2 lg:h-full"
          >
            <img src="/transformation.jpg" alt="Member transformation" className="w-full h-full min-h-[500px] lg:min-h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-[11px] text-electric font-extrabold uppercase tracking-[0.2em] mb-2">Before → After</div>
              <h3 className="font-heading text-3xl text-cream mb-2">Marcus D.</h3>
              <p className="text-sm text-ash/60 font-light">Lost 28 lbs. Gained 15 lbs of lean muscle. In 6 months.</p>
              <div className="mt-4 flex gap-3">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Strength +22%</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Body Fat -8%</span>
              </div>
            </div>
          </motion.div>

          {[
            { title: 'Sarah M.', metric: 'Lost 18 lbs', sub: 'Increased deadlift to 210 lbs', metric2: 'Body Fat -6%' },
            { title: 'David K.', metric: 'Gained 12 lbs lean', sub: 'Bench press +55 lbs', metric2: 'Strength +18%' },
          ].map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (i + 1) * 0.15 }}
              className="group relative overflow-hidden rounded-[20px] shadow-xl bg-graphite border border-white/5 p-8 lg:p-10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center border border-electric/10">
                  <TrendingUp className="w-4 h-4 text-electric" />
                </div>
                <h3 className="font-heading text-xl text-cream">{t.title}</h3>
              </div>
              <div className="text-4xl font-heading text-electric mb-2">{t.metric}</div>
              <p className="text-sm text-ash/50 font-light mb-6">{t.sub}</p>
              <div className="inline-block px-3 py-1 rounded-full bg-electric/5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-electric border border-electric/10">{t.metric2}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TRAINERS                                                           */
/* ------------------------------------------------------------------ */
function Trainers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const trainers = [
    { name: 'ELENA VOSS', role: 'Head Strength Coach', bio: 'NSCA-CSCS. Former national-level powerlifter with 14 years coaching experience.', cert: 'NSCA / ISSA Elite' },
    { name: 'MARCUS CHEN', role: 'Performance Director', bio: 'Certified Sports Nutritionist and Olympic lifting specialist. Trains competitive athletes.', cert: 'CSCS / PN Level 2' },
    { name: 'AMARA OKONKWO', role: 'Functional Training Lead', bio: 'Certified in functional movement screening and mobility coaching. Former collegiate athlete.', cert: 'FMS / NASM PES' },
  ];

  return (
    <section id="trainers" ref={ref} className="relative py-32 lg:py-48 bg-carbon overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-4 block">The Team</span>
          <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.01em] text-cream mb-6">MEET THE <span className="text-electric">COACHES.</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative rounded-[20px] bg-graphite border border-white/5 overflow-hidden hover:border-electric/10 transition-all duration-300 hover:-translate-y-2 shadow-xl"
            >
              <div className="h-[400px] overflow-hidden relative">
                <img src="/trainer-coach.jpg" alt={t.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-void/10" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-void/60 backdrop-blur-md rounded-full border border-white/5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-electric">{t.cert}</div>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl text-cream tracking-[0.05em] mb-1">{t.name}</h3>
                <p className="text-xs text-electric font-extrabold uppercase tracking-[0.15em] mb-4">{t.role}</p>
                <p className="text-sm text-ash/50 font-light leading-relaxed">{t.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */
function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const quotes = [
    { text: 'The most professional gym I have ever stepped into. Every detail — from the equipment quality to the coaching — reflects elite standards.', name: 'James R.', role: 'Elite Member, 2 years' },
    { text: 'I went from barely deadlifting my bodyweight to 2.5x in 8 months. The programming here is precise, and the coaches actually care.', name: 'Lena M.', role: 'Strength Athlete' },
    { text: 'The 24/7 access and the environment make it impossible to skip a session. This is not a gym. It is a commitment to yourself.', name: 'David P.', role: 'Elite Member, 1 year' },
  ];

  return (
    <section id="testimonials" ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(100,255,78,0.04),transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-4 block">Community</span>
          <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.01em] text-cream">BUILT BY <span className="text-electric">MEMBERS.</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 lg:p-10 rounded-[20px] bg-graphite border border-white/5 hover:border-electric/10 transition-all duration-300 shadow-lg"
            >
              <div className="flex gap-0.5 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-electric fill-electric" />
                ))}
              </div>
              <blockquote className="text-base lg:text-lg text-ash/70 font-light leading-relaxed mb-8 italic">"{q.text}"</blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-electric" />
                </div>
                <div>
                  <div className="text-sm font-bold text-cream">{q.name}</div>
                  <div className="text-[10px] text-ash/30 font-semibold uppercase tracking-[0.1em]">{q.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRICING / FAQ                                                      */
/* ------------------------------------------------------------------ */
function Pricing() {
  const ref = useRef(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'Can I cancel anytime?', a: 'Yes. All memberships are month-to-month with no long-term contracts. Cancel with 30 days notice.' },
    { q: 'Is there a joining fee?', a: 'No joining fees. Your first month is a full-access trial with no restrictions.' },
    { q: 'Do you offer corporate discounts?', a: 'Yes. We offer group rates for companies of 5 or more employees. Reach out to our membership team.' },
    { q: 'What is the personal training process?', a: 'We begin with a movement assessment, then design a customized program. Sessions are booked in advance through our app or at the front desk.' },
  ];

  return (
    <section id="pricing" ref={ref} className="relative py-32 lg:py-48 bg-carbon overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-4 block">Pricing</span>
          <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.01em] text-cream mb-6">START YOUR <span className="text-electric">JOURNEY.</span></h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Pricing cards */}
          <div className="grid gap-4">
            <div className="p-8 rounded-[20px] bg-void border border-electric/10 shadow-[0_0_30px_rgba(100,255,78,0.06)]">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-heading text-xl text-cream">Foundation</h3>
                <span className="font-heading text-3xl text-cream">$89</span>
              </div>
              <p className="text-xs text-ash/40 mb-6">Per month. Unlimited access.</p>
              <a href="#contact" className="block w-full text-center py-4 bg-electric text-void text-[11px] font-extrabold uppercase tracking-[0.15em] rounded-[16px] hover:bg-electric-dark transition-colors">Select Plan</a>
            </div>
            <div className="p-8 rounded-[20px] bg-void border border-electric/15 shadow-[0_0_30px_rgba(100,255,78,0.06)] relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-electric text-void text-[9px] font-extrabold uppercase tracking-[0.15em] px-4 py-1 rounded-bl-[12px]">Recommended</div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-heading text-xl text-cream">Elite</h3>
                <span className="font-heading text-3xl text-electric">$149</span>
              </div>
              <p className="text-xs text-ash/40 mb-6">Per month. Full coaching & recovery.</p>
              <a href="#contact" className="block w-full text-center py-4 bg-electric text-void text-[11px] font-extrabold uppercase tracking-[0.15em] rounded-[16px] hover:bg-electric-dark transition-colors shadow-[0_0_25px_rgba(100,255,78,0.25)]">Select Plan</a>
            </div>
            <div className="p-8 rounded-[20px] bg-void border border-white/5">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-heading text-xl text-cream">Forge Pro</h3>
                <span className="font-heading text-3xl text-cream">$249</span>
              </div>
              <p className="text-xs text-ash/40 mb-6">Per month. Unlimited coaching.</p>
              <a href="#contact" className="block w-full text-center py-4 border border-white/10 text-cream text-[11px] font-extrabold uppercase tracking-[0.15em] rounded-[16px] hover:border-electric hover:text-electric transition-colors">Select Plan</a>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="font-heading text-3xl text-cream mb-6">Common Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-[16px] bg-graphite border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-semibold text-cream">{faq.q}</span>
                    <span className={`text-electric text-lg transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-sm text-ash/50 font-light leading-relaxed">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                             */
/* ------------------------------------------------------------------ */
function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(100,255,78,0.06),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-electric mb-4 block">Location</span>
            <h2 className="font-heading text-[clamp(3rem,8vw,5rem)] leading-[0.9] tracking-[0.01em] text-cream mb-8">FIND YOUR<br /><span className="text-electric">FORGE.</span></h2>
            <p className="text-ash/60 text-base font-light leading-loose mb-10">Located in the heart of the performance district, our 15,000 square foot facility is accessible 24/7 with secure access for all members.</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-carbon border border-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-electric" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream">Address</h4>
                  <p className="text-sm text-ash/40 font-light">440 Industrial Boulevard, District 7<br />Performance Quarter, NY 10013</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-carbon border border-white/5 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-electric" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream">Hours</h4>
                  <p className="text-sm text-ash/40 font-light">Open 24 hours / 7 days a week<br />Staffed: 5:00 AM — 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-carbon border border-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-electric" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream">Phone</h4>
                  <p className="text-sm text-ash/40 font-light">+1 (212) 884-7700</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-carbon border border-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-electric" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream">Email</h4>
                  <p className="text-sm text-ash/40 font-light">hello@forgefit.com</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="rounded-[20px] bg-carbon border border-white/5 p-8 lg:p-10 shadow-2xl"
          >
            <h3 className="font-heading text-2xl text-cream mb-2">Book a Visit</h3>
            <p className="text-xs text-ash/40 font-light mb-8">Leave your details and our team will reach out within 2 hours.</p>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thanks for your interest! We will contact you shortly.'); }}>
              <input type="text" placeholder="Your Name" required className="w-full px-5 py-4 bg-void border border-white/10 rounded-[14px] text-sm text-cream placeholder:text-ash/20 focus:outline-none focus:border-electric/40 transition-colors" />
              <input type="email" placeholder="Email Address" required className="w-full px-5 py-4 bg-void border border-white/10 rounded-[14px] text-sm text-cream placeholder:text-ash/20 focus:outline-none focus:border-electric/40 transition-colors" />
              <textarea placeholder="What are your fitness goals?" rows={3} className="w-full px-5 py-4 bg-void border border-white/10 rounded-[14px] text-sm text-cream placeholder:text-ash/20 focus:outline-none focus:border-electric/40 transition-colors resize-none" />
              <button type="submit" className="w-full py-5 bg-electric text-void text-[11px] font-extrabold uppercase tracking-[0.15em] rounded-[16px] hover:bg-electric-dark transition-colors shadow-[0_0_25px_rgba(100,255,78,0.2)]">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="relative bg-void border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-lg bg-electric flex items-center justify-center shadow-[0_0_20px_rgba(100,255,78,0.35)]">
                <Dumbbell className="w-5 h-5 text-void" strokeWidth={2.5} />
              </div>
              <span className="text-xl tracking-[0.2em] font-heading text-cream">FORGE</span>
            </a>
            <p className="text-sm text-ash/30 font-light max-w-md leading-loose">Built for athletes who treat their body as their most valuable asset. Precision. Discipline. Results.</p>
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-electric mb-6">Navigation</h4>
            <ul className="space-y-3">
              {['Philosophy', 'Membership', 'Facilities', 'Transformations', 'Pricing'].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-sm text-ash/30 hover:text-electric transition-colors font-light">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-electric mb-6">Connect</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-ash/30 hover:text-electric transition-colors font-light">Instagram</a></li>
              <li><a href="#" className="text-sm text-ash/30 hover:text-electric transition-colors font-light">YouTube</a></li>
              <li><a href="#" className="text-sm text-ash/30 hover:text-electric transition-colors font-light">TikTok</a></li>
              <li><a href="#contact" className="text-sm text-ash/30 hover:text-electric transition-colors font-light">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[11px] text-ash/20 font-light tracking-wide">
          <span>© 2025 FORGE Performance. All rights reserved.</span>
          <span>Built for athletes. Designed with discipline.</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                  */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div className="min-h-screen bg-void text-cream selection:bg-electric selection:text-void">
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Membership />
        <Facilities />
        <Training />
        <Classes />
        <Nutrition />
        <Transformations />
        <Trainers />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
