import { useEffect, useState } from "react";

/* ============================================================
   FOLIANT & SONS — Antiquarian Booksellers
   A literary, page-textured bookshop template
   ============================================================ */

const BOOKS = [
  {
    id: "001.A",
    title: "The Garden of Forking Paths",
    author: "Jorge Luis Borges",
    year: 1941,
    binding: "First Edition, Buenos Aires",
    price: 2400,
    cat: "Fiction",
    color: "#7A1F2B",
    spine: "#5C161F",
  },
  {
    id: "147.C",
    title: "Letters to a Young Poet",
    author: "Rainer Maria Rilke",
    year: 1929,
    binding: "Half-calf, gilt edges",
    price: 680,
    cat: "Poetry",
    color: "#2F4A3A",
    spine: "#22382B",
  },
  {
    id: "302.K",
    title: "A Treatise on Light",
    author: "Christiaan Huygens",
    year: 1690,
    binding: "Vellum, Leiden printing",
    price: 8400,
    cat: "Science",
    color: "#1F3A52",
    spine: "#16293C",
  },
  {
    id: "088.F",
    title: "The Histories",
    author: "Herodotus of Halicarnassus",
    year: 1858,
    binding: "Three-quarter morocco",
    price: 1450,
    cat: "Antiquity",
    color: "#8B5A2B",
    spine: "#6E4622",
  },
  {
    id: "211.M",
    title: "Mrs Dalloway",
    author: "Virginia Woolf",
    year: 1925,
    binding: "Hogarth Press, first issue",
    price: 3200,
    cat: "Fiction",
    color: "#4A2C5A",
    spine: "#372043",
  },
  {
    id: "419.S",
    title: "Travels in Arabia Deserta",
    author: "Charles M. Doughty",
    year: 1888,
    binding: "Two volumes, Cambridge",
    price: 1980,
    cat: "Travel",
    color: "#6B4423",
    spine: "#50331A",
  },
];

const JOURNAL = [
  {
    date: "March, MMXXVI",
    title: "On the Quiet Pleasure of Marginalia",
    excerpt:
      "A pencil mark left in 1923, a pressed violet between pages 142 and 143 — the secret history of a book is rarely the one printed on its spine.",
    minutes: 6,
  },
  {
    date: "February, MMXXVI",
    title: "Acquisitions from the Estate of Dr. Henry Aldous",
    excerpt:
      "Forty-three volumes have arrived from a private library in Edinburgh, including a remarkable annotated copy of Hume's Treatise.",
    minutes: 9,
  },
  {
    date: "January, MMXXVI",
    title: "How to Read a Binding",
    excerpt:
      "Before the words, before the title page — the binding has already told you everything about how the book has been loved.",
    minutes: 4,
  },
];

const HOURS = [
  ["Tuesday — Friday", "10:00 — 18:30"],
  ["Saturday", "10:00 — 17:00"],
  ["Sunday", "12:00 — 16:00"],
  ["Monday", "By appointment"],
];

export default function App() {
  return (
    <div className="font-[Fraunces,serif] bg-[#F3EAD6] text-[#231C12] selection:bg-[#7A1F2B] selection:text-[#F3EAD6]">
      <PaperBackground />
      <Nav />
      <Hero />
      <TickerStrip />
      <About />
      <Catalogue />
      <BookOfMonth />
      <Journal />
      <Services />
      <Testimonial />
      <Visit />
      <Footer />
    </div>
  );
}

/* ============================================================
   Paper / page texture overlay (SVG, fixed, very subtle)
   ============================================================ */
function PaperBackground() {
  return (
    <>
      <svg className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.55] mix-blend-multiply">
        <filter id="paperNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            values="0 0 0 0 0.42
                    0 0 0 0 0.32
                    0 0 0 0 0.18
                    0 0 0 0.08 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#paperNoise)" />
      </svg>
      {/* warm vignette */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{
        background:
          "radial-gradient(ellipse at center, transparent 40%, rgba(80,55,20,0.18) 100%)",
      }} />
    </>
  );
}

/* ============================================================
   Navigation
   ============================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F3EAD6]/95 backdrop-blur-md py-3 border-b border-[#231C12]/15"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 md:px-14">
        <a href="#" className="flex items-baseline gap-2 group">
          <span className="font-[Fraunces] italic text-2xl md:text-[1.7rem] tracking-tight text-[#231C12]">
            Foliant
          </span>
          <span className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#7A1F2B] mt-1">
            & sons
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10 font-[DM_Mono] text-[0.65rem] tracking-[0.22em] uppercase">
          {["Catalogue", "Journal", "Services", "Visit"].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="text-[#231C12]/70 hover:text-[#7A1F2B] transition-colors relative
                           after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#7A1F2B]
                           hover:after:w-full after:transition-all"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#visit"
          className="hidden md:inline-flex items-center gap-2 border border-[#231C12] px-5 py-2.5
                     font-[DM_Mono] text-[0.62rem] tracking-[0.22em] uppercase text-[#231C12]
                     hover:bg-[#231C12] hover:text-[#F3EAD6] transition-colors"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7A1F2B]" />
          Enquire
        </a>
      </div>
    </nav>
  );
}

/* ============================================================
   HERO — opens like a book
   ============================================================ */
function Hero() {
  return (
    <section className="relative z-10 min-h-screen overflow-hidden pt-32 pb-20 md:pt-40">
      <div className="mx-auto max-w-[1400px] px-8 md:px-14">
        {/* Top meta row */}
        <div className="flex items-center justify-between font-[DM_Mono] text-[0.62rem] tracking-[0.3em] uppercase text-[#231C12]/60 mb-10 md:mb-20">
          <span>Vol. CXXXIX · No. 4</span>
          <span className="hidden md:inline">An Antiquarian Bookshop</span>
          <span>Bloomsbury, London</span>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          {/* Title block */}
          <div className="col-span-12 md:col-span-8">
            <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.3em] uppercase text-[#7A1F2B] mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#7A1F2B]" />
              Established MDCCCLXXXVII
            </div>
            <h1 className="font-[Fraunces] font-normal leading-[0.92] tracking-[-0.02em] text-[#231C12]"
                style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}>
              A house<br />
              <span className="italic text-[#7A1F2B]">of</span> rare books<br />
              <span className="text-[#231C12]/40">&amp; quiet rooms.</span>
            </h1>
          </div>

          {/* Right column - chapter card */}
          <div className="col-span-12 md:col-span-4 md:pb-4">
            <div className="border-l border-[#231C12]/25 pl-6">
              <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.3em] uppercase text-[#231C12]/50 mb-3">
                — Foreword
              </div>
              <p className="font-[EB_Garamond] text-[1.05rem] md:text-[1.1rem] leading-[1.7] text-[#231C12]/85 italic">
                "We have kept this shop for one hundred and thirty‑nine years on the simple conviction that a book, properly chosen, is the truest companion a person can possess."
              </p>
              <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.2em] uppercase text-[#231C12]/55 mt-5">
                — Henry T. Foliant, 1903
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row — actions + spec sheet */}
        <div className="mt-16 md:mt-24 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-6 flex flex-wrap gap-4">
            <a
              href="#catalogue"
              className="group inline-flex items-center gap-3 bg-[#231C12] text-[#F3EAD6] px-7 py-4
                         font-[DM_Mono] text-[0.65rem] tracking-[0.25em] uppercase
                         hover:bg-[#7A1F2B] transition-colors"
            >
              Browse the Catalogue
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#journal"
              className="inline-flex items-center gap-3 border border-[#231C12] px-7 py-4
                         font-[DM_Mono] text-[0.65rem] tracking-[0.25em] uppercase text-[#231C12]
                         hover:bg-[#231C12]/5 transition-colors"
            >
              Read the Journal
            </a>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="grid grid-cols-3 gap-px bg-[#231C12]/20 border border-[#231C12]/20">
              {[
                ["12,400", "Volumes"],
                ["1887", "Founded"],
                ["Bloomsbury", "London WC1"],
              ].map(([n, l]) => (
                <div key={l} className="bg-[#F3EAD6] px-4 py-5">
                  <div className="font-[Fraunces] text-xl md:text-2xl text-[#231C12]">{n}</div>
                  <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.25em] uppercase text-[#231C12]/55 mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Giant page-fold number */}
      <div className="pointer-events-none absolute -bottom-12 md:-bottom-24 right-2 md:right-10 font-[Fraunces] italic text-[#231C12]/[0.06] leading-none select-none"
           style={{ fontSize: "clamp(180px, 30vw, 460px)" }}>
        I
      </div>

      {/* Page number bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#231C12]/50">
        — i —
      </div>
    </section>
  );
}

/* ============================================================
   Ticker / marquee strip
   ============================================================ */
function TickerStrip() {
  const items = [
    "Newly Acquired · The Library of Dr. H. Aldous",
    "Open Saturday until 17:00",
    "Bookbinding workshop · 14 April",
    "First edition Woolf available on request",
    "Free valuations every Wednesday",
    "Catalogue 49 now in print",
  ];
  return (
    <div className="relative z-10 bg-[#231C12] text-[#F3EAD6] py-4 overflow-hidden border-y border-[#231C12]">
      <div className="flex gap-12 whitespace-nowrap animate-[ticker_45s_linear_infinite]">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-[DM_Mono] text-[0.7rem] tracking-[0.22em] uppercase inline-flex items-center gap-12 shrink-0">
            {t}
            <span className="inline-block h-1 w-1 rounded-full bg-[#C6A14A]" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   ABOUT — opens like a chapter
   ============================================================ */
function About() {
  return (
    <section className="relative z-10 py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-8 md:px-14">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          {/* Left: chapter heading */}
          <div className="col-span-12 md:col-span-5">
            <div className="sticky top-32">
              <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#7A1F2B] mb-4">
                Chapter II — The House
              </div>
              <h2 className="font-[Fraunces] font-normal leading-[1.02] tracking-[-0.01em] text-[#231C12]"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
                A bookshop is not<br />
                a shop. It is a <span className="italic text-[#7A1F2B]">room</span><br />
                with opinions.
              </h2>

              <div className="mt-12 flex items-center gap-6 border-t border-[#231C12]/20 pt-8">
                <Seal />
                <div>
                  <div className="font-[Fraunces] italic text-lg text-[#231C12]">Henry T. Foliant</div>
                  <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.2em] uppercase text-[#231C12]/55 mt-1">
                    Founder · Antiquarian
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: body */}
          <div className="col-span-12 md:col-span-7 font-[EB_Garamond] text-[1.05rem] md:text-[1.15rem] leading-[1.85] text-[#231C12]/85">
            <p className="first-letter:float-left first-letter:font-[Fraunces] first-letter:text-[5.5rem] first-letter:leading-[0.85] first-letter:pr-3 first-letter:pt-2 first-letter:text-[#7A1F2B]">
              In the spring of 1887, Henry Foliant returned from a long apprenticeship in Edinburgh with three crates of books, a small inheritance, and the conviction that London required one more bookshop. He took a lease on a narrow building on Cecil Court — three storeys of creaking floorboards, a coal fire, and a single brass bell — and put up a sign in his own hand.
            </p>
            <p className="mt-6">
              That same building is, with minor modifications and a great deal of dust, the shop you may visit today. Four generations of Foliants have stood behind the same oak counter. We have acquired and sold the libraries of poets, prime ministers, and at least one notable forger.
            </p>
            <p className="mt-6">
              We deal principally in first editions of English literature from 1780 to 1960, voyages and travels, the natural sciences before Darwin, and any book — in any subject — that we judge to have been made with love.
            </p>

            {/* footnote */}
            <div className="mt-14 pt-6 border-t border-dashed border-[#231C12]/30 font-[DM_Mono] text-[0.7rem] tracking-wide text-[#231C12]/55 leading-relaxed">
              <span className="text-[#7A1F2B]">¹</span> We do not stock new fiction, business titles, or any book printed on paper which has been bleached white. We do this not out of pretension, but because we are old.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Seal() {
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-[#7A1F2B]">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
        <text x="50" y="46" textAnchor="middle" fill="currentColor"
              fontFamily="Fraunces, serif" fontStyle="italic" fontSize="20">F</text>
        <text x="50" y="60" textAnchor="middle" fill="currentColor"
              fontFamily="DM Mono, monospace" fontSize="5" letterSpacing="1">1887</text>
        <text x="50" y="78" textAnchor="middle" fill="currentColor"
              fontFamily="DM Mono, monospace" fontSize="4" letterSpacing="1.5">LONDON</text>
      </svg>
    </div>
  );
}

/* ============================================================
   CATALOGUE — book grid with spines
   ============================================================ */
function Catalogue() {
  const [filter, setFilter] = useState<string>("All");
  const cats = ["All", "Fiction", "Poetry", "Science", "Antiquity", "Travel"];
  const list = BOOKS.filter((b) => filter === "All" || b.cat === filter);

  return (
    <section id="catalogue" className="relative z-10 bg-[#231C12] text-[#F3EAD6] py-28 md:py-36">
      {/* paper -> board transition */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="boardNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 0.9  0 0 0 0 0.7  0 0 0 0.4 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#boardNoise)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-8 md:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14">
          <div>
            <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#C6A14A] mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C6A14A]" /> Catalogue No. 49
            </div>
            <h2 className="font-[Fraunces] font-normal leading-[1.02] tracking-[-0.01em]"
                style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)" }}>
              Selected <span className="italic text-[#C6A14A]">acquisitions</span>,<br />
              this season.
            </h2>
          </div>
          <p className="font-[EB_Garamond] text-base md:text-lg leading-relaxed text-[#F3EAD6]/65 max-w-sm italic">
            A small selection from the shelves. Our complete inventory is held in the catalogue room; do call ahead.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1 mb-12 border-b border-[#F3EAD6]/15 pb-4">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`font-[DM_Mono] text-[0.62rem] tracking-[0.22em] uppercase px-4 py-2 transition-colors ${
                filter === c
                  ? "bg-[#C6A14A] text-[#231C12]"
                  : "text-[#F3EAD6]/55 hover:text-[#C6A14A]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Book grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F3EAD6]/10">
          {list.map((b, i) => (
            <BookCard key={b.id} book={b} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#visit"
            className="inline-flex items-center gap-3 border border-[#C6A14A]/60 px-7 py-4 text-[#C6A14A]
                       font-[DM_Mono] text-[0.65rem] tracking-[0.25em] uppercase hover:bg-[#C6A14A] hover:text-[#231C12] transition-colors"
          >
            Request full catalogue (.pdf, 184pp) →
          </a>
        </div>
      </div>
    </section>
  );
}

function BookCard({ book, index }: { book: typeof BOOKS[number]; index: number }) {
  return (
    <article
      className="group relative bg-[#231C12] p-8 md:p-10 hover:bg-[#2A2218] transition-colors"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Catalogue card pin */}
      <div className="absolute top-4 right-4 font-[DM_Mono] text-[0.55rem] tracking-[0.25em] uppercase text-[#F3EAD6]/40">
        № {book.id}
      </div>

      <div className="flex gap-7">
        {/* Spine illustration */}
        <div className="shrink-0 relative">
          <div
            className="h-44 w-12 md:h-52 md:w-14 shadow-[4px_4px_0_rgba(0,0,0,0.4)] relative overflow-hidden
                       transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-1"
            style={{
              background: `linear-gradient(90deg, ${book.spine} 0%, ${book.color} 30%, ${book.color} 70%, ${book.spine} 100%)`,
            }}
          >
            {/* gilt bands */}
            <div className="absolute top-6 left-0 right-0 h-px bg-[#C6A14A]/60" />
            <div className="absolute top-8 left-0 right-0 h-px bg-[#C6A14A]/40" />
            <div className="absolute bottom-6 left-0 right-0 h-px bg-[#C6A14A]/60" />
            <div className="absolute bottom-8 left-0 right-0 h-px bg-[#C6A14A]/40" />

            {/* title on spine */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-[Fraunces] text-[0.6rem] tracking-[0.2em] uppercase text-[#C6A14A] [writing-mode:vertical-rl] rotate-180 text-center max-h-32 truncate">
                {book.title}
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.3em] uppercase text-[#C6A14A] mb-2">
            {book.cat} · {book.year}
          </div>
          <h3 className="font-[Fraunces] text-xl md:text-2xl leading-tight text-[#F3EAD6] mb-1">
            {book.title}
          </h3>
          <p className="font-[EB_Garamond] italic text-[#F3EAD6]/70 mb-5">{book.author}</p>

          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.1em] text-[#F3EAD6]/55 leading-relaxed mb-6 pb-5 border-b border-[#F3EAD6]/15">
            {book.binding}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="font-[DM_Mono] text-[0.5rem] tracking-[0.3em] uppercase text-[#F3EAD6]/40 mb-1">
                Offered at
              </div>
              <div className="font-[Fraunces] text-2xl text-[#C6A14A]">
                £{book.price.toLocaleString()}
              </div>
            </div>
            <button className="font-[DM_Mono] text-[0.6rem] tracking-[0.22em] uppercase text-[#F3EAD6]/60 hover:text-[#C6A14A] transition-colors border-b border-[#F3EAD6]/20 hover:border-[#C6A14A] pb-1">
              Enquire →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   BOOK OF THE MONTH — large editorial spread
   ============================================================ */
function BookOfMonth() {
  return (
    <section className="relative z-10 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-8 md:px-14">
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Big book mockup */}
          <div className="col-span-12 md:col-span-6 relative">
            <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#7A1F2B] mb-6">
              — Book of the Month —
            </div>

            {/* book */}
            <div className="relative mx-auto max-w-md aspect-[3/4] perspective-1000">
              {/* back shadow */}
              <div className="absolute inset-3 bg-[#231C12]/20 blur-2xl translate-x-4 translate-y-6" />
              {/* spine */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#3A1116]" />
              {/* front cover */}
              <div
                className="absolute inset-0 left-3 shadow-[8px_8px_0_rgba(35,28,18,0.25)] flex flex-col justify-between p-10"
                style={{
                  background:
                    "linear-gradient(140deg, #5C161F 0%, #7A1F2B 50%, #5C161F 100%)",
                }}
              >
                {/* ornamental border */}
                <div className="absolute inset-5 border border-[#C6A14A]/50 pointer-events-none" />
                <div className="absolute inset-6 border border-[#C6A14A]/25 pointer-events-none" />

                {/* gilt corners */}
                {["top-3 left-3", "top-3 right-3 rotate-90", "bottom-3 left-3 -rotate-90", "bottom-3 right-3 rotate-180"].map((p) => (
                  <svg key={p} className={`absolute ${p} h-6 w-6 text-[#C6A14A]/70`} viewBox="0 0 24 24" fill="none">
                    <path d="M2 2 L10 2 M2 2 L2 10 M2 2 Q6 6 10 10" stroke="currentColor" strokeWidth="0.8" />
                  </svg>
                ))}

                <div className="relative text-center pt-6">
                  <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.4em] uppercase text-[#C6A14A] mb-2">
                    Foliant & Sons
                  </div>
                  <div className="h-px w-12 mx-auto bg-[#C6A14A]/50" />
                </div>

                <div className="relative text-center">
                  <div className="font-[Fraunces] italic text-3xl md:text-4xl leading-tight text-[#F3EAD6]">
                    The<br />Wandering<br />Hours
                  </div>
                  <div className="my-5 flex items-center justify-center gap-2 text-[#C6A14A]/60">
                    <span className="h-px w-8 bg-current" />
                    <span>✦</span>
                    <span className="h-px w-8 bg-current" />
                  </div>
                  <div className="font-[EB_Garamond] italic text-[#F3EAD6]/80 text-sm tracking-wide">
                    Eleanor Vance
                  </div>
                </div>

                <div className="relative text-center">
                  <div className="font-[DM_Mono] text-[0.5rem] tracking-[0.4em] uppercase text-[#C6A14A]/70">
                    MCMXXIX
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="col-span-12 md:col-span-6">
            <div className="border-l-2 border-[#7A1F2B] pl-8">
              <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.3em] uppercase text-[#231C12]/50 mb-3">
                Recommended by Mrs. C. Foliant
              </div>
              <h2 className="font-[Fraunces] leading-[1.05] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}>
                <span className="italic">The Wandering</span><br />Hours, 1929.
              </h2>
              <p className="font-[EB_Garamond] text-lg md:text-xl leading-[1.8] text-[#231C12]/85 mt-8 italic">
                "A book of hours for the secular age — Vance's prose is built like the cathedrals she so loved: every sentence a small arch, every chapter a quiet nave."
              </p>
              <p className="font-[EB_Garamond] text-base md:text-lg leading-[1.85] text-[#231C12]/75 mt-6">
                A scarce first issue in original boards, with the corrected errata slip tipped in. Spine sunned to a softer rose; internally crisp, with only the faintest foxing to the half-title. A near-fine example of one of the small masterpieces of the inter-war years.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-px bg-[#231C12]/20 border border-[#231C12]/20 max-w-md">
                {[
                  ["£1,840", "Offered"],
                  ["256pp", "Octavo"],
                  ["1 of 600", "Issue"],
                ].map(([n, l]) => (
                  <div key={l} className="bg-[#F3EAD6] px-5 py-4">
                    <div className="font-[Fraunces] text-xl text-[#231C12]">{n}</div>
                    <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.25em] uppercase text-[#231C12]/55 mt-1">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   JOURNAL — newspaper-style entries
   ============================================================ */
function Journal() {
  return (
    <section id="journal" className="relative z-10 py-28 md:py-36 border-y border-[#231C12]/15">
      <div className="mx-auto max-w-[1400px] px-8 md:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 pb-8 border-b-2 border-[#231C12]">
          <div>
            <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#7A1F2B] mb-3">
              — From the Journal —
            </div>
            <h2 className="font-[Fraunces] leading-[1.02] tracking-[-0.01em]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
              Notes <span className="italic">from the</span><br />reading room.
            </h2>
          </div>
          <a href="#" className="font-[DM_Mono] text-[0.65rem] tracking-[0.25em] uppercase text-[#231C12]/65 hover:text-[#7A1F2B] border-b border-[#231C12]/30 hover:border-[#7A1F2B] pb-1 self-start md:self-end">
            All entries (47) →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#231C12]/20">
          {JOURNAL.map((entry, i) => (
            <article key={i} className="bg-[#F3EAD6] p-8 md:p-10 group hover:bg-[#EBE0C8] transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#231C12]/20">
                <span className="font-[DM_Mono] text-[0.6rem] tracking-[0.25em] uppercase text-[#231C12]/55">
                  {entry.date}
                </span>
                <span className="font-[DM_Mono] text-[0.55rem] tracking-[0.2em] uppercase text-[#7A1F2B]">
                  {entry.minutes} min read
                </span>
              </div>

              <h3 className="font-[Fraunces] text-2xl md:text-[1.7rem] leading-tight text-[#231C12] mb-5 group-hover:text-[#7A1F2B] transition-colors">
                {entry.title}
              </h3>

              <p className="font-[EB_Garamond] text-base leading-[1.8] text-[#231C12]/75 italic">
                {entry.excerpt}
              </p>

              <div className="mt-8 font-[DM_Mono] text-[0.6rem] tracking-[0.25em] uppercase text-[#231C12]/55 group-hover:text-[#7A1F2B] transition-colors">
                Continue reading →
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES — what we do, in restrained list form
   ============================================================ */
function Services() {
  const services = [
    {
      n: "I",
      t: "Acquisition & Valuation",
      d: "We purchase single volumes and entire libraries. House visits arranged across the United Kingdom; written valuations for probate and insurance.",
    },
    {
      n: "II",
      t: "Restoration & Binding",
      d: "Our in-house binder repairs hinges, restores boards, and creates bespoke clamshell boxes. Conservation work is undertaken on a strictly reversible basis.",
    },
    {
      n: "III",
      t: "Search Service",
      d: "If we do not have the book you seek, we will find it. Our network of trusted dealers spans London, Paris, New York, and Tokyo.",
    },
    {
      n: "IV",
      t: "Private Reading Room",
      d: "Members may reserve our first-floor reading room for solitary study, with access to our reference library and a pot of tea.",
    },
  ];

  return (
    <section id="services" className="relative z-10 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-8 md:px-14">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-32">
              <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#7A1F2B] mb-4">
                Chapter IV — Services
              </div>
              <h2 className="font-[Fraunces] leading-[1.02] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>
                What the<br /><span className="italic text-[#7A1F2B]">shop</span> offers.
              </h2>
              <p className="font-[EB_Garamond] italic text-lg leading-[1.8] text-[#231C12]/70 mt-6 max-w-sm">
                Beyond the books on the shelves, we offer four further services to our customers and members.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            {services.map((s, i) => (
              <div
                key={s.n}
                className="group grid grid-cols-12 gap-6 md:gap-8 py-10 border-t border-[#231C12]/20 last:border-b hover:bg-[#231C12]/[0.03] transition-colors -mx-4 px-4"
              >
                <div className="col-span-2 md:col-span-1">
                  <div className="font-[Fraunces] italic text-3xl md:text-5xl text-[#7A1F2B]/80 group-hover:text-[#7A1F2B] transition-colors">
                    {s.n}
                  </div>
                </div>
                <div className="col-span-10 md:col-span-7">
                  <h3 className="font-[Fraunces] text-2xl md:text-3xl text-[#231C12] mb-3">
                    {s.t}
                  </h3>
                  <p className="font-[EB_Garamond] text-base md:text-lg leading-[1.8] text-[#231C12]/75">
                    {s.d}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 md:text-right md:pt-2">
                  <a href="#visit" className="font-[DM_Mono] text-[0.6rem] tracking-[0.25em] uppercase text-[#231C12]/60 group-hover:text-[#7A1F2B] border-b border-[#231C12]/30 group-hover:border-[#7A1F2B] pb-1 transition-colors">
                    Enquire {String(i + 1).padStart(2, "0")} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIAL — single quiet quote with watermark
   ============================================================ */
function Testimonial() {
  return (
    <section className="relative z-10 bg-[#231C12] text-[#F3EAD6] py-28 md:py-40 overflow-hidden">
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 font-[Fraunces] italic leading-none text-[#F3EAD6]/[0.04] select-none whitespace-nowrap"
           style={{ fontSize: "clamp(220px, 35vw, 480px)" }}>
        " "
      </div>

      <div className="relative mx-auto max-w-3xl px-8 md:px-14 text-center">
        <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.35em] uppercase text-[#C6A14A] mb-8">
          ✦ ✦ ✦ ✦ ✦
        </div>
        <blockquote className="font-[Fraunces] italic font-light leading-[1.35] tracking-[-0.01em] text-[#F3EAD6]"
                    style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)" }}>
          Foliant's is the last bookshop in London where a customer is permitted to enter, be ignored for an hour, and leave with exactly the book they did not know they were looking for.
        </blockquote>

        <div className="mt-12 flex items-center justify-center gap-4 font-[DM_Mono] text-[0.62rem] tracking-[0.25em] uppercase text-[#F3EAD6]/55">
          <span className="h-px w-10 bg-[#C6A14A]/50" />
          The Times Literary Supplement, 2024
          <span className="h-px w-10 bg-[#C6A14A]/50" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   VISIT — address card + hours + enquiry form
   ============================================================ */
function Visit() {
  return (
    <section id="visit" className="relative z-10 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-8 md:px-14">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          {/* Left: visit details as library card */}
          <div className="col-span-12 md:col-span-5">
            <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#7A1F2B] mb-4">
              Chapter V — Visit Us
            </div>
            <h2 className="font-[Fraunces] leading-[1.02] tracking-[-0.01em] mb-10"
                style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>
              Cecil Court,<br />
              <span className="italic text-[#7A1F2B]">London</span>.
            </h2>

            {/* Library card */}
            <div className="bg-[#F8F0DA] border border-[#231C12]/30 shadow-[6px_6px_0_rgba(35,28,18,0.12)] p-8 relative">
              {/* card holes */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-12">
                <div className="h-2 w-2 rounded-full bg-[#231C12]/40" />
                <div className="h-2 w-2 rounded-full bg-[#231C12]/40" />
              </div>

              {/* stamp */}
              <div className="absolute top-6 right-6 rotate-[-8deg]">
                <div className="border-2 border-[#7A1F2B]/70 text-[#7A1F2B]/80 px-3 py-1 font-[DM_Mono] text-[0.6rem] tracking-[0.2em] uppercase">
                  Open
                </div>
              </div>

              <div className="mt-8 font-[DM_Mono] text-[0.58rem] tracking-[0.3em] uppercase text-[#231C12]/55 mb-1">
                Foliant & Sons, Antiquarian
              </div>
              <div className="font-[Fraunces] text-2xl md:text-[1.7rem] text-[#231C12] leading-tight mb-8">
                14 Cecil Court<br />
                Bloomsbury<br />
                London WC2N 4HE
              </div>

              <div className="space-y-3 border-t border-dashed border-[#231C12]/25 pt-6">
                <a href="tel:+442075550144" className="flex items-center gap-4 font-[EB_Garamond] text-[#231C12]/85 hover:text-[#7A1F2B] transition-colors">
                  <span className="font-[DM_Mono] text-[0.55rem] tracking-[0.3em] uppercase text-[#231C12]/50 w-20">Tel</span>
                  +44 (0)20 7555 0144
                </a>
                <a href="mailto:shop@foliantbooks.co.uk" className="flex items-center gap-4 font-[EB_Garamond] text-[#231C12]/85 hover:text-[#7A1F2B] transition-colors">
                  <span className="font-[DM_Mono] text-[0.55rem] tracking-[0.3em] uppercase text-[#231C12]/50 w-20">Email</span>
                  shop@foliantbooks.co.uk
                </a>
                <a href="#" className="flex items-center gap-4 font-[EB_Garamond] text-[#231C12]/85 hover:text-[#7A1F2B] transition-colors">
                  <span className="font-[DM_Mono] text-[0.55rem] tracking-[0.3em] uppercase text-[#231C12]/50 w-20">Tube</span>
                  Leicester Square (3 min walk)
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-10">
              <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#231C12]/55 mb-5">
                — Opening hours —
              </div>
              <div className="border-t border-[#231C12]/20">
                {HOURS.map(([d, h]) => (
                  <div key={d} className="flex justify-between items-baseline py-3 border-b border-[#231C12]/15">
                    <span className="font-[Fraunces] text-[#231C12]">{d}</span>
                    <span className="font-[DM_Mono] text-[0.7rem] tracking-wide text-[#231C12]/75">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: enquiry form */}
          <div className="col-span-12 md:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you. We shall reply by post or by email within two working days.");
              }}
              className="bg-[#231C12] text-[#F3EAD6] p-10 md:p-14 relative"
            >
              {/* Corner ornaments */}
              {["top-3 left-3", "top-3 right-3 rotate-90", "bottom-3 left-3 -rotate-90", "bottom-3 right-3 rotate-180"].map((p) => (
                <svg key={p} className={`absolute ${p} h-5 w-5 text-[#C6A14A]/50`} viewBox="0 0 24 24" fill="none">
                  <path d="M2 2 L10 2 M2 2 L2 10" stroke="currentColor" strokeWidth="0.8" />
                </svg>
              ))}

              <div className="font-[DM_Mono] text-[0.58rem] tracking-[0.3em] uppercase text-[#C6A14A] mb-4">
                — Letter of Enquiry —
              </div>
              <h3 className="font-[Fraunces] text-3xl md:text-4xl mb-3">
                Address us <span className="italic text-[#C6A14A]">directly</span>.
              </h3>
              <p className="font-[EB_Garamond] italic text-[#F3EAD6]/65 mb-10 leading-relaxed">
                Whether you seek a particular volume, wish to sell a library, or merely have a question — we read every enquiry ourselves.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Field label="Full Name" placeholder="Mr. / Mrs. / Dr." />
                <Field label="Postal town" placeholder="London" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Field label="Email" placeholder="you@address.com" type="email" />
                <SelectField
                  label="Nature of enquiry"
                  options={["A specific title", "Valuation / purchase", "Restoration work", "Reading-room booking", "Other"]}
                />
              </div>

              <div className="mb-8">
                <label className="block font-[DM_Mono] text-[0.55rem] tracking-[0.3em] uppercase text-[#F3EAD6]/55 mb-3">
                  Your message
                </label>
                <textarea
                  rows={4}
                  placeholder="Title, author, edition, any further detail…"
                  className="w-full bg-transparent border-b border-[#C6A14A]/30 focus:border-[#C6A14A] outline-none
                             font-[EB_Garamond] text-base text-[#F3EAD6] placeholder-[#F3EAD6]/30 py-2 resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C6A14A] text-[#231C12] py-4 font-[DM_Mono] text-[0.7rem] tracking-[0.25em] uppercase hover:bg-[#D9B560] transition-colors flex items-center justify-center gap-3"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#231C12]" />
                Send Enquiry
                <span className="h-1.5 w-1.5 rounded-full bg-[#231C12]" />
              </button>

              <p className="mt-6 font-[DM_Mono] text-[0.55rem] tracking-[0.2em] uppercase text-[#F3EAD6]/40 text-center">
                Or write the old way — 14 Cecil Court, London WC2N 4HE
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="block font-[DM_Mono] text-[0.55rem] tracking-[0.3em] uppercase text-[#F3EAD6]/55 mb-3">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-[#C6A14A]/30 focus:border-[#C6A14A] outline-none
                   font-[EB_Garamond] text-base text-[#F3EAD6] placeholder-[#F3EAD6]/30 py-2 transition-colors"
      />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block font-[DM_Mono] text-[0.55rem] tracking-[0.3em] uppercase text-[#F3EAD6]/55 mb-3">
        {label}
      </label>
      <select
        className="w-full bg-transparent border-b border-[#C6A14A]/30 focus:border-[#C6A14A] outline-none
                   font-[EB_Garamond] text-base text-[#F3EAD6] py-2 appearance-none cursor-pointer transition-colors"
      >
        {options.map((o) => (
          <option key={o} className="bg-[#231C12]">{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ============================================================
   FOOTER — colophon
   ============================================================ */
function Footer() {
  return (
    <footer className="relative z-10 bg-[#1A140A] text-[#F3EAD6] pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-8 md:px-14">
        <div className="grid grid-cols-12 gap-10 pb-14 border-b border-[#F3EAD6]/15">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-baseline gap-2 mb-5">
              <span className="font-[Fraunces] italic text-3xl">Foliant</span>
              <span className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#C6A14A]">& sons</span>
            </div>
            <p className="font-[EB_Garamond] italic text-[#F3EAD6]/55 leading-[1.8] max-w-sm">
              An antiquarian bookshop kept on Cecil Court since the year of Her Majesty's Golden Jubilee.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Seal />
              <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.25em] uppercase text-[#F3EAD6]/50 leading-relaxed">
                Member, Antiquarian<br />Booksellers' Association
              </div>
            </div>
          </div>

          <FooterCol title="The Shop" links={["Catalogue", "Book of the Month", "Journal", "Reading Room", "Membership"]} />
          <FooterCol title="Services" links={["Acquisition", "Valuation", "Restoration", "Search Service", "Gift Vouchers"]} />
          <FooterCol title="Find Us" links={["14 Cecil Court", "London WC2N 4HE", "+44 20 7555 0144", "Instagram", "Newsletter"]} />
        </div>

        {/* Colophon */}
        <div className="pt-10 grid grid-cols-12 gap-6 items-center font-[DM_Mono] text-[0.6rem] tracking-[0.22em] uppercase text-[#F3EAD6]/40">
          <div className="col-span-12 md:col-span-4">
            © MMXXVI Foliant & Sons Ltd.
          </div>
          <div className="col-span-12 md:col-span-4 text-center italic font-[EB_Garamond] normal-case tracking-normal text-sm text-[#F3EAD6]/45">
            Set in Fraunces, Garamond, &amp; DM Mono.
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            Privacy · Terms · Returns
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="col-span-6 md:col-span-2">
      <h4 className="font-[DM_Mono] text-[0.55rem] tracking-[0.3em] uppercase text-[#C6A14A] mb-5">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="font-[EB_Garamond] text-[0.95rem] text-[#F3EAD6]/60 hover:text-[#C6A14A] transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
