import { useEffect, useRef, useState } from "react";

const menuData = {
  espresso: [
    { name: "Espresso", origin: "Finca Las Nubes, Colombia", notes: "red currant · dark chocolate · panela", price: "6" },
    { name: "Gesha Shot", origin: "Santa Teresa, Costa Rica", notes: "jasmine · bergamot · honey", price: "11" },
    { name: "Cortado", origin: "Blend – Nubes / Yirga", notes: "caramel · hazelnut · silky", price: "7" },
    { name: "Flat White", origin: "House espresso + oat", notes: "toffee · macadamia · clean", price: "7.5" },
    { name: "Cappuccino", origin: "Seasonal espresso", notes: "vanilla pod · almond · velvet", price: "7" },
    { name: "Americano", origin: "Slow pulled, 38s", notes: "prune · cocoa nib · amber", price: "5.5" },
  ],
  filter: [
    { name: "V60", origin: "Yirgacheffe Lot 12, Ethiopia", notes: "apricot · earl grey · bright", price: "9" },
    { name: "Kalita Wave", origin: "Kayanza, Burundi", notes: "black cherry · brown sugar · round", price: "9" },
    { name: "Cold Drip", origin: "12-hour, Nubes washed", notes: "blackcurrant · cacao · silk", price: "10" },
    { name: "Batch Brew", origin: "Rotating single origin", notes: "changes daily – ask bar", price: "5" },
  ],
  signature: [
    { name: "Âme Tonic", origin: "Espresso · yuzu · sparkling", notes: "citrus bloom · clean finish", price: "9" },
    { name: "Shakerato Amaro", origin: "Cold shaken · chinotto", notes: "bitter orange · brown spice", price: "11" },
    { name: "Cascara Fizz", origin: "Coffee cherry tea · kombucha", notes: "hibiscus · tamarind · fizz", price: "8" },
    { name: "Noisette Latte", origin: "House hazelnut · oat", notes: "praline · sea salt · warm", price: "8.5" },
    { name: "Kyoto Slow", origin: "Iced tower · 8 hours", notes: "plum · molasses · velvet ice", price: "13" },
  ],
  pantry: [
    { name: "Almond Croissant", origin: "Maison Mel, baked am", notes: "frangipane · toasted", price: "6" },
    { name: "Cardamom Bun", origin: "Swedish – small batch", notes: "brown butter · pearl sugar", price: "5.5" },
    { name: "Olive Oil Cake", origin: "Lemon · thyme", notes: "moist crumb · olive finish", price: "7" },
    { name: "Sourdough Tartine", origin: "Comté · cultured butter", notes: "simple · perfect", price: "9" },
  ],
};

const farms = [
  {
    name: "Finca Las Nubes",
    region: "Huila, Colombia",
    alt: "1,820 m",
    varietal: "Pink Bourbon",
    process: "Washed · 48h",
    notes: "red currant / dark chocolate",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80&auto=format&fit=crop",
  },
  {
    name: "Yirgacheffe Lot 12",
    region: "Gedeb, Ethiopia",
    alt: "2,100 m",
    varietal: "74112 Heirloom",
    process: "Natural · 23d",
    notes: "apricot / earl grey / jasmine",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700&q=80&auto=format&fit=crop",
  },
  {
    name: "Santa Teresa",
    region: "Tarrazú, Costa Rica",
    alt: "1,650 m",
    varietal: "Gesha",
    process: "Honey · anaerobic",
    notes: "bergamot / honey / tropical",
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=700&q=80&auto=format&fit=crop",
  },
];

const baristas = [
  {
    name: "Elise Marot",
    role: "Head Roaster — Q Grader",
    city: "Paris → New York",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop&crop=faces",
  },
  {
    name: "Jonah Park",
    role: "Brew Director",
    city: "Copenhagen",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format&fit=crop&crop=faces",
  },
  {
    name: "Sana Okoro",
    role: "Sensory / Green Buyer",
    city: "Addis / NYC",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80&auto=format&fit=crop&crop=faces",
  },
  {
    name: "Luca Vitti",
    role: "Service Lead",
    city: "Milan → SoHo",
    img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80&auto=format&fit=crop&crop=faces",
  },
];

const journalPosts = [
  {
    kicker: "Roast Notes · Vol. 34",
    title: "Why we roast lighter than you expect",
    excerpt: "The science of development time, and why 9:12 is our magic number for Pink Bourbon.",
    img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=700&q=80&auto=format&fit=crop",
  },
  {
    kicker: "Origin Trip",
    title: "Three weeks in Gedeb",
    excerpt: "Visiting Lot 12, cupping 84 microlots, and learning to listen before we buy.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80&auto=format&fit=crop",
  },
  {
    kicker: "Brew Guide",
    title: "The Âme V60: 16g / 250g / 2:35",
    excerpt: "Our house recipe. 4 pours. No fuss. Everything we’ve learned in one page.",
    img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=700&q=80&auto=format&fit=crop",
  },
];

const testimonials = [
  {
    quote: "The most considered cup in New York. Elise’s Gesha is a quiet masterpiece — nothing showy, everything precise.",
    author: "Oliver Kent — Sprudge",
  },
  {
    quote: "Âme feels less like a café and more like a listening room. You come for the coffee, you stay for the calm.",
    author: "Marina Solís — The New York Times",
  },
  {
    quote: "They roast on Tuesdays. I plan my week around Wednesday morning.",
    author: "T. Harada — Regular, table 4",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuTab, setMenuTab] = useState<keyof typeof menuData>("espresso");
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // reveal on scroll
  useEffect(() => {
    const els = revealRefs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // testimonial auto rotate
  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 5200);
    return () => clearInterval(t);
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  };

  return (
    <div
      style={{
        fontFamily: '"Instrument Sans", system-ui, -apple-system, sans-serif',
        background: "#F9F5EF",
        color: "#201A16",
      }}
      className="antialiased overflow-x-hidden"
    >
      <style>{`
      :root {
        --cream: #F9F5EF;
        --oat: #F1E8DA;
        --paper: #FCFAF7;
        --espresso: #14100D;
        --espresso-soft: #1C1713;
        --copper: #C4834A;
        --copper-light: #D8A36A;
        --muted: #9B8674;
        --line: rgba(32,26,22,0.09);
        --line-light: rgba(249,245,239,0.13);
      }
      * { font-variant-ligatures: common-ligatures; }
      html { scroll-behavior: smooth; }
      body { margin:0; }
      .serif { font-family: "Fraunces", Georgia, serif; }
      .mono { font-family: "Fragment Mono", ui-monospace, monospace; }
      .is-reveal { opacity:0; transform: translateY(26px); transition: opacity .82s cubic-bezier(.22,1,.36,1), transform .82s cubic-bezier(.22,1,.36,1); }
      .is-reveal.is-in { opacity:1; transform: translateY(0); }
      .hr-copper { width: 46px; height:1px; background: var(--copper); }
      .kenburns { animation: ken 22s ease-in-out infinite alternate; }
      @keyframes ken { from{ transform: scale(1) translateX(0);} to{ transform: scale(1.06) translateX(-1.2%); } }
      .marquee-track { animation: marquee 38s linear infinite; }
      @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      .grain:before {
        content:"";
        position:absolute; inset:0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        opacity: .035; pointer-events:none; mix-blend-mode: multiply;
      }
      ::selection { background:#e9c998; color:#1b120c; }
      ::-webkit-scrollbar { width:6px; height:6px; }
      ::-webkit-scrollbar-thumb { background: #c4834a; }
      ::-webkit-scrollbar-track { background:#14100d; }
      input, select, textarea { font-family: inherit; }
      input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6); }
      `}</style>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-[15px]" : ""
        }`}
        style={{
          background: scrolled ? "rgba(20,16,13,0.93)" : "linear-gradient(180deg, rgba(20,16,13,0.56) 0%, rgba(20,16,13,0) 100%)",
          borderBottom: scrolled ? "1px solid rgba(196,131,74,0.13)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between h-[72px] md:h-[80px]">
          <a href="#" className="serif text-[28px] md:text-[30px] text-[#f7f1e7] tracking-[-0.014em]">
            ÂME<span className="text-[var(--copper)]">.</span>
          </a>

          <ul className="hidden lg:flex items-center gap-10 text-[11.5px] tracking-[0.21em] uppercase">
            <li><a href="#atelier" className="text-[#e8ddd0]/80 hover:text-[var(--copper-light)] transition-colors">Atelier</a></li>
            <li><a href="#coffee" className="text-[#e8ddd0]/80 hover:text-[var(--copper-light)] transition-colors">Coffee</a></li>
            <li><a href="#origin" className="text-[#e8ddd0]/80 hover:text-[var(--copper-light)] transition-colors">Origin</a></li>
            <li><a href="#journal" className="text-[#e8ddd0]/80 hover:text-[var(--copper-light)] transition-colors">Journal</a></li>
            <li><a href="#visit" className="text-[#e8ddd0]/80 hover:text-[var(--copper-light)] transition-colors">Visit</a></li>
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="hidden sm:inline-block text-[11px] tracking-[0.19em] uppercase bg-[var(--copper)] text-[#1a120c] px-5 py-[11px] font-[500] hover:bg-[var(--copper-light)] transition-colors"
            >
              Reserve seat
            </button>
            <button
              onClick={() => setMobileNav(!mobileNav)}
              className="lg:hidden text-[#e7dccb] text-[11px] mono tracking-wider"
            >
              {mobileNav ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>

        {/* mobile drawer */}
        {mobileNav && (
          <div className="lg:hidden border-t border-[rgba(196,131,74,0.14)] bg-[rgba(18,14,11,0.985)]">
            <div className="px-6 py-6 space-y-4 mono text-[11px] tracking-[0.18em] uppercase">
              {[
                ["Atelier", "#atelier"],
                ["Coffee", "#coffee"],
                ["Origin", "#origin"],
                ["Journal", "#journal"],
                ["Visit", "#visit"],
              ].map(([l, h]) => (
                <a key={l} href={h} onClick={() => setMobileNav(false)} className="block text-[#d6c5b0]">
                  {l}
                </a>
              ))}
              <button
                onClick={() => { setModalOpen(true); setMobileNav(false); }}
                className="w-full mt-2 bg-[var(--copper)] text-[#1a120c] py-3 tracking-[0.2em]"
              >
                Reserve seat
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SPLIT */}
      <section className="min-h-[100vh] grid lg:grid-cols-[1.06fr_1fr] bg-[#14100D]">
        {/* left image */}
        <div className="relative min-h-[54vh] lg:min-h-screen overflow-hidden">
          <div
            className="absolute inset-0 kenburns will-change-transform"
            style={{
              backgroundImage: `
                linear-gradient(110deg, rgba(16,12,9,0.48) 5%, rgba(16,12,9,0.14) 55%, rgba(16,12,9,0.55) 100%),
                url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1400&q=80&auto=format&fit=crop')
              `,
              backgroundSize: "cover",
              backgroundPosition: "center 62%",
            }}
          />
          <div className="absolute left-7 bottom-7 md:left-12 md:bottom-10 text-[10.5px] mono tracking-[0.24em] text-[#e6d9c6]/80 uppercase">
            SoHo — New York
          </div>
        </div>

        {/* right copy */}
        <div className="relative bg-[#14100D] text-[#F5EFE5] flex items-center grain">
          <div className="w-full px-7 sm:px-12 lg:px-[78px] py-24 lg:py-16">
            <div className="mono text-[10.5px] tracking-[0.32em] text-[var(--copper)] uppercase flex items-center gap-4 mb-8">
              <span>SoHo • Copenhagen • Est. 2016</span>
              <span className="hidden md:block w-10 h-px bg-[var(--copper)]/50" />
            </div>

            <h1 className="serif text-[52px] sm:text-[70px] lg:text-[84px] leading-[0.90] tracking-[-0.016em] font-[300]">
              Coffee is<br />
              a quiet<br />
              <em className="text-[var(--copper-light)] font-[350]">ritual</em>
            </h1>

            <p className="mt-7 max-w-[380px] text-[15.5px] leading-[1.82] text-[#d7c8b4]/74 font-[300]">
              Âme is a 24-seat coffee atelier in SoHo. We roast on Tuesdays, serve fifteen coffees at a time, and remember how you take yours by the third visit.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="px-7 py-[15px] bg-[var(--copper)] text-[#1c130a] text-[11.5px] tracking-[0.20em] uppercase font-[500] hover:bg-[var(--copper-light)] transition-colors"
              >
                Reserve a seat
              </button>
              <a
                href="#coffee"
                className="px-7 py-[15px] border border-[#e8ddcb]/25 text-[#e8ddcb] text-[11.5px] tracking-[0.20em] uppercase hover:border-[var(--copper)] hover:text-[var(--copper-light)] transition-colors"
              >
                Today’s roast
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-[11.5px] text-[#cdb79a]/76">
              <div className="mono tracking-[0.14em]">06:30 — 18:00 DAILY</div>
              <div className="mono tracking-[0.14em]">•</div>
              <div className="mono tracking-[0.14em]">34 Prince Street</div>
              <div className="mono tracking-[0.14em]">• 24 SEATS</div>
            </div>

            {/* subtle floating roast info */}
            <div className="mt-16 pt-6 border-t border-[#ecd9c0]/10 flex items-center gap-8 text-[11px] mono text-[#bda589]">
              <div><span className="text-[var(--copper)]">NOW POURING</span><br/>Pink Bourbon — Nubes</div>
              <div style={{opacity:.44}}>|</div>
              <div>ROAST #1,247<br/>TUE 06:18</div>
            </div>
          </div>

          {/* large watermark */}
          <div className="pointer-events-none select-none absolute -right-4 bottom-[-20px] serif text-[220px] lg:text-[310px] leading-none text-[#d9b078]/[0.038] tracking-[-0.05em]">
            Â
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[var(--copper)] text-[#1b120c] overflow-hidden py-[13px] border-y border-[#a86c36]">
        <div className="marquee-track flex w-max">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center shrink-0 mono text-[11px] tracking-[0.22em] uppercase">
              {[
                "Direct Trade",
                "Single Origin",
                "72-Hour Rest",
                "Q-Graded",
                "Small Batch Roast",
                "Water: 92°C / 140ppm",
                "No Syrups",
                "No Rush",
              ].map((t, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-9">{t}</span>
                  <span className="w-[4px] h-[4px] rounded-full bg-[#1b120c] opacity-80" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT / ATELIER */}
      <section id="atelier" className="bg-[var(--cream)] py-20 md:py-28 lg:py-[132px]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-[1.04fr_1fr] gap-14 lg:gap-24 items-center">
          {/* image stack */}
          <div ref={addReveal} className="is-reveal relative">
            <div className="relative h-[430px] md:h-[560px]">
              <div
                className="absolute right-0 top-0 w-[72%] h-[82%] shadow-[0_22px_60px_rgba(43,28,16,0.12)]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,.025), rgba(0,0,0,.08)), url(https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=80&auto=format&fit=crop) center/cover",
                }}
              />
              <div
                className="absolute left-0 bottom-0 w-[54%] h-[48%] border-[7px] border-[var(--cream)] shadow-[0_18px_44px_rgba(39,26,14,0.13)]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,.02), rgba(0,0,0,.10)), url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80&auto=format&fit=crop) center/cover",
                }}
              />
              {/* roaster badge */}
              <div className="absolute right-[-14px] md:right-[-16px] bottom-[54px] bg-[#191310] text-[#f7f0e4] px-[22px] py-[18px] text-center shadow-xl">
                <div className="serif text-[34px] leading-[1] text-[var(--copper-light)]">9</div>
                <div className="mono text-[8.5px] tracking-[0.22em] uppercase text-[#bfa487] mt-1">Years<br/>roasting</div>
              </div>
            </div>
          </div>

          {/* copy */}
          <div ref={addReveal} className="is-reveal">
            <div className="mono text-[10.5px] tracking-[0.32em] text-[var(--copper)] uppercase flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[var(--copper)]" />Our Atelier
            </div>
            <h2 className="serif text-[42px] md:text-[58px] leading-[0.98] tracking-[-0.017em] font-[350]">
              Slow roasted,<br />
              thoughtfully<br />
              <em className="text-[var(--copper)] font-[370]">served</em>
            </h2>
            <div className="hr-copper mt-7 mb-7" />
            <p className="text-[16px] leading-[1.95] text-[#463a2d] font-[300] max-w-[500px]">
              We roast twelve kilos at a time on a 1962 Probat in the back room. You can hear it from table six. The profile sheets are taped to the wall — not for show, for memory.
            </p>
            <p className="text-[16px] leading-[1.95] text-[#463a2d] font-[300] max-w-[500px] mt-4">
              Our coffees come from nine relationships, not brokers. We cup at origin, pay above Fair Trade, and publish every price. Less mystery. More trust.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-7 pt-8 border-t border-[var(--line)] max-w-[520px]">
              {[
                { n: "14", l: "Origins,\nactive" },
                { n: "1,247", l: "Roasts\nlogged" },
                { n: "4.97", l: "Avg\nrating" },
              ].map(s => (
                <div key={s.n}>
                  <div className="serif text-[30px] leading-none">{s.n}</div>
                  <div className="mono text-[9.5px] tracking-[0.18em] uppercase text-[#8b7460] mt-2 whitespace-pre-line">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COFFEE MENU */}
      <section id="coffee" className="bg-[#16110d] text-[#f4e9d7] py-20 md:py-28 lg:py-[128px] relative grain">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <div ref={addReveal} className="is-reveal">
              <div className="mono text-[10.5px] tracking-[0.32em] text-[var(--copper)] uppercase flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[var(--copper)]" />Seasonal Menu
              </div>
              <h2 className="serif text-[44px] md:text-[60px] leading-[0.98] tracking-[-0.018em] font-[320]">
                What we’re<br /><em className="text-[var(--copper-light)]">pouring today</em>
              </h2>
            </div>
            <div className="max-w-[360px] text-[14.5px] leading-[1.85] text-[#d0bfa6]/73 font-[300]">
              Fifteen coffees. Four brew methods. Roast date on every ticket. We change the menu when the beans tell us to — usually Thursdays.
            </div>
          </div>

          {/* tabs */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-[rgba(211,168,115,0.19)] mb-10">
            {[
              ["espresso", "Espresso Bar"],
              ["filter", "Filter"],
              ["signature", "Signature"],
              ["pantry", "Pantry"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setMenuTab(key as any)}
                className={`py-[14px] mono text-[10.7px] tracking-[0.22em] uppercase transition-colors border-b-2 -mb-px ${
                  menuTab === key
                    ? "text-[var(--copper-light)] border-[var(--copper)]"
                    : "text-[#c5b296]/64 border-transparent hover:text-[#e8d7bd]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* menu grid */}
          <div className="grid md:grid-cols-2 gap-[1px] bg-[rgba(208,163,106,0.09)]">
            {menuData[menuTab].map((item) => (
              <div
                key={item.name}
                className="bg-[#17120f] hover:bg-[#1a1410] transition-colors px-6 md:px-8 py-[28px] flex justify-between gap-6 border border-transparent hover:border-[rgba(196,131,74,0.19)]"
              >
                <div>
                  <div className="serif text-[21px] md:text-[22px] text-[#f4e8d5]">{item.name}</div>
                  <div className="mono text-[9.7px] tracking-[0.14em] uppercase text-[var(--copper)]/90 mt-1">{item.origin}</div>
                  <div className="text-[13.7px] text-[#cdb89b]/78 mt-[9px] font-[300]">{item.notes}</div>
                </div>
                <div className="serif text-[18px] text-[var(--copper-light)] shrink-0 pt-[2px]">
                  ${item.price}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-[11.5px] mono text-[#c6af90]">
            <span className="tracking-[0.14em]">ALL ESPRESSO · 38s · 19.5g in · 42g out</span>
            <span className="opacity-40">•</span>
            <span className="tracking-[0.14em]">WATER: 92°C · 140 TDS</span>
            <span className="opacity-40">•</span>
            <span className="tracking-[0.14em] text-[var(--copper)]">OAT / WHOLE / SKIM</span>
          </div>
        </div>
      </section>

      {/* ORIGIN / FARMS */}
      <section id="origin" className="bg-[var(--oat)] py-20 md:py-28 lg:py-[120px]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16">
          <div ref={addReveal} className="is-reveal text-center max-w-[640px] mx-auto mb-14">
            <div className="mono text-[10.5px] tracking-[0.32em] text-[var(--copper)] uppercase mb-5">Provenance</div>
            <h2 className="serif text-[44px] md:text-[56px] leading-[0.98] tracking-[-0.017em] font-[350]">
              Where our beans<br /><em className="text-[var(--copper)]">begin</em>
            </h2>
            <p className="mt-6 text-[15.7px] leading-[1.88] text-[#57493a] font-[300]">
              Three farms we visit every harvest. Prices published. Conversations ongoing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-[22px]">
            {farms.map((f) => (
              <div
                key={f.name}
                ref={addReveal}
                className="is-reveal bg-[var(--paper)] border border-[#e3d6c4] overflow-hidden hover:shadow-[0_24px_56px_rgba(45,28,14,0.06)] transition-shadow"
              >
                <div className="h-[236px] relative overflow-hidden">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,15,7,0.46)] via-[rgba(26,15,7,0.08)] to-transparent" />
                  <div className="absolute left-4 bottom-4 mono text-[10px] tracking-[0.18em] text-[#f6e8cf] uppercase bg-[rgba(20,14,9,0.52)] px-[10px] py-[6px] backdrop-blur-[3px]">
                    {f.region}
                  </div>
                </div>
                <div className="px-6 py-6">
                  <div className="serif text-[24px] tracking-[-0.009em]">{f.name}</div>
                  <div className="mt-4 grid grid-cols-2 gap-y-[10px] text-[12.6px] text-[#5a4632] font-[300]">
                    <div><span className="mono text-[9.5px] text-[#9c7d5b]">ALT</span><br/>{f.alt}</div>
                    <div><span className="mono text-[9.5px] text-[#9c7d5b]">VARIETAL</span><br/>{f.varietal}</div>
                    <div className="col-span-2"><span className="mono text-[9.5px] text-[#9c7d5b]">PROCESS</span><br/>{f.process}</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#e9dcc9] mono text-[10.5px] tracking-[0.08em] text-[#7b6247]">
                    {f.notes}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 mono text-[10.6px] tracking-[0.16em] text-[#957659]">
            2024 FARMGATE: $4.80–$28.40 / LB · FULL TRANSPARENCY SHEETS IN-STORE
          </div>
        </div>
      </section>

      {/* ROAST PROCESS */}
      <section className="bg-[var(--cream)] py-20 md:py-28">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-[1.08fr_.92fr] gap-14 lg:gap-24 items-start">
          <div ref={addReveal} className="is-reveal order-2 lg:order-1">
            <div className="mono text-[10.5px] tracking-[0.32em] text-[var(--copper)] uppercase flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[var(--copper)]" />The Roast
            </div>
            <h2 className="serif text-[40px] md:text-[52px] leading-[0.98] tracking-[-0.016em] font-[340] mb-9">
              The <em className="text-[var(--copper)]">ritual</em>
            </h2>
            {[
              { n:"01", t:"Green & cup", d:"We buy sealed 69kg bags, cup three times before commit. 84–89 point range." },
              { n:"02", t:"Profile design", d:"9 to 13 minute roast. Development ratio 18–24%. Every bean, a different curve." },
              { n:"03", t:"Rest", d:"72 hours minimum. CO₂ matters. We degas in steel, not plastic. Taste changes daily." },
              { n:"04", t:"Dial & serve", d:"Bar opens at 6:30. First shots are staff-only. If it’s not right, we pull again." },
            ].map((s) => (
              <div key={s.n} className="flex gap-[26px] py-[26px] border-b border-[var(--line)] first:border-t">
                <div className="mono text-[11px] text-[var(--copper)] mt-[4px]">{s.n}</div>
                <div>
                  <div className="serif text-[22px]">{s.t}</div>
                  <div className="text-[14.6px] text-[#5a4b3b] leading-[1.78] mt-[6px] font-[300] max-w-[430px]">{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div ref={addReveal} className="is-reveal order-1 lg:order-2">
            <div className="lg:sticky lg:top-[120px]">
              <div
                className="h-[370px] md:h-[520px] relative overflow-hidden"
                style={{
                  background: `linear-gradient(to bottom, rgba(255,244,230,0.02), rgba(39,21,8,.14)), url(https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=900&q=80&auto=format&fit=crop) center/cover`,
                }}
              />
              <div className="flex justify-between items-center mt-4 mono text-[10.5px] tracking-[0.12em] text-[#8a7260]">
                <span>PROBAT UG-22 · 1962 · HAMBURG</span>
                <span>12 KG / BATCH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BARISTAS */}
      <section className="bg-[#1a1410] text-[#f1e4cf] py-20 md:py-28">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16">
          <div ref={addReveal} className="is-reveal text-center mb-14">
            <div className="mono text-[10.5px] tracking-[0.32em] text-[var(--copper)] uppercase mb-4">The Team</div>
            <h2 className="serif text-[42px] md:text-[54px] leading-[0.97] tracking-[-0.018em]">Hands behind<br /><em className="text-[var(--copper-light)]">the bar</em></h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[28px]">
            {baristas.map((b) => (
              <div key={b.name} ref={addReveal} className="is-reveal group">
                <div className="relative overflow-hidden aspect-[3/3.65] bg-[#231b15]">
                  <img src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-[1.035] transition-transform duration-[700ms]" loading="lazy" />
                </div>
                <div className="pt-4 pb-1 border-t-[2px] border-transparent group-hover:border-[var(--copper)] transition-colors">
                  <div className="serif text-[19.5px] text-[#f7e9d1]">{b.name}</div>
                  <div className="mono text-[9.6px] tracking-[0.16em] uppercase text-[#c8ab84] mt-1">{b.role}</div>
                  <div className="text-[12.5px] text-[#d0b997]/66 mt-1">{b.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-[var(--oat)] py-20 md:py-24">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <div className="mono text-[10.5px] tracking-[0.3em] text-[var(--copper)] uppercase mb-7">Guest Notes</div>
          <div className="min-h-[150px] flex items-center justify-center">
            <div key={testimonialIdx} className="transition-opacity duration-500">
              <blockquote className="serif text-[26px] md:text-[33px] leading-[1.38] text-[#2f241a] font-[300] italic">
                “{testimonials[testimonialIdx].quote}”
              </blockquote>
              <div className="mono text-[10.5px] tracking-[0.18em] text-[#9a7350] uppercase mt-7">
                — {testimonials[testimonialIdx].author}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-9">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`testimonial ${i+1}`}
                onClick={() => setTestimonialIdx(i)}
                className={`h-[4px] rounded-full transition-all ${i === testimonialIdx ? "w-8 bg-[var(--copper)]" : "w-4 bg-[#c6a87f]/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 h-[220px] md:h-[340px] gap-[3px] bg-[#e7d8c2]">
        {[
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=700&q=80&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80&auto=format&fit=crop",
        ].map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden group"
            style={{ background: `url(${src}) center/cover` }}
          >
            <div className="absolute inset-0 bg-[#1a120c]/0 group-hover:bg-[#1a120c]/14 transition-colors" />
          </div>
        ))}
      </div>

      {/* JOURNAL */}
      <section id="journal" className="bg-[var(--paper)] py-20 md:py-28">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-baseline justify-between gap-6 flex-wrap mb-12">
            <h2 className="serif text-[38px] md:text-[50px] tracking-[-0.015em]">Journal</h2>
            <a href="#" className="mono text-[10.7px] tracking-[0.2em] uppercase text-[var(--copper)] hover:text-[#9b5f2a] transition-colors">All entries →</a>
          </div>

          <div className="grid md:grid-cols-3 gap-[28px]">
            {journalPosts.map((p) => (
              <article key={p.title} className="group cursor-pointer">
                <div className="aspect-[4/2.7] overflow-hidden bg-[#e9ddd0]">
                  <img src={p.img} className="w-full h-full object-cover group-hover:scale-[1.032] transition-transform duration-[650ms]" alt="" loading="lazy" />
                </div>
                <div className="pt-5">
                  <div className="mono text-[9.8px] tracking-[0.2em] uppercase text-[var(--copper)]">{p.kicker}</div>
                  <div className="serif text-[22px] leading-[1.25] mt-2">{p.title}</div>
                  <div className="text-[14.4px] text-[#5a4635] leading-[1.76] mt-[10px] font-[300]">{p.excerpt}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT / BOOKING */}
      <section id="visit" className="bg-[#18120f] text-[#f2e4cf]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28 grid lg:grid-cols-[.98fr_1.08fr] gap-14 lg:gap-20">
          <div ref={addReveal} className="is-reveal">
            <div className="mono text-[10.5px] tracking-[0.32em] text-[var(--copper)] uppercase mb-5">Visit</div>
            <h2 className="serif text-[44px] md:text-[54px] leading-[0.98] tracking-[-0.016em]">Come for<br />a <em className="text-[var(--copper-light)]">quiet cup</em></h2>
            <div className="hr-copper mt-7 mb-7" />
            <p className="text-[15.6px] leading-[1.9] text-[#dbc7ac]/82 max-w-[410px] font-[300]">
              24 seats. No laptops after 11am. No music before 9. We open at first light because that’s when the espresso is sweetest.
            </p>

            <div className="mt-11 space-y-[18px] text-[14px] text-[#e2cfb3]">
              <div className="flex gap-4">
                <span className="mono text-[10px] text-[#c69a6e] w-[76px] shrink-0">ADDRESS</span>
                <span>34 Prince Street, SoHo<br />New York, NY 10012</span>
              </div>
              <div className="flex gap-4">
                <span className="mono text-[10px] text-[#c69a6e] w-[76px] shrink-0">HOURS</span>
                <span>Daily 06:30 — 18:00<br />Roastery tours: Thu 16:00</span>
              </div>
              <div className="flex gap-4">
                <span className="mono text-[10px] text-[#c69a6e] w-[76px] shrink-0">CONTACT</span>
                <span>+1 (212) 858-0441<br />hello@ame-atelier.com</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 text-[11.7px] mono text-[#c8ac89]">
              <span>WALK-INS WELCOME</span>
              <span className="opacity-40">•</span>
              <span>TABLES HELD 10 MIN</span>
            </div>
          </div>

          {/* booking form */}
          <div ref={addReveal} className="is-reveal bg-[#1f1813] border border-[rgba(200,140,80,0.17)] px-7 md:px-10 py-9 md:py-10">
            <div className="serif text-[26px] mb-1 text-[#f6ead7]">Reserve a table</div>
            <div className="text-[13.6px] text-[#c5ac8d]/80 mb-7 font-[300]">Tasting bar seats 1–4. We confirm by SMS within an hour.</div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const name = String(fd.get("name") || "").trim();
                showToast(name ? `Thank you, ${name.split(" ")[0]}. We’ll text you shortly.` : "Reservation received.");
                (e.target as HTMLFormElement).reset();
              }}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="mono text-[9.7px] tracking-[0.22em] uppercase text-[#b49371]">Name</label>
                  <input name="name" required placeholder="Full name"
                    className="w-full bg-transparent border-0 border-b border-[rgba(205,148,86,0.30)] text-[#f3e4cd] py-[11px] text-[15px] outline-none focus:border-[var(--copper-light)] placeholder-[#b79b78]/45"
                  />
                </div>
                <div>
                  <label className="mono text-[9.7px] tracking-[0.22em] uppercase text-[#b49371]">Phone</label>
                  <input name="phone" placeholder="+1 …"
                    className="w-full bg-transparent border-0 border-b border-[rgba(205,148,86,0.30)] text-[#f3e4cd] py-[11px] text-[15px] outline-none focus:border-[var(--copper-light)] placeholder-[#b79b78]/45"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="mono text-[9.7px] tracking-[0.22em] uppercase text-[#b49371]">Date</label>
                  <input type="date" name="date" required
                    className="w-full bg-transparent border-0 border-b border-[rgba(205,148,86,0.30)] text-[#f3e4cd] py-[11px] text-[15px] outline-none focus:border-[var(--copper-light)]"
                  />
                </div>
                <div>
                  <label className="mono text-[9.7px] tracking-[0.22em] uppercase text-[#b49371]">Time</label>
                  <select name="time" defaultValue="09:00"
                    className="w-full bg-transparent border-0 border-b border-[rgba(205,148,86,0.30)] text-[#f3e4cd] py-[11px] text-[15px] outline-none focus:border-[var(--copper-light)]"
                  >
                    {["07:00","08:00","09:00","10:00","11:00","14:00","15:30"].map(t=>(
                      <option key={t} value={t} style={{background:"#231811"}}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mono text-[9.7px] tracking-[0.22em] uppercase text-[#b49371]">Guests</label>
                  <select name="guests" defaultValue="2"
                    className="w-full bg-transparent border-0 border-b border-[rgba(205,148,86,0.30)] text-[#f3e4cd] py-[11px] text-[15px] outline-none focus:border-[var(--copper-light)]"
                  >
                    {["1","2","3","4"].map(n=> <option key={n} style={{background:"#231811"}}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="mono text-[9.7px] tracking-[0.22em] uppercase text-[#b49371]">Notes</label>
                <input name="notes" placeholder="Pour-over preference, allergies…"
                  className="w-full bg-transparent border-0 border-b border-[rgba(205,148,86,0.30)] text-[#f3e4cd] py-[11px] text-[15px] outline-none focus:border-[var(--copper-light)] placeholder-[#b79b78]/45"
                />
              </div>

              <button className="w-full mt-2 py-[15px] bg-[var(--copper)] text-[#1b1108] text-[11.5px] tracking-[0.21em] uppercase font-[550] hover:bg-[var(--copper-light)] transition-colors">
                Request table
              </button>
              <div className="text-[11.7px] text-[#b99a77]/80 text-center mono">No deposit • Cancel anytime</div>
            </form>
          </div>
        </div>

        {/* shop strip */}
        <div className="border-t border-[#e8d7c0]/10">
          <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="mono text-[10px] tracking-[0.28em] text-[var(--copper)] uppercase">Beans to take home</div>
              <div className="serif text-[24px] text-[#f1e1c9] mt-1">This week: Pink Bourbon · Yirga Lot 12 · Gesha Honey</div>
            </div>
            <div className="flex gap-3">
              <a href="#coffee" className="px-5 py-[12px] border border-[#e7d3b5]/34 text-[#e7d3b5] text-[11px] tracking-[0.18em] uppercase hover:border-[var(--copper)] transition-colors">Shop beans</a>
              <button onClick={()=>showToast("Wholesale form sent to hello@ame-atelier.com")} className="px-5 py-[12px] bg-[#f3e7d2] text-[#1b120c] text-[11px] tracking-[0.18em] uppercase font-[500]">Wholesale</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#120d0a] text-[#d6c2a6] border-t border-[#2a1f18]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16 py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="serif text-[30px] text-[#f4e5cc]">ÂME<span className="text-[var(--copper)]">.</span></div>
            <p className="mt-4 max-w-[340px] text-[14.4px] leading-[1.8] text-[#c3a885]/82 font-[300]">
              24-seat coffee atelier. Roasting Tuesdays since 2016. SoHo, New York — Copenhagen.
            </p>
            <div className="mt-6 mono text-[10.6px] tracking-[0.14em] text-[#b9936a]">
              HELLO@AME-ATELIER.COM · +1 (212) 858-0441
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="mono text-[10px] tracking-[0.24em] uppercase text-[var(--copper)] mb-4">Navigate</div>
            <ul className="space-y-[10px] text-[14px] text-[#d3bb97]">
              <li><a href="#atelier" className="hover:text-[#f2e1c6]">Atelier</a></li>
              <li><a href="#coffee" className="hover:text-[#f2e1c6]">Coffee</a></li>
              <li><a href="#origin" className="hover:text-[#f2e1c6]">Origin</a></li>
              <li><a href="#journal" className="hover:text-[#f2e1c6]">Journal</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="mono text-[10px] tracking-[0.24em] uppercase text-[var(--copper)] mb-4">Hours</div>
            <ul className="space-y-[7px] text-[13.6px] text-[#c8aa86] font-[300]">
              <li>Daily 06:30 – 18:00</li>
              <li>Roastery tours Thu 16:00</li>
              <li>Closed: Christmas Day</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="mono text-[10px] tracking-[0.24em] uppercase text-[var(--copper)] mb-4">Roast letter</div>
            <form
              onSubmit={(e) => { e.preventDefault(); showToast("Welcome to the roast letter."); (e.target as HTMLFormElement).reset(); }}
              className="flex"
            >
              <input
                required type="email" placeholder="email"
                className="flex-1 bg-transparent border-b border-[#b5844f]/46 text-[#edd7b8] py-[9px] text-[14px] outline-none placeholder-[#c29d75]/58"
              />
              <button className="mono text-[10.6px] tracking-[0.18em] ml-4 text-[var(--copper-light)] uppercase">Join</button>
            </form>
            <div className="text-[11.8px] text-[#b69571]/78 mt-3 font-[300]">
              Tuesday roast notes. Farm prices. New drops first.
            </div>
          </div>
        </div>

        <div className="border-t border-[#251a13] py-6 px-6 md:px-12 lg:px-16 max-w-[1180px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11.4px] text-[#a38463]">
          <div className="mono tracking-[0.08em]">© 2026 ÂME Atelier LLC — 34 Prince Street, New York</div>
          <div className="flex gap-6 mono tracking-[0.08em]">
            <a href="#" className="hover:text-[#d8b687]">Instagram</a>
            <a href="#" className="hover:text-[#d8b687]">Wholesale</a>
            <a href="#" className="hover:text-[#d8b687]">Press Kit</a>
            <span>Privacy</span>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center px-5"
          aria-modal="true" role="dialog"
        >
          <div
            className="absolute inset-0 bg-[#0d0906]/85 backdrop-blur-[7px]"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative w-full max-w-[520px] bg-[#201712] border border-[rgba(199,131,74,0.22)] px-8 md:px-10 py-9 shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-5 top-4 text-[#be9b73] text-[23px] leading-none hover:text-[#e3c298]"
              aria-label="Close"
            >
              ×
            </button>
            <div className="serif text-[30px] text-[#f6e6ce]">Reserve a seat</div>
            <div className="text-[13.6px] text-[#c9a77a]/90 mt-1 mb-7 font-[300]">Tasting bar · 24 seats · we confirm by SMS.</div>

            <form
              onSubmit={(e)=>{
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setModalOpen(false);
                showToast(`Table held, ${String(fd.get("m_name") || "friend").split(" ")[0]}. See you soon.`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="mono text-[9.6px] tracking-[0.22em] uppercase text-[#be9570]">Name</label>
                <input name="m_name" required className="w-full bg-transparent border-b border-[rgba(204,147,84,0.32)] text-[#f3e4cd] py-[10px] outline-none focus:border-[var(--copper-light)]" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="mono text-[9.6px] tracking-[0.22em] uppercase text-[#be9570]">Date</label>
                  <input type="date" name="m_date" required className="w-full bg-transparent border-b border-[rgba(204,147,84,0.32)] text-[#f3e4cd] py-[10px] outline-none focus:border-[var(--copper-light)]" />
                </div>
                <div>
                  <label className="mono text-[9.6px] tracking-[0.22em] uppercase text-[#be9570]">Time</label>
                  <select name="m_time" defaultValue="09:00" className="w-full bg-transparent border-b border-[rgba(204,147,84,0.32)] text-[#f3e4cd] py-[10px] outline-none">
                    {["07:30","08:30","09:30","10:30","15:00"].map(t=> <option key={t} style={{background:"#231811"}}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="mono text-[9.6px] tracking-[0.22em] uppercase text-[#be9570]">Guests</label>
                <select name="m_guests" defaultValue="2" className="w-full bg-transparent border-b border-[rgba(204,147,84,0.32)] text-[#f3e4cd] py-[10px] outline-none">
                  <option style={{background:"#231811"}}>1</option>
                  <option style={{background:"#231811"}}>2</option>
                  <option style={{background:"#231811"}}>3</option>
                  <option style={{background:"#231811"}}>4</option>
                </select>
              </div>
              <button className="w-full py-[14px] bg-[var(--copper)] text-[#1b1108] text-[11.5px] tracking-[0.2em] uppercase font-[600] hover:bg-[var(--copper-light)] transition-colors mt-2">
                Confirm hold
              </button>
              <div className="text-center mono text-[10.3px] text-[#b99169] tracking-[0.03em]">We’ll text you within 45 minutes · 06:30–18:00</div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[95] transition-all duration-300 ${toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
      >
        <div className="bg-[#f6e9d5] text-[#22150d] px-5 py-3 shadow-xl text-[13.5px] border border-[#e4c79f] mono">
          {toast}
        </div>
      </div>
    </div>
  );
}