// src/Pages/NotFound/NotFound.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Home, BookOpen, MessageCircle } from "lucide-react";


const EASE = [0.22, 1, 0.36, 1];

// Injection-site "mapping" points on the face illustration.
// The LAST point is the missing one: it is not connected to the others.
const POINTS = [
  { x: 200, y: 140 },
  { x: 130, y: 230 },
  { x: 150, y: 330 },
  { x: 200, y: 385 },
  { x: 250, y: 330 },
];
const TARGET = { x: 282, y: 232 };

const FACE_PATH =
  "M200 30 C290 30 340 110 335 210 C330 320 280 430 200 452 C120 430 70 320 65 210 C60 110 110 30 200 30 Z";
const MAP_PATH = "M200 140 L130 230 L150 330 L200 385 L250 330 L200 140";

const dotStyle = { transformBox: "fill-box", transformOrigin: "center" };

const NotFound = () => {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();

  /* ---- subtle mouse parallax (disabled for reduced motion) ---- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const faceX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const faceY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const numX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const numY = useTransform(sy, [-0.5, 0.5], [14, -14]);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  /* ---- animation helpers: static when reduced motion is on ---- */
  const draw = (delay = 0, duration = 1.6) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration, ease: EASE, delay },
        };

  const pop = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { type: "spring", stiffness: 260, damping: 16, delay },
        };

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  const btnBase =
    "inline-flex items-center justify-center gap-2.5 px-6 h-[46px] text-[10.5px] font-bold uppercase tracking-[0.16em] rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";

  return (
    <section
      onMouseMove={onMove}
      className="relative flex items-center px-4 overflow-hidden sm:px-8 min-h-[calc(100vh-5rem)] py-16"
    >
      
      {/* Giant outlined 404 behind everything */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { x: numX, y: numY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="font-serif font-bold leading-none text-transparent text-[44vw] lg:text-[460px]"
          style={{
            WebkitTextStroke: "1.5px rgba(34,211,238,0.22)",
            textShadow: "0 0 80px rgba(34,211,238,0.12)",
          }}
        >
          404
        </motion.span>
      </motion.div>

      <div className="relative mx-auto grid items-center w-full max-w-[1200px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ---------- TEXT ---------- */}
        <div className="order-2 lg:order-1">
          <motion.p
            {...rise(1.5)}
            className="inline-flex items-center gap-2.5 px-3.5 py-2 text-[11px] text-white/70 border rounded-full border-white/15 bg-[#0d1517]/80 backdrop-blur-md"
          >
            <span className="relative flex w-2 h-2">
              {!reduce && (
                <span className="absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping bg-cyan-400" />
              )}
              <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-400" />
            </span>
            Error 404
          </motion.p>

          <motion.h1
            {...rise(1.6)}
            className="mt-6 font-serif font-bold uppercase leading-[1.02] tracking-tight text-white text-[38px] sm:text-[56px] xl:text-[68px]"
          >
            We couldn&apos;t find
            <br />
            <span
              className="text-cyan-400"
              style={{ textShadow: "0 0 30px rgba(34,211,238,0.5)" }}
            >
              this page
            </span>
          </motion.h1>

          <motion.p
            {...rise(1.75)}
            className="mt-6 max-w-[480px] text-[14px] leading-relaxed text-white/65"
          >
            The link may be broken, or the page may have moved. Head back to the
            home page, or go straight to the course information.
          </motion.p>

          <motion.p
            {...rise(1.85)}
            className="mt-4 max-w-full w-fit truncate px-3 py-1.5 font-mono text-[11px] text-cyan-200/80 border rounded-md border-white/10 bg-black/40"
            title={pathname}
          >
            No page at {pathname}
          </motion.p>

          <motion.div
            {...rise(1.95)}
            className="flex flex-col gap-3 mt-9 sm:flex-row sm:flex-wrap"
          >
            <Link
              to="/"
              className={`${btnBase} text-[#06222a] bg-cyan-400 shadow-[0_0_28px_rgba(34,211,238,0.35)] hover:bg-cyan-300`}
            >
              <Home size={14} />
              Back to home
            </Link>

            <Link
              to="/"
              state={{ scrollTo: "course-details" }}
              className={`${btnBase} text-white border border-white/25 hover:bg-white/5`}
            >
              <BookOpen size={14} />
              View course details
            </Link>

            <Link
              to="/"
              state={{ scrollTo: "enquire" }}
              className={`${btnBase} text-cyan-300 hover:text-cyan-200`}
            >
              <MessageCircle size={14} />
              Talk to an advisor
            </Link>
          </motion.div>
        </div>

        {/* ---------- ILLUSTRATION ---------- */}
        <motion.div
          style={reduce ? undefined : { x: faceX, y: faceY }}
          className="relative order-1 mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:order-2 lg:max-w-[440px]"
        >
          {/* glow behind face */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-cyan-400/10 blur-[90px]"
          />

          <svg
            viewBox="0 0 400 480"
            role="img"
            aria-label="Face outline with injection-site mapping, one point marked as missing"
            className="relative w-full h-auto overflow-visible"
          >
            {/* mapping guides */}
            <motion.path
              d="M200 20 L200 462"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
              strokeDasharray="4 6"
              fill="none"
              {...draw(0.1, 1.2)}
            />
            <motion.path
              d="M40 140 L360 140"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="4 6"
              fill="none"
              {...draw(0.25, 1.2)}
            />
            <motion.path
              d="M40 232 L360 232"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="4 6"
              fill="none"
              {...draw(0.4, 1.2)}
            />

            {/* face outline */}
            <motion.path
              d={FACE_PATH}
              fill="rgba(34,211,238,0.03)"
              stroke="rgba(34,211,238,0.75)"
              strokeWidth="2"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 10px rgba(34,211,238,0.45))" }}
              {...draw(0.3, 1.8)}
            />

            {/* connected treatment map */}
            <motion.path
              d={MAP_PATH}
              fill="none"
              stroke="rgba(34,211,238,0.55)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              {...draw(1.0, 1.1)}
            />

            {/* connected points */}
            {POINTS.map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="6"
                fill="#22d3ee"
                style={{
                  ...dotStyle,
                  filter: "drop-shadow(0 0 6px rgba(34,211,238,0.9))",
                }}
                {...pop(1.0 + i * 0.12)}
              />
            ))}

            {/* the missing point: isolated, crosshair + pulse */}
            <g>
              {!reduce && (
                <>
                  <motion.circle
                    cx={TARGET.x}
                    cy={TARGET.y}
                    r="12"
                    fill="none"
                    stroke="rgba(248,113,113,0.7)"
                    strokeWidth="1.5"
                    style={dotStyle}
                    animate={{ scale: [1, 3], opacity: [0.7, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 2.2,
                    }}
                  />
                  <motion.circle
                    cx={TARGET.x}
                    cy={TARGET.y}
                    r="12"
                    fill="none"
                    stroke="rgba(248,113,113,0.45)"
                    strokeWidth="1.5"
                    style={dotStyle}
                    animate={{ scale: [1, 3.6], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 2.9,
                    }}
                  />
                </>
              )}

              <motion.circle
                cx={TARGET.x}
                cy={TARGET.y}
                r="16"
                fill="rgba(10,11,13,0.9)"
                stroke="rgba(248,113,113,0.85)"
                strokeWidth="1.5"
                strokeDasharray="3 4"
                style={dotStyle}
                {...pop(2.0)}
              />
              <motion.g {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 2.2, duration: 0.4 } })}>
                <path
                  d={`M${TARGET.x - 6} ${TARGET.y - 6} L${TARGET.x + 6} ${TARGET.y + 6} M${TARGET.x + 6} ${TARGET.y - 6} L${TARGET.x - 6} ${TARGET.y + 6}`}
                  stroke="rgba(248,113,113,0.95)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* leader line + label */}
                <path
                  d={`M${TARGET.x + 18} ${TARGET.y - 10} L${TARGET.x + 52} ${TARGET.y - 46} L${TARGET.x + 100} ${TARGET.y - 46}`}
                  stroke="rgba(248,113,113,0.6)"
                  strokeWidth="1"
                  fill="none"
                />
                <text
                  x={TARGET.x + 56}
                  y={TARGET.y - 52}
                  fill="rgba(252,165,165,0.95)"
                  fontSize="11"
                  letterSpacing="1.5"
                  style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                >
                  PAGE MISSING
                </text>
              </motion.g>
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;