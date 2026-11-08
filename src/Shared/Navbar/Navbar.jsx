import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

// ---- Edit these ----
const BRAND = { letter: "Z", name: "ZAMI", tagline: "Aesthetic Training" };
const PHONE = { label: "+44 800 999 1751", href: "tel:+448009991751" };

// Screenshot er moto 3ta menu. Section id gulo tomar page er id er sathe milao.
const navLinks = [
  { name: "About", id: "about" },
  { name: "Gallery", id: "gallery" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (sectionId) => {
    setMobileMenuOpen(false);

    const scrollToSection = () => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname !== "/") navigate("/");
    setTimeout(scrollToSection, 300);
  };

  const goEnquire = () => {
    setMobileMenuOpen(false);
    navigate("/enroll");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full">
      <div className="bg-[#0a0b0d]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center justify-between h-[66px] px-4 mx-auto max-w-[1400px] sm:px-6">
          {/* Logo */}
         <Link to="/" className="flex items-center shrink-0 group">
  <img
    src="https://i.ibb.co.com/tTYjdRcM/logo-png.webp"
    alt="Faces On Faces logo"
    width="160"
    height="64"
    decoding="async"
    className="object-contain w-auto h-12 transition-transform duration-300 lg:h-16 opacity-80 group-hover:scale-105"
  />
</Link>

          {/* Desktop links (center) */}
          <div className="items-center hidden gap-9 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className="text-[11.5px] uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop right: phone + CTA */}
          <div className="items-center hidden gap-6 lg:flex">
            <a
              href={PHONE.href}
              className="flex items-center gap-2 text-[12px] tracking-[0.1em] text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              <Phone size={14} strokeWidth={1.8} />
              {PHONE.label}
            </a>
            <button
              onClick={goEnquire}
              className="h-[37px] px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#06222a] rounded-full bg-cyan-400 hover:bg-cyan-300 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="text-white lg:hidden"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0a0b0d] border-b border-white/[0.06] px-6 py-6">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className="text-left text-[12px] uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ))}

            <a
              href={PHONE.href}
              className="flex items-center gap-2 text-[12px] tracking-[0.1em] text-cyan-300"
            >
              <Phone size={14} strokeWidth={1.8} />
              {PHONE.label}
            </a>

            <button
              onClick={goEnquire}
              className="h-[40px] text-[11px] font-bold uppercase tracking-[0.16em] text-[#06222a] rounded-full bg-cyan-400 hover:bg-cyan-300 transition-colors"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}