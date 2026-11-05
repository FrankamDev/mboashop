import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Zap,
  X,
  Menu,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { useDarkMode } from "../DarkModeContext";
import Navbar from "../composnents/Navbar";

/* =========================================================
   CONFIG
========================================================= */

const WHATSAPP_NUMBER = "237690372977";

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const EASE = [0.22, 1, 0.36, 1];

const revealUp = {
  hidden: {
    opacity: 0,
    y: 40,
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
    x: -40,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

const revealRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

/* =========================================================
   HELPERS
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
    <div className={centered ? "mx-auto text-center" : ""}>
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
        }}
        transition={{
          duration: 0.7,
          delay: 0.05,
          ease: EASE,
        }}
        className="mt-4 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl"
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

/* =========================================================
   NAVBAR
========================================================= */

function ContactNavbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Boutique",
      href: "/all-products",
    },
    {
      label: "À propos",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5"
          >
            <motion.div
              whileHover={{
                rotate: -5,
                scale: 1.05,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-950/10 dark:bg-blue-600"
            >
              <ShoppingBag size={18} />
            </motion.div>

            <div className="leading-none">
              <span className="block text-[15px] font-black tracking-[-0.04em] text-slate-950 dark:text-white">
                MboaShop
              </span>

              <span className="mt-1 block text-[7px] font-black uppercase tracking-[2px] text-slate-400">
                Shopping made simple
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = item.href === "/contact";

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative rounded-lg px-4 py-2 text-[11px] font-extrabold transition-colors ${
                    active
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {item.label}

                  {active && (
                    <motion.span
                      layoutId="contact-nav-active"
                      className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={toggleDarkMode}
              whileTap={{
                scale: 0.9,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-blue-200 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:text-blue-400"
              aria-label={
                darkMode
                  ? "Activer le mode clair"
                  : "Activer le mode sombre"
              }
            >
              {darkMode ? (
                <span className="text-sm">☀</span>
              ) : (
                <span className="text-sm">☾</span>
              )}
            </motion.button>

            <Link
              to="/cart"
              className="hidden h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-[10px] font-black text-white transition-all hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white sm:flex"
            >
              <ShoppingBag size={14} />
              Panier
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-white md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[200] bg-slate-950/60 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <motion.aside
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            transition={{
              duration: 0.35,
              ease: EASE,
            }}
            onClick={(event) => event.stopPropagation()}
            className="ml-auto flex h-full w-[88%] max-w-sm flex-col bg-white p-5 dark:bg-slate-950"
          >
            <div className="flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-black text-slate-950 dark:text-white"
              >
                MboaShop
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-10 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-black ${
                    item.href === "/contact"
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                  }`}
                >
                  {item.label}

                  <ArrowRight size={15} />
                </Link>
              ))}
            </nav>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="mt-auto flex min-h-13 items-center justify-center gap-2 rounded-xl bg-slate-950 text-xs font-black text-white dark:bg-blue-600"
            >
              <ShoppingBag size={16} />
              Voir mon panier
            </Link>
          </motion.aside>
        </motion.div>
      )}
    </>
  );
}

/* =========================================================
   CONTACT
========================================================= */

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = `
Bonjour MboaShop,

Nom : ${form.name}
Email : ${form.email}
Sujet : ${form.subject}

Message :
${form.message}
    `.trim();

    const url = `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");

    setSent(true);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Bonjour MboaShop, je souhaite obtenir des informations."
    );

    window.open(
      `${WHATSAPP_LINK}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">

      <ContactNavbar />

      <main className="overflow-hidden">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(14,165,233,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.2),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(14,165,233,0.1),transparent_30%)]" />

          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-20 top-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"
          />

          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-20 top-52 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.8fr]">

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
                  <MessageCircle
                    size={13}
                    className="text-blue-600 dark:text-blue-400"
                  />

                  <span className="text-[9px] font-black uppercase tracking-[2px] text-blue-600 dark:text-blue-400">
                    Contact MboaShop
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
                  Parlons de
                  <span className="block text-blue-600 dark:text-blue-400">
                    votre projet.
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
                  Une question sur un produit, une commande ou
                  l'expérience MboaShop ? Contactez-nous directement.
                  Nous privilégions une communication simple et rapide.
                </motion.p>

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
                    duration: 0.8,
                    delay: 0.4,
                  }}
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                >
                  <motion.button
                    type="button"
                    onClick={openWhatsApp}
                    whileHover={{
                      y: -3,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs font-black text-white shadow-xl shadow-blue-600/20 transition-colors hover:bg-blue-700"
                  >
                    <MessageCircle size={17} />
                    Écrire sur WhatsApp
                  </motion.button>

                  <Link
                    to="/all-products"
                    className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-black text-slate-700 transition-all hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/30 dark:hover:text-blue-400"
                  >
                    Voir la boutique
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>

              {/* Hero contact card */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: EASE,
                }}
                className="relative mx-auto w-full max-w-md"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -10, 0],
                        }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_35px_100px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_35px_100px_rgba(0,0,0,0.35)]"
                >
                  <div className="overflow-hidden rounded-[1.5rem] bg-slate-950 p-7 text-white sm:p-9">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
                        <MessageCircle size={20} />
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[8px] font-black uppercase tracking-[2px] text-white/50">
                        Let's talk
                      </span>
                    </div>

                    <h2 className="mt-12 text-4xl font-black leading-[0.9] tracking-[-0.05em] sm:text-5xl">
                      Une question ?
                    </h2>

                    <p className="mt-5 max-w-xs text-[11px] leading-6 text-white/40">
                      Le moyen le plus rapide de nous joindre reste
                      le contact direct via WhatsApp.
                    </p>

                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="mt-8 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 transition-all hover:border-blue-500/40 hover:bg-blue-500/10"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                          <MessageCircle size={14} />
                        </span>

                        <span className="text-[10px] font-black">
                          WhatsApp
                        </span>
                      </span>

                      <ArrowUpRight
                        size={15}
                        className="text-white/40"
                      />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTACT OPTIONS
        ====================================================== */}

        <section className="border-y border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="grid gap-3 md:grid-cols-3"
            >
              <motion.a
                variants={revealUp}
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  y: -5,
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <MessageCircle size={19} />
                </div>

                <p className="mt-5 text-[9px] font-black uppercase tracking-[2px] text-slate-400">
                  WhatsApp
                </p>

                <h3 className="mt-2 text-sm font-black text-slate-950 dark:text-white">
                  Contact direct
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                  Pour une réponse rapide et une discussion directe.
                </p>

                <div className="mt-5 flex items-center gap-2 text-[9px] font-black text-emerald-600 dark:text-emerald-400">
                  Ouvrir WhatsApp
                  <ArrowUpRight size={13} />
                </div>
              </motion.a>

              <motion.a
                variants={revealUp}
                href={`tel:+${WHATSAPP_NUMBER}`}
                whileHover={{
                  y: -5,
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Phone size={19} />
                </div>

                <p className="mt-5 text-[9px] font-black uppercase tracking-[2px] text-slate-400">
                  Téléphone
                </p>

                <h3 className="mt-2 text-sm font-black text-slate-950 dark:text-white">
                  Appel direct
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                  Utilisez le numéro associé à notre contact direct.
                </p>

                <div className="mt-5 flex items-center gap-2 text-[9px] font-black text-blue-600 dark:text-blue-400">
                  Appeler maintenant
                  <ArrowUpRight size={13} />
                </div>
              </motion.a>

              <motion.div
                variants={revealUp}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Clock3 size={19} />
                </div>

                <p className="mt-5 text-[9px] font-black uppercase tracking-[2px] text-slate-400">
                  Disponibilité
                </p>

                <h3 className="mt-2 text-sm font-black text-slate-950 dark:text-white">
                  Échange simple
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                  Pour une demande précise, privilégiez le message
                  avec toutes les informations utiles.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            FORM
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">

            <Reveal variants={revealLeft}>
              <div className="lg:sticky lg:top-28">
                <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600 dark:text-blue-400">
                  Envoyer un message
                </span>

                <h2 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl">
                  Dites-nous ce dont vous avez besoin.
                </h2>

                <p className="mt-6 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                  Remplissez le formulaire. Lorsque vous l'envoyez,
                  votre demande est préparée pour être transmise
                  directement via WhatsApp.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: ShieldCheck,
                      text: "Vos informations restent utilisées dans le cadre de votre demande.",
                    },
                    {
                      icon: Zap,
                      text: "Un message structuré facilite le traitement de votre demande.",
                    },
                    {
                      icon: Globe2,
                      text: "Une expérience de contact pensée pour le mobile.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.text}
                        className="flex gap-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          <Icon size={15} />
                        </div>

                        <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal variants={revealRight}>
              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50 sm:p-7 lg:p-8"
              >
                {sent && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
                      <Check size={15} />
                    </div>

                    <div>
                      <p className="text-xs font-black text-emerald-700 dark:text-emerald-400">
                        Message préparé
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-emerald-600/80 dark:text-emerald-400/70">
                        WhatsApp devrait s'être ouvert avec votre demande.
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-500 dark:text-slate-400"
                    >
                      Nom
                    </label>

                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      required
                      placeholder="Votre nom"
                      className="mt-2 h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-500 dark:text-slate-400"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={updateField}
                      required
                      placeholder="vous@exemple.com"
                      className="mt-2 h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
                    />
                  </div>

                  {/* Subject */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="subject"
                      className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-500 dark:text-slate-400"
                    >
                      Sujet
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={updateField}
                      required
                      placeholder="Objet de votre demande"
                      className="mt-2 h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
                    />
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-500 dark:text-slate-400"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={updateField}
                      required
                      rows={7}
                      placeholder="Expliquez-nous votre demande..."
                      className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-4 text-xs font-medium leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="mt-6 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs font-black text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
                >
                  Envoyer via WhatsApp
                  <Send size={15} />
                </motion.button>

                <p className="mt-4 text-center text-[9px] leading-5 text-slate-400 dark:text-slate-500">
                  Le bouton ouvre WhatsApp avec les informations
                  renseignées dans le formulaire.
                </p>
              </form>
            </Reveal>
          </div>
        </section>

        {/* =====================================================
            FAQ
        ====================================================== */}

        <section className="border-y border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

            <SectionHeader
              eyebrow="Questions fréquentes"
              title="Avant de nous écrire."
              description="Quelques réponses aux questions les plus naturelles concernant le contact et le parcours MboaShop."
            />

            <div className="mx-auto mt-12 max-w-4xl space-y-3">
              {[
                {
                  question: "Comment contacter MboaShop rapidement ?",
                  answer:
                    "Le moyen le plus direct disponible sur cette page est WhatsApp. Le bouton de contact ouvre directement une conversation.",
                },
                {
                  question: "Puis-je poser une question sur un produit ?",
                  answer:
                    "Oui. Vous pouvez préciser le nom du produit et votre question dans votre message afin de faciliter le traitement de votre demande.",
                },
                {
                  question: "Comment suivre une demande liée à une commande ?",
                  answer:
                    "Utilisez le contact direct et indiquez les informations disponibles concernant votre commande afin de faciliter son identification.",
                },
                {
                  question: "Puis-je contacter MboaShop depuis mon téléphone ?",
                  answer:
                    "Oui. La page est conçue en mobile-first et les actions de contact sont directement accessibles depuis un smartphone.",
                },
              ].map((item, index) => (
                <motion.details
                  key={item.question}
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
                  }}
                  transition={{
                    delay: index * 0.06,
                  }}
                  className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 transition-colors hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-black text-slate-950 dark:text-white">
                    {item.question}

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-transform duration-300 group-open:rotate-90 dark:bg-slate-800 dark:text-slate-400">
                      <ArrowRight size={13} />
                    </span>
                  </summary>

                  <p className="max-w-3xl pt-4 text-[11px] leading-6 text-slate-500 dark:text-slate-400">
                    {item.answer}
                  </p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 45,
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
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-14 text-center text-white sm:px-10 sm:py-20 dark:bg-black"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.3),transparent_45%)]" />

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

            <div className="relative z-10 mx-auto max-w-2xl">
              <Sparkles
                size={20}
                className="mx-auto text-blue-400"
              />

              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                Une question ?
                <br />
                Nous sommes à un message.
              </h2>

              <p className="mx-auto mt-5 max-w-lg text-xs leading-6 text-white/40 sm:text-sm">
                Utilisez WhatsApp pour nous envoyer votre demande
                directement.
              </p>

              <motion.button
                type="button"
                onClick={openWhatsApp}
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-xs font-black text-white shadow-xl shadow-blue-600/20 transition-colors hover:bg-blue-700"
              >
                <MessageCircle size={16} />
                Démarrer une conversation
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}