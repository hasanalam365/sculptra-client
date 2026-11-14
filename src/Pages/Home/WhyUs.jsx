import React from "react";
import {
  User,
  Stethoscope,
  Building2,
  Award,
  HeartHandshake,
} from "lucide-react";

const infoCards = [
  {
    icon: Stethoscope,
    title: "Practical training arrangements",
    text: "[]",
  },
  {
    icon: Building2,
    title: "Academy facilities",
    text: "[]",
  },
  {
    icon: Award,
    title: "Certification",
    text: "[]",
  },
  {
    icon: HeartHandshake,
    title: "Student support",
    text: "[]",
  },
];

const trainerDetails = [
  "[Trainer name]",
  "[Qualifications]",
  "[Years of clinical experience]",
];

const WhyUs = () => {
  return (
    <section id="why-us" className="px-4 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading block */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
          [ Why train with us ]
        </p>

        <h2 className="mt-5 max-w-[900px] font-serif font-bold uppercase leading-[1.05] tracking-tight text-white text-[34px] sm:text-[48px] lg:text-[56px]">
          Your next step in{" "}
          <span
            className="text-cyan-400"
            style={{ textShadow: "0 0 26px rgba(34,211,238,0.45)" }}
          >
            aesthetics
          </span>{" "}
          training
        </h2>

        <p className="mt-6 max-w-[620px] text-[14px] leading-relaxed text-white/65">
          Learn in a professional training environment with guidance from
          experienced practitioners. Discover the principles of Sculptra
          treatments and develop your understanding of patient assessment,
          treatment planning and practical application.
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 mt-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Trainer profile (spans 2 rows on large screens) */}
          <article className="p-6 rounded-xl border border-white/10 bg-[#141a1b]/80 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/30 md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
              <User size={16} strokeWidth={1.8} />
            </span>

            <h3 className="mt-6 font-serif text-[17px] font-bold leading-snug text-white">
              Trainer profile
            </h3>

            <div className="flex items-center gap-4 mt-6">
              <div
                className="flex items-center justify-center w-[52px] h-[52px] shrink-0 rounded-md border border-dashed border-white/25 text-center text-[7px] uppercase leading-tight tracking-[0.12em] text-white/40"
                aria-label="Trainer photo placeholder"
              >
                <img src="https://i.ibb.co.com/WpM8qx4J/doctor.png" alt="" />
              </div>

              <ul className="space-y-2.5">
                {trainerDetails.map((item) => (
                  <li
                    key={item}
                    className="text-[10px] uppercase tracking-[0.16em] text-white/65"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            
          </article>

          {/* Info cards */}
          {infoCards.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="p-5 rounded-xl border border-white/10 bg-[#141a1b]/80 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/30"
            >
              <div className="flex items-start gap-3">
                <Icon
                  size={14}
                  strokeWidth={1.8}
                  className="mt-1 shrink-0 text-cyan-400"
                />
                <h3 className="font-serif text-[14px] font-bold leading-snug text-white">
                  {title}
                </h3>
              </div>
              <p className="mt-4 text-[9.5px] uppercase leading-relaxed tracking-[0.12em] text-white/45">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;