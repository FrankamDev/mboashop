

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Accueil", href: "/home" },
    { name: "Boutique", href: "/products" },
    { name: "Catégories", href: "/categories" },
    { name: "Promotions", href: "/offers" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const whatsappNumber = "237690372977";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">

      {/* HEADER PRINCIPAL */}
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* BURGER MENU */}
        <button
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
        <a
          href="#home"
          className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center"
        >
          <div className="flex items-center gap-1.5">

            <img
              src="./images/ecommerce.jpg"
              alt="MBOASHOP"
              className="h-9 w-9 object-contain"
            />

            <span className="whitespace-nowrap text-lg font-black tracking-tight text-gray-900 sm:text-xl">
              MBOA<span className="text-blue-700">SHOP</span>
            </span>

          </div>

          <span className="mt-[-2px] ml-10 text-[10px] font-bold tracking-[2px] text-gray-500 sm:text-[9px]">
            E-commerce
          </span>
        </a>

        {/* WHATSAPP */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "Bonjour MBOASHOP, je souhaite avoir des informations sur vos produits."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter MBOASHOP sur WhatsApp"
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-[#25D366] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#25D366] hover:text-white hover:shadow-lg hover:shadow-green-200"
        >
          <FaWhatsapp size={25} />
        </a>

      </div>

      {/* BARRE DE RECHERCHE */}
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 pb-3 sm:px-6">

        <div className="flex h-11 flex-1 items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 transition-all duration-300 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-md focus-within:shadow-blue-100">

          <Search size={19} className="shrink-0 text-gray-500" />

          <input
            type="search"
            placeholder="Rechercher un produit..."
            className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />

        </div>

        <button
          aria-label="Filtrer les produits"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
        >
          <SlidersHorizontal size={19} />
        </button>

      </div>

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
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                transitionDelay: menuOpen ? `${index * 45}ms` : "0ms"
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
            </a>
          ))}

          <div className="mt-3 border-t border-gray-100 pt-3">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
            >
              <FaWhatsapp size={23} />
              Besoin d'aide ? Contactez-nous
            </a>
          </div>

        </nav>
      </div>

    </header>
  );
}
