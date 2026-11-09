import React, { useState, useEffect, useRef, useCallback } from "react";
import { Quote, Star, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

/*
  NOTE: The testimonials below are SAMPLE copy so the layout can be reviewed.
  Replace them with real, approved student feedback (with written consent)
  before publishing.
*/

const testimonials = [
  {
    name: "Sarah M.",
    role: "Aesthetic Nurse Practitioner",
    text: "The course was clear, structured and very practical. I left with a much better understanding of patient assessment and how to plan a treatment properly.",
  },
  {
    name: "Dr. Imran H.",
    role: "Cosmetic Doctor",
    text: "Small group, plenty of hands-on guidance and a trainer who explained the reasoning behind every decision. Exactly the level of detail I was looking for.",
  },
  {
    name: "Priya K.",
    role: "Dental Aesthetics Practitioner",
    text: "I appreciated the professional environment and the focus on safety and suitability. It gave me real confidence to expand what I offer.",
  },
  {
    name: "Emma L.",
    role: "Registered Nurse",
    text: "Friendly, supportive and well organised from start to finish. The post-course support made me feel I was not on my own afterwards.",
  },
  {
    name: "Tanvir A.",
    role: "Aesthetics Clinic Owner",
    text: "Great mix of theory and practical application. The facilities were modern and the trainer was patient with every question we had.",
  },
  {
    name: "Hannah R.",
    role: "Skin Clinic Practitioner",
    text: "Treatment planning was the highlight for me. I now approach consultations in a far more structured and confident way.",
  },
];

const gallery = [
  { src: "https://i.ibb.co.com/Kcn1XtZr/sculptra-1.webp", caption: "Pre-treatment preparation" },
  { src: "https://i.ibb.co.com/23d3W2KF/sculptra-2.webp", caption: "Patient assessment" },
  { src: "https://i.ibb.co.com/LznxvVMJ/sculptra-3.webp", caption: "Clinical treatment session" },
  { src: "https://i.ibb.co.com/Ld3rGqst/sculptra-4.jpg", caption: "Facial assessment" },
  { src: "https://i.ibb.co.com/gcqr7S7/sculptra-5.jpg", caption: "Injection technique" },
  { src: "https://i.ibb.co.com/dJM1HjKq/sculptra-6.jpg", caption: "Team-led treatment session" },
  { src: "https://i.ibb.co.com/DPWP86bS/sculptra-7.jpg", caption: "Injectable device demonstration" },
  { src: "https://i.ibb.co.com/gFDtLsmP/sculptra-8.jpg", caption: "Facial mapping & treatment planning" },
  { src: "https://i.ibb.co.com/ntbdGXG/sculptra-9.jpg", caption: "Injection site mapping" },
];

const GalleryTile = ({ src, caption }) => {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="relative overflow-hidden rounded-xl border border-white/10 bg-[#141a1b]/80 aspect-[4/3] group transition-colors duration-300 hover:border-cyan-400/30">
      {failed ? (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 border border-dashed rounded-xl border-white/20 text-white/40">
          <ImageIcon size={16} strokeWidth={1.6} className="text-cyan-400/70" />
          <span className="text-[9px] uppercase tracking-[0.16em]">
            {caption}
          </span>
        </div>
      ) : (
        <>
          <img
            src={src}
            alt={caption}
            loading="lazy"
            onError={() => setFailed(true)}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1112]/90 via-[#0b1112]/10 to-transparent" />
          <figcaption className="absolute bottom-3 left-4 right-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
            {caption}
          </figcaption>
        </>
      )}
    </figure>
  );
};

const usePerView = () => {
  const get = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  const [perView, setPerView] = useState(get);
  useEffect(() => {
    const onResize = () => setPerView(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return perView;
};

const ReviewSlider = () => {
  const perView = usePerView();
  const maxIndex = Math.max(0, testimonials.length - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // keep index valid when screen size changes
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const next = useCallback(
    () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
    [maxIndex]
  );
  const prev = useCallback(
    () => setIndex((i) => (i <= 0 ? maxIndex : i - 1)),
    [maxIndex]
  );

  // auto slide
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, reducedMotion, next]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) (diff > 0 ? next : prev)();
    touchStartX.current = null;
  };

  const btn =
    "flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-[#141a1b]/80 text-white/70 transition-colors duration-300 hover:border-cyan-400/40 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Student reviews"
    >
      <div
        className="-mx-2 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
        >
          {testimonials.map(({ name, role, text }, i) => {
            const visible = i >= index && i < index + perView;
            return (
              <div
                key={name}
                className="shrink-0 px-2"
                style={{ flexBasis: `${100 / perView}%` }}
                aria-hidden={!visible}
              >
                <article
                  className={`flex flex-col h-full p-6 rounded-xl border border-white/10 bg-[#141a1b]/80 backdrop-blur-sm transition-all duration-700 hover:border-cyan-400/30 ${
                    visible ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                      <Quote size={14} strokeWidth={1.8} />
                    </span>
                    <div
                      className="flex gap-0.5 text-cyan-400"
                      aria-label="5 out of 5 stars"
                    >
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={12} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                  </div>

                  <p className="mt-5 font-serif text-[15px] font-bold leading-relaxed text-white">
                    {text}
                  </p>

                  <div className="pt-5 mt-auto">
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
                        {name}
                      </p>
                      <p className="mt-1 text-[9.5px] uppercase tracking-[0.14em] text-white/45">
                        {role}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose review">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-8 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                  : "w-3 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={prev} aria-label="Previous review" className={btn}>
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={next} aria-label="Next review" className={btn}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentReview = () => {
  return (
    <section id="student-reviews" className="px-4 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading block */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
          [ Student reviews &amp; gallery ]
        </p>

        <h2 className="mt-5 max-w-[900px] font-serif font-bold uppercase leading-[1.05] tracking-tight text-white text-[34px] sm:text-[48px] lg:text-[56px]">
          Hear from our{" "}
          <span
            className="text-cyan-400"
            style={{ textShadow: "0 0 26px rgba(34,211,238,0.45)" }}
          >
            students
          </span>
        </h2>

        {/* Testimonials slider */}
        <ReviewSlider />

        {/* Gallery */}
        <p className="mt-14 mb-5 text-[9px] uppercase tracking-[0.18em] text-white/40">
          Gallery &mdash; moments from our training days
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <GalleryTile key={item.caption} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentReview;