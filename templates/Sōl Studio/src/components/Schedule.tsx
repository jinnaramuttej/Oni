import { SCHEDULE } from '../data/content';
import RevealSection from './RevealSection';

export default function Schedule() {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <section id="schedule" className="bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <RevealSection>
          <div className="text-center mb-16">
            <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Weekly Rhythm</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Class Schedule
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-charcoal-light/80">
              A thoughtfully curated weekly rhythm designed to support your practice at any time of day.
            </p>
          </div>
        </RevealSection>

        {/* Desktop schedule table */}
        <RevealSection delay={100}>
          <div className="hidden lg:block overflow-hidden rounded-3xl bg-sand/50 border border-stone/30">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone/30">
                  <th className="px-6 py-5 text-left text-[11px] font-light tracking-widest uppercase text-charcoal-light">Time</th>
                  {dayLabels.map((d) => (
                    <th key={d} className="px-4 py-5 text-center text-[11px] font-light tracking-widest uppercase text-charcoal-light">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row, idx) => (
                  <tr key={row.time} className={idx < SCHEDULE.length - 1 ? 'border-b border-stone/20' : ''}>
                    <td className="px-6 py-5 text-sm font-light text-charcoal whitespace-nowrap">{row.time}</td>
                    {days.map((day) => {
                      const cls = row[day];
                      const hasClass = cls !== '—';
                      return (
                        <td key={day} className="px-4 py-5 text-center">
                          {hasClass ? (
                            <span className="inline-block rounded-xl bg-ivory px-3 py-2 text-[11px] font-light tracking-wider text-charcoal shadow-[0_1px_4px_rgba(0,0,0,0.04)] cursor-pointer hover:bg-eucalyptus hover:text-white transition-all">
                              {cls}
                            </span>
                          ) : (
                            <span className="text-stone text-sm">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealSection>

        {/* Mobile schedule */}
        <RevealSection delay={100}>
          <div className="lg:hidden space-y-4">
            {SCHEDULE.map((row) => (
              <div key={row.time} className="rounded-2xl bg-sand/50 border border-stone/20 p-5">
                <p className="text-sm font-medium text-charcoal mb-3">{row.time}</p>
                <div className="flex flex-wrap gap-2">
                  {days.map((day, di) => {
                    const cls = row[day];
                    if (cls === '—') return null;
                    return (
                      <span key={day} className="inline-block rounded-xl bg-ivory px-3 py-2 text-[11px] font-light tracking-wider text-charcoal shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                        {dayLabels[di]}: {cls}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
