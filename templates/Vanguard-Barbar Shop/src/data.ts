/* ------------------------------------------------------------------ */
/*  VANGUARD BARBER CO. — content & imagery                            */
/* ------------------------------------------------------------------ */

const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  hero: px(1805600, 1920, 1280),
  storyMain: px(12339159, 1200, 900),
  storyDetail: px(7697709, 640, 800),
  ritualMain: px(12302335, 900, 1150),
  ritualDetail: px(4730941, 800, 560),
  bookingSide: px(3998418, 800, 1000),
  visit: px(4969838, 1200, 800),
};

/* ------------------------------ barbers ------------------------------ */
export const BARBERS = [
  {
    name: "Marcus Cole",
    role: "Founder · Master Barber",
    years: "22 yrs at the chair",
    specs: ["Precision Fades", "Classic Tapers", "Mentoring"],
    img: px(4625643, 720, 920),
  },
  {
    name: "Darius Reed",
    role: "Senior Barber",
    years: "12 yrs at the chair",
    specs: ["Skin Fades", "Line Work", "Design Cuts"],
    img: px(7697395, 720, 920),
  },
  {
    name: "Theo Alvarez",
    role: "Style Specialist",
    years: "9 yrs at the chair",
    specs: ["Scissor Work", "Texture", "Long Hair"],
    img: px(4625628, 720, 920),
  },
  {
    name: "Sam Okafor",
    role: "Shave & Beard Specialist",
    years: "14 yrs at the chair",
    specs: ["Hot Towel Shaves", "Beard Sculpting", "Grey Blending"],
    img: px(7697430, 720, 920),
  },
];

/* ------------------------------ services ----------------------------- */
export type Service = {
  cat: "cuts" | "shave";
  name: string;
  mins: number;
  price: number;
  desc: string;
  img: string;
};

export const SERVICES: Service[] = [
  {
    cat: "cuts",
    name: "The Precision Cut",
    mins: 45,
    price: 48,
    desc: "Consultation, tailored clipper and scissor work, hot-towel neck finish and a styled send-off.",
    img: px(31840006, 880, 640),
  },
  {
    cat: "cuts",
    name: "Skin Fade",
    mins: 45,
    price: 52,
    desc: "Zero-gap blending built around your head shape — tight at the base, seamless to the top.",
    img: px(33461079, 880, 640),
  },
  {
    cat: "cuts",
    name: "Scissor Cut & Style",
    mins: 60,
    price: 58,
    desc: "Classic shear craftsmanship for longer styles. Weight, movement and shape — cut to grow out clean.",
    img: px(3998414, 880, 640),
  },
  {
    cat: "cuts",
    name: "Buzz, Shape & Blend",
    mins: 30,
    price: 32,
    desc: "One-guard simplicity with barber detail — shaped edges, blended crown, clean neckline.",
    img: px(36043163, 880, 640),
  },
  {
    cat: "cuts",
    name: "Head Shave & Detail",
    mins: 40,
    price: 45,
    desc: "Hot lather, straight razor scalp shave, cold towel close and a conditioning balm finish.",
    img: px(12464842, 880, 640),
  },
  {
    cat: "cuts",
    name: "The Consultation Cut",
    mins: 75,
    price: 70,
    desc: "First visit done right — face-shape analysis, style plan, full cut and a maintenance roadmap.",
    img: px(4625630, 880, 640),
  },
  {
    cat: "shave",
    name: "Beard Sculpt & Trim",
    mins: 30,
    price: 38,
    desc: "Clippers, shears and razor lining to build structure — then conditioned with house beard oil.",
    img: px(897265, 880, 640),
  },
  {
    cat: "shave",
    name: "Hot Towel Beard Detail",
    mins: 45,
    price: 48,
    desc: "Steam-softened shaping with definition at the cheeks and neck. Finished with balm and steam press.",
    img: px(3998412, 880, 640),
  },
  {
    cat: "shave",
    name: "Royal Straight Razor Shave",
    mins: 45,
    price: 55,
    desc: "The full ritual — hot towels, warm lather, single-blade passes and a cold towel close.",
    img: px(5568407, 880, 640),
  },
  {
    cat: "shave",
    name: "Classic Shave & Steam",
    mins: 40,
    price: 50,
    desc: "Traditional wet shave with pre-shave oil, steam pass and a sandalwood aftershave finish.",
    img: px(12302333, 880, 640),
  },
  {
    cat: "shave",
    name: "Line-Up & Edge Work",
    mins: 20,
    price: 25,
    desc: "Ten-minute reset for hairline, temples and beard edges. Keep the cut fresh between visits.",
    img: px(9992819, 880, 640),
  },
  {
    cat: "shave",
    name: "Grey Camouflage Blend",
    mins: 45,
    price: 60,
    desc: "Subtle semi-permanent blending that takes ten years off — never noticed, never obvious.",
    img: px(5853394, 880, 640),
  },
];

/* ------------------------------ packages ----------------------------- */
export const PACKAGES = [
  {
    name: "The Gentleman",
    time: "75 min",
    price: 82,
    save: "Save $12",
    features: ["Signature precision cut", "Beard sculpt & trim", "Hot towel neck finish", "Product styling & plan"],
    img: px(3998419, 880, 640),
  },
  {
    name: "The Executive",
    time: "110 min",
    price: 118,
    save: "Save $25",
    featured: true,
    features: ["Precision cut & style", "Royal straight razor shave", "Charcoal facial cleanse", "Scalp & shoulder massage", "Complimentary pour"],
    img: px(9315046, 880, 640),
  },
  {
    name: "The Groomsman",
    time: "60 min / head",
    price: 96,
    save: "Parties of 3+",
    features: ["Cut or beard detail per man", "Private lounge & bourbon", "Group photo on the floor", "Bride-recon not required"],
    img: px(6080357, 880, 640),
  },
];

/* ----------------------------- membership ---------------------------- */
export const MEMBERSHIPS = [
  {
    name: "Essential",
    price: 79,
    tagline: "Stay sharp, monthly.",
    features: [
      "One signature cut per month",
      "10% off all shelf products",
      "Priority weekday booking",
      "Neck & edge touch-up included",
    ],
  },
  {
    name: "Signature",
    price: 139,
    tagline: "The regular's choice.",
    featured: true,
    features: [
      "Two services per month",
      "One hot towel beard detail",
      "15% off products & packages",
      "Priority booking, any day",
      "Quarterly guest pass",
    ],
  },
  {
    name: "Executive",
    price: 219,
    tagline: "For the uncompromising.",
    features: [
      "Up to four services monthly",
      "Monthly royal shave ritual",
      "20% off across the shelf",
      "Same-week guaranteed slot",
      "Complimentary lounge bar",
    ],
  },
];

/* ------------------------------- gallery ------------------------------ */
export const GALLERY = [
  { img: px(12302333, 900, 1150), title: "The Razor Pass", tag: "Straight Shave", span: "tall" },
  { img: px(13138476, 1200, 800), title: "Leather & Chrome", tag: "The Shop Floor", span: "wide" },
  { img: px(23349892, 800, 1000), title: "Clipper Work", tag: "Skin Fade", span: "tall" },
  { img: px(7697208, 900, 700), title: "Tools of the Trade", tag: "Craft", span: "square" },
  { img: px(10024232, 880, 660), title: "The Beard Detail", tag: "Grooming", span: "wide" },
  { img: px(30547689, 800, 1000), title: "Heritage Iron", tag: "The Chairs", span: "tall" },
  { img: px(18090355, 1000, 760), title: "The Mirror Wall", tag: "Shop Archive '04", span: "square" },
  { img: px(12912688, 800, 950), title: "The Final Check", tag: "Fresh Cut", span: "square" },
];

/* ------------------------------- products ---------------------------- */
export const PRODUCTS = [
  {
    name: "Ironhold Matte Pomade",
    note: "Strong hold · zero shine",
    price: 28,
    tag: "House Blend",
    img: px(15549644, 720, 880),
  },
  {
    name: "Cedar & Smoke Beard Oil",
    note: "Cedarwood, vetiver, black pepper",
    price: 34,
    tag: "House Blend",
    img: px(9379076, 720, 880),
  },
  {
    name: "Barber's Shave Cream",
    note: "Lather-rich · sandalwood base",
    price: 26,
    tag: "Shop Exclusive",
    img: px(9379078, 720, 880),
  },
  {
    name: "The Traveler Kit",
    note: "Oil, balm, comb & canvas roll",
    price: 98,
    tag: "Limited Run",
    img: px(14649387, 720, 880),
  },
];

/* ----------------------------- testimonials --------------------------- */
export const TESTIMONIALS = [
  {
    quote:
      "You can tell within thirty seconds when a man cares about his trade. Marcus has cut my hair for six years and I have never once left the chair anything less than sharp.",
    name: "James Whitfield",
    meta: "Client since 2019 · The Executive",
  },
  {
    quote:
      "The hot towel shave is a religious experience. I booked a standing slot every Friday at noon — it is the one meeting I never miss.",
    name: "Daniel Reyes",
    meta: "Client since 2021 · Signature Member",
  },
  {
    quote:
      "Finally, a shop that treats a fade like architecture. The blend around the temples is surgical. I get asked where I get my hair cut weekly.",
    name: "Andre Coleman",
    meta: "Client since 2020 · Skin Fade",
  },
  {
    quote:
      "Walked in for a cut, stayed for the atmosphere. Dark wood, good coffee, nobody rushing you out the door. This is how a barbershop should feel.",
    name: "Michael Strand",
    meta: "Client since 2023 · Walk-in Regular",
  },
];

/* --------------------------------- faq -------------------------------- */
export const FAQS = [
  {
    q: "Do you take walk-ins?",
    a: "Yes — walk-ins are welcome whenever a chair is open, and a wait rarely runs long. That said, Friday and Saturday fill fast, so booking ahead is the only way to guarantee your slot and your barber.",
  },
  {
    q: "How far ahead should I book?",
    a: "Two to three days is usually safe on weekdays. Prime-time slots — evenings and weekends — tend to go a week out. Members get priority windows and same-week guarantees.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Life happens. We ask for four hours notice when you can manage it, and there is never a fee for rescheduling. No-shows twice in a row will need a card to hold future bookings.",
  },
  {
    q: "What products do you use in the chair?",
    a: "Everything that touches your head is vetted the hard way — used on our own heads first. House blends, a small roster of artisan brands, and nothing with ingredient lists we wouldn't put in writing.",
  },
  {
    q: "Is there parking nearby?",
    a: "Metered street parking on Halsted and free two-hour parking behind the shop on weekends. The Blue Line stop is a four-minute walk if you'd rather skip the car entirely.",
  },
  {
    q: "Do you offer gift cards?",
    a: "We do — physical gift cards at the counter and digital ones by phone. The Executive package is our most gifted experience, and it presents well in an envelope.",
  },
];

/* -------------------------------- hours ------------------------------- */
export const HOURS = [
  { day: "Monday", time: "9:00 — 19:00" },
  { day: "Tuesday", time: "9:00 — 19:00" },
  { day: "Wednesday", time: "9:00 — 20:00" },
  { day: "Thursday", time: "9:00 — 20:00" },
  { day: "Friday", time: "9:00 — 19:00" },
  { day: "Saturday", time: "8:00 — 17:00" },
  { day: "Sunday", time: "Closed", closed: true },
];

export const CONTACT = {
  phone: "(312) 555-0197",
  address: "214 N. Halsted Street",
  area: "West Loop · Chicago, IL 60661",
  email: "chair@vanguardbarber.co",
};

export const NAV_LINKS = [
  { label: "The Lounge", href: "#story" },
  { label: "Barbers", href: "#barbers" },
  { label: "Services", href: "#services" },
  { label: "The Work", href: "#gallery" },
  { label: "Membership", href: "#membership" },
  { label: "The Shelf", href: "#products" },
  { label: "Visit", href: "#visit" },
];
