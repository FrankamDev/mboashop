
// import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const slides = [
//   {
//     id: 1,
//     image: "/images/hero1.png",
//     alt: "Sélection de produits MBOASHOP : mode, maison, beauté et technologie",
//     link: "#products",
//   },
//   {
//     id: 2,
//     image: "/images/hero2.png",
//     alt: "Découvrez les nouveautés et promotions MBOASHOP",
//     link: "#products",
//   },
// ];

// export default function Hero() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Défilement automatique toutes les 5 secondes
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((current) => (current + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Bannière précédente
//   const previousSlide = () => {
//     setActiveIndex(
//       (current) => (current - 1 + slides.length) % slides.length
//     );
//   };

//   // Bannière suivante
//   const nextSlide = () => {
//     setActiveIndex((current) => (current + 1) % slides.length);
//   };

//   return (
//     <section
//       className="w-full max-w-7xl mx-auto px-3 sm:px-4 mt-4"
//       aria-label="Promotions MBOASHOP"
//     >
//       <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-lg">

//         {/* Bannières */}
//         <div className="relative aspect-[16/9] w-full">
//           {slides.map((slide, index) => (
//             <a
//               key={slide.id}
//               href={slide.link}
//               aria-hidden={index !== activeIndex}
//               tabIndex={index === activeIndex ? 0 : -1}
//               className={`absolute inset-0 block transition-opacity duration-700 ${
//                 index === activeIndex
//                   ? "opacity-100"
//                   : "pointer-events-none opacity-0"
//               }`}
//             >
//               <img
//                 src={slide.image}
//                 alt={slide.alt}
//                 className="w-full h-full object-cover"
//                 width="1200"
//                 height="675"
//                 loading={index === 0 ? "eager" : "lazy"}
//                 fetchPriority={index === 0 ? "high" : "auto"}
//                 decoding="async"
//               />
//             </a>
//           ))}
//         </div>

//         {/* Flèche précédente */}
//         <button
//           type="button"
//           onClick={previousSlide}
//           aria-label="Bannière précédente"
//           className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2
//           w-9 h-9 sm:w-11 sm:h-11 rounded-full
//           bg-white/90 text-slate-900 shadow-md
//           flex items-center justify-center
//           hover:bg-white transition"
//         >
//           <ChevronLeft size={22} />
//         </button>

//         {/* Flèche suivante */}
//         <button
//           type="button"
//           onClick={nextSlide}
//           aria-label="Bannière suivante"
//           className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2
//           w-9 h-9 sm:w-11 sm:h-11 rounded-full
//           bg-white/90 text-slate-900 shadow-md
//           flex items-center justify-center
//           hover:bg-white transition"
//         >
//           <ChevronRight size={22} />
//         </button>

//         {/* Indicateurs */}
//         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
//           {slides.map((slide, index) => (
//             <button
//               key={slide.id}
//               type="button"
//               onClick={() => setActiveIndex(index)}
//               aria-label={`Afficher la bannière ${index + 1}`}
//               aria-current={index === activeIndex ? "true" : undefined}
//               className={`h-2.5 rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? "w-7 bg-blue-500"
//                   : "w-2.5 bg-white/80"
//               }`}
//             />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }





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
    image: "/images/hero-tech.webp",
    theme: "blue",
  },
  {
    id: 2,
    eyebrow: "FASHION TRENDS",
    title: "TRENDY STYLE.",
    highlight: "FOR EVERY YOU.",
    description:
      "Explore our latest collection of fashion items, accessories and shoes.",
    image: "/images/hero-fashion.webp",
    theme: "pink",
  },
  {
    id: 3,
    eyebrow: "HOME ESSENTIALS",
    title: "EVERYTHING YOU NEED.",
    highlight: "IN ONE PLACE.",
    description:
      "Make your home smarter, more comfortable and stylish.",
    image: "/images/hero-home.webp",
    theme: "orange",
  },
  {
    id: 4,
    eyebrow: "BEAUTY & CARE",
    title: "LOOK GOOD.",
    highlight: "FEEL GREAT.",
    description:
      "Discover our beauty, health and personal care products.",
    image: "/images/hero-beauty.webp",
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
    <section className="mx-auto mt-4 w-full max-w-7xl px-2 sm:px-4">
      <div
        className="relative isolate h-[210px] overflow-hidden rounded-2xl bg-[#020b1d] text-white shadow-xl sm:h-[300px] lg:h-[380px]"
        style={{ "--accent": themeColors[slide.theme] }}
      >
        {/* Image de fond */}
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          fetchPriority={active === 0 ? "high" : "auto"}
          loading={active === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center animate-hero-image"
        />

        {/* Dégradé sombre pour la lisibilité */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#020817] via-[#020817]/90 via-40% to-transparent" />

        {/* Effet lumineux */}
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />

        {/* Contenu */}
        <div
          key={`content-${slide.id}`}
          className="relative z-10 flex h-full w-[75%] flex-col items-start justify-center pl-5 pb-6 sm:w-[60%] sm:pl-9 lg:pl-14 animate-hero-content"
        >
          <span
            className="mb-2 text-[9px] font-extrabold tracking-[1.5px] sm:mb-3 sm:text-sm"
            style={{ color: "var(--accent)" }}
          >
            {slide.eyebrow}
          </span>

          <h1 className="text-xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
            {slide.title}
            <span
              className="mt-1 block"
              style={{ color: "var(--accent)" }}
            >
              {slide.highlight}
            </span>
          </h1>

          <p className="mt-2 max-w-[260px] text-[9px] leading-relaxed text-white/90 sm:mt-4 sm:max-w-sm sm:text-sm lg:text-base">
            {slide.description}
          </p>

          <a
            href="#products"
            className="mt-3 inline-flex items-center gap-3 rounded-full px-4 py-1.5 text-[10px] font-extrabold text-white transition hover:brightness-110 sm:mt-5 sm:px-5 sm:py-2.5 sm:text-sm"
            style={{ backgroundColor: "var(--accent)" }}
          >
            VISITER LA BOUTIQUE

            <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-blue-600 sm:h-8 sm:w-8">
              <ArrowRight size={17} strokeWidth={2.8} />
            </span>
          </a>
        </div>

        {/* Pagination */}
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Afficher le slide ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-7"
                  : "w-2 bg-white"
              }`}
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
