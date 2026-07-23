import { Mail, Phone, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 rounded-[20px] bg-mint px-8 py-14 sm:px-14 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <h2 className="font-display text-4xl font-medium leading-tight text-navy-dark sm:text-[42px]">
                Have a question before booking?
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-slate">
                Our patient care coordinators are ready to help you find the right specialist, verify
                insurance, or answer any questions about your visit.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="tel:+18005551234"
                  className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Phone className="h-5 w-5 text-teal" />
                  <div>
                    <p className="text-xs text-slate">Call us</p>
                    <p className="text-sm font-semibold text-navy-dark">(800) 555-1234</p>
                  </div>
                </a>
                <a
                  href="mailto:care@meridianhealth.com"
                  className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Mail className="h-5 w-5 text-teal" />
                  <div>
                    <p className="text-xs text-slate">Email us</p>
                    <p className="text-sm font-semibold text-navy-dark">care@meridianhealth.com</p>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form className="rounded-[20px] bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint">
                  <MessageCircle className="h-5 w-5 text-teal" />
                </span>
                <h3 className="font-display text-lg font-semibold text-navy-dark">Send us a message</h3>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border border-navy/12 bg-soft-gray px-4 py-3.5 text-sm text-navy-dark placeholder:text-slate/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  className="w-full rounded-xl border border-navy/12 bg-soft-gray px-4 py-3.5 text-sm text-navy-dark placeholder:text-slate/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                />
                <textarea
                  placeholder="How can we help?"
                  rows={3}
                  required
                  className="w-full resize-none rounded-xl border border-navy/12 bg-soft-gray px-4 py-3.5 text-sm text-navy-dark placeholder:text-slate/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-navy py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-teal"
                >
                  Send Message
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
