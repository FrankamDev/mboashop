
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/hero1.png",
    alt: "Sélection de produits MBOASHOP : mode, maison, beauté et technologie",
    link: "#products",
  },
  {
    id: 2,
    image: "/images/hero2.png",
    alt: "Découvrez les nouveautés et promotions MBOASHOP",
    link: "#products",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Bannière précédente
  const previousSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  // Bannière suivante
  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section
      className="w-full max-w-7xl mx-auto px-3 sm:px-4 mt-4"
      aria-label="Promotions MBOASHOP"
    >
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-lg">

        {/* Bannières */}
        <div className="relative aspect-[16/9] w-full">
          {slides.map((slide, index) => (
            <a
              key={slide.id}
              href={slide.link}
              aria-hidden={index !== activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              className={`absolute inset-0 block transition-opacity duration-700 ${
                index === activeIndex
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
                width="1200"
                height="675"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
              />
            </a>
          ))}
        </div>

        {/* Flèche précédente */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Bannière précédente"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2
          w-9 h-9 sm:w-11 sm:h-11 rounded-full
          bg-white/90 text-slate-900 shadow-md
          flex items-center justify-center
          hover:bg-white transition"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Flèche suivante */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Bannière suivante"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2
          w-9 h-9 sm:w-11 sm:h-11 rounded-full
          bg-white/90 text-slate-900 shadow-md
          flex items-center justify-center
          hover:bg-white transition"
        >
          <ChevronRight size={22} />
        </button>

        {/* Indicateurs */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Afficher la bannière ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-7 bg-blue-500"
                  : "w-2.5 bg-white/80"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
