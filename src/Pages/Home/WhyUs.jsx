import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Syringe, ClipboardList, GraduationCap } from "lucide-react";

const features = [
  {
    icon: Syringe,
    title: "Advanced Injectable Technique",
    text: "Build practical understanding of a collagen-stimulating treatment technique used in modern aesthetics practice.",
  },
  {
    icon: ClipboardList,
    title: "Patient Assessment & Treatment Planning",
    text: "Learn how practitioners approach suitability, assessment and treatment planning before a procedure.",
  },
  {
    icon: GraduationCap,
    title: "Professional Aesthetics Training",
    text: "Train in a structured, practitioner-led environment designed for existing aesthetics professionals.",
  },
];

const WhyUs = () => {
  const navigate = useNavigate();

  return (
    <section id="why-us" className="px-4 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading block */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
          [ Why learn Sculptra ]
        </p>

        <h2 className="mt-5 max-w-[720px] font-serif font-bold uppercase leading-[1.05] tracking-tight text-white text-[34px] sm:text-[48px] lg:text-[56px]">
          Expand your{" "}
          <span
            className="text-cyan-400"
            style={{ textShadow: "0 0 26px rgba(34,211,238,0.45)" }}
          >
            aesthetics
          </span>{" "}
          skills
        </h2>

        <p className="mt-6 max-w-[560px] text-[14px] leading-relaxed text-white/65">
          Develop new skills in a sought-after collagen-stimulating treatment.
          Our training helps eligible practitioners understand the product and
          build practical treatment knowledge.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-5 mt-12 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="p-6 rounded-xl border border-white/10 bg-[#141a1b]/80 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/30"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                <Icon size={16} strokeWidth={1.8} />
              </span>

              <h3 className="mt-6 font-serif text-[16px] font-bold leading-snug text-white">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                {text}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/enroll")}
          className="flex items-center gap-3 px-6 h-[42px] mt-10 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#06222a] bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Enquire about training
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
};

export default WhyUs;