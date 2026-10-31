
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
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-xl">

      {/* HEADER PRINCIPAL */}
      <div className="relative mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* MENU BURGER */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setFilterOpen(false);
          }}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          className="group flex items-center gap-2.5 rounded-lg py-2 pr-2"
        >
          <div className="relative flex h-5 w-6 flex-col justify-center gap-[5px]">
            <span
              className={`h-[2px] w-6 rounded-full bg-gray-800 transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />

            <span
              className={`h-[2px] rounded-full bg-gray-800 transition-all duration-300 ${
                menuOpen ? "w-0 opacity-0" : "w-4"
              }`}
            />

            <span
              className={`h-[2px] w-6 rounded-full bg-gray-800 transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>

          <span className="text-[11px] font-extrabold tracking-[2px] text-gray-800 transition-colors group-hover:text-blue-700">
            MENU
          </span>
        </button>

        {/* LOGO */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center"
        >
          <div className="flex items-center gap-1.5">
            <img
              src="/images/ecommerce.jpg"
              alt="MBOASHOP"
              className="h-9 w-9 object-contain"
            />

            <span className="whitespace-nowrap text-lg font-black tracking-tight text-gray-900 sm:text-xl">
              MBOA<span className="text-blue-700">SHOP</span>
            </span>
          </div>

          <span className="mt-[-2px] ml-10 text-[9px] font-bold tracking-[2px] text-gray-500">
            E-COMMERCE
          </span>
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">

          <Link
            to="/cart"
            aria-label={`Panier, ${cartCount} article(s)`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-800 transition duration-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <ShoppingCart size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 animate-in zoom-in items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={handleWhatsApp}
            aria-label="Contacter MBOASHOP sur WhatsApp"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-[#25D366] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#25D366] hover:text-white hover:shadow-lg hover:shadow-green-200"
          >
            <FaWhatsapp size={24} />
          </button>
        </div>
      </div>

      {/* RECHERCHE ET FILTRES */}
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 pb-3 sm:px-6">

        <form onSubmit={handleSearch} className="flex min-w-0 flex-1">
          <div className="group flex h-12 w-full items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 transition-all duration-300 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-blue-100/70">
            <Search
              size={19}
              className="shrink-0 text-gray-400 transition-colors group-focus-within:text-blue-600"
            />

            <input
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Rechercher un produit..."
              aria-label="Rechercher un produit"
              className="w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />

            {searchValue && (
              <button
                type="button"
                onClick={() => setSearchValue("")}
                aria-label="Effacer la recherche"
                className="shrink-0 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-800"
              >
                <X size={16} />
              </button>
            )}

            <button
              type="submit"
              disabled={!searchValue.trim()}
              aria-label="Lancer la recherche"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Search size={15} />
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
            className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 active:scale-95 ${
              filterOpen
                ? "border-blue-700 bg-blue-700 text-white shadow-lg shadow-blue-200"
                : "border-gray-200 bg-white text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            {filterOpen ? <X size={20} /> : <SlidersHorizontal size={20} />}
          </button>

          {/* PANNEAU DE FILTRAGE */}
          <div
            className={`absolute right-0 top-[calc(100%+12px)] z-[60] w-[min(320px,calc(100vw-32px))] origin-top-right transition-all duration-300 ${
              filterOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible -translate-y-3 scale-95 opacity-0"
            }`}
          >
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/10">

              <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-4 text-white">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={19} />
                  <h3 className="font-bold">Filtrer les produits</h3>
                </div>
                <p className="mt-1 text-xs text-blue-100">
                  Trouvez rapidement ce que vous recherchez.
                </p>
              </div>

              <div className="space-y-2 p-3">

                <p className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
                  Trier les produits
                </p>

                <button
                  onClick={() => applyFilter("price-asc")}
                  className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:translate-x-1 hover:bg-blue-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
                    <ArrowDownWideNarrow size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-800">
                      Prix croissant
                    </span>
                    <span className="text-xs text-gray-400">
                      Du moins cher au plus cher
                    </span>
                  </span>
                </button>

                <button
                  onClick={() => applyFilter("price-desc")}
                  className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:translate-x-1 hover:bg-blue-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                    <ArrowUpDown size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-800">
                      Prix décroissant
                    </span>
                    <span className="text-xs text-gray-400">
                      Du plus cher au moins cher
                    </span>
                  </span>
                </button>

                <button
                  onClick={() => applyFilter("discount")}
                  className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:translate-x-1 hover:bg-orange-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    <Tag size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-800">
                      Promotions
                    </span>
                    <span className="text-xs text-gray-400">
                      Voir les produits en réduction
                    </span>
                  </span>
                </button>

                <button
                  onClick={() => applyFilter("newest")}
                  className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:translate-x-1 hover:bg-emerald-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Sparkles size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-800">
                      Nouveautés
                    </span>
                    <span className="text-xs text-gray-400">
                      Découvrir les derniers produits
                    </span>
                  </span>
                </button>

                <div className="border-t border-gray-100 pt-3">
                  <button
                    onClick={() => {
                      setFilterOpen(false);
                      navigate("/all-products");
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-200"
                  >
                    Voir tous les produits
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MENU DÉROULANT */}
      <div
        className={`absolute left-0 top-full w-full overflow-hidden border-t border-gray-100 bg-white shadow-xl transition-all duration-300 ease-in-out ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[2px] text-gray-400">
            NAVIGATION
          </p>

          {links.map((link, index) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                transitionDelay: menuOpen ? `${index * 45}ms` : "0ms",
              }}
              className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:translate-x-1 hover:bg-blue-50 hover:text-blue-700 ${
                menuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0"
              }`}
            >
              {link.name}
              <ChevronRight
                size={17}
                className="text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-700"
              />
            </Link>
          ))}

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700"
          >
            <span className="flex items-center gap-3">
              <ShoppingCart size={18} />
              Mon panier
            </span>
            <span className="rounded-full bg-blue-600 px-2 py-1 text-[10px] text-white">
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
              className="flex w-full items-center gap-3 rounded-xl bg-green-50 p-3 text-left text-sm font-semibold text-green-700 transition hover:bg-green-100"
            >
              <FaWhatsapp size={23} />
              Besoin d'aide ? Contactez-nous
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
