import React from "react";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "../../Shared/utils/scrollToSection";

const BANNER_IMAGE = "https://i.ibb.co.com/DPWP86bS/sculptra-7.jpg";

const Banner = () => {
  const scrollToEnquire = () => scrollToSection("enquire");

  return (
    <section id="home" className="px-4 pt-2 pb-6 sm:px-8">
      {/* Full-width banner box */}
      <div className="relative flex items-center w-full min-h-[calc(100vh-112px)] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1517]/60 backdrop-blur-sm">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] max-w-full rounded-full bg-cyan-500/10 blur-[150px]" />
          <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-cyan-400/10 blur-[120px] hidden lg:block" />
          <div className="absolute -left-24 bottom-0 w-[300px] h-[300px] rotate-12 border border-white/5" />
        </div>

        {/* Content grid */}
        <div className="relative grid items-center w-full gap-12 px-6 py-14 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-20 lg:py-20">
          {/* LEFT: text */}
          <div className="max-w-[720px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
              [ Medically-led aesthetics — Training ]
            </p>

            <h1 className="mt-7 font-serif font-bold leading-[0.95] tracking-tight text-[56px] sm:text-[88px] xl:text-[104px]">
              <span className="block text-white">MASTER</span>
              <span
                className="block text-cyan-400"
                style={{ textShadow: "0 0 32px rgba(34,211,238,0.55)" }}
              >
                SCULPTRA
              </span>
            </h1>

            <p className="mt-8 text-[12px] font-medium uppercase tracking-[0.2em] text-white/70 max-w-md leading-relaxed">
              Advanced injectable training for aesthetic practitioners
            </p>

            <p className="mt-5 text-[16px] leading-relaxed text-white/65 max-w-[560px]">
              Take your aesthetics career to the next level. Learn about a
              leading collagen-stimulating treatment approach designed to
              support facial and body volume, contour and skin quality.
            </p>

            <div className="flex flex-col gap-3 mt-9 sm:flex-row">
              <button
                onClick={scrollToEnquire}
                className="flex items-center justify-center gap-3 px-7 h-[48px] text-[11px] font-bold uppercase tracking-[0.16em] text-[#06222a] bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                Get course details &amp; prices
                <ArrowRight size={14} />
              </button>

              <button
                onClick={scrollToEnquire}
                className="flex items-center justify-center px-7 h-[48px] text-[11px] font-bold uppercase tracking-[0.16em] text-white border border-white/25 rounded-md hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              >
                Talk to an advisor
              </button>
            </div>

            <div className="flex flex-wrap items-center pt-6 mt-12 border-t gap-x-5 gap-y-2 border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <span>Practitioner-led</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              <span>[Location]</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              <span>Details shared on enquiry</span>
            </div>
          </div>

          {/* RIGHT: image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] sm:max-w-[520px]">
              {/* Offset outline frames behind the image */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 border rounded-[28px] sm:translate-x-6 sm:translate-y-6 border-cyan-400/25"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -translate-x-3 -translate-y-3 border rounded-[28px] border-white/10 hidden sm:block"
              />

              {/* Image card */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-cyan-400/30 bg-[#0a1214] shadow-[0_0_60px_-10px_rgba(34,211,238,0.35)]">
                <img
                  src={BANNER_IMAGE}
                  alt="Sculptra aesthetic treatment"
                  loading="eager"
                  className="object-cover w-full h-full"
                />
                {/* Bottom fade so the badge stays readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06161a]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
              </div>

              {/* Floating badge */}
              <div className="absolute bottom-5 -left-3 sm:-left-8 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/15 bg-[#0d1517]/85 backdrop-blur-md shadow-xl">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                <div className="leading-tight">
                  <p className="text-[11px] font-semibold text-white">
                    Collagen-stimulating
                  </p>
                  <p className="text-[10px] text-white/50">
                    Hands-on practitioner training
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;