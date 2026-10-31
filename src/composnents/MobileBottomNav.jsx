
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  House,
  Store,
  Search,
  ShoppingBag,
  X,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function MobileBottomNav() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchValue.trim();
    if (!query) return;

    setSearchOpen(false);
    setSearchValue("");

    navigate(`/all-products?search=${encodeURIComponent(query)}`);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchValue("");
  };

  const navItems = [
    {
      label: "Accueil",
      path: "/",
      icon: House,
      end: true,
    },
    {
      label: "Boutique",
      path: "/all-products",
      icon: Store,
    },
    {
      label: "Recherche",
      action: true,
      icon: Search,
    },
    {
      label: "Panier",
      path: "/cart",
      icon: ShoppingBag,
    },
  ];

  return (
    <>
      {/* PANNEAU DE RECHERCHE */}
      <div
        className={`fixed inset-x-0 bottom-[76px] z-[70] px-4 transition-all duration-300 md:hidden ${
          searchOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-5 opacity-0 pointer-events-none"
        }`}
      >
        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-lg items-center gap-2 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl shadow-gray-900/15"
        >
          <div className="flex h-11 flex-1 items-center gap-2 rounded-xl bg-gray-50 px-3">
            <Search size={19} className="shrink-0 text-blue-600" />

            <input
              type="search"
              autoFocus={searchOpen}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Que recherchez-vous ?"
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={!searchValue.trim()}
            aria-label="Rechercher"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white transition hover:bg-blue-800 active:scale-95 disabled:opacity-40"
          >
            <ArrowRight size={19} />
          </button>

          <button
            type="button"
            onClick={closeSearch}
            aria-label="Fermer la recherche"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </form>
      </div>

      {/* FOND DU PANNEAU */}
      <button
        type="button"
        aria-label="Fermer la recherche"
        onClick={closeSearch}
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          searchOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* BARRE DE NAVIGATION */}
      <nav className="fixed bottom-0 left-0 z-[80] w-full border-t border-gray-100 bg-white/95 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex h-[72px] max-w-lg items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">

          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.action) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Ouvrir la recherche"
                  aria-expanded={searchOpen}
                  className={`group relative flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-all duration-300 ${
                    searchOpen ? "text-blue-700" : "text-gray-400"
                  }`}
                >
                  <span
                    className={`flex h-9 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                      searchOpen
                        ? "scale-105 bg-blue-50"
                        : "group-active:scale-90"
                    }`}
                  >
                    {searchOpen ? <X size={21} /> : <Icon size={21} />}
                  </span>

                  <span className="text-[10px] font-semibold">
                    Recherche
                  </span>

                  {searchOpen && (
                    <span className="absolute top-0 h-[3px] w-7 rounded-full bg-blue-600" />
                  )}
                </button>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.end}
                onClick={() => setSearchOpen(false)}
                className={({ isActive }) =>
                  `group relative flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-all duration-300 ${
                    isActive ? "text-blue-700" : "text-gray-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`relative flex h-9 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "scale-105 bg-blue-50"
                          : "group-active:scale-90"
                      }`}
                    >
                      <Icon size={21} />

                      {item.label === "Panier" && cartCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                          {cartCount > 99 ? "99+" : cartCount}
                        </span>
                      )}
                    </span>

                    <span className="text-[10px] font-semibold">
                      {item.label}
                    </span>

                    {isActive && (
                      <span className="absolute top-0 h-[3px] w-7 rounded-full bg-blue-600" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
