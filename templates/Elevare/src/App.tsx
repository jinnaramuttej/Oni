import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowRight,
  Atom,
  Award,
  BookOpen,
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FlaskConical,
  Languages,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

const container = "mx-auto w-full max-w-7xl px-6 lg:px-8";
const eyebrow =
  "mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600";
const primaryButton =
  "group inline-flex min-h-14 items-center justify-center gap-2 rounded-[18px] bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_-12px_rgba(37,99,235,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_36px_-14px_rgba(37,99,235,0.9)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";

const photos = {
  hero: "https://images.pexels.com/photos/18870256/pexels-photo-18870256.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2200",
  math: "https://images.pexels.com/photos/6256136/pexels-photo-6256136.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200",
  science:
    "https://images.pexels.com/photos/5905517/pexels-photo-5905517.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200",
  english:
    "https://images.pexels.com/photos/7692637/pexels-photo-7692637.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200",
  method:
    "https://images.pexels.com/photos/7692559/pexels-photo-7692559.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600",
  educatorOne:
    "https://images.pexels.com/photos/5212321/pexels-photo-5212321.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900",
  educatorTwo:
    "https://images.pexels.com/photos/5905753/pexels-photo-5905753.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900",
  educatorThree:
    "https://images.pexels.com/photos/37811221/pexels-photo-37811221.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900",
  success:
    "https://images.pexels.com/photos/7972741/pexels-photo-7972741.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600",
};

const navLinks = [
  ["Courses", "#courses"],
  ["Our approach", "#approach"],
  ["Educators", "#educators"],
  ["Results", "#results"],
  ["FAQ", "#faq"],
];

const courses = [
  {
    title: "Mathematics Mastery",
    duration: "16 weeks",
    level: "Grades 8-12",
    instructor: "Dr. Maya Rao",
    description:
      "Build deep conceptual fluency and exam-ready problem solving through guided practice.",
    image: photos.math,
    alt: "Students solving mathematics problems together at a board",
    color: "bg-amber-400",
  },
  {
    title: "Science Catalyst",
    duration: "14 weeks",
    level: "Grades 7-10",
    instructor: "Lena Okafor",
    description:
      "Turn scientific curiosity into confident reasoning with inquiry-led sessions and labs.",
    image: photos.science,
    alt: "Students discussing a science concept at a whiteboard",
    color: "bg-emerald-500",
  },
  {
    title: "English & Reasoning",
    duration: "12 weeks",
    level: "Grades 6-12",
    instructor: "Nora Bennett",
    description:
      "Strengthen writing, comprehension, and critical thinking for school and beyond.",
    image: photos.english,
    alt: "Teacher mentoring students around a classroom table",
    color: "bg-blue-600",
  },
];

const faqs = [
  {
    question: "How do you place students in the right program?",
    answer:
      "Every student begins with a no-pressure academic consultation and diagnostic. We use the results, school goals, and learning style to recommend the right level and study plan.",
  },
  {
    question: "What does a small batch mean at Elevare?",
    answer:
      "Our core classes are capped at eight students. This gives educators enough time to check understanding, coach each learner, and adapt the pace without losing collaborative energy.",
  },
  {
    question: "How are parents kept informed?",
    answer:
      "Parents receive a concise progress update every four weeks covering mastery, habits, attendance, and the next learning priority. Educators are also available for scheduled reviews.",
  },
  {
    question: "Can students join after a batch has started?",
    answer:
      "Yes, when the diagnostic shows that the current pace is a good fit. We provide a guided catch-up plan so new students enter confidently rather than feeling behind.",
  },
  {
    question: "Do you offer online learning?",
    answer:
      "Yes. Selected programs are available live online with the same small batches, active feedback, recorded revision resources, and progress reporting as our studio classes.",
  },
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href="#top"
      aria-label="Elevare Learning home"
      className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
    >
      <span
        className={`grid size-10 place-items-center rounded-[14px] ${
          inverse ? "bg-white text-indigo-900" : "bg-indigo-900 text-white"
        }`}
      >
        <BookOpenCheck size={21} strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="text-[15px] font-extrabold uppercase leading-none tracking-[0.18em]">
        Elevare
        <span className={`mt-1 block text-[9px] tracking-[0.32em] ${inverse ? "text-blue-100" : "text-slate-500"}`}>
          Learning
        </span>
      </span>
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-slate-200/80 bg-white/95 text-slate-950 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl"
          : "bg-transparent text-white"
      }`}
    >
      <nav className={`${container} flex h-20 items-center justify-between`} aria-label="Main navigation">
        <Brand inverse={!scrolled && !menuOpen} />
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-semibold transition hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+15550142840"
            className={`text-sm font-semibold ${!scrolled ? "text-white/85 hover:text-white" : "text-slate-600 hover:text-slate-950"}`}
          >
            (555) 014-2840
          </a>
          <a href="#enroll" className={`${primaryButton} min-h-12 rounded-[16px] px-5 py-3`}>
            Enroll now
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className="grid size-11 place-items-center rounded-xl lg:hidden"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className={`${container} flex flex-col gap-1 py-4`}>
              {navLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {label}
                </a>
              ))}
              <a href="#enroll" onClick={() => setMenuOpen(false)} className={`${primaryButton} mt-3`}>
                Enroll now
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  label,
  title,
  description,
  light = false,
  centered = false,
}: {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <p className={`${eyebrow} ${centered ? "justify-center" : ""} ${light ? "!text-amber-400" : ""}`}>
        <span className={`h-px w-6 ${light ? "bg-amber-400" : "bg-blue-600"}`} />
        {label}
      </p>
      <h2 className={`text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl lg:text-6xl ${light ? "text-white" : "text-indigo-950"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-6 max-w-2xl text-lg leading-8 ${centered ? "mx-auto" : ""} ${light ? "text-indigo-100" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[760px] items-end overflow-hidden bg-indigo-950 text-white sm:min-h-screen">
      <img
        src={photos.hero}
        alt="Instructor guiding two engaged students through their work"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,18,74,0.96)_0%,rgba(28,25,92,0.78)_42%,rgba(15,23,42,0.18)_78%),linear-gradient(0deg,rgba(15,23,42,0.72)_0%,transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_38%,rgba(37,99,235,0.24),transparent_34%)]" />

      <div className={`${container} relative z-10 pb-24 pt-36 sm:pb-28 lg:pb-32`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-amber-400 sm:text-base">
            Personal coaching. Lasting progress.
          </p>
          <h1 className="max-w-5xl font-extrabold text-white">
            <span className="block text-6xl uppercase leading-[0.86] tracking-[-0.065em] sm:text-8xl lg:text-[112px]">Elevare</span>
            <span className="mt-4 block text-xs uppercase tracking-[0.5em] text-blue-200 sm:text-sm">Learning</span>
            <span className="mt-7 block max-w-3xl text-4xl leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Where ambition becomes achievement.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
            Expert coaching, personal mentorship, and a clear path forward for students ready to rise.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#enroll" className={`${primaryButton} bg-blue-600 sm:min-w-40`}>
              Enroll now
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#courses"
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-[18px] border border-white/35 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-indigo-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-w-44"
            >
              Explore courses
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>

      <a
        href="#proof"
        aria-label="Scroll to learn more"
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/75 transition hover:text-white sm:flex lg:right-12"
      >
        Discover
        <span className="flex h-12 w-7 justify-center rounded-full border border-white/40 pt-2">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-amber-400"
          />
        </span>
      </a>
    </section>
  );
}

function ProofStrip() {
  const items = [
    { icon: TrendingUp, title: "Top results", detail: "96% improve within one term" },
    { icon: Award, title: "Expert faculty", detail: "Subject specialists who mentor" },
    { icon: Users, title: "Small batches", detail: "Maximum 8 students per class" },
  ];

  return (
    <section id="proof" aria-label="Why families trust Elevare" className="border-b border-slate-200 bg-white">
      <div className={`${container} grid divide-y divide-slate-200 py-3 md:grid-cols-3 md:divide-x md:divide-y-0`}>
        {items.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="flex items-center gap-4 px-2 py-6 first:pl-0 md:px-8 md:first:pl-0 md:last:pr-0">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Icon size={22} strokeWidth={2} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-extrabold text-indigo-950">{title}</h2>
              <p className="mt-1 text-sm text-slate-500">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Courses({ onSelect }: { onSelect: (course: string) => void }) {
  return (
    <section id="courses" className="scroll-mt-20 bg-[#F8FAFC] py-24 sm:py-32">
      <div className={container}>
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            label="Popular courses"
            title="Purpose-built for meaningful progress."
            description="Focused programs combine strong fundamentals, active practice, and the individual feedback students need to excel."
          />
          <a href="#subjects" className="group inline-flex items-center gap-2 text-sm font-bold text-blue-700">
            View all subjects
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Reveal key={course.title} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_12px_38px_-24px_rgba(15,23,42,0.36)] ring-1 ring-slate-200/70 transition-shadow hover:shadow-[0_24px_60px_-28px_rgba(37,99,235,0.35)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className={`absolute bottom-0 left-0 h-1.5 w-full ${course.color}`} />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    <span className="flex items-center gap-2">
                      <Clock3 size={14} className="text-blue-600" aria-hidden="true" />
                      {course.duration}
                    </span>
                    <span>{course.level}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.03em] text-indigo-950">{course.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-slate-600">{course.description}</p>
                  <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Lead educator</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{course.instructor}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelect(course.title)}
                      aria-label={`Enroll in ${course.title}`}
                      className="grid size-12 place-items-center rounded-2xl bg-indigo-950 text-white transition duration-300 hover:rotate-[-4deg] hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                    >
                      <ArrowRight size={19} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Subjects() {
  const subjects = [
    { icon: BookOpen, name: "Mathematics", note: "Foundations to advanced" },
    { icon: Atom, name: "Physics", note: "Concepts through application" },
    { icon: FlaskConical, name: "Chemistry", note: "Understand, test, retain" },
    { icon: Languages, name: "English", note: "Read, reason, communicate" },
    { icon: BrainCircuit, name: "Aptitude", note: "Logic and exam strategy" },
    { icon: Zap, name: "Study skills", note: "Habits that compound" },
  ];

  return (
    <section id="subjects" className="scroll-mt-20 overflow-hidden bg-indigo-950 py-24 text-white sm:py-32">
      <div className={container}>
        <Reveal>
          <SectionHeading
            label="Subjects offered"
            title="Explore deeply. Think independently."
            description="Core academics and transferable skills, taught with the same standard of clarity, challenge, and care."
            light
          />
        </Reveal>
        <div className="mt-14 grid border-y border-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map(({ icon: Icon, name, note }, index) => (
            <Reveal
              key={name}
              delay={index * 0.04}
              className="border-b border-white/15 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <div className="group flex min-h-44 items-start gap-5 px-1 py-8 transition md:px-6 lg:px-8">
                <Icon size={28} strokeWidth={1.7} className="mt-1 shrink-0 text-amber-400 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl font-extrabold tracking-[-0.03em]">{name}</h3>
                  <p className="mt-3 text-sm leading-6 text-indigo-200">{note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    { number: "01", title: "Diagnose", text: "We find the exact gaps, strengths, and habits shaping current performance." },
    { number: "02", title: "Personalize", text: "Each learner receives a clear plan, the right level of challenge, and focused practice." },
    { number: "03", title: "Master", text: "Frequent feedback turns understanding into recall, confidence, and independent thinking." },
    { number: "04", title: "Measure", text: "Visible progress reviews keep students motivated and families fully informed." },
  ];

  return (
    <section id="approach" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className={`${container} grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]`}>
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[20px] bg-slate-100">
            <img
              src={photos.method}
              alt="Teacher working closely with students on a collaborative project"
              loading="lazy"
              className="aspect-[4/5] h-full w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="absolute -bottom-8 right-4 w-[78%] rounded-[20px] border border-white/70 bg-white/90 p-5 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:right-8 sm:w-72 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-indigo-950">Confidence index</span>
              <span className="text-sm font-extrabold text-emerald-600">+34%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "86%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-emerald-500"
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">Average growth after 12 weeks of guided learning</p>
          </motion.div>
        </Reveal>

        <Reveal>
          <SectionHeading
            label="The Elevare method"
            title="A better way to build mastery."
            description="Not more homework. Better learning. Our four-part system keeps every session intentional and every goal visible."
          />
          <ol className="mt-10 border-t border-slate-200">
            {steps.map((step) => (
              <li key={step.number} className="grid grid-cols-[48px_1fr] gap-4 border-b border-slate-200 py-6 sm:grid-cols-[56px_132px_1fr] sm:items-start">
                <span className="font-extrabold text-blue-600">{step.number}</span>
                <h3 className="text-lg font-extrabold text-indigo-950">{step.title}</h3>
                <p className="col-start-2 text-sm leading-6 text-slate-600 sm:col-start-3">{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function Educators() {
  const educators = [
    {
      name: "Dr. Maya Rao",
      role: "Mathematics & Olympiad",
      detail: "PhD, Applied Mathematics | 12 years teaching",
      image: photos.educatorOne,
      alt: "Dr. Maya Rao, mathematics educator",
    },
    {
      name: "Lena Okafor",
      role: "Science & Inquiry",
      detail: "MSc, Science Education | Former curriculum lead",
      image: photos.educatorTwo,
      alt: "Lena Okafor, science educator",
    },
    {
      name: "Nora Bennett",
      role: "English & Reasoning",
      detail: "MA, English Literature | Academic writing specialist",
      image: photos.educatorThree,
      alt: "Nora Bennett, English and reasoning educator",
    },
  ];

  return (
    <section id="educators" className="scroll-mt-20 bg-[#F8FAFC] py-24 sm:py-32">
      <div className={container}>
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            label="Meet the educators"
            title="Experts who know how to inspire."
            description="Experienced subject specialists, selected as much for their mentorship as their academic depth."
          />
          <p className="max-w-sm text-sm leading-6 text-slate-500">Every educator is trained in our feedback system and supported by continuous classroom review.</p>
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {educators.map((educator, index) => (
            <Reveal key={educator.name} delay={index * 0.08}>
              <article className="group">
                <div className="overflow-hidden rounded-[20px] bg-slate-200">
                  <img
                    src={educator.image}
                    alt={educator.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover object-top grayscale-[12%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-[-0.02em] text-indigo-950">{educator.name}</h3>
                    <p className="mt-1 font-bold text-blue-600">{educator.role}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">{educator.detail}</p>
                  </div>
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" title="Accepting students" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuccessStory() {
  return (
    <section className="overflow-hidden bg-indigo-950 text-white">
      <div className="grid min-h-[680px] lg:grid-cols-2">
        <Reveal className="min-h-[420px] overflow-hidden lg:min-h-full">
          <img
            src={photos.success}
            alt="Graduates celebrating their academic achievement together"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Reveal>
        <div className="flex items-center px-6 py-20 sm:px-12 lg:px-20 lg:py-24 xl:px-24">
          <Reveal>
            <p className={eyebrow + " !text-amber-400"}>
              <span className="h-px w-6 bg-amber-400" />
              Student story
            </p>
            <Quote size={42} strokeWidth={1.5} className="mb-8 text-blue-400" aria-hidden="true" />
            <blockquote className="max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              "Elevare changed how I see difficult problems. I stopped asking if I was smart enough and started asking what I could try next."
            </blockquote>
            <div className="mt-9 flex items-center gap-4 border-t border-white/15 pt-7">
              <div>
                <p className="font-extrabold">Amara J.</p>
                <p className="mt-1 text-sm text-indigo-200">Grade 12 | Scholarship recipient</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-2 text-sm font-bold text-emerald-400">
                <Check size={17} aria-hidden="true" />
                +18 point gain
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const duration = 1200;
    const start = performance.now();
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Results() {
  const stats = [
    { value: 96, suffix: "%", label: "show measurable improvement", icon: TrendingUp },
    { value: 4.8, suffix: "/5", decimals: 1, label: "average family satisfaction", icon: Star },
    { value: 8, suffix: ":1", label: "maximum student to mentor ratio", icon: Users },
    { value: 12, suffix: "+", label: "years of teaching excellence", icon: Award },
  ];

  return (
    <section id="results" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className={container}>
        <Reveal>
          <SectionHeading
            label="Performance"
            title="Progress you can see and trust."
            description="We measure more than marks. Mastery, confidence, and independent study habits all matter."
            centered
          />
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, suffix, decimals, label, icon: Icon }, index) => (
            <Reveal key={label} delay={index * 0.06}>
              <div className="h-full rounded-[20px] border border-slate-200 bg-[#F8FAFC] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/50 sm:p-8">
                <Icon size={24} strokeWidth={1.8} className="text-blue-600" aria-hidden="true" />
                <p className="mt-10 text-5xl font-extrabold tracking-[-0.06em] text-indigo-950">
                  <AnimatedNumber value={value} suffix={suffix} decimals={decimals} />
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">Based on enrolled students and parent surveys from the 2024-25 academic year.</p>
      </div>
    </section>
  );
}

function Batches({ onSelect }: { onSelect: (course: string) => void }) {
  const batches = [
    { date: "Aug 18", course: "Mathematics Mastery", schedule: "Mon & Wed, 5:00 PM", spots: "3 spots left", format: "In studio" },
    { date: "Aug 23", course: "Science Catalyst", schedule: "Saturday, 10:00 AM", spots: "5 spots left", format: "In studio" },
    { date: "Sep 02", course: "English & Reasoning", schedule: "Tue & Thu, 6:00 PM", spots: "Open", format: "Live online" },
  ];

  return (
    <section className="bg-[#F8FAFC] py-24 sm:py-32">
      <div className={container}>
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            label="Upcoming batches"
            title="Your next chapter can start now."
            description="Small groups fill quickly. Choose a starting point and we will confirm the best fit after your consultation."
          />
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Enrollment is open
          </div>
        </Reveal>
        <div className="mt-12 border-t border-slate-300">
          {batches.map((batch) => (
            <article
              key={batch.course}
              className="group grid gap-5 border-b border-slate-300 py-7 transition-colors hover:bg-white sm:grid-cols-[100px_1fr_auto] sm:items-center sm:px-5 lg:grid-cols-[120px_1.2fr_1fr_0.7fr_auto]"
            >
              <div className="flex items-center gap-3 sm:block">
                <CalendarDays size={18} className="text-blue-600 sm:hidden" aria-hidden="true" />
                <p className="font-extrabold text-indigo-950">{batch.date}</p>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-indigo-950">{batch.course}</h3>
                <p className="mt-1 text-sm text-slate-500 lg:hidden">{batch.schedule}</p>
              </div>
              <p className="hidden text-sm font-medium text-slate-600 lg:block">{batch.schedule}</p>
              <div className="text-sm">
                <p className="font-bold text-emerald-600">{batch.spots}</p>
                <p className="mt-1 text-slate-500">{batch.format}</p>
              </div>
              <button
                type="button"
                onClick={() => onSelect(batch.course)}
                className="group/button inline-flex min-h-12 items-center justify-center gap-2 rounded-[16px] border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-indigo-950 transition hover:border-blue-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:col-start-3 lg:col-start-auto"
              >
                Reserve a place
                <ArrowRight size={16} className="transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className={`${container} grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20`}>
        <Reveal>
          <SectionHeading
            label="Questions, answered"
            title="Start with clarity."
            description="A strong learning partnership begins with the right fit. Here is what families ask us most."
          />
          <a href="mailto:hello@elevarelearning.com" className="mt-8 inline-flex items-center gap-2 font-bold text-blue-700 hover:text-blue-800">
            Ask us anything
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal>
          <div className="border-t border-slate-300">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div key={faq.question} className="border-b border-slate-300">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-extrabold text-indigo-950 transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:text-lg"
                    >
                      {faq.question}
                      <ChevronDown size={20} className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : ""}`} aria-hidden="true" />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pr-10 leading-7 text-slate-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Enrollment({ selectedCourse, setSelectedCourse }: { selectedCourse: string; setSelectedCourse: (course: string) => void }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="enroll" className="scroll-mt-20 overflow-hidden bg-indigo-950 py-24 text-white sm:py-32">
      <div className={`${container} grid items-start gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20`}>
        <Reveal>
          <p className={eyebrow + " !text-amber-400"}>
            <span className="h-px w-6 bg-amber-400" />
            Enrollment
          </p>
          <h2 className="text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl lg:text-6xl">Give their potential a place to grow.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-indigo-100">
            Tell us a little about your learner. Our academic advisor will call within one working day to arrange a complimentary consultation.
          </p>
          <div className="mt-10 space-y-5">
            {[
              "No-pressure academic consultation",
              "Personalized course recommendation",
              "Clear goals before you commit",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white">
                <span className="grid size-7 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                </span>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-white/15 pt-8">
            <div className="flex items-center gap-4">
              <ShieldCheck size={28} className="text-blue-400" aria-hidden="true" />
              <p className="max-w-xs text-sm leading-6 text-indigo-200">Your information stays private and is only used to arrange your consultation.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[20px] bg-white p-6 text-slate-900 shadow-[0_28px_80px_-35px_rgba(0,0,0,0.5)] sm:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
                className="flex min-h-[500px] flex-col items-center justify-center text-center"
              >
                <span className="grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check size={30} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-3xl font-extrabold tracking-[-0.03em] text-indigo-950">Your next step is set.</h3>
                <p className="mt-4 max-w-md leading-7 text-slate-600">Thank you. An Elevare academic advisor will be in touch within one working day.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-8 text-sm font-bold text-blue-700 hover:text-blue-800">
                  Submit another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">Step 1 of 1</p>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-indigo-950">Book a consultation</h3>
                  </div>
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                    <MessageCircle size={22} aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <label className="block text-sm font-bold text-slate-700">
                    Parent or guardian name
                    <input
                      required
                      name="parentName"
                      autoComplete="name"
                      placeholder="Your full name"
                      className="mt-2 min-h-14 w-full rounded-[14px] border border-slate-300 bg-white px-4 text-base font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                  <label className="block text-sm font-bold text-slate-700">
                    Student name
                    <input
                      required
                      name="studentName"
                      placeholder="Student's full name"
                      className="mt-2 min-h-14 w-full rounded-[14px] border border-slate-300 bg-white px-4 text-base font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                  <label className="block text-sm font-bold text-slate-700">
                    Email address
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="mt-2 min-h-14 w-full rounded-[14px] border border-slate-300 bg-white px-4 text-base font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                  <label className="block text-sm font-bold text-slate-700">
                    Phone number
                    <input
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="(555) 000-0000"
                      className="mt-2 min-h-14 w-full rounded-[14px] border border-slate-300 bg-white px-4 text-base font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                  <label className="block text-sm font-bold text-slate-700">
                    Student grade
                    <select
                      required
                      name="grade"
                      defaultValue=""
                      className="mt-2 min-h-14 w-full rounded-[14px] border border-slate-300 bg-white px-4 text-base font-medium outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="" disabled>Select grade</option>
                      {["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((grade) => (
                        <option key={grade}>{grade}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm font-bold text-slate-700">
                    Program of interest
                    <select
                      required
                      name="course"
                      value={selectedCourse}
                      onChange={(event) => setSelectedCourse(event.target.value)}
                      className="mt-2 min-h-14 w-full rounded-[14px] border border-slate-300 bg-white px-4 text-base font-medium outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Not sure yet</option>
                      {courses.map((course) => (
                        <option key={course.title}>{course.title}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <button type="submit" className={`${primaryButton} mt-8 w-full`}>
                  Request my consultation
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
                <p className="mt-4 text-center text-xs leading-5 text-slate-500">By submitting, you agree to be contacted about Elevare programs.</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactAndFooter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <section aria-labelledby="contact-title" className="border-b border-indigo-900 bg-[#201D69] py-20 text-white">
        <div className={container}>
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <p className={eyebrow + " !text-amber-400"}>
                <span className="h-px w-6 bg-amber-400" />
                Contact
              </p>
              <h2 id="contact-title" className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">Questions before you begin?</h2>
              <p className="mt-4 text-indigo-200">Talk to a real academic advisor. We are happy to help.</p>
            </div>
            <address className="grid gap-6 not-italic sm:grid-cols-3">
              <a href="tel:+15550142840" className="group flex gap-3 text-sm">
                <Phone size={20} className="shrink-0 text-blue-400" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-indigo-300">Call</span>
                  <span className="mt-2 block font-bold group-hover:text-amber-400">(555) 014-2840</span>
                </span>
              </a>
              <a href="mailto:hello@elevarelearning.com" className="group flex gap-3 text-sm">
                <Mail size={20} className="shrink-0 text-blue-400" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-indigo-300">Email</span>
                  <span className="mt-2 block font-bold group-hover:text-amber-400">hello@elevarelearning.com</span>
                </span>
              </a>
              <a href="https://maps.google.com" className="group flex gap-3 text-sm" target="_blank" rel="noreferrer">
                <MapPin size={20} className="shrink-0 text-blue-400" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-indigo-300">Visit</span>
                  <span className="mt-2 block font-bold group-hover:text-amber-400">128 Meridian Ave, Suite 400</span>
                </span>
              </a>
            </address>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#15134B] py-16 text-indigo-200">
        <div className={container}>
          <div className="grid gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
            <div>
              <Brand inverse />
              <p className="mt-6 max-w-sm text-sm leading-7">Personal coaching and purposeful learning for students ready to grow in knowledge, confidence, and ambition.</p>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">Learn</h2>
              <div className="mt-5 flex flex-col gap-3 text-sm">
                <a href="#courses" className="hover:text-white">Courses</a>
                <a href="#subjects" className="hover:text-white">Subjects</a>
                <a href="#approach" className="hover:text-white">Our method</a>
                <a href="#educators" className="hover:text-white">Educators</a>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">Elevare</h2>
              <div className="mt-5 flex flex-col gap-3 text-sm">
                <a href="#results" className="hover:text-white">Results</a>
                <a href="#faq" className="hover:text-white">FAQ</a>
                <a href="#enroll" className="hover:text-white">Enrollment</a>
                <a href="mailto:hello@elevarelearning.com" className="hover:text-white">Contact</a>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">Stay curious</h2>
              <p className="mt-5 text-sm leading-6">Monthly study insights for students and families.</p>
              {subscribed ? (
                <p role="status" className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <Check size={17} aria-hidden="true" />
                  You are on the list.
                </p>
              ) : (
                <form
                  className="mt-4 flex"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubscribed(true);
                  }}
                >
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input id="footer-email" type="email" required placeholder="Email address" className="min-w-0 flex-1 rounded-l-[14px] border border-r-0 border-white/15 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-indigo-300 focus:border-blue-400" />
                  <button type="submit" aria-label="Subscribe" className="grid size-12 place-items-center rounded-r-[14px] bg-blue-600 text-white transition hover:bg-blue-500">
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 Elevare Learning. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#top" className="hover:text-white">Privacy</a>
              <a href="#top" className="hover:text-white">Terms</a>
              <a href="mailto:hello@elevarelearning.com" aria-label="Email Elevare" className="hover:text-white"><Mail size={17} aria-hidden="true" /></a>
              <a href="tel:+15550142840" aria-label="Call Elevare" className="hover:text-white"><MessageCircle size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState("");

  const selectCourse = (course: string) => {
    setSelectedCourse(course);
    document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-slate-950 antialiased selection:bg-amber-300 selection:text-indigo-950">
      <a href="#main-content" className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-lg bg-white px-4 py-3 font-bold text-indigo-950 shadow-lg transition focus:translate-y-0">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <ProofStrip />
        <Courses onSelect={selectCourse} />
        <Subjects />
        <Approach />
        <Educators />
        <SuccessStory />
        <Results />
        <Batches onSelect={selectCourse} />
        <Faq />
        <Enrollment selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
      </main>
      <ContactAndFooter />
    </div>
  );
}