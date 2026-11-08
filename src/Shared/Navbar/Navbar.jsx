import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

// ---- Edit these ----
const BRAND = { letter: "Z", name: "ZAMI", tagline: "Aesthetic Training" };
const PHONE = { label: "+44 800 999 1751", href: "tel:+448009991751" };
const LOGO_SRC = "https://i.ibb.co.com/tTYjdRcM/logo-png.webp";

// Section id gulo tomar page er id er sathe milao.
const navLinks = [
  { name: "About", id: "about" },
  { name: "Gallery", id: "gallery" },
  { name: "Contact", id: "contact" },
];

// Banner er content er sathe SAME padding. Hero er inner wrapper e-o ei class ta use koro.
const CONTAINER =
  "mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-[60px]";

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

  // Page e #enquiry form thakle shekhane scroll korbe, na thakle /enroll e jabe
  const goEnquire = () => {
    setMobileMenuOpen(false);
    const form = document.getElementById("enquiry");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/enroll");
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full">
      <div className="bg-[#0a0b0d]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div
          className={`${CONTAINER} flex items-center justify-between h-[60px] sm:h-[64px] lg:h-[68px] lg:grid lg:grid-cols-[1fr_auto_1fr]`}
        >
          {/* Logo (left) */}
          <Link
            to="/"
            className="flex items-center shrink-0 group justify-self-start"
            aria-label={`${BRAND.name} home`}
          >
            <img
              src={LOGO_SRC}
              alt={`${BRAND.name} logo`}
              decoding="async"
              className="block object-contain object-left w-auto h-9 sm:h-10 lg:h-11 max-w-[150px] sm:max-w-[170px] lg:max-w-[190px] opacity-90 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop links (true center) */}
          <div className="items-center hidden gap-9 lg:flex justify-self-center">
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
          <div className="items-center hidden gap-6 lg:flex justify-self-end">
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
              Talk To An Advisor
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="p-1 -mr-1 text-white lg:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0a0b0d] border-b border-white/[0.06] py-6">
          <div className={`${CONTAINER} flex flex-col gap-5`}>
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
             Talk To An Advisor
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}