import React from "react";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "../../Shared/utils/scrollToSection";

const Banner = () => {
  const scrollToEnquire = () => scrollToSection("enquire");

  return (
    <section
      id="home"
      className="px-4 pt-2 pb-6 sm:px-8"
    >
      {/* Full-width banner box */}
      <div className="relative flex items-center w-full min-h-[calc(100vh-112px)] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1517]/60 backdrop-blur-sm">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] max-w-full rounded-full bg-cyan-500/10 blur-[150px]" />
          <div className="absolute right-[6%] top-1/2 -translate-y-1/2 rotate-45 w-[420px] h-[420px] border border-cyan-400/15 hidden md:block" />
          <div className="absolute right-[14%] top-1/2 -translate-y-1/2 rotate-45 w-[300px] h-[300px] border border-white/5 hidden md:block" />
          <div className="absolute -left-24 bottom-0 w-[300px] h-[300px] rotate-12 border border-white/5" />
        </div>

        {/* Content (left aligned) */}
        <div className="relative w-full px-6 py-14 sm:px-12 lg:px-20 lg:py-20">
          <div className="max-w-[720px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
              [ Medically-led aesthetics — Training ]
            </p>

            <h1 className="mt-7 font-serif font-bold leading-[0.95] tracking-tight text-[60px] sm:text-[96px] lg:text-[112px]">
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
        </div>
      </div>
    </section>
  );
};

export default Banner;