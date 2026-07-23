import { MapPin, Clock, PhoneCall, AlertTriangle } from 'lucide-react';
import Reveal from './Reveal';

const hours = [
  { day: 'Monday – Friday', time: '7:00 AM – 8:00 PM' },
  { day: 'Saturday', time: '8:00 AM – 5:00 PM' },
  { day: 'Sunday', time: '9:00 AM – 2:00 PM' },
  { day: 'Urgent Care', time: 'Open 24/7' },
];

export default function LocationHours() {
  return (
    <section id="location" className="bg-soft-gray py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Emergency banner */}
        <Reveal>
          <div className="flex flex-col items-start gap-5 rounded-[20px] bg-navy-dark px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                <AlertTriangle className="h-6 w-6 text-mint" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-white">Medical emergency?</p>
                <p className="text-sm text-white/70">Call 911 immediately or visit your nearest emergency room.</p>
              </div>
            </div>
            <a
              href="tel:911"
              className="flex shrink-0 items-center gap-2 rounded-2xl bg-teal px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-teal-light"
            >
              <PhoneCall className="h-4 w-4" />
              Emergency Line: (800) 555-0911
            </a>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="overflow-hidden rounded-[20px] shadow-sm">
              <img
                src="/images/location.jpg"
                alt="Meridian Health clinic building exterior"
                className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <Reveal>
              <div className="rounded-[20px] border border-navy/8 bg-white p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-light-blue">
                    <MapPin className="h-5 w-5 text-navy" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-navy-dark">Main Campus</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-slate">
                  482 Harborview Avenue<br />
                  Suite 200<br />
                  Meridian City, MC 10023
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-teal hover:text-navy"
                >
                  Get Directions →
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[20px] border border-navy/8 bg-white p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-light-blue">
                    <Clock className="h-5 w-5 text-navy" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-navy-dark">Opening Hours</h3>
                </div>
                <dl className="mt-4 flex flex-col gap-2.5">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between text-[15px]">
                      <dt className="text-slate">{h.day}</dt>
                      <dd className="font-semibold text-navy-dark">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
