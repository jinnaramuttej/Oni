import React, { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Philosophy", id: "philosophy" },
    { name: "Classes", id: "classes" },
    { name: "Instructors", id: "instructors" },
    { name: "Schedule", id: "schedule" },
    { name: "Memberships", id: "memberships" },
    { name: "Retreats", id: "retreats" },
    { name: "FAQ", id: "faq" },
  ];

  const handleClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-ivory/80 backdrop-blur-md border-b border-stone/20 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleClick("hero")}
          className="flex items-center space-x-2 text-charcoal hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Leaf className="w-5 h-5 text-eucalyptus stroke-[1.5]" />
          <span className="font-serif text-2xl tracking-[0.15em] font-light">
            VĀNA
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className="text-charcoal/80 hover:text-eucalyptus font-sans text-xs tracking-widest uppercase transition-colors duration-300 cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <button
            onClick={() => handleClick("booking")}
            className="px-6 py-2.5 rounded-[20px] bg-eucalyptus text-ivory font-sans text-xs tracking-widest uppercase hover:bg-sage hover:text-charcoal shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            Book A Class
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-charcoal hover:text-eucalyptus transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 stroke-[1.5]" />
          ) : (
            <Menu className="w-6 h-6 stroke-[1.5]" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-ivory/98 backdrop-blur-lg z-40 transition-all duration-300 flex flex-col justify-between p-8 border-t border-stone/20">
          <div className="flex flex-col space-y-6 pt-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className="text-left text-charcoal text-xl font-serif tracking-wide py-2 border-b border-stone/10 hover:text-eucalyptus transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pb-12 flex flex-col space-y-4">
            <button
              onClick={() => handleClick("booking")}
              className="w-full py-4 rounded-[20px] bg-eucalyptus text-ivory font-sans text-sm tracking-widest uppercase text-center hover:bg-sage hover:text-charcoal transition-all duration-300 cursor-pointer"
            >
              Book A Class
            </button>
            <p className="text-center text-xs text-charcoal/50 tracking-wider">
              Peace • Balance • Presence
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
