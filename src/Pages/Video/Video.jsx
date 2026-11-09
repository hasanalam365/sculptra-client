import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { scrollToSection } from "../../Shared/utils/scrollToSection";

// ---- Edit these ----
const VIDEO = {
  // mp4 link (e.g. "https://.../training.mp4") OR a YouTube embed link
  // (e.g. "https://www.youtube.com/embed/VIDEO_ID"). Leave "" until ready.
  src: "",
  // Optional poster image shown before play (leave "" to use the dark clinic look)
  poster: "",
  durationLabel: "45 seconds",
};

const EASE = [0.22, 1, 0.36, 1];
const isYouTube = (url) => /youtube\.com|youtu\.be/.test(url);

const Video = () => {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [showSoon, setShowSoon] = useState(false);

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  const handlePlay = () => {
    if (VIDEO.src) {
      setPlaying(true);
    } else {
      // no video linked yet
      setShowSoon(true);
      setTimeout(() => setShowSoon(false), 2500);
    }
  };

  return (
    <section id="video" className="px-4 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading block */}
        <motion.p
          {...reveal(0)}
          className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400"
        >
          [ See the treatment in action ]
        </motion.p>

        <motion.h2
          {...reveal(0.08)}
          className="mt-5 max-w-[760px] font-serif font-bold uppercase leading-[1.05] tracking-tight text-white text-[34px] sm:text-[48px] lg:text-[56px]"
        >
          Discover the{" "}
          <span
            className="text-cyan-400"
            style={{ textShadow: "0 0 26px rgba(34,211,238,0.45)" }}
          >
            Sculptra
          </span>{" "}
          technique
        </motion.h2>

        <motion.p
          {...reveal(0.16)}
          className="mt-6 max-w-[620px] text-[13px] leading-relaxed text-white/65"
        >
          A short look inside the training day — the product and equipment,
          practitioner preparation, a procedure demonstration and students
          observing under supervision.
        </motion.p>

        {/* Video card */}
        <motion.div
          {...reveal(0.2)}
          className="relative mt-10 overflow-hidden rounded-xl border border-cyan-400/50 bg-[#050a0b] aspect-video shadow-[0_0_44px_rgba(34,211,238,0.22),inset_0_0_40px_rgba(34,211,238,0.06)]"
        >
          <AnimatePresence mode="wait">
            {playing && VIDEO.src ? (
              <motion.div
                key="player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
              >
                {isYouTube(VIDEO.src) ? (
                  <iframe
                    src={`${VIDEO.src}${VIDEO.src.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
                    title="Sculptra training film"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    src={VIDEO.src}
                    poster={VIDEO.poster || undefined}
                    controls
                    autoPlay
                    playsInline
                    className="object-cover w-full h-full"
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="poster"
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Poster / dark clinic backdrop */}
                {VIDEO.poster ? (
                  <img
                    src={VIDEO.poster}
                    alt=""
                    className="object-cover w-full h-full opacity-80"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 40% 22% at 50% 30%, rgba(34,211,238,0.16), transparent 70%), radial-gradient(ellipse 70% 40% at 50% 100%, rgba(34,211,238,0.12), transparent 70%), linear-gradient(180deg, #08171a 0%, #050c0e 55%, #030607 100%)",
                    }}
                  />
                )}

                {/* subtle floor line + vignette */}
                <div className="absolute inset-x-0 top-[62%] h-px bg-cyan-400/10" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)",
                  }}
                />

                {/* Play button + label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <motion.button
                    type="button"
                    onClick={handlePlay}
                    aria-label="Play training film"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="relative flex items-center justify-center w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-full border border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.45)] backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                  >
                    {/* pulse rings */}
                    {!reduce && (
                      <>
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 border rounded-full border-cyan-400/60"
                          animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 border rounded-full border-cyan-400/40"
                          animate={{ scale: [1, 2.1], opacity: [0.4, 0] }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.7,
                          }}
                        />
                      </>
                    )}
                    <Play size={22} fill="currentColor" className="ml-0.5" />
                  </motion.button>

                  <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-white/50">
                    [ Training film · {VIDEO.durationLabel} ]
                  </p>

                  <AnimatePresence>
                    {showSoon && (
                      <motion.p
                        role="status"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="px-3 py-1.5 text-[10px] text-cyan-200 border rounded-full border-cyan-400/30 bg-black/50"
                      >
                        Training film coming soon
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.button
          type="button"
          onClick={() => scrollToSection("enquire")}
          {...reveal(0.1)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-6 h-[42px] mt-10 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#06222a] bg-cyan-400 rounded-md shadow-[0_0_28px_rgba(34,211,238,0.35)] hover:bg-cyan-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Enquire about training
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </section>
  );
};

export default Video;