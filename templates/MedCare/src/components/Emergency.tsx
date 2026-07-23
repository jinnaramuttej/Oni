import { useInView } from '../hooks/useInView';
import { Phone, AlertTriangle, Ambulance } from 'lucide-react';

export default function Emergency() {
  const [ref, inView] = useInView();

  return (
    <section className="py-12 bg-gradient-to-r from-navy via-navy-light to-navy" aria-label="Emergency Contact">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">Need Emergency Care?</h3>
              <p className="text-white/60">
                For life-threatening emergencies, call 911. For urgent medical needs, reach our 24/7 helpline.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="tel:911"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-red-500 text-white font-semibold rounded-[var(--radius-btn)] hover:bg-red-600 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Call 911
            </a>
            <a
              href="tel:+18001234567"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-[var(--radius-btn)] hover:bg-white/20 transition-all duration-300"
            >
              <Ambulance className="w-4 h-4" />
              24/7 Helpline: 1-800-123-4567
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
