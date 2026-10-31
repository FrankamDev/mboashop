
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  ShoppingCart,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const whatsappNumber = "237690372977";

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Boutique", href: "/all-products" },
    { name: "Catégories", href: "/all-products" },
    { name: "Promotions", href: "/all-products?sort=discount" },
    { name: "À propos", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchValue.trim();

    if (!query) return;

    navigate(`/all-products?search=${encodeURIComponent(query)}`);
    setMenuOpen(false);
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
    <header className="sticky z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">

      {/* HEADER PRINCIPAL */}
      <div className="relative mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* BURGER MENU */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
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

        {/* LOGO ET SLOGAN */}
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

        {/* ACTIONS À DROITE */}
        <div className="flex items-center gap-2">

          {/* PANIER */}
          <Link
            to="/cart"
            aria-label={`Panier, ${cartCount} article(s)`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
          >
            <ShoppingCart size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* WHATSAPP */}
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

      {/* BARRE DE RECHERCHE */}
      <form
        onSubmit={handleSearch}
        className="mx-auto flex max-w-7xl items-center gap-2 px-4 pb-3 sm:px-6"
      >
        <div className="flex h-11 flex-1 items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 transition-all duration-300 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-md focus-within:shadow-blue-100">
          <Search size={19} className="shrink-0 text-gray-500" />

          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />

          {searchValue && (
            <button
              type="button"
              onClick={() => setSearchValue("")}
              aria-label="Effacer la recherche"
              className="text-gray-400 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate("/all-products")}
          aria-label="Voir les produits et leurs filtres"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
        >
          <SlidersHorizontal size={19} />
        </button>
      </form>

      {/* MENU DÉROULANT ANIMÉ */}
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

          {/* LIEN PANIER */}
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

          {/* WHATSAPP */}
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
