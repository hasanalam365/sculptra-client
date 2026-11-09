import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Clock,
  Users,
  Award,
  PoundSterling,
  FlaskConical,
  Sparkles,
  ClipboardCheck,
  ShieldCheck,
  ChevronDown,
  Check,
  ArrowRight,
  Hourglass,
  Repeat,
  Target,
  Info,
  Layers,
  Syringe,
} from "lucide-react";
import { scrollToSection } from "../Shared/utils/scrollToSection";

/*
  NOTE: Anything written as [ ... to be confirmed by Zami ] is a placeholder.
  Treatment information below is general, educational wording. Please have it
  reviewed by Zami's clinical lead before publishing, and make sure it follows
  the product's licensed indications and advertising rules in your country.
*/

const EASE = [0.22, 1, 0.36, 1];

/* ----------------------------- DATA ----------------------------- */

const snapshot = [
  { icon: Clock, label: "Duration", value: "[To be confirmed by Zami]" },
  { icon: Users, label: "Group size & format", value: "[To be confirmed by Zami]" },
  { icon: Award, label: "Certification", value: "[To be confirmed by Zami]" },
  { icon: PoundSterling, label: "Fees & dates", value: "[Shared on enquiry]" },
];

const tabs = [
  { id: "how", label: "How it works" },
  { id: "overview", label: "Treatment overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "eligibility", label: "Eligibility" },
];

const mechanismSteps = [
  {
    icon: Syringe,
    title: "Placement",
    text: "Poly-L-lactic acid (PLLA) microparticles are placed by a trained practitioner, following an individual assessment and treatment plan.",
  },
  {
    icon: Sparkles,
    title: "Stimulation",
    text: "Rather than simply adding volume, the product encourages the skin's own collagen production over the following weeks.",
  },
  {
    icon: Hourglass,
    title: "Gradual change",
    text: "As collagen builds, skin support and facial volume improve progressively, which is why results look subtle and natural.",
  },
];

const keyFacts = [
  {
    icon: Repeat,
    title: "A course of sessions",
    text: "Treatment is usually planned as a short series of sessions spaced several weeks apart. The exact number depends on the patient and the plan.",
  },
  {
    icon: Hourglass,
    title: "Results build over time",
    text: "Changes are gradual rather than immediate, often becoming more noticeable over several weeks to months after treatment.",
  },
  {
    icon: Target,
    title: "Long-lasting, not permanent",
    text: "Results can last up to around two years for some patients. Longevity varies with age, treatment area, degree of volume loss and number of sessions.",
  },
  {
    icon: Layers,
    title: "Commonly discussed areas",
    text: "Practitioners commonly assess areas such as the cheeks, mid-face and lower face. Licensed uses vary by country.",
  },
  {
    icon: FlaskConical,
    title: "Why technique matters",
    text: "PLLA cannot be dissolved with an enzyme the way hyaluronic acid fillers can, so careful assessment, product preparation and placement are essential.",
  },
  {
    icon: ShieldCheck,
    title: "Suitability comes first",
    text: "Not every patient is suitable. Medical history, expectations and contraindications are reviewed before any treatment is planned.",
  },
];

const modules = [
  {
    title: "Product science & mechanism of action",
    text: "Build a solid understanding of what Sculptra is and how it differs from other injectables.",
    points: [
      "What PLLA is and how it is metabolised",
      "Collagen stimulation versus immediate volumising",
      "Expected results timeline and managing patient expectations",
    ],
  },
  {
    title: "Patient assessment & suitability",
    text: "Learn how practitioners decide who is, and who is not, a good candidate.",
    points: [
      "Medical history, consultation and consent",
      "Contraindications and when to decline or refer",
      "Setting realistic goals with the patient",
    ],
  },
  {
    title: "Facial anatomy & treatment planning",
    text: "Connect anatomy to a safe, structured plan for each individual.",
    points: [
      "Key anatomical landmarks and danger zones",
      "Planning the number and spacing of sessions",
      "Documenting the plan and photographs",
    ],
  },
  {
    title: "Product preparation & technique",
    text: "Understand the practical approach used to prepare and place the product.",
    points: [
      "Preparation steps and why they matter",
      "Injection principles, depth and distribution",
      "Hands-on practice [format to be confirmed by Zami]",
    ],
  },
  {
    title: "Aftercare & managing complications",
    text: "Know what to advise patients and how to respond when something is not right.",
    points: [
      "Post-treatment advice and follow-up",
      "Recognising and managing common side effects",
      "Escalation, emergency awareness and reporting",
    ],
  },
  {
    title: "Professional standards & next steps",
    text: "Finish with the practical side of offering the treatment responsibly.",
    points: [
      "Insurance, regulation and scope of practice",
      "Record keeping and ethical marketing",
      "Continuing development and support",
    ],
  },
];

const forWho = [
  "Existing aesthetics practitioners looking to add a collagen-stimulating treatment to their knowledge",
  "Practitioners with a qualification that meets our eligibility criteria [to be confirmed by Zami]",
  "Professionals who want structured, practitioner-led training",
];

const included = [
  "Theory and practical training [details to be confirmed by Zami]",
  "Course materials [details to be confirmed by Zami]",
  "Certification or accreditation [details to be confirmed by Zami]",
  "Post-course support [details to be confirmed by Zami]",
];

const faqs = [
  {
    q: "Is this course suitable for beginners?",
    a: "The training is designed for eligible aesthetics professionals. Our team will confirm qualifications and eligibility when they contact you, and can advise on the right starting point if you are not yet eligible.",
  },
  {
    q: "Is Sculptra the same as a dermal filler?",
    a: "Not exactly. Traditional hyaluronic acid fillers add volume immediately. Sculptra is a collagen stimulator, so the change builds gradually as the skin produces its own collagen.",
  },
  {
    q: "How many treatment sessions do patients usually need?",
    a: "Plans are individual, but treatment is typically delivered as a series of sessions spaced weeks apart. Part of the course covers how practitioners plan this.",
  },
  {
    q: "How long do results last?",
    a: "Results can last up to around two years for some patients, but this varies from person to person. Individual results may vary.",
  },
  {
    q: "Will I get hands-on practice?",
    a: "The practical format, group size and number of supervised cases are still being finalised. [To be confirmed by Zami]. Ask our team when you enquire.",
  },
  {
    q: "What happens after I enquire?",
    a: "A member of our team will contact you to confirm eligibility, answer your questions and share dates, fees and availability. There is no obligation to book.",
  },
];

/* ------------------------- SMALL COMPONENTS ------------------------- */

const AccordionItem = ({ title, children, open, onToggle, index }) => (
  <div
    className={`rounded-xl border bg-[#141a1b]/80 backdrop-blur-sm transition-colors duration-300 ${
      open ? "border-cyan-400/30" : "border-white/10 hover:border-white/20"
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex items-center justify-between w-full gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 rounded-xl"
    >
      <span className="flex items-center gap-4">
        {index !== undefined && (
          <span className="flex items-center justify-center w-8 h-8 text-[11px] font-bold border rounded-lg shrink-0 border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className="font-serif text-[14px] sm:text-[15px] font-bold leading-snug text-white">
          {title}
        </span>
      </span>
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="shrink-0 text-cyan-300"
      >
        <ChevronDown size={16} />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 sm:pl-[4.75rem] sm:pr-6">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Checklist = ({ items }) => (
  <ul className="mt-5 space-y-3">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <span className="flex items-center justify-center w-5 h-5 mt-0.5 border rounded-full shrink-0 border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
          <Check size={11} strokeWidth={3} />
        </span>
        <span className="text-[13px] leading-relaxed text-white/70">{item}</span>
      </li>
    ))}
  </ul>
);

/* ----------------------------- TABS ----------------------------- */

const HowItWorks = () => (
  <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
    <div>
      <h3 className="font-serif text-[22px] sm:text-[26px] font-bold leading-tight text-white">
        A collagen-stimulating treatment, not an instant filler
      </h3>
      <p className="mt-4 text-[13.5px] leading-relaxed text-white/65">
        Sculptra is an injectable made from poly-L-lactic acid (PLLA), a
        biocompatible and biodegradable material that has been used in medicine
        for years. Instead of filling a space immediately, it prompts the skin
        to rebuild its own collagen, so improvement develops gradually.
      </p>
      <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
        On the course you will learn the science behind this process and, more
        importantly, how it shapes the way practitioners assess, plan and
        explain treatment to patients.
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        {["PLLA-based", "Biodegradable", "Gradual onset", "Practitioner-led"].map(
          (chip) => (
            <span
              key={chip}
              className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-300 border rounded-full border-cyan-400/30 bg-cyan-400/5"
            >
              {chip}
            </span>
          )
        )}
      </div>
    </div>

    <ol className="relative space-y-4">
      {/* connecting line */}
      <span
        aria-hidden="true"
        className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-cyan-400/50 via-cyan-400/20 to-transparent"
      />
      {mechanismSteps.map(({ icon: Icon, title, text }, i) => (
        <motion.li
          key={title}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.12 }}
          className="relative flex gap-4"
        >
          <span className="relative z-10 flex items-center justify-center w-10 h-10 border rounded-lg shrink-0 border-cyan-400/40 bg-[#0e1415] text-cyan-300">
            <Icon size={16} strokeWidth={1.8} />
          </span>
          <div className="flex-1 p-4 rounded-xl border border-white/10 bg-[#141a1b]/80">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Step {i + 1}
            </p>
            <h4 className="mt-1 font-serif text-[15px] font-bold text-white">
              {title}
            </h4>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/60">
              {text}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  </div>
);

const Overview = () => (
  <div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {keyFacts.map(({ icon: Icon, title, text }, i) => (
        <motion.article
          key={title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
          className="p-5 rounded-xl border border-white/10 bg-[#141a1b]/80 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/30"
        >
          <span className="flex items-center justify-center w-9 h-9 border rounded-lg border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
            <Icon size={15} strokeWidth={1.8} />
          </span>
          <h4 className="mt-4 font-serif text-[15px] font-bold leading-snug text-white">
            {title}
          </h4>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">
            {text}
          </p>
        </motion.article>
      ))}
    </div>

    <p className="flex items-start gap-2.5 mt-6 text-[11px] leading-relaxed text-white/45">
      <Info size={14} className="mt-0.5 shrink-0 text-cyan-400/70" />
      This information is educational and for professionals. Individual results
      vary, and licensed indications differ between countries. It is not
      medical advice.
    </p>
  </div>
);

const Curriculum = () => {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.4fr] lg:gap-12">
      <div>
        <h3 className="font-serif text-[22px] sm:text-[26px] font-bold leading-tight text-white">
          What you will learn
        </h3>
        <p className="mt-4 text-[13.5px] leading-relaxed text-white/65">
          The course moves from the science of the product to assessment,
          planning, technique and aftercare, so you understand the full patient
          journey rather than just the injection.
        </p>
        <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-white/40">
          [ Final curriculum to be confirmed by Zami ]
        </p>
      </div>

      <div className="space-y-3">
        {modules.map((m, i) => (
          <AccordionItem
            key={m.title}
            index={i}
            title={m.title}
            open={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)}
          >
            <p className="text-[12.5px] leading-relaxed text-white/60">
              {m.text}
            </p>
            <ul className="mt-3 space-y-2">
              {m.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 text-[12.5px] text-white/70"
                >
                  <span className="w-1 h-1 mt-2 rounded-full shrink-0 bg-cyan-400" />
                  {p}
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

const Eligibility = () => (
  <div className="grid gap-5 md:grid-cols-2">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="p-6 rounded-xl border border-white/10 bg-[#141a1b]/80"
    >
      <span className="flex items-center justify-center w-10 h-10 border rounded-lg border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
        <ClipboardCheck size={16} strokeWidth={1.8} />
      </span>
      <h3 className="mt-5 font-serif text-[18px] font-bold text-white">
        Who the course is for
      </h3>
      <Checklist items={forWho} />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
      className="p-6 rounded-xl border border-white/10 bg-[#141a1b]/80"
    >
      <span className="flex items-center justify-center w-10 h-10 border rounded-lg border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
        <Award size={16} strokeWidth={1.8} />
      </span>
      <h3 className="mt-5 font-serif text-[18px] font-bold text-white">
        What is included
      </h3>
      <Checklist items={included} />
    </motion.div>
  </div>
);

const tabContent = {
  how: <HowItWorks />,
  overview: <Overview />,
  curriculum: <Curriculum />,
  eligibility: <Eligibility />,
};

/* ----------------------------- SECTION ----------------------------- */

const CourseDetails = () => {
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState("how");
  const [openFaq, setOpenFaq] = useState(0);

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <section id="course-details" className="px-4 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <motion.p
          {...reveal(0)}
          className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400"
        >
          [ Course details ]
        </motion.p>

        <motion.h2
          {...reveal(0.08)}
          className="mt-5 max-w-[900px] font-serif font-bold uppercase leading-[1.05] tracking-tight text-white text-[34px] sm:text-[48px] lg:text-[56px]"
        >
          Everything about the{" "}
          <span
            className="text-cyan-400"
            style={{ textShadow: "0 0 26px rgba(34,211,238,0.45)" }}
          >
            Sculptra
          </span>{" "}
          course
        </motion.h2>

        <motion.p
          {...reveal(0.16)}
          className="mt-6 max-w-[620px] text-[14px] leading-relaxed text-white/65"
        >
          Explore how the treatment works, what the training covers and who it
          is designed for, so you can decide whether it is the right next step
          for your practice.
        </motion.p>

        {/* Snapshot */}
        <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {snapshot.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              {...reveal(0.1 + i * 0.07)}
              className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-[#141a1b]/80 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/30"
            >
              <span className="flex items-center justify-center w-9 h-9 border rounded-lg shrink-0 border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                <Icon size={15} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  {label}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-white/80">
                  {value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <motion.div {...reveal(0.1)} className="mt-14">
          <div
            role="tablist"
            aria-label="Course information"
            className="flex gap-1 p-1 overflow-x-auto border rounded-xl border-white/10 bg-[#141a1b]/60 w-fit max-w-full"
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.14em] whitespace-nowrap rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                    active ? "text-[#06222a]" : "text-white/60 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="course-tab-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="grid gap-8 mt-20 lg:grid-cols-[0.8fr_1.4fr] lg:gap-12">
          <motion.div {...reveal(0)}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
              [ FAQ ]
            </p>
            <h3 className="mt-4 font-serif text-[26px] sm:text-[32px] font-bold uppercase leading-[1.1] text-white">
              Common questions
            </h3>
            <p className="mt-4 text-[13px] leading-relaxed text-white/60">
              Can&apos;t find your answer? Send us an enquiry and our team will
              come back to you.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <motion.div key={item.q} {...reveal(i * 0.05)}>
                <AccordionItem
                  title={item.q}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <p className="text-[12.5px] leading-relaxed text-white/60">
                    {item.a}
                  </p>
                </AccordionItem>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          {...reveal(0)}
          className="relative flex flex-col items-start justify-between gap-6 p-6 mt-16 overflow-hidden border rounded-xl md:flex-row md:items-center md:p-8 border-cyan-400/20 bg-[#141a1b]/80"
        >
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none bg-cyan-400/10 blur-3xl"
          />
          <div className="relative">
            <h3 className="font-serif text-[20px] sm:text-[24px] font-bold text-white">
              Want the full course details and prices?
            </h3>
            <p className="mt-1 text-[13px] text-white/60">
              Send a quick enquiry. No obligation to book.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => scrollToSection("enquire")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-3 px-6 h-[44px] text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#06222a] bg-cyan-400 rounded-md shadow-[0_0_28px_rgba(34,211,238,0.3)] hover:bg-cyan-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Get course details &amp; prices
            <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseDetails;