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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

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

  // Fermer le panneau en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Recherche
  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchValue.trim();

    if (!query) return;

    setFilterOpen(false);
    setMenuOpen(false);

    navigate(`/all-products?search=${encodeURIComponent(query)}`);
  };

  // Appliquer un tri ou un filtre
  const applyFilter = (sort) => {
    setFilterOpen(false);
    setMenuOpen(false);

    navigate(`/all-products?sort=${sort}`);
  };

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
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      {/* HEADER PRINCIPAL */}
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-3.5 sm:h-20 sm:px-6">
        {/* MENU BURGER */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setFilterOpen(false);
          }}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          className="group flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-gray-100/80 active:scale-95"
        >
          <div className="relative flex h-5 w-5 flex-col justify-center gap-[5px]">
            <span
              className={`h-[2px] w-5 rounded-full bg-gray-900 transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] rounded-full bg-gray-900 transition-all duration-300 ${
                menuOpen ? "w-0 opacity-0" : "w-3.5"
              }`}
            />
            <span
              className={`h-[2px] w-5 rounded-full bg-gray-900 transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>

          <span className="hidden text-xs font-black tracking-widest text-gray-900 transition-colors group-hover:text-blue-600 sm:inline-block">
            MENU
          </span>
        </button>

        {/* LOGO */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group absolute left-1/2 flex -translate-x-1/2 flex-col items-center"
        >
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="MBOASHOP"
              className="h-8 w-8 object-contain transition-transform group-hover:scale-105 sm:h-9 sm:w-9"
            />
            <span className="whitespace-nowrap text-lg font-black tracking-tight text-gray-950 sm:text-xl">
              MBOA<span className="text-blue-600">SHOP</span>
            </span>
          </div>
          <span className="-mt-1 text-[8px] font-bold tracking-[2.5px] text-gray-400 sm:text-[9px]">
            E-COMMERCE
          </span>
        </Link>

        {/* ACTIONS (PANIER & WHATSAPP) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* PANIER */}
          <Link
            to="/cart"
            aria-label={`Panier, ${cartCount} article(s)`}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl text-gray-800 transition-all hover:bg-blue-50 hover:text-blue-600 active:scale-95"
          >
            <ShoppingCart size={21} />
            {cartCount > 0 && (
              <span className="absolute right-1 top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-extrabold text-white shadow-md shadow-blue-500/30">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* WHATSAPP */}
          <button
            type="button"
            onClick={handleWhatsApp}
            aria-label="Contacter MBOASHOP sur WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95"
          >
            <FaWhatsapp size={22} />
          </button>
        </div>
      </div>

      {/* BARRE DE RECHERCHE ET FILTRES */}
      <div className="mx-auto flex max-w-7xl items-center gap-2.5 px-3.5 pb-3 sm:px-6">
        <form onSubmit={handleSearch} className="flex min-w-0 flex-1">
          <div className="group flex h-11 w-full items-center gap-2.5 rounded-2xl border border-gray-200 bg-gray-50/80 px-3.5 shadow-xs transition-all duration-300 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
            <Search
              size={18}
              className="shrink-0 text-gray-400 transition-colors group-focus-within:text-blue-600"
            />
            <input
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Rechercher un produit..."
              aria-label="Rechercher un produit"
              className="w-full min-w-0 bg-transparent text-xs font-medium text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => setSearchValue("")}
                aria-label="Effacer la recherche"
                className="shrink-0 rounded-full p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
              >
                <X size={15} />
              </button>
            )}
            <button
              type="submit"
              disabled={!searchValue.trim()}
              aria-label="Lancer la recherche"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Search size={14} />
            </button>
          </div>
        </form>

        {/* BOUTON FILTRE */}
        <div ref={filterRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setFilterOpen(!filterOpen);
              setMenuOpen(false);
            }}
            aria-label="Ouvrir les filtres"
            aria-expanded={filterOpen}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 active:scale-95 ${
              filterOpen
                ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {filterOpen ? <X size={19} /> : <SlidersHorizontal size={19} />}
          </button>

          {/* PANNEAU DE FILTRAGE */}
          <div
            className={`absolute right-0 top-[calc(100%+10px)] z-[60] w-[min(320px,calc(100vw-28px))] origin-top-right transition-all duration-300 ${
              filterOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible -translate-y-2 scale-95 opacity-0"
            }`}
          >
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/15">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 text-white">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  <h3 className="text-sm font-extrabold">Filtrer les produits</h3>
                </div>
                <p className="mt-1 text-xs text-blue-100/90">
                  Trouvez rapidement ce que vous recherchez.
                </p>
              </div>

              <div className="space-y-1 p-2.5">
                <p className="px-3 pb-1 pt-2 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Trier les produits
                </p>

                <button
                  onClick={() => applyFilter("price-asc")}
                  className="group flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-all hover:bg-blue-50/80 active:scale-[0.99]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                    <ArrowDownWideNarrow size={18} />
                  </span>
                  <div>
                    <span className="block text-xs font-bold text-gray-900">
                      Prix croissant
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Du moins cher au plus cher
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => applyFilter("price-desc")}
                  className="group flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-all hover:bg-purple-50/80 active:scale-[0.99]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-100">
                    <ArrowUpDown size={18} />
                  </span>
                  <div>
                    <span className="block text-xs font-bold text-gray-900">
                      Prix décroissant
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Du plus cher au moins cher
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => applyFilter("discount")}
                  className="group flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-all hover:bg-amber-50/80 active:scale-[0.99]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
                    <Tag size={18} />
                  </span>
                  <div>
                    <span className="block text-xs font-bold text-gray-900">
                      Promotions
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Voir les produits en réduction
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => applyFilter("newest")}
                  className="group flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-all hover:bg-emerald-50/80 active:scale-[0.99]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                    <Sparkles size={18} />
                  </span>
                  <div>
                    <span className="block text-xs font-bold text-gray-900">
                      Nouveautés
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Découvrir les derniers produits
                    </span>
                  </div>
                </button>

                <div className="border-t border-gray-100 pt-2">
                  <button
                    onClick={() => {
                      setFilterOpen(false);
                      navigate("/all-products");
                    }}
                    className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-2xl bg-gray-100 px-4 text-xs font-bold text-gray-800 transition-all hover:bg-gray-200 active:scale-95"
                  >
                    <span>Voir tous les produits</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MENU DÉROULANT (BURGER OVERLAY) */}
      <div
        className={`absolute left-0 top-full w-full overflow-hidden border-t border-gray-100 bg-white/98 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-in-out ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-3.5 py-4 sm:px-6">
          <p className="mb-2.5 px-3 text-[10px] font-black tracking-widest text-gray-400">
            NAVIGATION
          </p>

          <div className="space-y-1">
            {links.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  transitionDelay: menuOpen ? `${index * 35}ms` : "0ms",
                }}
                className={`group flex min-h-[44px] items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-800 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.99] sm:text-sm ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-2 opacity-0"
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight
                  size={16}
                  className="text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </Link>
            ))}
          </div>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex min-h-[46px] items-center justify-between rounded-2xl bg-blue-50/80 px-4 py-3 text-xs font-bold text-blue-700 transition-all hover:bg-blue-100 active:scale-[0.99] sm:text-sm"
          >
            <span className="flex items-center gap-2.5">
              <ShoppingCart size={18} />
              <span>Mon panier</span>
            </span>
            <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-xs">
              {cartCount}
            </span>
          </Link>

          <div className="mt-3 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                handleWhatsApp();
              }}
              className="flex min-h-[46px] w-full items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-left text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-100 active:scale-[0.99] sm:text-sm"
            >
              <FaWhatsapp size={20} />
              <span>Besoin d'aide ? Contactez-nous sur WhatsApp</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}