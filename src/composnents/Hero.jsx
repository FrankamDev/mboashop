import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    eyebrow: "NEW ARRIVALS",
    title: "SMART TECH.",
    highlight: "BETTER EVERY DAY.",
    description:
      "Discover the latest gadgets designed for work, entertainment & everyday life.",
    image: "./images/hero1.png",
    theme: "blue",
  },
  {
    id: 2,
    eyebrow: "FASHION TRENDS",
    title: "TRENDY STYLE.",
    highlight: "FOR EVERY YOU.",
    description:
      "Explore our latest collection of fashion items, accessories and shoes.",
    image: "./images/2.jpg",
    theme: "pink",
  },
  {
    id: 3,
    eyebrow: "HOME ESSENTIALS",
    title: "EVERYTHING YOU NEED.",
    highlight: "IN ONE PLACE.",
    description:
      "Make your home smarter, more comfortable and stylish.",
    image: "./images/3.png",
    theme: "orange",
  },
  {
    id: 4,
    eyebrow: "BEAUTY & CARE",
    title: "LOOK GOOD.",
    highlight: "FEEL GREAT.",
    description:
      "Discover our beauty, health and personal care products.",
    image: "./images/4.jpg",
    theme: "cyan",
  },
];

const themeColors = {
  blue: "#0866ff",
  pink: "#e52acb",
  orange: "#ff9d00",
  cyan: "#00c8c8",
};

export default function Hero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto mt-4 w-full max-w-7xl px-2 transition-colors duration-300 sm:px-4">
      <div
        className="
          relative isolate
          h-[210px]
          overflow-hidden
          rounded-2xl
          bg-[#020b1d]
          text-white
          shadow-xl
          transition-all duration-300
          dark:bg-slate-950
          sm:h-[300px]
          lg:h-[380px]
        "
        style={{ "--accent": themeColors[slide.theme] }}
      >
        {/* IMAGE DE FOND */}
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          fetchPriority={active === 0 ? "high" : "auto"}
          loading={active === 0 ? "eager" : "lazy"}
          decoding="async"
          className="
            absolute inset-0 -z-20
            h-full w-full
            object-cover object-center
            animate-hero-image
          "
        />

        {/* DÉGRADÉ SOMBRE */}
        <div
          className="
            absolute inset-0 -z-10
            bg-gradient-to-r
            from-[#020817]
            via-[#020817]/90
            via-40%
            to-transparent
            dark:from-[#020617]
            dark:via-[#020617]/95
            dark:via-40%
          "
        />

        {/* EFFET LUMINEUX */}
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />

        {/* CONTENU */}
        <div
          key={`content-${slide.id}`}
          className="
            relative z-10
            flex h-full
            w-[75%]
            flex-col
            items-start
            justify-center
            pl-5
            pb-6
            animate-hero-content
            sm:w-[60%]
            sm:pl-9
            lg:pl-14
          "
        >
          {/* EYEBROW */}
          <span
            className="
              mb-2
              text-[9px]
              font-extrabold
              tracking-[1.5px]
              sm:mb-3
              sm:text-sm
            "
            style={{ color: "var(--accent)" }}
          >
            {slide.eyebrow}
          </span>

          {/* TITRE */}
          <h1
            className="
              text-xl
              font-black
              leading-[1.08]
              tracking-tight
              sm:text-4xl
              lg:text-5xl
            "
          >
            {slide.title}

            <span
              className="mt-1 block"
              style={{ color: "var(--accent)" }}
            >
              {slide.highlight}
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-2
              max-w-[260px]
              text-[9px]
              leading-relaxed
              text-white/90
              sm:mt-4
              sm:max-w-sm
              sm:text-sm
              lg:text-base
            "
          >
            {slide.description}
          </p>

          {/* CTA */}
          <a
            href="#products"
            className="
              mt-3
              inline-flex
              items-center
              gap-3
              rounded-full
              px-4
              py-1.5
              text-[10px]
              font-extrabold
              text-white
              transition
              hover:brightness-110
              hover:scale-[1.02]
              sm:mt-5
              sm:px-5
              sm:py-2.5
              sm:text-sm
            "
            style={{ backgroundColor: "var(--accent)" }}
          >
            VISITER LA BOUTIQUE

            <span
              className="
                grid
                h-6 w-6
                place-items-center
                rounded-full
                bg-white
                text-blue-600
                sm:h-8 sm:w-8
              "
            >
              <ArrowRight size={17} strokeWidth={2.8} />
            </span>
          </a>
        </div>

        {/* PAGINATION */}
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Afficher le slide ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  active === index
                    ? "w-7"
                    : "w-2 bg-white/80 hover:bg-white"
                }
              `}
              style={
                active === index
                  ? { backgroundColor: "var(--accent)" }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}