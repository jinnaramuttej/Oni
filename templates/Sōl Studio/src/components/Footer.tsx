export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="font-serif text-2xl tracking-wide text-white">
              Sōl Studio
            </a>
            <p className="mt-4 text-sm font-light leading-relaxed text-white/40 max-w-xs">
              A sanctuary for mindful movement, guided meditation, and intentional living.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="text-white/30 hover:text-white/70 transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-white/30 hover:text-white/70 transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-white/30 hover:text-white/70 transition-colors" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {/* Practice */}
          <div>
            <h4 className="text-[11px] font-light tracking-widest uppercase text-white/50 mb-5">Practice</h4>
            <ul className="space-y-3">
              {['Yoga Classes', 'Meditation', 'Breathwork', 'Sound Healing', 'Private Sessions'].map((item) => (
                <li key={item}>
                  <a href="#classes" className="text-sm font-light text-white/40 hover:text-white/70 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <h4 className="text-[11px] font-light tracking-widest uppercase text-white/50 mb-5">Studio</h4>
            <ul className="space-y-3">
              {['Philosophy', 'Instructors', 'Schedule', 'Retreats', 'Gallery'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm font-light text-white/40 hover:text-white/70 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Join */}
          <div>
            <h4 className="text-[11px] font-light tracking-widest uppercase text-white/50 mb-5">Join</h4>
            <ul className="space-y-3">
              {['Membership', 'Free Trial Class', 'Gift Cards', 'Teacher Training', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#booking" className="text-sm font-light text-white/40 hover:text-white/70 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-light tracking-wider text-white/25">
            © 2025 Sōl Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px] font-light tracking-wider text-white/25 hover:text-white/50 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[11px] font-light tracking-wider text-white/25 hover:text-white/50 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
