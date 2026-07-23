import { useState } from "react";
import { Leaf, Music2, ArrowRight, CheckCircle2 } from "lucide-react";
import { NAV_LINKS } from "../data";
import { scrollToId } from "../lib/scroll";

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.75 4.5 2.25-4.5 2.25z" />
    </svg>
  );
}

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-deep text-ivory">
      <div className="pointer-events-none absolute -right-40 -top-24 h-[380px] w-[380px] rounded-full bg-moss/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 lg:px-10">
        {/* ——— Newsletter ——— */}
        <div className="flex flex-col gap-8 border-b border-ivory/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-sage">
              <span className="h-px w-10 bg-ivory/30" />
              The Slow Post
            </p>
            <h2 className="mt-5 font-serif text-3xl font-light leading-[1.2] sm:text-4xl">
              One letter a month, written <em className="font-normal italic text-sage">unhurriedly.</em>
            </h2>
            <p className="mt-4 text-[14px] font-light leading-[1.9] text-ivory/55">
              Seasonal classes, retreat openings and the occasional poem. No
              noise, ever.
            </p>
          </div>
          <div className="w-full max-w-md">
            {subscribed ? (
              <p className="flex items-center gap-3 rounded-[20px] border border-sage/30 bg-ivory/5 px-6 py-5 text-[14px] font-light text-sand">
                <CheckCircle2 size={18} strokeWidth={1.5} className="text-sage" />
                Welcome to the slow list. First letter arrives with the new moon.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="flex gap-2"
              >
                <label htmlFor="nl-email" className="sr-only">Email address</label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full rounded-[20px] border border-ivory/20 bg-ivory/5 px-6 py-4 text-[14px] font-light text-ivory placeholder:text-ivory/35 transition-all duration-500 focus:border-sage focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[20px] bg-sage text-deep transition-all duration-500 hover:bg-sand"
                >
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ——— Columns ——— */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage text-deep">
                <Leaf size={15} strokeWidth={1.5} />
              </span>
              <span className="font-serif text-xl tracking-wide">Stillwater</span>
            </p>
            <p className="mt-5 max-w-[240px] text-[13.5px] font-light leading-[1.9] text-ivory/55">
              A sanctuary for yoga, meditation and breathwork beside the river
              in Portland, Oregon.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: <InstagramIcon />, label: "Instagram" },
                { icon: <YoutubeIcon />, label: "YouTube" },
                { icon: <Music2 size={15} strokeWidth={1.5} />, label: "Playlists" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/65 transition-all duration-500 hover:border-sage hover:bg-sage hover:text-deep"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sage">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.slice(0, 5).map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="link-quiet text-[14px] font-light text-ivory/65 transition-colors hover:text-ivory"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sage">Visit</p>
            <address className="mt-5 space-y-3 text-[14px] font-light not-italic leading-[1.8] text-ivory/65">
              <p>
                14 Alder Lane, Sellwood
                <br />
                Portland, Oregon 97202
              </p>
              <p>
                Mon–Fri 6:15 am – 9:30 pm
                <br />
                Sat–Sun 8:00 am – 8:00 pm
              </p>
              <p className="text-ivory/45">Free parking · Bike racks · Step-free access</p>
            </address>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sage">Contact</p>
            <ul className="mt-5 space-y-3 text-[14px] font-light text-ivory/65">
              <li>
                <a href="mailto:hello@stillwater.studio" className="link-quiet hover:text-ivory">
                  hello@stillwater.studio
                </a>
              </li>
              <li>
                <a href="tel:+15035550164" className="link-quiet hover:text-ivory">
                  (503) 555-0164
                </a>
              </li>
              <li className="pt-2 text-[13px] leading-[1.8] text-ivory/45">
                Work with us — we're always listening for thoughtful teachers.
                Write to Elena.
              </li>
            </ul>
          </div>
        </div>

        {/* ——— Wordmark ——— */}
        <div aria-hidden className="select-none overflow-hidden">
          <p className="translate-y-[18%] bg-gradient-to-b from-ivory/12 to-ivory/0 bg-clip-text text-center font-serif text-[18vw] font-light leading-none tracking-tight text-transparent lg:text-[11rem]">
            stillwater
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ivory/10 py-7 text-[11.5px] font-light uppercase tracking-[0.18em] text-ivory/40 sm:flex-row">
          <p>© 2026 Stillwater Studio · Peace, practised daily</p>
          <p className="flex gap-7">
            <a href="#" onClick={(e) => e.preventDefault()} className="link-quiet hover:text-ivory/70">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="link-quiet hover:text-ivory/70">Accessibility</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="link-quiet hover:text-ivory/70">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
