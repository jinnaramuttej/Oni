import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Arjun Mehta',
    result: 'AIR 42 — JEE Advanced 2024',
    role: 'IIT Delhi CSE',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    content: 'Apex Academy completely transformed my approach to Physics and Mathematics. The personalized attention from faculty helped me identify my weak areas and work on them systematically. The mock tests were incredibly close to the actual exam pattern.',
    rating: 5,
    featured: true,
  },
  {
    name: 'Sneha Reddy',
    result: '99.6%ile — NEET 2024',
    role: 'AIIMS New Delhi',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    content: 'The Biology classes by Dr. Priya are legendary. She breaks down complex topics into easy-to-understand concepts. The small batch size meant I could interact directly with the teacher whenever I had doubts.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Rohan Gupta',
    result: '1580/1600 — SAT 2024',
    role: 'Stanford University',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    content: 'Mr. David\'s SAT strategy sessions were game-changing. He taught me techniques that helped me save 20+ minutes in the exam. The practice tests and detailed analysis helped me improve my score by 150 points.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Priya Sharma',
    result: 'Parent of Class 10 Student',
    role: 'CBSE 98.4% in Boards',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    content: 'As a parent, seeing my daughter\'s confidence grow has been incredible. The regular progress reports and parent-teacher meetings keep us informed. The teachers genuinely care about each student\'s growth.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Karthik Nair',
    result: 'IMO Bronze Medalist',
    role: 'Mathematics Olympiad',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
    content: 'Prof. Vikram\'s approach to Olympiad Mathematics is unmatched. He doesn\'t just teach you to solve problems—he teaches you to think like a mathematician. The problem-solving sessions were incredibly challenging yet rewarding.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Ananya Iyer',
    result: '99.2%ile — JEE Main 2024',
    role: 'IIT Bombay ECE',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    content: 'The study material and notes at Apex are the best I\'ve ever used. Every topic has multiple levels of problems—from basic to advanced. The revision classes before exams were exactly what I needed.',
    rating: 5,
    featured: false,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gradient-to-br from-indigo-deep via-indigo-950 to-indigo-deep relative overflow-hidden" aria-label="Student success stories">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-royal/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-accent/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-amber-accent mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Our Students' <span className="text-amber-accent">Achievements</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Real results from real students. Their hard work and our methodology create success stories every year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className={`rounded-[20px] p-6 lg:p-8 transition-all duration-500 hover:-translate-y-2 ${
                testimonial.featured
                  ? 'bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/10 lg:col-span-1'
                  : 'bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-amber-accent fill-amber-accent" />
                ))}
              </div>

              {/* Quote */}
              <Quote className="h-5 w-5 text-white/20 mb-4" />
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                  <div className="text-xs text-amber-accent font-medium">{testimonial.result}</div>
                  <div className="text-xs text-white/50">{testimonial.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
