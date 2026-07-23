import React from "react";
import { Leaf, Instagram, Facebook, Twitter } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const links = [
    { name: "Philosophy", id: "philosophy" },
    { name: "Classes", id: "classes" },
    { name: "Instructors", id: "instructors" },
    { name: "Schedule", id: "schedule" },
    { name: "Memberships", id: "memberships" },
    { name: "Retreats", id: "retreats" },
    { name: "FAQ", id: "faq" },
  ];

  return (
    <footer className="bg-charcoal text-ivory pt-20 pb-12 relative overflow-hidden">
      {/* Decorative background leaf illustration */}
      <div className="absolute bottom-[-10%] right-[-5%] opacity-5 pointer-events-none">
        <svg
          className="w-[500px] h-[500px] text-ivory"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0 C 40 30, 10 40, 50 100 C 90 40, 60 30, 50 0"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <button
              onClick={() => onNavigate("hero")}
              className="flex items-center space-x-2 text-ivory hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Leaf className="w-5 h-5 text-sand stroke-[1.5]" />
              <span className="font-serif text-2xl tracking-[0.15em] font-light">
                VĀNA
              </span>
            </button>
            <p className="text-sm text-ivory/60 font-sans font-light leading-relaxed max-w-sm">
              A premium, mindful sanctuary combining Japanese minimalism and Scandinavian warmth. Through intentional movement, breathing, and stillness, we guide you back to yourself.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/60 hover:text-sand hover:border-sand transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4.5 h-4.5 stroke-[1.5]" />
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/60 hover:text-sand hover:border-sand transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4.5 h-4.5 stroke-[1.5]" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/60 hover:text-sand hover:border-sand transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4.5 h-4.5 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-serif text-base font-normal text-sand tracking-wider">
              Explore
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-xs text-ivory/70 hover:text-sand font-sans tracking-wider uppercase transition-colors duration-300 text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Closing Quote */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-serif text-base font-normal text-sand tracking-wider">
              Daily Intention
            </h4>
            <p className="font-serif text-base italic text-ivory/70 leading-relaxed">
              "Quiet the mind, and the soul will speak. In stillness, we discover that everything we seek is already here."
            </p>
            <span className="text-[10px] tracking-widest uppercase text-sand font-sans block">
              — Vāna Sanctuary Wisdom
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/40 font-sans tracking-wide">
          <p>© {new Date().getFullYear()} Vāna Wellness Studio. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-sand">Privacy Policy</a>
            <a href="#terms" className="hover:text-sand">Terms of Service</a>
            <a href="#accessibility" className="hover:text-sand">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
