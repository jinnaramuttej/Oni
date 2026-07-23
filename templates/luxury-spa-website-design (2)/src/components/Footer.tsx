import FadeIn from './FadeIn';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/60 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand */}
          <FadeIn>
            <div className="lg:col-span-1">
              <span className="font-serif text-3xl font-light text-white tracking-wide">
                Serenité
              </span>
              <p className="mt-4 text-sm font-light leading-relaxed max-w-xs">
                A sanctuary of exceptional wellness, where ancient healing arts
                meet modern luxury in perfect harmony.
              </p>
              <div className="flex items-center gap-4 mt-6">
                {['Instagram', 'Pinterest', 'Facebook'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-xs font-light tracking-wide text-white/40 hover:text-champagne transition-colors duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Treatments */}
          <FadeIn delay={0.1}>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
                Treatments
              </h4>
              <ul className="space-y-3">
                {['Signature Rituals', 'Massage Therapy', 'Facial Treatments', 'Body Therapies', 'Aromatherapy', 'Wellness Packages'].map((item) => (
                  <li key={item}>
                    <a
                      href="#treatments"
                      className="text-sm font-light hover:text-champagne transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Company */}
          <FadeIn delay={0.15}>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                {['Our Story', 'The Therapists', 'Careers', 'Press', 'Gift Cards', 'Private Events'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm font-light hover:text-champagne transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Newsletter */}
          <FadeIn delay={0.2}>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
                Newsletter
              </h4>
              <p className="text-sm font-light leading-relaxed mb-5">
                Receive seasonal wellness insights, exclusive offers, and invitations to members-only events.
              </p>
              <form
                className="flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-[14px] bg-white/8 border border-white/10 text-white text-sm font-light placeholder:text-white/30 focus:outline-none focus:border-champagne/50 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-champagne text-white rounded-[14px] text-sm font-medium hover:bg-champagne-dark transition-all duration-500 shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>
          </FadeIn>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-white/30">
            © 2026 Serenité Spa & Wellness. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs font-light text-white/30 hover:text-white/50 transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
