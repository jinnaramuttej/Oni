import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  type LucideIcon,
  GraduationCap,
  LineChart,
  Mail,
  MapPin,
  Menu,
  MessageSquareQuote,
  Phone,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users2,
  X,
} from "lucide-react";
import { cn } from "./utils/cn";

const shell = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const cardBase =
  "rounded-[20px] border border-slate-200/80 bg-white/90 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.22)] backdrop-blur-sm";
const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-[18px] bg-[#312E81] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#312E81]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2";
const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-[18px] border border-slate-200/80 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#2563EB]/25 hover:text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2";

const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "Subjects", href: "#subjects" },
  { label: "Approach", href: "#methodology" },
  { label: "Educators", href: "#educators" },
  { label: "Results", href: "#stories" },
  { label: "FAQs", href: "#faqs" },
  { label: "Enroll", href: "#enroll" },
] as const;

const trustBadges: Array<{ icon: LucideIcon; title: string; detail: string }> = [
  {
    icon: Award,
    title: "Top Results",
    detail: "Structured preparation designed for measurable score growth.",
  },
  {
    icon: ShieldCheck,
    title: "Expert Faculty",
    detail: "Experienced mentors with deep subject mastery and calm guidance.",
  },
  {
    icon: Users2,
    title: "Small Batch Sizes",
    detail: "Focused attention, faster doubt resolution, and stronger accountability.",
  },
];

const courses: Array<{
  icon: LucideIcon;
  title: string;
  duration: string;
  level: string;
  instructor: string;
  description: string;
  focus: string;
}> = [
  {
    icon: GraduationCap,
    title: "Scholars Foundation Program",
    duration: "12 weeks",
    level: "Grades 8–10",
    instructor: "Dr. Anika Sen",
    description:
      "Strengthen mathematical thinking, scientific reasoning, and disciplined study habits with mentor-led sessions.",
    focus: "Concept clarity + weekly feedback",
  },
  {
    icon: TrendingUp,
    title: "Exam Accelerator Track",
    duration: "8 weeks",
    level: "Intermediate to advanced",
    instructor: "Arjun Mehta",
    description:
      "Target high-stakes exams with timed mock tests, correction clinics, and a precise performance-improvement plan.",
    focus: "Score optimization + mock mastery",
  },
  {
    icon: Brain,
    title: "STEM Excellence Cohort",
    duration: "16 weeks",
    level: "Advanced learners",
    instructor: "Priya Nair",
    description:
      "Move beyond memorization into application, problem solving, and higher-order analytical thinking across STEM subjects.",
    focus: "Problem solving + advanced challenges",
  },
  {
    icon: Compass,
    title: "Olympiad & Scholarship Lab",
    duration: "20 weeks",
    level: "High-achieving students",
    instructor: "Rahul Iyer",
    description:
      "For ambitious students preparing for scholarship pathways, olympiads, and competitive academic opportunities.",
    focus: "Stretch goals + elite preparation",
  },
];

const subjects: Array<{ icon: LucideIcon; name: string; detail: string }> = [
  {
    icon: BookOpen,
    name: "Mathematics",
    detail: "From core numeracy to advanced algebra, geometry, and calculus fluency.",
  },
  {
    icon: Brain,
    name: "Science",
    detail: "Physics, chemistry, and biology taught through understanding-first instruction.",
  },
  {
    icon: MessageSquareQuote,
    name: "English & Writing",
    detail: "Reading comprehension, communication, and structured writing support.",
  },
  {
    icon: LineChart,
    name: "Test Strategy",
    detail: "Time management, accuracy improvement, and exam temperament training.",
  },
  {
    icon: Target,
    name: "Competitive Prep",
    detail: "Focused pathways for scholarship tests, olympiads, and entrance exams.",
  },
  {
    icon: Users2,
    name: "Mentored Study Hall",
    detail: "Quiet guided practice sessions with live doubt-solving and accountability.",
  },
];

const methodology: Array<{ step: string; title: string; detail: string; accent: string }> = [
  {
    step: "01",
    title: "Diagnose the learner",
    detail:
      "We start with baseline assessments to map strengths, gaps, learning pace, and confidence levels.",
    accent: "Assessment-led onboarding",
  },
  {
    step: "02",
    title: "Teach for understanding",
    detail:
      "Faculty break complex topics into intuitive frameworks that students can retain, apply, and explain.",
    accent: "Clarity before speed",
  },
  {
    step: "03",
    title: "Practice with feedback",
    detail:
      "Every week includes curated worksheets, error analysis, and targeted interventions on weak patterns.",
    accent: "Precision correction loops",
  },
  {
    step: "04",
    title: "Measure and mentor",
    detail:
      "Parents and students receive clear updates, progress signals, and next-step action plans after each cycle.",
    accent: "Transparent progress reporting",
  },
];

const educators: Array<{
  name: string;
  role: string;
  experience: string;
  image: string;
  alt: string;
  specialties: string[];
}> = [
  {
    name: "Dr. Anika Sen",
    role: "Academic Director · Mathematics",
    experience: "12+ years guiding top-performing batches",
    image:
      "https://images.pexels.com/photos/5905753/pexels-photo-5905753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Smiling educator in a classroom preparing for a mathematics lesson.",
    specialties: ["Concept architecture", "Confidence building", "Parent progress reviews"],
  },
  {
    name: "Arjun Mehta",
    role: "Lead Mentor · Science & Exams",
    experience: "Specialist in test readiness and analytical reasoning",
    image:
      "https://images.pexels.com/photos/6325958/pexels-photo-6325958.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Male teacher standing in front of a whiteboard and smiling with books in hand.",
    specialties: ["Mock-test strategy", "Physics simplification", "Performance diagnostics"],
  },
  {
    name: "Priya Nair",
    role: "Learning Coach · STEM Excellence",
    experience: "Known for mentoring disciplined, curious high achievers",
    image:
      "https://images.pexels.com/photos/5905752/pexels-photo-5905752.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Confident female educator standing near a classroom whiteboard.",
    specialties: ["Advanced problem solving", "Study systems", "Scholarship mentoring"],
  },
];

const testimonials = [
  {
    quote:
      "The biggest change was confidence. I stopped guessing, started understanding, and my mathematics score jumped from 71 to 93.",
    name: "Rhea S.",
    result: "Grade 10 · 22-point score lift",
  },
  {
    quote:
      "Northstar gave our son structure, calm mentors, and clear weekly updates. We finally felt supported as parents too.",
    name: "Parent of Aarav",
    result: "Foundation Program · Stronger discipline in 6 weeks",
  },
  {
    quote:
      "The mock-test reviews were incredibly detailed. I learned exactly why I was losing marks and how to recover them.",
    name: "Kabir M.",
    result: "Exam Accelerator · Top percentile improvement",
  },
];

const stats = [
  {
    value: 94,
    suffix: "%",
    label: "students improved grades within two academic terms",
  },
  {
    value: 18,
    suffix: " pts",
    label: "median score lift after a full mentoring cycle",
  },
  {
    value: 8,
    suffix: " : 1",
    label: "average student-to-mentor attention ratio",
  },
  {
    value: 1200,
    suffix: "+",
    label: "learners mentored across foundation and exam tracks",
  },
];

const batchCards = [
  {
    title: "Weekend Foundation Batch",
    start: "Starts 18 August",
    schedule: "Sat & Sun · 9:00 AM to 12:00 PM",
    format: "On-campus + mentor portal",
    seats: "8 seats left",
  },
  {
    title: "After-School STEM Cohort",
    start: "Starts 26 August",
    schedule: "Tue, Thu, Fri · 5:00 PM to 7:00 PM",
    format: "Hybrid live learning",
    seats: "Applications closing soon",
  },
  {
    title: "Exam Accelerator Sprint",
    start: "Starts 2 September",
    schedule: "Mon to Fri · 6:30 PM to 8:30 PM",
    format: "Intensive practice lab",
    seats: "Priority waitlist open",
  },
];

const faqs = [
  {
    question: "How do you personalize learning for different students?",
    answer:
      "Every student begins with a baseline review and mentoring conversation. We use that to group intelligently, assign support material, and adjust intervention intensity based on performance patterns.",
  },
  {
    question: "Do parents receive regular performance updates?",
    answer:
      "Yes. Parents receive progress notes, mock-test insights, attendance visibility, and a clear next-step plan so they always know how their child is progressing.",
  },
  {
    question: "What are your average batch sizes?",
    answer:
      "We intentionally keep batches small to maintain attention quality. Most core programs run between 8 and 16 learners depending on age, course depth, and mentoring needs.",
  },
  {
    question: "Can students join mid-term?",
    answer:
      "In many cases, yes. We offer a short academic diagnostic to determine fit, identify catch-up requirements, and recommend the best entry point.",
  },
  {
    question: "Do you support both school excellence and competitive exams?",
    answer:
      "Absolutely. Our systems are designed to strengthen school performance first, then layer on exam strategy, advanced practice, and stretch-goal preparation where needed.",
  },
];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const current = ref.current;
    if (!current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transform-gpu transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
          light
            ? "bg-white/10 text-white/85 ring-1 ring-inset ring-white/15"
            : "bg-[#2563EB]/8 text-[#312E81] ring-1 ring-inset ring-[#2563EB]/10",
        )}
      >
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          light ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "max-w-2xl text-base leading-8 sm:text-lg",
          light ? "text-white/75" : "text-slate-600",
        )}
      >
        {description}
      </p>
    </div>
  );
}

function AnimatedValue({
  value,
  suffix = "",
  prefix = "",
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const current = ref.current;
    if (!current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    let frame = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frame);
  }, [duration, value, visible]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

function ProgressMetric({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const current = ref.current;
    if (!current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="text-sm text-white/60">{detail}</p>
        </div>
        <span className="text-sm font-semibold text-amber-300">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-300 via-[#F59E0B] to-emerald-400 transition-[width] duration-1000 ease-out"
          style={{ width: visible ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="relative overflow-x-clip bg-slate-50 text-slate-900">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-0 h-72 w-72 rounded-full bg-[#2563EB]/12 blur-3xl" />
        <div className="absolute right-[-8%] top-[16%] h-80 w-80 rounded-full bg-[#F59E0B]/10 blur-3xl" />
        <div className="absolute bottom-[-8%] left-[18%] h-96 w-96 rounded-full bg-[#312E81]/8 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50">
        <div className={cn(shell, "pt-4")}>
          <nav
            aria-label="Primary navigation"
            className={cn(
              "flex items-center justify-between rounded-full px-4 py-3 transition-all duration-300 sm:px-5",
              scrolled
                ? "border border-white/80 bg-white/80 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.42)] backdrop-blur-xl"
                : "border border-transparent bg-transparent",
            )}
          >
            <a href="#home" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#312E81] text-white shadow-lg shadow-[#312E81]/25">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2563EB]">Northstar</p>
                <p className="text-sm font-medium text-slate-600">Learning Studio</p>
              </div>
            </a>

            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-[#312E81]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a href="#courses" className={secondaryButton}>
                Explore Courses
              </a>
              <a href="#enroll" className={primaryButton}>
                Enroll Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-900 shadow-sm transition hover:border-[#2563EB]/20 hover:text-[#2563EB] lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>

          {mobileOpen ? (
            <div className="pt-3 lg:hidden">
              <div className={cn(cardBase, "rounded-[24px] p-5") }>
                <div className="grid gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#312E81]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <a href="#courses" onClick={() => setMobileOpen(false)} className={secondaryButton}>
                    Explore Courses
                  </a>
                  <a href="#enroll" onClick={() => setMobileOpen(false)} className={primaryButton}>
                    Enroll Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main>
        <section id="home" className="relative scroll-mt-24">
          <div className={cn(shell, "pb-20 pt-8 sm:pb-24 lg:pt-6") }>
            <div className="grid min-h-[calc(100svh-96px)] items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
              <Reveal className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/10 bg-white/75 px-4 py-2 text-sm font-semibold text-[#312E81] shadow-sm backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-[#F59E0B]" />
                  Premium coaching for focused learners and future achievers
                </div>

                <div className="space-y-6">
                  <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[1.02]">
                    Where focused students become confident high achievers.
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                    Northstar Learning Studio combines expert faculty, personal mentorship, and transparent progress tracking
                    so students learn deeply, perform consistently, and build lasting academic confidence.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a href="#enroll" className={primaryButton}>
                    Enroll Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#courses" className={secondaryButton}>
                    Explore Courses
                    <PlayCircle className="h-4 w-4" />
                  </a>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {trustBadges.map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                      <Reveal key={badge.title} delay={index * 80} className="h-full">
                        <div className={cn(cardBase, "h-full p-5") }>
                          <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#312E81]/6 text-[#312E81]">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="space-y-1.5">
                              <h2 className="text-sm font-semibold text-slate-900">{badge.title}</h2>
                              <p className="text-sm leading-6 text-slate-600">{badge.detail}</p>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-[#F59E0B]" />
                    Trusted by ambitious students and growth-minded parents
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Weekly feedback, progress reports, and mentor access
                  </div>
                </div>
              </Reveal>

              <Reveal delay={140} className="relative">
                <div className="relative mx-auto max-w-2xl">
                  <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-[#2563EB]/20 via-white to-[#F59E0B]/15 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 p-3 shadow-[0_36px_120px_-44px_rgba(49,46,129,0.4)] backdrop-blur-xl">
                    <div className="relative overflow-hidden rounded-[28px]">
                      <img
                        src="https://images.pexels.com/photos/6936021/pexels-photo-6936021.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                        alt="Engaged students learning in a modern classroom with an instructor guiding discussion."
                        className="h-[420px] w-full object-cover sm:h-[520px]"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-6 sm:p-8">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Student journey</p>
                            <p className="mt-2 max-w-sm text-2xl font-semibold text-white sm:text-3xl">
                              Expert instruction meets calm, disciplined mentoring.
                            </p>
                          </div>
                          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
                            <p className="text-xs uppercase tracking-[0.18em] text-white/65">Next cohort</p>
                            <p className="mt-1 text-sm font-semibold">Admissions open for August intake</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -left-4 top-8 hidden max-w-[220px] rounded-[24px] border border-white/80 bg-white/90 p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.5)] backdrop-blur-md sm:block">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#312E81] text-white">
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Precision mentoring</p>
                        <p className="text-sm text-slate-500">Focused support from day one</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                          <span>Concept mastery</span>
                          <span>92%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className="h-full w-[92%] rounded-full bg-[#2563EB]" />
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                          <span>Confidence growth</span>
                          <span>88%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className="h-full w-[88%] rounded-full bg-[#10B981]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-8 right-0 rounded-[24px] border border-white/80 bg-white/90 p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.5)] backdrop-blur-md sm:max-w-[280px]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F59E0B]/15 text-[#B45309]">
                        <LineChart className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Weekly progress reporting</p>
                        <p className="text-sm text-slate-500">Parents stay informed, students stay accountable</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <a
              href="#courses"
              className="mx-auto mt-2 flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:text-[#312E81]"
            >
              Scroll to explore
              <ChevronDown className="h-4 w-4 animate-bounce text-[#2563EB]" />
            </a>
          </div>
        </section>

        <section id="courses" className="scroll-mt-32 py-24">
          <div className={shell}>
            <Reveal>
              <SectionHeading
                eyebrow="Popular courses"
                title="Purpose-built programs that move students from effort to excellence."
                description="Each course pairs rigorous subject teaching with consistent mentoring, progress measurement, and premium classroom support so students never drift without direction."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {courses.map((course, index) => {
                const Icon = course.icon;
                return (
                  <Reveal key={course.title} delay={index * 90} className="h-full">
                    <article
                      className={cn(
                        cardBase,
                        "group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-2 hover:shadow-[0_34px_90px_-42px_rgba(49,46,129,0.35)]",
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#312E81]/6 text-[#312E81] transition duration-300 group-hover:bg-[#312E81] group-hover:text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="rounded-full bg-[#F59E0B]/12 px-3 py-1 text-xs font-semibold text-[#B45309]">
                          {course.focus}
                        </span>
                      </div>

                      <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
                        <p className="text-sm leading-7 text-slate-600">{course.description}</p>
                      </div>

                      <div className="mt-6 space-y-3 border-y border-slate-100 py-5 text-sm text-slate-600">
                        <div className="flex items-center gap-3">
                          <Clock3 className="h-4 w-4 text-[#2563EB]" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Target className="h-4 w-4 text-[#2563EB]" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users2 className="h-4 w-4 text-[#2563EB]" />
                          <span>{course.instructor}</span>
                        </div>
                      </div>

                      <a
                        href="#enroll"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#312E81] transition hover:gap-3"
                      >
                        Request admission details
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="subjects" className="scroll-mt-32 py-24">
          <div className={shell}>
            <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
              <Reveal>
                <div className={cn(cardBase, "p-8 sm:p-10") }>
                  <SectionHeading
                    eyebrow="Subjects offered"
                    title="Strong academic foundations across every critical learning stage."
                    description="Whether a student needs deeper conceptual support, exam readiness, or stretch-goal challenges, our subject pathways are structured for long-term growth."
                  />

                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {subjects.map((subject) => {
                      const Icon = subject.icon;
                      return (
                        <article
                          key={subject.name}
                          className="rounded-[20px] border border-slate-100 bg-slate-50/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#2563EB]/15 hover:bg-white"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#312E81] shadow-sm">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="mt-4 text-base font-semibold text-slate-900">{subject.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{subject.detail}</p>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/70 p-3 shadow-[0_28px_90px_-42px_rgba(15,23,42,0.32)] backdrop-blur-xl">
                  <div className="relative overflow-hidden rounded-[28px]">
                    <img
                      src="https://images.pexels.com/photos/8423104/pexels-photo-8423104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                      alt="Students listening closely to a teacher in a bright collaborative classroom."
                      className="h-[420px] w-full object-cover sm:h-[560px]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/5 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-[20px] border border-white/10 bg-white/10 p-5 text-white backdrop-blur-md">
                          <p className="text-xs uppercase tracking-[0.18em] text-white/65">Learning focus</p>
                          <p className="mt-2 text-lg font-semibold">Clarity first</p>
                        </div>
                        <div className="rounded-[20px] border border-white/10 bg-white/10 p-5 text-white backdrop-blur-md">
                          <p className="text-xs uppercase tracking-[0.18em] text-white/65">Mentor support</p>
                          <p className="mt-2 text-lg font-semibold">Real-time doubt solving</p>
                        </div>
                        <div className="rounded-[20px] border border-white/10 bg-white/10 p-5 text-white backdrop-blur-md">
                          <p className="text-xs uppercase tracking-[0.18em] text-white/65">Outcome</p>
                          <p className="mt-2 text-lg font-semibold">Stronger academic momentum</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="methodology" className="scroll-mt-32 py-24">
          <div className={shell}>
            <Reveal>
              <SectionHeading
                eyebrow="Learning methodology"
                title="A calm, high-performance system built around the way students actually grow."
                description="We blend diagnostics, expert teaching, guided practice, and measurable review cycles so progress feels visible, motivating, and sustainable."
              />
            </Reveal>

            <div className="mt-12 grid gap-8 lg:grid-cols-[0.96fr_1.04fr]">
              <div className="grid gap-5">
                {methodology.map((item, index) => (
                  <Reveal key={item.step} delay={index * 90}>
                    <article className={cn(cardBase, "p-6 sm:p-7") }>
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-[#312E81] text-base font-semibold text-white">
                            {item.step}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#2563EB]/8 px-3 py-1 text-xs font-semibold text-[#312E81]">
                          {item.accent}
                        </span>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={120}>
                <div className={cn(cardBase, "overflow-hidden") }>
                  <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
                    <div className="p-8 sm:p-10">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">Transparent mentorship</p>
                      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
                        Students get structure. Parents get clarity. Everyone sees progress.
                      </h3>
                      <p className="mt-4 text-base leading-8 text-slate-600">
                        Our learning experience is built to remove academic anxiety and replace it with clear expectations,
                        smart routines, and consistent mentor encouragement.
                      </p>

                      <div className="mt-8 space-y-5">
                        <div className="rounded-[20px] border border-slate-100 bg-slate-50/80 p-5">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Weekly mastery check-ins</p>
                              <p className="text-sm text-slate-500">Short reviews to catch gaps before they widen</p>
                            </div>
                            <span className="text-sm font-semibold text-emerald-600">Always on</span>
                          </div>
                        </div>
                        <div className="rounded-[20px] border border-slate-100 bg-slate-50/80 p-5">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Adaptive practice plans</p>
                              <p className="text-sm text-slate-500">Targeted homework based on recurring error patterns</p>
                            </div>
                            <span className="text-sm font-semibold text-[#312E81]">Personalized</span>
                          </div>
                        </div>
                        <div className="rounded-[20px] border border-slate-100 bg-slate-50/80 p-5">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Parent mentor touchpoints</p>
                              <p className="text-sm text-slate-500">Simple updates that make progress easy to understand</p>
                            </div>
                            <span className="text-sm font-semibold text-[#B45309]">Monthly</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative min-h-[320px] lg:min-h-full">
                      <img
                        src="https://images.pexels.com/photos/5311406/pexels-photo-5311406.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                        alt="One-on-one tutoring session with a student receiving guided support."
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 text-white backdrop-blur-md">
                          <p className="text-xs uppercase tracking-[0.18em] text-white/65">Mentor promise</p>
                          <p className="mt-2 text-xl font-semibold">No student gets lost in the system.</p>
                          <p className="mt-2 text-sm leading-6 text-white/75">
                            Frequent doubt-solving, high-quality explanations, and visible action plans keep momentum strong.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="educators" className="scroll-mt-32 py-24">
          <div className={shell}>
            <Reveal>
              <SectionHeading
                eyebrow="Meet the educators"
                title="Experienced mentors who balance academic rigor with patience, warmth, and direction."
                description="The teaching team is selected not only for subject expertise, but for their ability to simplify complexity, build trust, and unlock stronger student habits."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {educators.map((educator, index) => (
                <Reveal key={educator.name} delay={index * 90} className="h-full">
                  <article className={cn(cardBase, "group h-full overflow-hidden") }>
                    <div className="overflow-hidden">
                      <img
                        src={educator.image}
                        alt={educator.alt}
                        className="h-80 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">{educator.role}</p>
                      <h3 className="mt-3 text-2xl font-semibold text-slate-900">{educator.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{educator.experience}</p>
                      <ul className="mt-6 space-y-3 text-sm text-slate-700">
                        {educator.specialties.map((specialty) => (
                          <li key={specialty} className="flex items-center gap-3">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="stories" className="scroll-mt-32 py-24">
          <div className={shell}>
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <Reveal>
                <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/70 p-3 shadow-[0_28px_90px_-42px_rgba(15,23,42,0.32)] backdrop-blur-xl">
                  <div className="relative overflow-hidden rounded-[28px]">
                    <img
                      src="https://images.pexels.com/photos/7972741/pexels-photo-7972741.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                      alt="Students celebrating academic achievement with diplomas and smiles."
                      className="h-[420px] w-full object-cover sm:h-[560px]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className="max-w-lg rounded-[24px] border border-white/10 bg-white/10 p-6 text-white backdrop-blur-md">
                        <p className="text-xs uppercase tracking-[0.18em] text-white/65">Student success stories</p>
                        <p className="mt-3 text-2xl font-semibold sm:text-3xl">
                          Outcomes that inspire confidence long after exam season ends.
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/75">
                          Better grades matter, but so do stronger routines, calmer test-taking, and students who genuinely believe
                          they can achieve more.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-5">
                <Reveal>
                  <SectionHeading
                    eyebrow="Student outcomes"
                    title="Real progress that students can feel and parents can see."
                    description="From confidence and consistency to measurable score improvement, every part of the experience is designed to create momentum that compounds."
                  />
                </Reveal>

                {testimonials.map((story, index) => (
                  <Reveal key={story.name} delay={index * 90}>
                    <article className={cn(cardBase, "p-6 sm:p-7") }>
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#312E81]/6 text-[#312E81]">
                          <MessageSquareQuote className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-base leading-8 text-slate-700">“{story.quote}”</p>
                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <p className="font-semibold text-slate-900">{story.name}</p>
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                            <p className="text-sm text-slate-500">{story.result}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="outcomes" className="scroll-mt-32 py-24">
          <div className={shell}>
            <div className="overflow-hidden rounded-[32px] bg-[#312E81] px-6 py-12 shadow-[0_36px_120px_-60px_rgba(49,46,129,0.85)] sm:px-8 lg:px-10 lg:py-14">
              <Reveal>
                <SectionHeading
                  eyebrow="Performance statistics"
                  title="Measurable academic growth, delivered through disciplined systems."
                  description="Our outcomes reflect what happens when students receive expert teaching, focused routines, and feedback that is timely enough to change results."
                  light
                />
              </Reveal>

              <div className="mt-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
                <div className="grid gap-4 sm:grid-cols-2">
                  {stats.map((stat, index) => (
                    <Reveal key={stat.label} delay={index * 90}>
                      <article className="rounded-[24px] border border-white/10 bg-white/8 p-6 text-white backdrop-blur-sm">
                        <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                          <AnimatedValue value={stat.value} suffix={stat.suffix} />
                        </p>
                        <p className="mt-4 max-w-xs text-sm leading-7 text-white/70">{stat.label}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={120}>
                  <div className="rounded-[24px] border border-white/10 bg-white/8 p-6 sm:p-7 backdrop-blur-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">Growth indicators</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Progress that is visible week by week.</h3>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      We track not only marks, but also confidence, consistency, and readiness under timed conditions.
                    </p>

                    <div className="mt-8 space-y-6">
                      <ProgressMetric
                        label="Concept mastery tracking"
                        detail="Weekly checks across core topics"
                        value={92}
                      />
                      <ProgressMetric
                        label="Homework completion discipline"
                        detail="Routine-building with mentor accountability"
                        value={86}
                      />
                      <ProgressMetric
                        label="Mock-test readiness"
                        detail="Test stamina, timing, and error reduction"
                        value={95}
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="batches" className="scroll-mt-32 py-24">
          <div className={shell}>
            <Reveal>
              <SectionHeading
                eyebrow="Upcoming batches"
                title="High-intent cohorts with limited seats and a clear start line."
                description="Choose the schedule and format that fits your family while keeping the same quality of mentoring, progress review, and premium classroom support."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {batchCards.map((batch, index) => (
                <Reveal key={batch.title} delay={index * 90} className="h-full">
                  <article className={cn(cardBase, "flex h-full flex-col p-6") }>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#312E81]/6 text-[#312E81]">
                        <CalendarDays className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {batch.seats}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-semibold text-slate-900">{batch.title}</h3>
                    <p className="mt-3 text-sm font-semibold text-[#2563EB]">{batch.start}</p>

                    <div className="mt-6 space-y-4 border-y border-slate-100 py-5 text-sm text-slate-600">
                      <div className="flex items-center gap-3">
                        <Clock3 className="h-4 w-4 text-[#2563EB]" />
                        <span>{batch.schedule}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <LineChart className="h-4 w-4 text-[#2563EB]" />
                        <span>{batch.format}</span>
                      </div>
                    </div>

                    <a href="#enroll" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#312E81] transition hover:gap-3">
                      Reserve your seat
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faqs" className="scroll-mt-32 py-24">
          <div className={shell}>
            <Reveal>
              <SectionHeading
                eyebrow="FAQs"
                title="Everything families usually ask before taking the next step."
                description="Clear answers, thoughtful expectations, and a transparent enrollment process help students and parents move forward with confidence."
              />
            </Reveal>

            <div className="mt-12 grid gap-4">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 70}>
                  <details className={cn(cardBase, "group p-6 sm:p-7") }>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                      <span className="text-lg font-semibold text-slate-900">{faq.question}</span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 transition group-open:bg-[#312E81] group-open:text-white">
                        <ChevronDown className="h-5 w-5 transition duration-300 group-open:rotate-180" />
                      </span>
                    </summary>
                    <p className="mt-4 max-w-4xl pr-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="enroll" className="scroll-mt-32 py-24">
          <div className={shell}>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <Reveal>
                <div className={cn(cardBase, "p-8 sm:p-10") }>
                  <SectionHeading
                    eyebrow="Enrollment"
                    title="Take the next step toward stronger grades and greater confidence."
                    description="Tell us about your academic goals, current stage, and preferred subjects. Our team will recommend the most suitable course and next available batch."
                  />

                  <div className="mt-10 space-y-4">
                    {[
                      "Personalized course recommendation after an academic review",
                      "Guidance on the best batch, schedule, and mentoring path",
                      "A fast response from our admissions team within one working day",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-[18px] border border-slate-100 bg-slate-50/80 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        <p className="text-sm leading-7 text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className={cn(cardBase, "p-8 sm:p-10") }>
                  <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm font-medium text-slate-700">
                        Student name
                        <input
                          type="text"
                          name="studentName"
                          autoComplete="name"
                          placeholder="Enter student name"
                          className="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-slate-700">
                        Parent name
                        <input
                          type="text"
                          name="parentName"
                          autoComplete="name"
                          placeholder="Enter parent name"
                          className="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                        />
                      </label>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm font-medium text-slate-700">
                        Email address
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          className="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-slate-700">
                        Phone number
                        <input
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          placeholder="Enter phone number"
                          className="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                        />
                      </label>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm font-medium text-slate-700">
                        Current grade / level
                        <select className="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10">
                          <option>Choose grade or level</option>
                          <option>Grades 6–8</option>
                          <option>Grades 8–10</option>
                          <option>Grades 11–12</option>
                          <option>Competitive exam prep</option>
                        </select>
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-slate-700">
                        Course interest
                        <select className="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10">
                          <option>Select a program</option>
                          <option>Scholars Foundation Program</option>
                          <option>Exam Accelerator Track</option>
                          <option>STEM Excellence Cohort</option>
                          <option>Olympiad & Scholarship Lab</option>
                        </select>
                      </label>
                    </div>

                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Academic goals
                      <textarea
                        name="goals"
                        rows={5}
                        placeholder="Share current challenges, target exams, subjects of interest, or the kind of support you are looking for."
                        className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                      />
                    </label>

                    <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-7 text-slate-500">
                        By submitting, you agree to be contacted by our admissions team for course guidance.
                      </p>
                      <button type="submit" className={primaryButton}>
                        Request a callback
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-32 pb-20 pt-8">
          <div className={shell}>
            <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 shadow-[0_28px_90px_-42px_rgba(15,23,42,0.32)]">
              <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
                <div className="relative min-h-[420px]">
                  <img
                    src="https://images.pexels.com/photos/37758609/pexels-photo-37758609.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                    alt="Students collaborating together in a modern study space."
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                    <div className="max-w-xl rounded-[24px] border border-white/10 bg-white/10 p-6 text-white backdrop-blur-md">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">Contact & campus visits</p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Visit a learning space designed for focus, confidence, and progress.
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-white/75">
                        Meet the team, explore our classrooms, and understand how our mentoring model supports students from their first session onward.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-10">
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">Get in touch</p>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                      Speak with our admissions and mentoring team.
                    </h2>
                    <p className="text-base leading-8 text-slate-600">
                      We are happy to help with course selection, schedules, faculty information, and the next available intake.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4">
                    <a href="tel:+15550123456" className="rounded-[20px] border border-slate-100 bg-slate-50/80 p-5 transition hover:border-[#2563EB]/15 hover:bg-white">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#312E81]/6 text-[#312E81]">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Call us</p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">+1 (555) 012-3456</p>
                        </div>
                      </div>
                    </a>

                    <a href="mailto:admissions@northstarlearning.studio" className="rounded-[20px] border border-slate-100 bg-slate-50/80 p-5 transition hover:border-[#2563EB]/15 hover:bg-white">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#312E81]/6 text-[#312E81]">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Email admissions</p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">admissions@northstarlearning.studio</p>
                        </div>
                      </div>
                    </a>

                    <div className="rounded-[20px] border border-slate-100 bg-slate-50/80 p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#312E81]/6 text-[#312E81]">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <address className="not-italic">
                          <p className="text-sm font-semibold text-slate-900">Visit the campus</p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            285 Northstar Avenue, Learning District, Suite 400
                            <br />
                            Open Monday to Saturday · 8:00 AM to 8:00 PM
                          </p>
                        </address>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[24px] bg-slate-950 p-6 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">Why families choose us</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {[
                        "Warm, high-expectation mentoring",
                        "Visible academic progress systems",
                        "Structured batches with limited seats",
                        "A premium learning environment",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/70 py-10">
        <div className={cn(shell, "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between") }>
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#312E81] text-white shadow-lg shadow-[#312E81]/20">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2563EB]">Northstar</p>
                <p className="text-sm font-medium text-slate-600">Learning Studio</p>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
              Premium coaching and tutoring for students who want more than classes — they want structure, mentorship, confidence, and meaningful academic growth.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Explore</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-500">
                <a href="#courses" className="transition hover:text-[#312E81]">Courses</a>
                <a href="#methodology" className="transition hover:text-[#312E81]">Methodology</a>
                <a href="#stories" className="transition hover:text-[#312E81]">Success stories</a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Admissions</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-500">
                <a href="#batches" className="transition hover:text-[#312E81]">Upcoming batches</a>
                <a href="#enroll" className="transition hover:text-[#312E81]">Enrollment form</a>
                <a href="#faqs" className="transition hover:text-[#312E81]">FAQs</a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Contact</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-500">
                <a href="tel:+15550123456" className="transition hover:text-[#312E81]">+1 (555) 012-3456</a>
                <a href="mailto:admissions@northstarlearning.studio" className="transition hover:text-[#312E81]">
                  admissions@northstarlearning.studio
                </a>
                <a href="#contact" className="transition hover:text-[#312E81]">Visit campus</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
