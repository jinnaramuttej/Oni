import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const batches = [
  {
    title: 'JEE Advanced — Year 1',
    category: 'Engineering',
    startDate: '15 July 2025',
    duration: '18 months',
    timing: '9:00 AM - 1:00 PM',
    seats: 20,
    enrolled: 14,
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&q=80',
    venue: 'Main Campus',
    status: 'open',
  },
  {
    title: 'NEET Complete — Batch A',
    category: 'Medical',
    startDate: '1 Aug 2025',
    duration: '15 months',
    timing: '2:00 PM - 6:00 PM',
    seats: 20,
    enrolled: 18,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80',
    venue: 'Central Branch',
    status: 'open',
  },
  {
    title: 'Class 12th Board Prep',
    category: 'Boards',
    startDate: '20 July 2025',
    duration: '10 months',
    timing: '6:00 PM - 9:00 PM',
    seats: 20,
    enrolled: 20,
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&q=80',
    venue: 'Main Campus',
    status: 'full',
  },
  {
    title: 'Class 10th Foundation',
    category: 'Foundation',
    startDate: '10 Aug 2025',
    duration: '12 months',
    timing: '10:00 AM - 2:00 PM',
    seats: 25,
    enrolled: 16,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80',
    venue: 'East Wing',
    status: 'open',
  },
  {
    title: 'Math Olympiad Advanced',
    category: 'Olympiad',
    startDate: '5 Sept 2025',
    duration: '6 months',
    timing: 'Sat & Sun, 10:00 AM',
    seats: 15,
    enrolled: 11,
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&q=80',
    venue: 'Innovation Lab',
    status: 'open',
  },
  {
    title: 'SAT Intensive Crash Course',
    category: 'International',
    startDate: '15 July 2025',
    duration: '3 months',
    timing: 'Weekends, 10:00 AM',
    seats: 15,
    enrolled: 13,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=500&q=80',
    venue: 'Online + Campus',
    status: 'open',
  },
];

export default function Batches() {
  return (
    <section id="batches" className="py-20 lg:py-28 bg-slate-bg" aria-label="Upcoming batches">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-blue-royal/5 px-4 py-1.5 text-sm font-semibold text-blue-royal mb-4">
            Upcoming Batches
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-deep tracking-tight mb-4">
            Find Your <span className="text-blue-royal">Perfect Batch</span>
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            Small batches, flexible timings, and expert guidance. Start your journey today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {batches.map((batch) => {
            const progress = (batch.enrolled / batch.seats) * 100;
            const isFull = batch.status === 'full';

            return (
              <article
                key={batch.title}
                className={`group rounded-[20px] overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  isFull
                    ? 'bg-white shadow-card opacity-80'
                    : 'bg-white shadow-card hover:shadow-card-hover'
                }`}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={batch.image}
                    alt={batch.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {isFull ? (
                    <div className="absolute top-3 right-3 rounded-full bg-red-500 text-white text-xs font-bold px-3 py-1.5">
                      Full
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 rounded-full bg-emerald-success text-white text-xs font-bold px-3 py-1.5">
                      Open
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-indigo-deep px-3 py-1.5">
                      {batch.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-indigo-deep mb-4">{batch.title}</h3>

                  <div className="space-y-2.5 mb-5">
                    <div className="flex items-center gap-2.5 text-sm text-slate-text">
                      <Calendar className="h-4 w-4 text-indigo-deep flex-shrink-0" />
                      <span>Starts: {batch.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-slate-text">
                      <Clock className="h-4 w-4 text-indigo-deep flex-shrink-0" />
                      <span>{batch.timing} · {batch.duration}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-slate-text">
                      <MapPin className="h-4 w-4 text-indigo-deep flex-shrink-0" />
                      <span>{batch.venue}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-medium text-slate-text">Seats</span>
                      <span className={`font-bold ${progress > 80 ? 'text-amber-accent' : 'text-emerald-success'}`}>
                        {batch.enrolled}/{batch.seats} enrolled
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isFull ? 'bg-red-400' : progress > 80 ? 'bg-amber-accent' : 'bg-emerald-success'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="#enrollment"
                    className={`flex items-center justify-center gap-2 w-full rounded-[18px] py-3 text-sm font-semibold transition-all duration-300 ${
                      isFull
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-royal text-white shadow-button hover:shadow-button-hover hover:bg-blue-600 hover:-translate-y-0.5'
                    }`}
                    aria-disabled={isFull}
                  >
                    {isFull ? 'Waitlist Only' : (
                      <>
                        Join This Batch
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
