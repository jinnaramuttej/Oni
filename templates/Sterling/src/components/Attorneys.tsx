import { useInView } from '../hooks/useInView';
import { LinkIcon, Mail } from 'lucide-react';
import SectionHeader from './SectionHeader';

const attorneys = [
  {
    name: 'James R. Sterling',
    title: 'Managing Partner',
    specialty: 'Corporate M&A · Securities',
    image: 'https://images.pexels.com/photos/7841828/pexels-photo-7841828.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
    education: 'Harvard Law School',
  },
  {
    name: 'Victoria Chen',
    title: 'Senior Partner',
    specialty: 'International Trade · Compliance',
    image: 'https://images.pexels.com/photos/8111826/pexels-photo-8111826.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
    education: 'Yale Law School',
  },
  {
    name: 'Marcus D. Williams',
    title: 'Partner',
    specialty: 'Litigation · Dispute Resolution',
    image: 'https://images.pexels.com/photos/32907706/pexels-photo-32907706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
    education: 'Columbia Law School',
  },
  {
    name: 'Eleanor Blackwood',
    title: 'Partner',
    specialty: 'Intellectual Property · Technology',
    image: 'https://images.pexels.com/photos/7841851/pexels-photo-7841851.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
    education: 'Stanford Law School',
  },
];

export default function Attorneys() {
  const { ref, isInView } = useInView();

  return (
    <section id="attorneys" className="py-24 lg:py-32 bg-ivory" aria-label="Our attorneys">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionHeader
          tag="Our Team"
          title="Meet the Attorneys"
          description="Our distinguished attorneys bring unparalleled expertise and dedication to every client engagement, combining legal acumen with strategic insight."
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {attorneys.map((attorney, i) => (
            <div
              key={attorney.name}
              className={`group rounded-[18px] overflow-hidden bg-white border border-warm-gray transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={attorney.image}
                  alt={`${attorney.name}, ${attorney.title}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Hover overlay links */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-gold hover:border-gold hover:text-midnight transition-all duration-300" aria-label={`${attorney.name} LinkedIn`}>
                    <LinkIcon size={16} />
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-gold hover:border-gold hover:text-midnight transition-all duration-300" aria-label={`Email ${attorney.name}`}>
                    <Mail size={16} />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-midnight">{attorney.name}</h3>
                <p className="mt-1 text-[13px] font-semibold tracking-[0.06em] uppercase text-gold">{attorney.title}</p>
                <p className="mt-3 text-[13px] text-slate-custom">{attorney.specialty}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-px flex-1 bg-warm-gray" />
                  <span className="text-[11px] tracking-wide text-slate-custom/60 uppercase">{attorney.education}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] uppercase text-gold hover:text-gold-dark transition-colors duration-300"
          >
            View Full Team Directory
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
