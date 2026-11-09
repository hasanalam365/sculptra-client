import React from "react";

// ---- Image links: apnar nijer image URL ekhane boshao ----
const IMAGES = {
  // Unsplash: "A hand in a glove holds a syringe" by Mina Rad
  collagen:
    "https://images.unsplash.com/photo-1746017090180-ebb14a589639?auto=format&fit=crop&w=1200&q=80",
  // Unsplash: dark moody woman portrait by yulia pantiukhina (placeholder, better close-up hole eta bodle nio)
  volume:
    "https://i.ibb.co.com/1YgFJLMg/Sculptra-Treatment-Areas-Infographic.png",
};

const cards = [
  {
    title: "Collagen Stimulation",
    text: "Understand how Sculptra is used to support the skin's own collagen production over time.",
    image: IMAGES.collagen,
  },
  {
    title: "Treatment AREA",
    text: "Explore a treatment approach used to support facial volume and contour with gradual, natural-looking change.",
    image: IMAGES.volume,
  },
];

const About = () => {
  return (
    <section id="about" className="px-4 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading block */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
          [ Discover Sculptra ]
        </p>

        <h2 className="mt-5 max-w-[720px] font-serif font-bold uppercase leading-[1.05] tracking-tight text-white text-[34px] sm:text-[48px] lg:text-[56px]">
          One advanced treatment. Natural-looking,{" "}
          <span
            className="text-cyan-400"
            style={{ textShadow: "0 0 26px rgba(34,211,238,0.55)" }}
          >
            gradual
          </span>{" "}
          results.
        </h2>

        <p className="mt-6 max-w-[560px] text-[14px] leading-relaxed text-white/65">
          Sculptra is a collagen-stimulating treatment used by practitioners to
          support skin quality, facial volume and contour over time. Discover
          how learning this technique could expand your professional aesthetics
          knowledge and services.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 mt-12 md:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#141718]/80"
            >
              <div className="relative h-[220px] sm:h-[260px] bg-gradient-to-br from-[#0b1c21] via-[#0a1114] to-[#050607]">
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="object-cover object-center w-full h-full opacity-90"
                  />
                )}
                {/* soft fade into the card body */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141718]/80 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="font-serif text-[18px] font-bold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 max-w-[420px] text-[13px] leading-relaxed text-white/60">
                  {card.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;