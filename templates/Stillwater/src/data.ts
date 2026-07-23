export const IMAGES = {
  hero: "https://images.pexels.com/photos/32298479/pexels-photo-32298479.jpeg?auto=compress&cs=tinysrgb&w=2400",
  philosophyArch:
    "https://images.pexels.com/photos/9032520/pexels-photo-9032520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=850",
  lakePose:
    "https://images.pexels.com/photos/13849174/pexels-photo-13849174.jpeg?auto=compress&cs=tinysrgb&w=1200",
  teaCandle:
    "https://images.pexels.com/photos/8942924/pexels-photo-8942924.jpeg?auto=compress&cs=tinysrgb&w=900",
  meditationClose:
    "https://images.pexels.com/photos/8964948/pexels-photo-8964948.jpeg?auto=compress&cs=tinysrgb&w=1600",
  matcha:
    "https://images.pexels.com/photos/5975976/pexels-photo-5975976.jpeg?auto=compress&cs=tinysrgb&w=900",
};

export type StudioClass = {
  name: string;
  category: "Flow" | "Slow & Restore" | "Foundations";
  description: string;
  level: string;
  duration: string;
  instructor: string;
  image: string;
};

export const CLASSES: StudioClass[] = [
  {
    name: "Sunrise Vinyasa",
    category: "Flow",
    description:
      "An unhurried moving meditation that builds warmth with breath-linked sequences as the studio fills with morning light.",
    level: "All levels",
    duration: "75 min",
    instructor: "Elena Marsh",
    image:
      "https://images.pexels.com/photos/6454059/pexels-photo-6454059.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Slow Hatha",
    category: "Slow & Restore",
    description:
      "Postures held with patience and generous props. Less choreography, more listening — strength without hurry.",
    level: "All levels",
    duration: "60 min",
    instructor: "Jonas Weber",
    image:
      "https://images.pexels.com/photos/7664139/pexels-photo-7664139.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Yin & Deep Release",
    category: "Slow & Restore",
    description:
      "Long, floor-based holds that invite the connective tissue — and the nervous system — to finally let go.",
    level: "All levels",
    duration: "75 min",
    instructor: "Maya Chen",
    image:
      "https://images.pexels.com/photos/6454032/pexels-photo-6454032.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Heart-Opening Flow",
    category: "Flow",
    description:
      "A spacious backbend practice, taken slowly and safely, to counter long days spent bent over a screen.",
    level: "Level 2",
    duration: "60 min",
    instructor: "Elena Marsh",
    image:
      "https://images.pexels.com/photos/13849174/pexels-photo-13849174.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Restorative Candlelight",
    category: "Slow & Restore",
    description:
      "Ninety minutes of supported stillness by candle flame and low evening light. Many students fall gently asleep.",
    level: "Everyone",
    duration: "90 min",
    instructor: "Rosa Lindqvist",
    image:
      "https://images.pexels.com/photos/7662437/pexels-photo-7662437.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Gentle Beginnings",
    category: "Foundations",
    description:
      "Never practiced before? Perfect. Chair options, clear language, and absolute permission to rest at any time.",
    level: "Beginner",
    duration: "60 min",
    instructor: "Rosa Lindqvist",
    image:
      "https://images.pexels.com/photos/7500032/pexels-photo-7500032.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
];

export type Practice = {
  no: string;
  title: string;
  kind: string;
  description: string;
  duration: string;
  schedule: string;
};

export const PRACTICES: Practice[] = [
  {
    no: "I",
    title: "SIT — Mindfulness Foundations",
    kind: "Meditation course",
    description:
      "A six-week course in seated practice: posture, attention, and kindness toward a wandering mind. Daily ten-minute home sits, supported by Sunday circles.",
    duration: "6 weeks · 90 min",
    schedule: "Sundays, 5:00 pm",
  },
  {
    no: "II",
    title: "Morning Silence",
    kind: "Guided meditation",
    description:
      "Twenty minutes of guided arrival, twenty of shared silence, tea afterwards in the courtyard. The quietest way to start a weekday.",
    duration: "45 min",
    schedule: "Mon / Wed / Fri, 7:30 am",
  },
  {
    no: "III",
    title: "Coherent Breath",
    kind: "Breathwork",
    description:
      "Five to six breaths per minute, guided with tone and subtle pacing. Grounding, measurable, and deeply calming for anxiety and restless sleep.",
    duration: "45 min",
    schedule: "Tuesdays, 6:00 pm",
  },
  {
    no: "IV",
    title: "Yoga Nidra — The Rest Practice",
    kind: "Guided rest",
    description:
      "Lie down, cover your eyes, and be led to the threshold of sleep. One session restores like hours of rest — no effort required.",
    duration: "60 min",
    schedule: "Thursdays, 7:30 pm",
  },
  {
    no: "V",
    title: "Breath & Ice",
    kind: "Advanced breathwork",
    description:
      "For experienced practitioners: an energising breath sequence followed by a supervised cold plunge in our courtyard. Intense, clear, alive.",
    duration: "90 min",
    schedule: "Saturdays, 9:00 am",
  },
];

export type Instructor = {
  name: string;
  role: string;
  bio: string;
  years: string;
  image: string;
};

export const INSTRUCTORS: Instructor[] = [
  {
    name: "Elena Marsh",
    role: "Founder · Vinyasa & Slow Flow",
    bio: "Elena opened Stillwater in 2016 after a decade teaching in Kyoto and Copenhagen. Her classes are quiet, precise, and never rushed.",
    years: "Teaching 18 yrs",
    image:
      "https://images.pexels.com/photos/4534878/pexels-photo-4534878.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=820",
  },
  {
    name: "Maya Chen",
    role: "Yin & Meditation",
    bio: "A former ER nurse, Maya teaches rest like medicine. Her yin and nidra classes are famous for ending with the sound of students' slow breathing.",
    years: "Teaching 11 yrs",
    image:
      "https://images.pexels.com/photos/6453458/pexels-photo-6453458.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=820",
  },
  {
    name: "Jonas Weber",
    role: "Hatha & Breathwork",
    bio: "Jonas trained in classical hatha in Mysore and pranayama in Cologne. He teaches breath the way an engineer explains a good bridge: clearly.",
    years: "Teaching 14 yrs",
    image:
      "https://images.pexels.com/photos/7490524/pexels-photo-7490524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=820",
  },
  {
    name: "Rosa Lindqvist",
    role: "Restorative & Beginners",
    bio: "Rosa spent 30 years as a forest school teacher before yoga found her. Gentle Beginnings, her signature class, welcomes every age and body.",
    years: "Teaching 9 yrs",
    image:
      "https://images.pexels.com/photos/6787540/pexels-photo-6787540.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=820",
  },
];

export type Retreat = {
  name: string;
  location: string;
  dates: string;
  length: string;
  price: string;
  description: string;
  image: string;
};

export const RETREATS: Retreat[] = [
  {
    name: "Forest Silence",
    location: "Columbia River Gorge, OR",
    dates: "May 15 – 18",
    length: "4 days",
    price: "from $1,240",
    description:
      "Three mornings of silent walking under old-growth cedar, gentle yoga at dusk, and phone-free evenings by the fire.",
    image:
      "https://images.pexels.com/photos/10124641/pexels-photo-10124641.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    name: "Ocean Breath",
    location: "Manzanita Coast, OR",
    dates: "Jul 10 – 14",
    length: "5 days",
    price: "from $1,560",
    description:
      "Sunrise practice on the sand, afternoon breathwork with the sound of the tide, and everything done at beach pace.",
    image:
      "https://images.pexels.com/photos/5928615/pexels-photo-5928615.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    name: "Mist & Cedar",
    location: "Mount Hood Wilderness",
    dates: "Sep 19 – 23",
    length: "5 days",
    price: "from $1,480",
    description:
      "A deep-winter-style rest retreat in early autumn: candlelit yin, hot springs, forest bathing, and long sleep.",
    image:
      "https://images.pexels.com/photos/18586407/pexels-photo-18586407.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
];

export type Session = { time: string; name: string; teacher: string; level: string; spots: number };

export const SCHEDULE: Record<string, Session[]> = {
  Mon: [
    { time: "6:45", name: "Sunrise Vinyasa", teacher: "Elena Marsh", level: "All levels", spots: 6 },
    { time: "7:30", name: "Morning Silence", teacher: "Maya Chen", level: "Open sit", spots: 10 },
    { time: "12:15", name: "Midday Reset", teacher: "Jonas Weber", level: "All levels", spots: 4 },
    { time: "17:30", name: "Slow Hatha", teacher: "Jonas Weber", level: "All levels", spots: 8 },
    { time: "19:45", name: "Yin & Deep Release", teacher: "Maya Chen", level: "All levels", spots: 3 },
  ],
  Tue: [
    { time: "7:00", name: "Hatha & Breath", teacher: "Jonas Weber", level: "All levels", spots: 7 },
    { time: "9:00", name: "Gentle Beginnings", teacher: "Rosa Lindqvist", level: "Beginner", spots: 9 },
    { time: "12:15", name: "Midday Reset", teacher: "Elena Marsh", level: "All levels", spots: 5 },
    { time: "18:00", name: "Coherent Breath", teacher: "Jonas Weber", level: "Open sit", spots: 12 },
    { time: "19:30", name: "Heart-Opening Flow", teacher: "Elena Marsh", level: "Level 2", spots: 2 },
  ],
  Wed: [
    { time: "6:45", name: "Sunrise Vinyasa", teacher: "Elena Marsh", level: "All levels", spots: 5 },
    { time: "7:30", name: "Morning Silence", teacher: "Maya Chen", level: "Open sit", spots: 11 },
    { time: "10:00", name: "Gentle Beginnings", teacher: "Rosa Lindqvist", level: "Beginner", spots: 10 },
    { time: "17:30", name: "Slow Hatha", teacher: "Jonas Weber", level: "All levels", spots: 6 },
    { time: "20:00", name: "Restorative Candlelight", teacher: "Rosa Lindqvist", level: "Everyone", spots: 4 },
  ],
  Thu: [
    { time: "7:00", name: "Hatha & Breath", teacher: "Jonas Weber", level: "All levels", spots: 8 },
    { time: "12:15", name: "Midday Reset", teacher: "Elena Marsh", level: "All levels", spots: 3 },
    { time: "17:45", name: "Heart-Opening Flow", teacher: "Elena Marsh", level: "Level 2", spots: 6 },
    { time: "19:30", name: "Yoga Nidra", teacher: "Maya Chen", level: "Everyone", spots: 7 },
  ],
  Fri: [
    { time: "6:45", name: "Sunrise Vinyasa", teacher: "Elena Marsh", level: "All levels", spots: 9 },
    { time: "7:30", name: "Morning Silence", teacher: "Maya Chen", level: "Open sit", spots: 8 },
    { time: "12:15", name: "Midday Reset", teacher: "Jonas Weber", level: "All levels", spots: 5 },
    { time: "18:00", name: "Restorative Candlelight", teacher: "Rosa Lindqvist", level: "Everyone", spots: 2 },
  ],
  Sat: [
    { time: "8:30", name: "Community Flow", teacher: "Elena Marsh", level: "All levels", spots: 10 },
    { time: "9:00", name: "Breath & Ice", teacher: "Jonas Weber", level: "Advanced", spots: 4 },
    { time: "10:30", name: "Gentle Beginnings", teacher: "Rosa Lindqvist", level: "Beginner", spots: 8 },
    { time: "16:00", name: "Yin & Deep Release", teacher: "Maya Chen", level: "All levels", spots: 6 },
  ],
  Sun: [
    { time: "9:00", name: "Slow Sunday Flow", teacher: "Elena Marsh", level: "All levels", spots: 7 },
    { time: "10:45", name: "Tea & Stillness", teacher: "Maya Chen", level: "Open sit", spots: 9 },
    { time: "17:00", name: "SIT Meditation Circle", teacher: "Maya Chen", level: "Course", spots: 5 },
    { time: "18:30", name: "Yoga Nidra", teacher: "Maya Chen", level: "Everyone", spots: 6 },
  ],
};

export type Tier = {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  featured?: boolean;
};

export const TIERS: Tier[] = [
  {
    name: "Drop-in",
    price: "$28",
    cadence: "per class",
    tagline: "Come as you are, when you can.",
    features: ["Any single class", "Mat & props included", "Courtyard tea after class", "No expiry on intro visit"],
  },
  {
    name: "Roots",
    price: "$119",
    cadence: "per month",
    tagline: "A steady rhythm for a quiet life.",
    features: [
      "8 classes monthly",
      "2 meditation sits monthly",
      "Bring a friend once a month",
      "10% off workshops",
      "Pause anytime",
    ],
  },
  {
    name: "Canopy",
    price: "$189",
    cadence: "per month",
    tagline: "The full canopy of the practice.",
    features: [
      "Unlimited classes & sits",
      "1 guest pass monthly",
      "Priority retreat booking",
      "Quarterly private session",
      "Borrow from our library",
      "Home practice app access",
    ],
    featured: true,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I came for the stretching and stayed for the silence. Six months in, my doctor asked what changed — I just said, 'Tuesday evenings at Stillwater.'",
    name: "Hannah K.",
    detail: "Member since 2023 · Yin & Nidra",
  },
  {
    quote:
      "Nobody here makes you feel like a beginner, even when you very much are. Rosa once spent ten minutes adjusting a blanket for my knees. I nearly cried.",
    name: "Marcus T.",
    detail: "Gentle Beginnings, age 67",
  },
  {
    quote:
      "The Forest Silence retreat rewired something in me. Four days without my phone, and I came home speaking more slowly to my own children.",
    name: "Priya S.",
    detail: "Retreat guest, 2025",
  },
  {
    quote:
      "As a surgeon I live at full volume looped on repeat. Jonas taught me that one breath, done properly, is a whole room you can step into.",
    name: "Daniel R.",
    detail: "Member since 2024 · Breathwork",
  },
];

export const FAQS = [
  {
    q: "I've never done yoga. Where do I begin?",
    a: "Gentle Beginnings was built for exactly you — no experience, no flexibility, no special clothing required. Arrive ten minutes early and Rosa will show you the room, the props, and where to hide at the back if you like. Most of our members started as complete beginners.",
  },
  {
    q: "What should I wear and bring?",
    a: "Comfortable clothing you can bend and breathe in — that's all. We provide cork mats, bolsters, blankets, straps and filtered water. Most students practise barefoot, and we ask that phones stay in the cloakroom baskets.",
  },
  {
    q: "How full are the classes?",
    a: "Never more than twelve students, and most classes run at eight to ten. We keep the room small so teachers can actually teach — you'll receive hands-on or verbal adjustments almost every session, always with your consent first.",
  },
  {
    q: "Can I pause or cancel my membership?",
    a: "Yes, anytime, with a single email — no notice period, no exit interview. Roots and Canopy pause for up to three months per year, which most members use for summer travel. We would rather you leave happy and return.",
  },
  {
    q: "Is this spiritual or religious?",
    a: "Our teaching is secular and evidence-informed. You'll hear poetry occasionally and silence often, but no chanting is required and no belief is assumed. Doctors, sceptics and the quietly curious are all equally welcome.",
  },
  {
    q: "Do you offer private sessions?",
    a: "Yes — one-to-one yoga, meditation coaching and breathwork sessions run Tuesday to Thursday afternoons at $95 per hour. Many members book a private each season to deepen whatever their group practice has opened up.",
  },
];

export const GALLERY = [
  {
    src: "https://images.pexels.com/photos/7664139/pexels-photo-7664139.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Morning practice in soft window light",
    span: "tall",
  },
  {
    src: "https://images.pexels.com/photos/8942925/pexels-photo-8942925.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Candlelight and incense before an evening restorative class",
    span: "normal",
  },
  {
    src: "https://images.pexels.com/photos/33691833/pexels-photo-33691833.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Sunday tea poured slowly after class",
    span: "normal",
  },
  {
    src: "https://images.pexels.com/photos/6958390/pexels-photo-6958390.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=850",
    alt: "Quiet seated practice beside the studio's fig tree",
    span: "tall",
  },
  {
    src: "https://images.pexels.com/photos/8568563/pexels-photo-8568563.jpeg?auto=compress&cs=tinysrgb&w=1100",
    alt: "Fog over the treetops near the retreat cabin",
    span: "wide",
  },
  {
    src: "https://images.pexels.com/photos/13849174/pexels-photo-13849174.jpeg?auto=compress&cs=tinysrgb&w=1100",
    alt: "Practice by the lake at first light",
    span: "wide",
  },
];

export const NAV_LINKS = [
  { label: "Philosophy", id: "philosophy" },
  { label: "Classes", id: "classes" },
  { label: "Practice", id: "practice" },
  { label: "Teachers", id: "teachers" },
  { label: "Retreats", id: "retreats" },
  { label: "Schedule", id: "schedule" },
  { label: "Membership", id: "membership" },
];
