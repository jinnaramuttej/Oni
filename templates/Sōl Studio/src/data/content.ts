export const IMAGES = {
  hero: 'https://images.pexels.com/photos/14025625/pexels-photo-14025625.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  studioYoga: 'https://images.pexels.com/photos/7664139/pexels-photo-7664139.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  meditation: 'https://images.pexels.com/photos/6958255/pexels-photo-6958255.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  groupClass: 'https://images.pexels.com/photos/8436610/pexels-photo-8436610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  groupClass2: 'https://images.pexels.com/photos/8436436/pexels-photo-8436436.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  retreat: 'https://images.pexels.com/photos/9225395/pexels-photo-9225395.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  forest: 'https://images.pexels.com/photos/8028947/pexels-photo-8028947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  outdoorMeditation: 'https://images.pexels.com/photos/7363287/pexels-photo-7363287.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  indoorPlants: 'https://images.pexels.com/photos/7663042/pexels-photo-7663042.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  sunlitStudio: 'https://images.pexels.com/photos/6193704/pexels-photo-6193704.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  womenClass: 'https://images.pexels.com/photos/8436684/pexels-photo-8436684.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  sunriseCliff: 'https://images.pexels.com/photos/4558326/pexels-photo-4558326.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  lakeMeditation: 'https://images.pexels.com/photos/32298479/pexels-photo-32298479.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  instructor1: 'https://images.pexels.com/photos/4534878/pexels-photo-4534878.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  instructor2: 'https://images.pexels.com/photos/7479762/pexels-photo-7479762.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  instructor3: 'https://images.pexels.com/photos/6941322/pexels-photo-6941322.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  studioSetup: 'https://images.pexels.com/photos/6193711/pexels-photo-6193711.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  classExercise: 'https://images.pexels.com/photos/8173422/pexels-photo-8173422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  sereneStretching: 'https://images.pexels.com/photos/4056406/pexels-photo-4056406.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
};

export const NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Classes', href: '#classes' },
  { label: 'Instructors', href: '#instructors' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Membership', href: '#membership' },
  { label: 'Contact', href: '#contact' },
];

export const CLASSES = [
  {
    name: 'Gentle Vinyasa Flow',
    description: 'A slow, intentional flow linking breath with movement. Perfect for cultivating presence and building sustainable strength.',
    difficulty: 'All Levels',
    duration: '60 min',
    instructor: 'Aria Chen',
    image: IMAGES.studioYoga,
    category: 'Yoga',
  },
  {
    name: 'Restorative Yin',
    description: 'Deep, meditative stretches held for longer durations. A practice of surrender, patience, and inner stillness.',
    difficulty: 'Beginner',
    duration: '75 min',
    instructor: 'Maya Osei',
    image: IMAGES.indoorPlants,
    category: 'Yoga',
  },
  {
    name: 'Morning Meditation',
    description: 'Begin your day with guided meditation, gentle breathwork, and intention setting in our sunlit sanctuary.',
    difficulty: 'All Levels',
    duration: '30 min',
    instructor: 'Aria Chen',
    image: IMAGES.meditation,
    category: 'Meditation',
  },
  {
    name: 'Power Flow',
    description: 'Dynamic sequencing that builds heat and strength while maintaining mindful awareness throughout each transition.',
    difficulty: 'Intermediate',
    duration: '60 min',
    instructor: 'Liam Everett',
    image: IMAGES.groupClass,
    category: 'Yoga',
  },
  {
    name: 'Breathwork Journey',
    description: 'Explore the transformative power of conscious breathing. Release stored tension and reconnect with your vital energy.',
    difficulty: 'All Levels',
    duration: '45 min',
    instructor: 'Maya Osei',
    image: IMAGES.outdoorMeditation,
    category: 'Breathwork',
  },
  {
    name: 'Sunset Sound Bath',
    description: 'Immerse yourself in healing vibrations from crystal bowls and gentle overtones as golden light fills the studio.',
    difficulty: 'All Levels',
    duration: '60 min',
    instructor: 'Aria Chen',
    image: IMAGES.classExercise,
    category: 'Meditation',
  },
];

export const INSTRUCTORS = [
  {
    name: 'Aria Chen',
    title: 'Lead Yoga & Meditation Teacher',
    bio: 'With over 12 years of practice and 2,000+ hours of training in Hatha, Vinyasa, and meditation traditions, Aria creates spaces where stillness feels natural.',
    specialties: ['Vinyasa Flow', 'Guided Meditation', 'Sound Healing'],
    image: IMAGES.instructor1,
  },
  {
    name: 'Maya Osei',
    title: 'Restorative & Breathwork Guide',
    bio: 'Maya\'s gentle approach to healing movement draws from her background in somatic therapy and traditional breathwork practices.',
    specialties: ['Yin Yoga', 'Breathwork', 'Restorative Practice'],
    image: IMAGES.instructor2,
  },
  {
    name: 'Liam Everett',
    title: 'Dynamic Flow & Wellness Coach',
    bio: 'Liam brings an athletic yet mindful approach to yoga, helping students discover their strength through conscious movement.',
    specialties: ['Power Flow', 'Ashtanga', 'Mindful Movement'],
    image: IMAGES.instructor3,
  },
];

export const SCHEDULE = [
  { time: '6:30 AM', mon: 'Morning Meditation', tue: '—', wed: 'Morning Meditation', thu: '—', fri: 'Morning Meditation', sat: '—', sun: '—' },
  { time: '7:30 AM', mon: 'Gentle Vinyasa', tue: 'Power Flow', wed: 'Gentle Vinyasa', thu: 'Power Flow', fri: 'Gentle Vinyasa', sat: 'Gentle Vinyasa', sun: '—' },
  { time: '9:00 AM', mon: 'Restorative Yin', tue: 'Breathwork', wed: '—', thu: 'Restorative Yin', fri: '—', sat: 'Power Flow', sun: 'Restorative Yin' },
  { time: '10:30 AM', mon: '—', tue: '—', wed: 'Power Flow', thu: '—', fri: 'Breathwork', sat: 'Breathwork', sun: 'Gentle Vinyasa' },
  { time: '5:30 PM', mon: 'Power Flow', tue: 'Gentle Vinyasa', wed: 'Breathwork', thu: 'Gentle Vinyasa', fri: '—', sat: '—', sun: '—' },
  { time: '7:00 PM', mon: 'Sunset Sound Bath', tue: 'Restorative Yin', wed: 'Sunset Sound Bath', thu: 'Restorative Yin', fri: 'Sunset Sound Bath', sat: '—', sun: '—' },
];

export const MEMBERSHIPS = [
  {
    name: 'Drop-in',
    price: '$28',
    period: 'per class',
    description: 'Perfect for exploring our offerings at your own pace.',
    features: ['Access to any single class', 'Mat & props provided', 'Post-class herbal tea'],
    featured: false,
  },
  {
    name: 'Essence',
    price: '$128',
    period: 'per month',
    description: 'Our most popular membership for committed practitioners.',
    features: ['Unlimited yoga classes', '2 meditation sessions/week', 'Access to workshops', 'Complimentary tea bar', 'Guest pass (1/month)'],
    featured: true,
  },
  {
    name: 'Wholeness',
    price: '$198',
    period: 'per month',
    description: 'The complete Sōl experience for those seeking deep transformation.',
    features: ['Unlimited all classes', 'Private session (1/month)', 'Retreat priority booking', 'Wellness consultation', 'Full amenity access', 'Partner discounts'],
    featured: false,
  },
];

export const TESTIMONIALS = [
  {
    text: 'Sōl Studio has become my sanctuary. The moment I step through the door, the weight of the world lifts. Aria\'s guidance helped me discover a meditation practice that truly changed my relationship with stress.',
    author: 'Sarah M.',
    detail: 'Member for 2 years',
  },
  {
    text: 'I came for the yoga, but what I found was a community. The instructors here don\'t just teach poses — they create a space where you feel safe to grow, to be vulnerable, and to simply breathe.',
    author: 'James K.',
    detail: 'Member for 1 year',
  },
  {
    text: 'The breathwork sessions with Maya have been transformative. I\'ve struggled with anxiety for years, and for the first time, I feel like I have genuine tools to find calm in the chaos.',
    author: 'Elena R.',
    detail: 'Member for 8 months',
  },
];

export const FAQS = [
  {
    question: 'I\'ve never practiced yoga before. Is that okay?',
    answer: 'Absolutely. Many of our members began as complete beginners. Our classes are designed to meet you exactly where you are. Every instructor offers modifications, and we keep our groups intentionally small so you receive personal attention.',
  },
  {
    question: 'What should I bring to my first class?',
    answer: 'Just yourself and comfortable clothing you can move freely in. We provide premium yoga mats, blocks, bolsters, blankets, and straps. Water and herbal tea are complimentary.',
  },
  {
    question: 'How are your classes different from other studios?',
    answer: 'We intentionally cap our classes at 12 students to maintain an intimate, personalized experience. Our instructors are highly trained across multiple modalities, and our space is designed to feel like a retreat — natural light, plants, and curated soundscapes.',
  },
  {
    question: 'Can I try a class before committing to a membership?',
    answer: 'Of course. We offer a complimentary introductory class for all new visitors. It\'s our way of ensuring Sōl feels like the right fit for your practice and your life.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We ask for 4 hours notice for class cancellations, as our small group sizes mean every spot matters. Memberships can be paused for up to 30 days or cancelled with 30 days notice.',
  },
  {
    question: 'Do you offer private sessions?',
    answer: 'Yes. Private sessions are available with any of our instructors and can be tailored to your specific goals — whether that\'s building a home practice, working with an injury, or deepening your meditation.',
  },
];

export const RETREATS = [
  {
    title: 'Mountain Stillness Retreat',
    location: 'Blue Ridge Mountains, NC',
    dates: 'March 14–17, 2025',
    description: 'Four days of practice, silence, and connection surrounded by ancient mountains.',
    image: IMAGES.forest,
  },
  {
    title: 'Coastal Renewal Weekend',
    location: 'Outer Banks, NC',
    dates: 'May 23–25, 2025',
    description: 'Ocean air, sunrise yoga, and guided meditation by the sea.',
    image: IMAGES.lakeMeditation,
  },
];

export const GALLERY_IMAGES = [
  { src: IMAGES.sunlitStudio, alt: 'Sunlit yoga practice' },
  { src: IMAGES.sereneStretching, alt: 'Partner stretching in studio' },
  { src: IMAGES.groupClass2, alt: 'Group yoga session' },
  { src: IMAGES.studioSetup, alt: 'Studio setup with natural elements' },
  { src: IMAGES.womenClass, alt: 'Diverse group practicing' },
  { src: IMAGES.retreat, alt: 'Forest deck yoga practice' },
];
