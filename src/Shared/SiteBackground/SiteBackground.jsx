import React from "react";

// Full-website animated background (gradient + drifting glows + faint grid).
// Fixed behind everything, so every section shares the same look.
const SiteBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <style>{`
        @keyframes sb-gradient {
          0%   { background-position: 0% 0%; }
          50%  { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes sb-drift-a {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          50%  { transform: translate3d(14vw, 10vh, 0) scale(1.15); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes sb-drift-b {
          0%   { transform: translate3d(0, 0, 0) scale(1.1); }
          50%  { transform: translate3d(-16vw, -12vh, 0) scale(0.95); }
          100% { transform: translate3d(0, 0, 0) scale(1.1); }
        }
        @keyframes sb-drift-c {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          50%  { transform: translate3d(10vw, -14vh, 0) scale(1.2); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes sb-grid {
          0%   { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
        .sb-base {
          background: linear-gradient(
            135deg,
            #050607 0%,
            #0a1214 30%,
            #071417 55%,
            #0b0f1a 80%,
            #050607 100%
          );
          background-size: 220% 220%;
          animation: sb-gradient 28s ease-in-out infinite;
        }
        .sb-orb { position: absolute; border-radius: 9999px; will-change: transform; }
        .sb-a { animation: sb-drift-a 26s ease-in-out infinite; }
        .sb-b { animation: sb-drift-b 32s ease-in-out infinite; }
        .sb-c { animation: sb-drift-c 38s ease-in-out infinite; }
        .sb-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          animation: sb-grid 40s linear infinite;
          -webkit-mask-image: radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%);
                  mask-image: radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%);
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-base, .sb-a, .sb-b, .sb-c, .sb-grid { animation: none; }
        }
      `}</style>

      {/* Base gradient */}
      <div className="absolute inset-0 sb-base" />

      {/* Drifting glows: cyan, teal, blue */}
      <div
        className="sb-orb sb-a top-[-12%] left-[-8%] w-[620px] h-[620px] bg-cyan-400/[0.14] blur-[140px]"
      />
      <div
        className="sb-orb sb-b top-[28%] right-[-12%] w-[680px] h-[680px] bg-teal-400/[0.10] blur-[150px]"
      />
      <div
        className="sb-orb sb-c bottom-[-16%] left-[24%] w-[640px] h-[640px] bg-blue-500/[0.12] blur-[160px]"
      />

      {/* Faint moving grid */}
      <div className="absolute inset-0 sb-grid" />

      {/* Edge vignette so text stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
};

export default SiteBackground;