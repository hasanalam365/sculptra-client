import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { scrollToSection } from "../utils/scrollToSection";

// ---- Edit these ----
const BRAND = { letter: "Z", name: "ZAMI", tagline: "Aesthetic Training" };
const PHONE = { label: "+44 800 999 1751", href: "tel:+448009991751" };
const LOGO_SRC = "https://i.ibb.co.com/tTYjdRcM/logo-png.webp";

// Ei id gulo section gulor id er sathe mile ache:
// About.jsx -> "about", CourseDetails.jsx -> "course-details", WhyUs.jsx -> "why-us",
// StudentReview.jsx -> "student-reviews" & "gallery", Form.jsx -> "enquire"
const navLinks = [
  { name: "About", id: "about" },
  { name: "Course", id: "course-details" },
  { name: "Why Us", id: "why-us" },
  { name: "Reviews", id: "student-reviews" },
  { name: "Gallery", id: "gallery" },
];

const ENQUIRE_ID = "enquire";

// Banner er content er sathe SAME padding. Hero er inner wrapper e-o ei class ta use koro.
const CONTAINER =
  "mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-[60px]";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Scroll korle kon section dekha jacche seta highlight korbe
  useEffect(() => {
    if (!isHome) {
      setActiveId(null);
      return;
    }

    const trackedIds = [...navLinks.map((l) => l.id), ENQUIRE_ID];
    let ticking = false;

    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = null;
      for (const id of trackedIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const goToSection = (sectionId) => {
    setMobileMenuOpen(false);

    // Onno page theke click korle age Home e jabe, tarpor MainLayout scroll korbe
    if (!isHome) {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }
    scrollToSection(sectionId);
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const linkClass = (id) =>
    `relative text-[11.5px] uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded ${
      activeId === id ? "text-cyan-300" : "text-white/60 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full">
      <div className="bg-[#0a0b0d]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div
          className={`${CONTAINER} flex items-center justify-between h-[60px] sm:h-[64px] lg:h-[68px] lg:grid lg:grid-cols-[1fr_auto_1fr]`}
        >
          {/* Logo (left) */}
          <Link
            to="/"
            onClick={handleLogoClick}
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
          <div className="items-center hidden gap-6 xl:gap-9 lg:flex justify-self-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => goToSection(link.id)}
                aria-current={activeId === link.id ? "true" : undefined}
                className={linkClass(link.id)}
              >
                {link.name}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 -bottom-1.5 h-px bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)] transition-all duration-300 ${
                    activeId === link.id ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
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
              onClick={() => goToSection(ENQUIRE_ID)}
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
                onClick={() => goToSection(link.id)}
                aria-current={activeId === link.id ? "true" : undefined}
                className={`text-left text-[12px] uppercase tracking-[0.18em] transition-colors ${
                  activeId === link.id
                    ? "text-cyan-300"
                    : "text-white/70 hover:text-white"
                }`}
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
              onClick={() => goToSection(ENQUIRE_ID)}
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