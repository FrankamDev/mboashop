import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Globe2,
  Heart,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
  Zap,
} from "lucide-react";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Navbar from "../composnents/Navbar";

/* =========================================================
   ANIMATION CONFIG
========================================================= */

const EASE = [0.22, 1, 0.36, 1];

const revealUp = {
  hidden: {
    opacity: 0,
    y: 45,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const revealLeft = {
  hidden: {
    opacity: 0,
    x: -45,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const revealRight = {
  hidden: {
    opacity: 0,
    x: 45,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* =========================================================
   DATA
========================================================= */

const values = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Confiance",
    text: "Une expérience claire et transparente à chaque étape du parcours d'achat.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Simplicité",
    text: "Une interface pensée pour trouver un produit, l'ajouter au panier et passer commande rapidement.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Expérience",
    text: "Chaque détail de l'interface est travaillé pour rendre le shopping plus agréable.",
  },
  {
    number: "04",
    icon: Users,
    title: "Proximité",
    text: "Une expérience digitale conçue autour d'un parcours de commande simple et accessible.",
  },
];

const features = [
  {
    icon: Search,
    title: "Recherche",
    text: "Trouvez rapidement les produits recherchés grâce à la recherche intégrée.",
  },
  {
    icon: ShoppingBag,
    title: "Catalogue",
    text: "Parcourez les produits et explorez les différentes catégories disponibles.",
  },
  {
    icon: Package,
    title: "Panier",
    text: "Ajoutez vos produits, modifiez les quantités et visualisez votre récapitulatif.",
  },
  {
    icon: MessageCircle,
    title: "Assistance",
    text: "Contactez directement MboaShop via WhatsApp lorsque vous avez besoin d'aide.",
  },
];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Découvrez",
    text: "Explorez le catalogue et recherchez les produits qui vous intéressent.",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "Sélectionnez",
    text: "Ajoutez vos produits au panier et ajustez les quantités.",
  },
  {
    number: "03",
    icon: Package,
    title: "Passez commande",
    text: "Vérifiez votre sélection puis poursuivez votre parcours de commande.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Finalisez",
    text: "Les informations nécessaires à la commande et à la livraison sont ensuite confirmées.",
  },
];

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function Reveal({
  children,
  variants = revealUp,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const centered = align === "center";

  return (
    <div
      className={`${
        centered ? "mx-auto text-center" : ""
      } max-w-3xl`}
    >
      <motion.span
        initial={{
          opacity: 0,
          y: 15,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 0.5,
        }}
        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[3px] text-blue-600 dark:text-blue-400"
      >
        <span className="h-px w-6 bg-blue-600 dark:bg-blue-400" />
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.7,
          delay: 0.05,
          ease: EASE,
        }}
        className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            delay: 0.12,
          }}
          className={`mt-5 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

function FloatingOrb({ className = "" }) {
  return (
    <motion.div
      animate={{
        y: [0, -18, 0],
        x: [0, 10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 160]
  );

  const heroOpacityRaw = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, shouldReduceMotion ? 1 : 0]
  );

  const heroY = useSpring(heroYRaw, {
    stiffness: 90,
    damping: 25,
  });

  const heroOpacity = useSpring(heroOpacityRaw, {
    stiffness: 100,
    damping: 25,
  });

  return (
    <main className="overflow-hidden bg-white text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        ref={heroRef}
        className="relative flex min-h-[calc(100svh-68px)] items-center overflow-hidden"
      >
        <Navbar cartCount={2} />
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(37,99,235,0.12),transparent_32%),radial-gradient(circle_at_85%_70%,rgba(14,165,233,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_15%_25%,rgba(37,99,235,0.2),transparent_32%),radial-gradient(circle_at_85%_70%,rgba(14,165,233,0.1),transparent_30%)]" />

        <FloatingOrb className="left-[5%] top-[20%] h-36 w-36 bg-blue-500/10 dark:bg-blue-500/10" />

        <FloatingOrb className="right-[4%] top-[50%] h-52 w-52 bg-cyan-400/10 dark:bg-cyan-400/10" />

        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
          }}
          className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
        >
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">

            {/* LEFT */}
            <div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: EASE,
                }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 dark:border-blue-500/20 dark:bg-blue-500/10"
              >
                <Sparkles
                  size={13}
                  className="text-blue-600 dark:text-blue-400"
                />

                <span className="text-[9px] font-black uppercase tracking-[2px] text-blue-600 dark:text-blue-400">
                  À propos de MboaShop
                </span>
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: EASE,
                }}
                className="mt-6 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-8xl"
              >
                Le shopping,
                <span className="block text-blue-600 dark:text-blue-400">
                  simplement.
                </span>
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.25,
                  ease: EASE,
                }}
                className="mt-7 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base sm:leading-8"
              >
                MboaShop propose une expérience e-commerce claire,
                accessible et pensée pour simplifier la découverte des
                produits, la gestion du panier et le parcours de commande.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: EASE,
                }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  to="/all-products"
                  className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-xs font-extrabold text-white shadow-xl shadow-slate-950/10 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 active:scale-[0.98] dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
                >
                  Découvrir la boutique

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/contact"
                  className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-extrabold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:border-blue-500/40 dark:hover:text-blue-400"
                >
                  Nous contacter

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            </div>

            {/* RIGHT VISUAL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.88,
                rotate: 2,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: EASE,
              }}
              className="relative mx-auto w-full max-w-[470px]"
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [0, -12, 0],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Main visual */}
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-3 shadow-[0_35px_100px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_35px_100px_rgba(0,0,0,0.35)]">
                  <div className="relative min-h-[430px] overflow-hidden rounded-[1.5rem] bg-slate-950 p-7 text-white sm:p-9">

                    {/* Decorative circles */}
                    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />

                    <div className="absolute -bottom-32 -left-28 h-72 w-72 rounded-full border border-white/10" />

                    <div className="absolute right-10 top-20 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_25px_rgba(96,165,250,1)]" />

                    <div className="absolute bottom-28 left-10 h-1.5 w-1.5 rounded-full bg-white/30" />

                    <div className="relative z-10 flex h-full min-h-[374px] flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
                          <ShoppingBag size={20} />
                        </div>

                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[8px] font-black uppercase tracking-[2px] text-white/60">
                          E-commerce
                        </span>
                      </div>

                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[3px] text-blue-400">
                          MboaShop
                        </p>

                        <h2 className="mt-4 text-5xl font-black leading-[0.88] tracking-[-0.06em] sm:text-6xl">
                          Find.
                          <br />
                          Shop.
                          <br />
                          <span className="text-blue-500">
                            Enjoy.
                          </span>
                        </h2>

                        <p className="mt-6 max-w-xs text-[11px] leading-5 text-white/40">
                          Une expérience pensée pour rendre
                          le parcours d'achat plus simple.
                        </p>
                      </div>

                      <div className="flex items-end justify-between border-t border-white/10 pt-5">
                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-[2px] text-white/30">
                            EXPERIENCE
                          </p>

                          <p className="mt-1 text-[11px] font-bold text-white/80">
                            Simple · Moderne · Accessible
                          </p>
                        </div>

                        <ArrowUpRight
                          size={18}
                          className="text-white/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, 8, 0],
                          rotate: [0, 1, 0],
                        }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-5 -left-4 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:-left-7"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <Check size={17} />
                    </div>

                    <div>
                      <p className="text-[8px] font-black uppercase tracking-[1.5px] text-slate-400">
                        Shopping
                      </p>

                      <p className="mt-1 text-[10px] font-black text-slate-900 dark:text-white">
                        Parcours simplifié
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -7, 0],
                        }
                  }
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-3 top-16 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:-right-6"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe2
                      size={15}
                      className="text-blue-600 dark:text-blue-400"
                    />

                    <span className="text-[9px] font-black text-slate-700 dark:text-slate-200">
                      Digital shopping
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.2,
          }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, 7, 0],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[8px] font-black uppercase tracking-[3px] text-slate-400">
              Scroll
            </span>

            <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="border-y border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <Reveal>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600 dark:text-blue-400">
                  L'idée derrière MboaShop
                </span>

                <h2 className="mt-4 max-w-4xl text-3xl font-black leading-[1] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl">
                  Faire du shopping en ligne une expérience simple.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="max-w-md">
                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                  MboaShop rassemble dans une même expérience les
                  éléments essentiels d'une boutique en ligne :
                  découverte des produits, recherche, panier et
                  parcours de commande.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

          {/* Visual */}
          <Reveal variants={revealLeft}>
            <div className="relative">
              <div className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative rounded-[2rem] border border-slate-200 bg-slate-100 p-3 dark:border-slate-800 dark:bg-slate-900">
                <div className="relative min-h-[440px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blue-600 via-blue-700 to-slate-950 p-8 text-white sm:p-10">

                  <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full border border-white/10" />

                  <div className="absolute bottom-[-100px] left-[-80px] h-72 w-72 rounded-full border border-white/10" />

                  <div className="relative z-10 flex min-h-[380px] flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-[3px] text-blue-200">
                        Mission
                      </span>

                      <Zap size={19} className="text-white/50" />
                    </div>

                    <div>
                      <p className="text-6xl font-black leading-[0.85] tracking-[-0.07em] sm:text-8xl">
                        Simple
                        <span className="text-blue-300">.</span>
                      </p>

                      <p className="mt-2 text-6xl font-black leading-[0.85] tracking-[-0.07em] text-white/25 sm:text-8xl">
                        Fast
                        <span className="text-blue-300">.</span>
                      </p>

                      <p className="mt-2 text-6xl font-black leading-[0.85] tracking-[-0.07em] text-white/10 sm:text-8xl">
                        Clear
                        <span className="text-blue-300">.</span>
                      </p>
                    </div>

                    <p className="max-w-sm border-t border-white/10 pt-5 text-[11px] leading-6 text-white/45">
                      Réduire les frictions inutiles dans le
                      parcours d'achat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal variants={revealRight} delay={0.1}>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600 dark:text-blue-400">
                Notre mission
              </span>

              <h2 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl">
                Transformer chaque étape du shopping en une interaction intuitive.
              </h2>

              <div className="mt-7 space-y-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
                <p>
                  MboaShop est construit autour d'un principe simple :
                  permettre à l'utilisateur de comprendre rapidement
                  où il se trouve, ce qu'il peut faire et comment
                  poursuivre son achat.
                </p>

                <p>
                  L'interface privilégie donc une navigation claire,
                  une recherche accessible, des fiches produits,
                  un panier persistant et un parcours de commande
                  progressif.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  "Découverte rapide des produits",
                  "Navigation pensée pour le mobile",
                  "Gestion simple du panier",
                  "Contact direct avec MboaShop",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.1 + index * 0.08,
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <Check size={14} />
                    </span>

                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}

      <section className="bg-slate-950 text-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <SectionHeader
            eyebrow="Nos valeurs"
            title="Les principes derrière l'expérience."
            description="Des choix simples qui permettent de construire une expérience e-commerce cohérente, lisible et agréable."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="mt-14 grid overflow-hidden rounded-3xl border border-white/10 md:grid-cols-2"
          >
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={value.number}
                  variants={revealUp}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -5,
                        }
                  }
                  transition={{
                    duration: 0.25,
                  }}
                  className="group relative border-b border-r border-white/10 bg-slate-950 p-7 transition-colors duration-300 hover:bg-slate-900 dark:bg-black dark:hover:bg-slate-950 sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/30 group-hover:bg-blue-500 group-hover:text-white">
                      <Icon size={19} />
                    </div>

                    <span className="text-5xl font-black text-white/5 transition-colors duration-300 group-hover:text-blue-500/10">
                      {value.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-black">
                    {value.title}
                  </h3>

                  <p className="mt-3 max-w-md text-xs leading-6 text-white/40">
                    {value.text}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-[9px] font-black uppercase tracking-[2px] text-blue-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    MboaShop
                    <ArrowRight size={12} />
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <SectionHeader
          eyebrow="L'expérience"
          title="Tout ce qu'il faut pour acheter simplement."
          description="Les fonctionnalités principales de la plateforme sont réunies autour d'un parcours utilisateur fluide."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                variants={revealUp}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -8,
                      }
                }
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/[0.04] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30 dark:hover:shadow-black/20"
              >
                <div className="absolute right-[-30px] top-[-30px] h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-transform duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 dark:bg-blue-500/10 dark:text-blue-400">
                    <Icon size={19} />
                  </div>

                  <h3 className="mt-7 text-base font-black text-slate-950 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    {feature.text}
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-[9px] font-black uppercase tracking-[1.5px] text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-blue-400">
                    Explorer
                    <ChevronRight size={12} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section className="border-y border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <SectionHeader
            eyebrow="Le parcours"
            title="De la découverte à la commande."
            description="Une logique simple pour éviter les étapes inutiles et garder l'utilisateur concentré sur son achat."
          />

          <div className="relative mt-16">

            {/* Desktop connector */}
            <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-blue-700 lg:block" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="grid gap-10 lg:grid-cols-4"
            >
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    key={step.number}
                    variants={revealUp}
                    className="relative"
                  >
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-lg shadow-blue-500/10 dark:border-blue-500/20 dark:bg-slate-950 dark:text-blue-400">
                      <Icon size={20} />
                    </div>

                    <div className="mt-6">
                      <span className="text-[9px] font-black tracking-[2px] text-blue-600 dark:text-blue-400">
                        ÉTAPE {step.number}
                      </span>

                      <h3 className="mt-2 text-lg font-black text-slate-950 dark:text-white">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                        {step.text}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DIFFERENCE
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          <Reveal variants={revealLeft}>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600 dark:text-blue-400">
                Notre différence
              </span>

              <h2 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl">
                Moins de complexité.
                <br />
                Plus de clarté.
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                L'objectif n'est pas de multiplier les fonctionnalités
                pour impressionner. L'objectif est de créer une interface
                dans laquelle l'utilisateur comprend naturellement quoi
                faire ensuite.
              </p>

              <Link
                to="/all-products"
                className="group mt-8 inline-flex items-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400"
              >
                Voir la boutique

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          <Reveal variants={revealRight} delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">

              {[
                {
                  title: "Pensé mobile",
                  text: "Une interface responsive adaptée aux petits écrans.",
                },
                {
                  title: "Navigation claire",
                  text: "Des accès rapides au catalogue, aux catégories et au panier.",
                },
                {
                  title: "Commande progressive",
                  text: "Le parcours d'achat est organisé étape par étape.",
                },
                {
                  title: "Contact direct",
                  text: "Une assistance accessible directement via WhatsApp.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.6,
                    ease: EASE,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -4,
                        }
                  }
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors duration-300 hover:border-blue-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30 dark:hover:bg-slate-900"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Check size={15} />
                  </div>

                  <h3 className="mt-5 text-sm font-black text-slate-950 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY / EXPERIENCE
      ====================================================== */}

      <section className="bg-slate-950 text-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">

            <Reveal>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-400">
                  Une expérience moderne
                </span>

                <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                  La technologie doit disparaître derrière l'expérience.
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/40">
                  L'utilisateur n'a pas besoin de connaître la technologie
                  utilisée derrière la plateforme. Il doit simplement
                  pouvoir utiliser le produit facilement.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-blue-600/10 blur-3xl" />

                <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">

                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-[2px] text-white/30">
                        Experience layer
                      </p>

                      <p className="mt-1 text-sm font-black">
                        MboaShop
                      </p>
                    </div>

                    <Sparkles
                      size={18}
                      className="text-blue-400"
                    />
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      "Navigation intuitive",
                      "Recherche produit",
                      "Panier persistant",
                      "Commande progressive",
                      "Assistance WhatsApp",
                    ].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{
                          opacity: 0,
                          x: 15,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          delay: index * 0.08,
                        }}
                        className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                          <Check size={13} />
                        </div>

                        <span className="text-[10px] font-bold text-white/60">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: EASE,
          }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-blue-600 px-6 py-14 text-center text-white sm:px-10 sm:py-20"
        >
          {/* Animated background */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: [0, 360],
                  }
            }
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -right-28 -top-28 h-72 w-72 rounded-full border border-white/10"
          />

          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: [360, 0],
                  }
            }
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-36 -left-36 h-80 w-80 rounded-full border border-white/10"
          />

          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-200">
              MboaShop
            </span>

            <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl">
              Votre prochaine découverte commence ici.
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-xs leading-6 text-blue-100 sm:text-sm">
              Explorez le catalogue, trouvez vos produits et découvrez
              une expérience shopping conçue pour être simple.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/all-products"
                className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-white px-7 text-xs font-extrabold text-blue-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]"
              >
                Explorer la boutique

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/"
                className="inline-flex min-h-13 items-center justify-center rounded-xl border border-white/20 px-7 text-xs font-extrabold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/5 active:scale-[0.98]"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}