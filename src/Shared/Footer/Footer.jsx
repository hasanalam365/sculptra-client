import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const SECTION_NAME = "footer";
const WHATSAPP_URL = "https://wa.me/447308888874";

const locations = [
  "London",
  "Upminster",
  "Edinburgh",
  "Glasgow",
  "Belfast",
  "Nigeria",
  "Dublin",
];

const bottomLinks = [
  { label: "Cookie Policy", to: "/cookie-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
];

// Mon–Fri 9:00–18:00 (UK time)
const checkOpenNow = () => {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "short",
      hour: "numeric",
      hour12: false,
    }).formatToParts(new Date());
    const day = parts.find((p) => p.type === "weekday")?.value;
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value, 10) % 24;
    return !["Sat", "Sun"].includes(day) && hour >= 9 && hour < 18;
  } catch {
    return false;
  }
};

const headingCls =
  "text-[11px] font-bold uppercase tracking-[0.16em] text-teal-300";

export default function Footer() {
  const footerRef = useRef(null);
  const location = useLocation();
  const [openNow, setOpenNow] = useState(false);

  // Footer is shared across pages, so we can't hardcode a page name
  // like other sections do — we read the current route instead, so
  // every event correctly reflects which page the footer was seen
  // or clicked on (home, course_details, enroll, etc).
  const pageName =
    location.pathname === "/" ? "home" : location.pathname.replace(/^\//, "");

  useEffect(() => {
    setOpenNow(checkOpenNow());
    const id = setInterval(() => setOpenNow(checkOpenNow()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const element = footerRef.current;
    if (!element) return;

    let tracked = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          tracked = true;

          trackEvent("section_view", {
            page: pageName,
            section: SECTION_NAME,
            section_name: "Footer",
          });

          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [pageName]);

  const trackLink = (link_name) =>
    trackEvent("footer_link_click", {
      page: pageName,
      section: SECTION_NAME,
      link_name,
    });

  const trackSocial = (social_platform) =>
    trackEvent("social_click", {
      page: pageName,
      section: SECTION_NAME,
      social_platform,
      location: "footer",
    });

  const iconBox =
    "flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 text-gray-300 transition-colors duration-300 hover:border-teal-300/40 hover:bg-teal-300/10 hover:text-teal-300";

  const contactRow =
    "group flex items-center gap-3 text-[14px] text-gray-300 transition-colors hover:text-teal-300";
  const contactIcon =
    "flex items-center justify-center w-9 h-9 shrink-0 rounded-lg border border-white/10 bg-white/5 text-teal-300/80 transition-colors duration-300 group-hover:border-teal-300/40 group-hover:bg-teal-300/10";

  return (
    <footer
      ref={footerRef}
      className="relative font-serif bg-black border-t border-white/10"
    >
      <div className="px-6 mx-auto max-w-[1200px] sm:px-8">
        {/* Top call-to-action strip */}
        <div className="relative flex flex-col items-start justify-between gap-6 p-6 mt-10 overflow-hidden border rounded-xl md:flex-row md:items-center md:p-8 border-white/10 bg-[#141a1b]">
          <div
            aria-hidden="true"
            className="absolute -top-20 -left-20 w-52 h-52 rounded-full pointer-events-none bg-teal-300/10 blur-3xl"
          />
          <div className="relative">
            <p className={headingCls}>[ Get in touch ]</p>
            <h3 className="mt-2 text-[20px] font-bold leading-snug text-white sm:text-[24px]">
              Questions about Sculptra training?
            </h3>
            <p className="mt-1 text-[13px] text-gray-400">
              Speak to our team — we reply within one working day.
            </p>
          </div>

          <div className="relative flex flex-wrap gap-3">
            {/* <Link
              to="/enroll"
              onClick={() =>
                trackEvent("cta_click", {
                  page: pageName,
                  section: SECTION_NAME,
                  button_name: "Enquire about training",
                })
              }
              className="inline-flex items-center gap-2.5 px-5 h-[42px] text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#06222a] bg-teal-300 rounded-md hover:bg-teal-200 transition-colors"
            >
              Enquire about training
              <ArrowRight size={14} />
            </Link> */}

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", {
                  page: pageName,
                  section: SECTION_NAME,
                  location: "footer_cta",
                })
              }
              className="inline-flex items-center gap-2.5 px-5 h-[42px] text-[10.5px] font-bold uppercase tracking-[0.14em] text-white border rounded-md border-white/15 hover:border-teal-300/50 hover:text-teal-300 transition-colors"
            >
              <FaWhatsapp size={15} />
              WhatsApp us
            </a>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 pt-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-14">
          {/* Brand */}
          <div className="max-w-[340px]">
            <img
              src="https://i.ibb.co.com/TM5zgDgD/logo-png.webp"
              alt="Faces On Faces"
              className="w-auto h-10"
            />

            <p className={`mt-3 ${headingCls}`}>Academy · Clinic</p>

            <p className="mt-4 text-[14px] leading-[1.75] text-gray-400">
              Medically-led aesthetics — training the next generation of
              practitioners and treating patients across London, Essex and
              Edinburgh.
            </p>

            <div className="flex items-center gap-2.5 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                onClick={() => trackSocial("instagram")}
                className={iconBox}
              >
                <Instagram size={16} strokeWidth={1.7} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                onClick={() => trackSocial("facebook")}
                className={iconBox}
              >
                <Facebook size={16} strokeWidth={1.7} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                onClick={() =>
                  trackEvent("whatsapp_click", {
                    page: pageName,
                    section: SECTION_NAME,
                    location: "footer",
                  })
                }
                className={iconBox}
              >
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className={headingCls}>Contact</h4>

            <ul className="mt-5 space-y-3.5">
              <li>
                <a href="tel:08009991751" className={contactRow}>
                  <span className={contactIcon}>
                    <Phone size={15} strokeWidth={1.7} />
                  </span>
                  0800 999 1751
                </a>
              </li>
              <li>
                <a href="mailto:info@facesonfaces.com" className={contactRow}>
                  <span className={contactIcon}>
                    <Mail size={15} strokeWidth={1.7} />
                  </span>
                  info@facesonfaces.com
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactRow}
                >
                  <span className={contactIcon}>
                    <FaWhatsapp size={15} />
                  </span>
                  Message on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Locations + hours */}
          <div>
            <h4 className={`flex items-center gap-2 ${headingCls}`}>
              <MapPin size={13} strokeWidth={2} />
              Locations
            </h4>

            <ul className="flex flex-wrap gap-2 mt-5">
              {locations.map((city) => (
                <li
                  key={city}
                  className="px-3 py-1.5 text-[12px] text-gray-300 border rounded-full border-white/10 bg-white/5"
                >
                  {city}
                </li>
              ))}
            </ul>

            <h4 className={`flex items-center gap-2 mt-8 ${headingCls}`}>
              <Clock size={13} strokeWidth={2} />
              Opening hours
            </h4>

            <p className="mt-3 text-[14px] text-gray-300">Mon–Fri: 9:00 – 18:00</p>

            <p className="inline-flex items-center gap-2 mt-2 text-[12px] text-gray-400">
              <span className="relative flex w-2 h-2">
                {openNow && (
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping bg-teal-300" />
                )}
                <span
                  className={`relative inline-flex w-2 h-2 rounded-full ${
                    openNow ? "bg-teal-300" : "bg-gray-600"
                  }`}
                />
              </span>
              {openNow ? "Open now" : "Closed right now"}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 border-t border-white/10 sm:flex-row">
          <p className="text-[13px] text-gray-500">
            © 2026 Faces On Faces. All rights reserved.
          </p>

          {/* <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {bottomLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => trackLink(label)}
                className="text-[11px] font-bold uppercase tracking-[0.1em] text-teal-300 transition-colors hover:text-teal-100"
              >
                {label}
              </Link>
            ))}

           
            <button
              type="button"
              onClick={() => trackLink("Cookie Settings")}
              className="text-[11px] font-bold uppercase tracking-[0.1em] text-teal-300 transition-colors hover:text-teal-100"
            >
              Cookie Settings
            </button>
          </div> */}
        </div>
      </div>
    </footer>
  );
}