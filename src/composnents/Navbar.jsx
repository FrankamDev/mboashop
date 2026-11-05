import { useState, useEffect, useRef } from "react";

import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  ShoppingCart,
  X,
  ArrowDownWideNarrow,
  Tag,
  Sparkles,
  ArrowUpDown,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

import { useDarkMode } from "../DarkModeContext";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filterRef = useRef(null);

  const whatsappNumber = "237690372977";

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Boutique", href: "/all-products" },
    { name: "Catégories", href: "/all-products" },
    { name: "Promotions", href: "/all-products?sort=discount" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  /* ==============================
     FERMER LES MENUS
  ============================== */

  const closeMenus = () => {
    setMenuOpen(false);
    setFilterOpen(false);
  };

  /* ==============================
     FERMETURE EXTERIEURE + ESCAPE
  ============================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setFilterOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* ==============================
     BLOQUER LE SCROLL MENU MOBILE
  ============================== */

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  /* ==============================
     RECHERCHE
  ============================== */

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchValue.trim();

    if (!query) return;

    closeMenus();

    navigate(`/all-products?search=${encodeURIComponent(query)}`);
  };

  /* ==============================
     FILTRES
  ============================== */

  const applyFilter = (sort) => {
    closeMenus();

    navigate(`/all-products?sort=${sort}`);
  };

  /* ==============================
     WHATSAPP
  ============================== */

  const handleWhatsApp = () => {
    const message =
      "Bonjour MBOASHOP, je souhaite avoir des informations sur vos produits.";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        border-b border-slate-200/80
        bg-white/95
        backdrop-blur-xl
        transition-colors duration-300

        dark:border-slate-800
        dark:bg-slate-950/95
      "
    >
      {/* =========================================
          NAVIGATION PRINCIPALE
      ========================================= */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex h-[68px] items-center justify-between gap-3 lg:h-[82px]">

          {/* LOGO */}

          <Link
            to="/"
            onClick={closeMenus}
            className="flex shrink-0 items-center gap-2.5"
          >
            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl bg-blue-600
                shadow-lg shadow-blue-600/20
                transition-transform duration-300
                hover:scale-105
              "
            >
              <img
                src="/images/logo.png"
                alt="MboaShop"
                className="h-8 w-8 object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span
                className="
                  text-[19px] font-black tracking-tight
                  text-slate-950
                  dark:text-white
                  sm:text-xl
                "
              >
                MBOA<span className="text-blue-600">SHOP</span>
              </span>

              <span
                className="
                  -mt-0.5 text-[8px] font-bold tracking-[2.5px]
                  text-slate-400
                  dark:text-slate-500
                "
              >
                E-COMMERCE
              </span>
            </div>
          </Link>

          {/* NAVIGATION DESKTOP */}

          <nav className="hidden items-center gap-1 xl:flex">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="
                  rounded-xl px-3 py-2.5
                  text-[13px] font-semibold
                  text-slate-600
                  transition-all duration-200

                  hover:bg-blue-50
                  hover:text-blue-600

                  dark:text-slate-300
                  dark:hover:bg-slate-800
                  dark:hover:text-blue-400
                "
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

            {/* DARK MODE */}

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={
                darkMode
                  ? "Activer le mode clair"
                  : "Activer le mode sombre"
              }
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                border border-slate-200
                bg-white
                text-slate-700
                transition-all duration-200
                hover:border-blue-300
                hover:bg-blue-50
                hover:text-blue-600
                active:scale-95

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:border-slate-600
                dark:hover:bg-slate-800
                dark:hover:text-blue-400
              "
            >
              {darkMode ? (
                <Sun size={18} strokeWidth={2} />
              ) : (
                <Moon size={18} strokeWidth={2} />
              )}
            </button>

            {/* PANIER */}

            <Link
              to="/cart"
              aria-label={`Panier, ${cartCount} article(s)`}
              onClick={closeMenus}
              className="
                group relative flex h-10 w-10
                items-center justify-center
                rounded-xl
                text-slate-700
                transition-all duration-200

                hover:bg-blue-50
                hover:text-blue-600

                dark:text-slate-300
                dark:hover:bg-slate-800
                dark:hover:text-blue-400

                sm:h-11 sm:w-11
              "
            >
              <ShoppingCart
                size={21}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:-rotate-6"
              />

              {cartCount > 0 && (
                <span
                  className="
                    absolute -right-0.5 -top-0.5
                    flex h-[19px] min-w-[19px]
                    items-center justify-center
                    rounded-full
                    border-2 border-white
                    bg-blue-600
                    px-1
                    text-[9px] font-extrabold text-white

                    dark:border-slate-950
                  "
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* WHATSAPP */}

            <button
              type="button"
              onClick={handleWhatsApp}
              aria-label="Contacter MboaShop sur WhatsApp"
              className="
                flex h-10 items-center justify-center gap-2
                rounded-xl
                bg-emerald-50
                px-3
                text-emerald-700
                transition-all duration-200

                hover:bg-emerald-600
                hover:text-white
                active:scale-95

                dark:bg-emerald-950/50
                dark:text-emerald-400
                dark:hover:bg-emerald-600
                dark:hover:text-white

                sm:h-11 sm:px-4
              "
            >
              <FaWhatsapp size={19} />

              <span className="hidden text-xs font-bold sm:inline">
                Assistance
              </span>
            </button>

            {/* MENU MOBILE */}

            <button
              type="button"
              onClick={() => {
                setMenuOpen(true);
                setFilterOpen(false);
              }}
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={menuOpen}
              className="
                flex h-10 items-center gap-2
                rounded-xl
                border border-slate-200
                bg-white
                px-3
                text-slate-800
                transition-all

                hover:border-blue-200
                hover:bg-blue-50

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:border-slate-600
                dark:hover:bg-slate-800

                active:scale-95
                xl:hidden
              "
            >
              <Menu size={19} />
              <span className="text-xs font-bold">
                Menu
              </span>
            </button>

          </div>
        </div>

        {/* =========================================
            BARRE DE RECHERCHE
        ========================================= */}

        <div className="flex items-center gap-2 pb-3.5 lg:pb-4">

          <form
            onSubmit={handleSearch}
            className="min-w-0 flex-1"
          >
            <div
              className="
                group flex h-11 items-center gap-3
                rounded-xl
                border border-slate-200
                bg-slate-50/80
                px-3.5
                transition-all duration-200

                focus-within:border-blue-500
                focus-within:bg-white
                focus-within:ring-4
                focus-within:ring-blue-500/10

                dark:border-slate-700
                dark:bg-slate-900/80
                dark:focus-within:bg-slate-900

                sm:h-12 sm:px-4
              "
            >
              <Search
                size={19}
                className="
                  shrink-0
                  text-slate-400
                  transition-colors
                  group-focus-within:text-blue-600
                "
              />

              <input
                type="search"
                value={searchValue}
                onChange={(event) =>
                  setSearchValue(event.target.value)
                }
                placeholder="Rechercher un produit..."
                aria-label="Rechercher un produit"
                className="
                  w-full min-w-0
                  bg-transparent
                  text-sm font-medium
                  text-slate-800
                  outline-none
                  placeholder:text-slate-400

                  dark:text-slate-100
                  dark:placeholder:text-slate-500
                "
              />

              {searchValue && (
                <button
                  type="button"
                  onClick={() => setSearchValue("")}
                  aria-label="Effacer la recherche"
                  className="
                    shrink-0 rounded-full p-1
                    text-slate-400
                    hover:bg-slate-200
                    hover:text-slate-700

                    dark:hover:bg-slate-800
                    dark:hover:text-slate-200
                  "
                >
                  <X size={15} />
                </button>
              )}

              <button
                type="submit"
                disabled={!searchValue.trim()}
                aria-label="Rechercher"
                className="
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-blue-600
                  text-white
                  transition-all

                  hover:bg-blue-700
                  active:scale-95

                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <Search size={15} />
              </button>
            </div>
          </form>

          {/* FILTRES */}

          <div
            ref={filterRef}
            className="relative shrink-0"
          >
            <button
              type="button"
              onClick={() => {
                setFilterOpen(!filterOpen);
                setMenuOpen(false);
              }}
              aria-label="Filtrer les produits"
              aria-expanded={filterOpen}
              className={`
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                border
                transition-all duration-200
                sm:h-12 sm:w-12

                ${
                  filterOpen
                    ? "border-blue-600 bg-blue-600 text-white"
                    : `
                      border-slate-200
                      bg-white
                      text-slate-700
                      hover:border-blue-300
                      hover:bg-blue-50
                      hover:text-blue-600

                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-slate-300
                      dark:hover:border-blue-500
                      dark:hover:bg-slate-800
                      dark:hover:text-blue-400
                    `
                }
              `}
            >
              {filterOpen ? (
                <X size={19} />
              ) : (
                <SlidersHorizontal size={19} />
              )}
            </button>

            {/* PANNEAU FILTRES */}

            {filterOpen && (
              <div
                className="
                  absolute right-0 top-[calc(100%+12px)]
                  z-[70]
                  w-[min(320px,calc(100vw-32px))]
                  origin-top-right
                  animate-in fade-in slide-in-from-top-2
                  duration-200
                "
              >
                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    shadow-2xl
                    shadow-slate-900/10

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:shadow-black/40
                  "
                >
                  <div
                    className="
                      border-b border-slate-100
                      px-5 py-4

                      dark:border-slate-800
                    "
                  >
                    <div className="flex items-center gap-2">

                      <div
                        className="
                          flex h-9 w-9
                          items-center justify-center
                          rounded-xl
                          bg-blue-50
                          text-blue-600

                          dark:bg-blue-950/50
                          dark:text-blue-400
                        "
                      >
                        <SlidersHorizontal size={18} />
                      </div>

                      <div>
                        <h3
                          className="
                            text-sm font-extrabold
                            text-slate-900

                            dark:text-white
                          "
                        >
                          Filtrer les produits
                        </h3>

                        <p
                          className="
                            mt-0.5 text-[11px]
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          Organisez votre catalogue.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="space-y-1 p-2.5">

                    <p
                      className="
                        px-3 pb-1 pt-2
                        text-[10px] font-extrabold
                        uppercase tracking-wider
                        text-slate-400
                      "
                    >
                      Trier par
                    </p>

                    <button
                      type="button"
                      onClick={() => applyFilter("price-asc")}
                      className="
                        group flex w-full
                        items-center gap-3
                        rounded-xl p-3
                        text-left
                        transition-colors

                        hover:bg-blue-50

                        dark:hover:bg-slate-800
                      "
                    >
                      <span
                        className="
                          flex h-9 w-9
                          items-center justify-center
                          rounded-xl
                          bg-blue-50
                          text-blue-600
                          group-hover:bg-white

                          dark:bg-blue-950/50
                          dark:text-blue-400
                          dark:group-hover:bg-slate-900
                        "
                      >
                        <ArrowDownWideNarrow size={18} />
                      </span>

                      <span>
                        <span
                          className="
                            block text-xs font-bold
                            text-slate-800

                            dark:text-slate-100
                          "
                        >
                          Prix croissant
                        </span>

                        <span
                          className="
                            text-[11px]
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          Du moins cher au plus cher
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => applyFilter("price-desc")}
                      className="
                        group flex w-full
                        items-center gap-3
                        rounded-xl p-3
                        text-left
                        transition-colors

                        hover:bg-purple-50

                        dark:hover:bg-slate-800
                      "
                    >
                      <span
                        className="
                          flex h-9 w-9
                          items-center justify-center
                          rounded-xl
                          bg-purple-50
                          text-purple-600
                          group-hover:bg-white

                          dark:bg-purple-950/50
                          dark:text-purple-400
                          dark:group-hover:bg-slate-900
                        "
                      >
                        <ArrowUpDown size={18} />
                      </span>

                      <span>
                        <span
                          className="
                            block text-xs font-bold
                            text-slate-800

                            dark:text-slate-100
                          "
                        >
                          Prix décroissant
                        </span>

                        <span
                          className="
                            text-[11px]
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          Du plus cher au moins cher
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => applyFilter("discount")}
                      className="
                        group flex w-full
                        items-center gap-3
                        rounded-xl p-3
                        text-left
                        transition-colors

                        hover:bg-amber-50

                        dark:hover:bg-slate-800
                      "
                    >
                      <span
                        className="
                          flex h-9 w-9
                          items-center justify-center
                          rounded-xl
                          bg-amber-50
                          text-amber-600
                          group-hover:bg-white

                          dark:bg-amber-950/50
                          dark:text-amber-400
                          dark:group-hover:bg-slate-900
                        "
                      >
                        <Tag size={18} />
                      </span>

                      <span>
                        <span
                          className="
                            block text-xs font-bold
                            text-slate-800

                            dark:text-slate-100
                          "
                        >
                          Promotions
                        </span>

                        <span
                          className="
                            text-[11px]
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          Les produits en réduction
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => applyFilter("newest")}
                      className="
                        group flex w-full
                        items-center gap-3
                        rounded-xl p-3
                        text-left
                        transition-colors

                        hover:bg-emerald-50

                        dark:hover:bg-slate-800
                      "
                    >
                      <span
                        className="
                          flex h-9 w-9
                          items-center justify-center
                          rounded-xl
                          bg-emerald-50
                          text-emerald-600
                          group-hover:bg-white

                          dark:bg-emerald-950/50
                          dark:text-emerald-400
                          dark:group-hover:bg-slate-900
                        "
                      >
                        <Sparkles size={18} />
                      </span>

                      <span>
                        <span
                          className="
                            block text-xs font-bold
                            text-slate-800

                            dark:text-slate-100
                          "
                        >
                          Nouveautés
                        </span>

                        <span
                          className="
                            text-[11px]
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          Les derniers produits ajoutés
                        </span>
                      </span>
                    </button>

                    <div
                      className="
                        border-t border-slate-100 pt-2
                        dark:border-slate-800
                      "
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setFilterOpen(false);
                          navigate("/all-products");
                        }}
                        className="
                          flex min-h-11 w-full
                          items-center justify-center gap-2
                          rounded-xl
                          bg-slate-100
                          px-4
                          text-xs font-bold
                          text-slate-700
                          transition-colors

                          hover:bg-slate-200

                          dark:bg-slate-800
                          dark:text-slate-200
                          dark:hover:bg-slate-700
                        "
                      >
                        Voir tous les produits
                        <ChevronRight size={15} />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================
          MENU LATÉRAL MOBILE
      ========================================= */}

      {/* OVERLAY */}

      <div
        onClick={closeMenus}
        aria-hidden="true"
        className={`
          fixed inset-0 z-[90]
          bg-slate-950/40
          backdrop-blur-[2px]
          transition-opacity duration-300
          xl:hidden

          ${
            menuOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }
        `}
      />

      {/* PANNEAU */}

      <aside
        aria-label="Menu de navigation"
        aria-hidden={!menuOpen}
        className={`
          fixed left-0 top-0 z-[100]
          flex h-dvh
          w-[min(340px,85vw)]
          flex-col

          bg-white
          shadow-2xl

          transition-transform duration-300 ease-out
          xl:hidden

          dark:bg-slate-950

          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full pointer-events-none"
          }
        `}
      >
        {/* HEADER MENU */}

        <div
          className="
            flex h-[76px]
            shrink-0
            items-center justify-between
            border-b border-slate-100
            px-5

            dark:border-slate-800
          "
        >
          <Link
            to="/"
            onClick={closeMenus}
            tabIndex={menuOpen ? 0 : -1}
            className="flex items-center gap-2"
          >
            <img
              src="/images/logo.png"
              alt="MboaShop"
              className="h-9 w-9 object-contain"
            />

            <span
              className="
                text-lg font-black
                text-slate-950

                dark:text-white
              "
            >
              MBOA<span className="text-blue-600">SHOP</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={closeMenus}
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Fermer le menu"
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-slate-100
              text-slate-600
              transition-colors

              hover:bg-rose-50
              hover:text-rose-600

              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:bg-rose-950/40
              dark:hover:text-rose-400
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* CONTENU */}

        <div className="flex-1 overflow-y-auto px-4 py-6">

          <p
            className="
              mb-3 px-3
              text-[10px] font-extrabold
              uppercase tracking-[2px]
              text-slate-400
            "
          >
            Navigation principale
          </p>

          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeMenus}
                tabIndex={menuOpen ? 0 : -1}
                className="
                  group flex min-h-12
                  items-center justify-between
                  rounded-xl
                  px-3.5
                  text-sm font-semibold
                  text-slate-700
                  transition-all duration-200

                  hover:bg-blue-50
                  hover:text-blue-600

                  dark:text-slate-300
                  dark:hover:bg-slate-800
                  dark:hover:text-blue-400

                  active:scale-[0.98]
                "
              >
                {link.name}

                <ChevronRight
                  size={17}
                  className="
                    text-slate-400
                    transition-transform
                    group-hover:translate-x-1
                    group-hover:text-blue-600

                    dark:text-slate-600
                    dark:group-hover:text-blue-400
                  "
                />
              </Link>
            ))}
          </nav>

          <div
            className="
              my-6 border-t border-slate-100
              dark:border-slate-800
            "
          />

          <p
            className="
              mb-3 px-3
              text-[10px] font-extrabold
              uppercase tracking-[2px]
              text-slate-400
            "
          >
            Mon espace
          </p>

          <Link
            to="/cart"
            onClick={closeMenus}
            tabIndex={menuOpen ? 0 : -1}
            className="
              flex min-h-12
              items-center justify-between
              rounded-xl
              bg-blue-50
              px-3.5
              text-sm font-bold
              text-blue-700
              transition-colors

              hover:bg-blue-100

              dark:bg-blue-950/50
              dark:text-blue-400
              dark:hover:bg-blue-950
            "
          >
            <span className="flex items-center gap-3">
              <ShoppingCart size={19} />
              Mon panier
            </span>

            <span
              className="
                rounded-full
                bg-blue-600
                px-2.5 py-1
                text-[10px] font-extrabold
                text-white
              "
            >
              {cartCount}
            </span>
          </Link>

          {/* MODE SOMBRE */}

          <button
            type="button"
            onClick={toggleDarkMode}
            tabIndex={menuOpen ? 0 : -1}
            className="
              mt-3 flex min-h-12
              w-full items-center justify-between
              rounded-xl
              border border-slate-200
              bg-white
              px-3.5
              text-sm font-bold
              text-slate-700
              transition-all

              hover:bg-slate-100

              dark:border-slate-800
              dark:bg-slate-900
              dark:text-slate-200
              dark:hover:bg-slate-800
            "
          >
            <span className="flex items-center gap-3">
              {darkMode ? (
                <Sun size={19} className="text-amber-400" />
              ) : (
                <Moon size={19} className="text-blue-600" />
              )}

              {darkMode
                ? "Mode clair"
                : "Mode sombre"}
            </span>

            <span
              className="
                rounded-full
                bg-slate-100
                px-2 py-1
                text-[9px]
                text-slate-500

                dark:bg-slate-800
                dark:text-slate-400
              "
            >
              {darkMode ? "ON" : "OFF"}
            </span>
          </button>
        </div>

        {/* FOOTER MENU */}

        <div
          className="
            shrink-0
            border-t border-slate-100
            bg-white
            p-4

            dark:border-slate-800
            dark:bg-slate-950
          "
        >
          <button
            type="button"
            onClick={() => {
              closeMenus();
              handleWhatsApp();
            }}
            tabIndex={menuOpen ? 0 : -1}
            className="
              flex min-h-12
              w-full items-center justify-center gap-2
              rounded-xl
              bg-emerald-600
              px-4
              text-sm font-bold
              text-white
              transition-all

              hover:bg-emerald-700
              active:scale-[0.98]
            "
          >
            <FaWhatsapp size={20} />
            Contacter MboaShop
          </button>

          <p
            className="
              mt-3 text-center
              text-[10px] font-medium
              text-slate-400
            "
          >
            MBOASHOP · Votre boutique en ligne
          </p>
        </div>
      </aside>
    </header>
  );
}