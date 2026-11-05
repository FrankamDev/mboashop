import { useMemo, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

import {
  House,
  Store,
  Search,
  ShoppingBag,
  X,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { products } from "../data/products";

const normalize = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("fr-FR")} FCFA`;

export default function MobileBottomNav() {
  const { cartCount } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const results = useMemo(() => {
    const query = normalize(searchValue);

    if (!query) return [];

    return products
      .filter((product) => {
        if (product.isPublished === false) return false;

        const searchableText = normalize(
          [
            product.name,
            product.category,
            product.shortDescription,
            product.description,
            ...(product.tags || []),
          ].join(" ")
        );

        return searchableText.includes(query);
      })
      .slice(0, 6);
  }, [searchValue]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchValue("");
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navItems = [
    { label: "Accueil", path: "/", icon: House, end: true },
    { label: "Boutique", path: "/all-products", icon: Store },
    { label: "Recherche", action: true, icon: Search },
    { label: "Panier", path: "/cart", icon: ShoppingBag },
  ];

  return (
    <>
      {/* RECHERCHE INSTANTANÉE */}
      <div
        role="search"
        aria-hidden={!searchOpen}
        className={`fixed inset-x-0 bottom-[calc(82px+env(safe-area-inset-bottom))] z-[70] px-3 transition-all duration-300 md:hidden ${
          searchOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none translate-y-5 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-lg overflow-hidden rounded-[20px] border border-slate-100 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.14)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_16px_50px_rgba(0,0,0,0.45)]">

          {/* CHAMP DE RECHERCHE */}
          <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 dark:border-slate-800">
            <Search
              size={19}
              strokeWidth={2}
              className="shrink-0 text-blue-600"
            />

            <input
              type="search"
              autoFocus={searchOpen}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Rechercher un produit..."
              className="min-w-0 flex-1 bg-transparent text-[13px] font-medium tracking-[-0.01em] text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
            />

            {searchValue && (
              <button
                type="button"
                onClick={() => setSearchValue("")}
                aria-label="Effacer la recherche"
                className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            )}

            <button
              type="button"
              onClick={closeSearch}
              aria-label="Fermer la recherche"
              className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>

          {/* RÉSULTATS */}
          <div className="max-h-[55vh] overflow-y-auto p-3">
            {!searchValue.trim() ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800">
                  <Search size={21} className="text-slate-400" />
                </div>

                <p className="text-[13px] font-semibold tracking-[-0.02em] text-slate-800 dark:text-white">
                  Que recherchez-vous ?
                </p>

                <p className="mt-1.5 text-[11px] font-normal text-slate-400">
                  Les produits apparaîtront pendant votre saisie.
                </p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="mb-3 flex items-center justify-between gap-2 px-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                    Résultats de recherche
                  </p>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    {results.length} résultat(s)
                  </span>
                </div>

                <div className="space-y-1">
                  {results.map((product, index) => (
                    <Link
                      key={product.id ?? product.slug}
                      to={`/produit/${product.slug}`}
                      onClick={closeSearch}
                      style={{
                        animationDelay: `${index * 40}ms`,
                      }}
                      className="flex animate-in items-center gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-slate-50 active:bg-blue-50 dark:hover:bg-slate-800 dark:active:bg-blue-500/10"
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          "/images/placeholder.webp"
                        }
                        alt={product.name}
                        loading="lazy"
                        className="h-14 w-14 shrink-0 rounded-xl bg-slate-100 object-cover dark:bg-slate-800"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-semibold tracking-[-0.02em] text-slate-800 dark:text-white">
                          {product.name}
                        </p>

                        <p className="mt-1 truncate text-[10px] font-medium text-slate-400">
                          {product.category}
                        </p>

                        <p className="mt-1 text-[12px] font-bold tracking-[-0.02em] text-blue-700 dark:text-blue-400">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <ArrowRight
                        size={16}
                        className="shrink-0 text-slate-300 dark:text-slate-600"
                      />
                    </Link>
                  ))}
                </div>

                <Link
                  to={`/all-products?search=${encodeURIComponent(
                    searchValue.trim()
                  )}`}
                  onClick={closeSearch}
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-[11px] font-semibold tracking-[-0.01em] text-white transition hover:bg-blue-800 active:scale-[0.98]"
                >
                  Voir tous les résultats
                  <ArrowRight size={14} />
                </Link>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800">
                  <Search size={21} className="text-slate-400" />
                </div>

                <p className="text-[13px] font-semibold text-slate-800 dark:text-white">
                  Aucun produit trouvé
                </p>

                <p className="mt-1.5 text-[11px] text-slate-400">
                  Essayez un autre nom ou une autre catégorie.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOND SOMBRE */}
      <button
        type="button"
        aria-label="Fermer la recherche"
        tabIndex={searchOpen ? 0 : -1}
        onClick={closeSearch}
        className={`fixed inset-0 z-[60] bg-slate-950/20 backdrop-blur-[2px] transition-opacity duration-300 dark:bg-black/50 md:hidden ${
          searchOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* NAVIGATION MOBILE */}
      <nav className="fixed bottom-0 left-0 z-[80] w-full border-t border-slate-100 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-[0_-8px_30px_rgba(0,0,0,0.35)] md:hidden">
        <div className="mx-auto flex h-[68px] max-w-lg items-center justify-around px-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.action) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    searchOpen ? closeSearch() : setSearchOpen(true)
                  }
                  aria-expanded={searchOpen}
                  aria-label="Ouvrir la recherche"
                  className={`relative flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                    searchOpen
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  <span
                    className={`flex h-9 w-12 items-center justify-center rounded-2xl transition-all duration-200 ${
                      searchOpen
                        ? "scale-105 bg-blue-50 dark:bg-blue-500/10"
                        : "active:scale-90"
                    }`}
                  >
                    {searchOpen ? (
                      <X size={21} strokeWidth={2} />
                    ) : (
                      <Icon size={21} strokeWidth={1.9} />
                    )}
                  </span>

                  <span className="text-[10px] font-semibold tracking-[-0.02em]">
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
                onClick={() => {
                  if (searchOpen) closeSearch();
                }}
                className={({ isActive }) =>
                  `relative flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                    isActive
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`relative flex h-9 w-12 items-center justify-center rounded-2xl transition-all duration-200 ${
                        isActive
                          ? "scale-105 bg-blue-50 dark:bg-blue-500/10"
                          : "active:scale-90"
                      }`}
                    >
                      <Icon size={21} strokeWidth={1.9} />

                      {item.label === "Panier" && cartCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                          {cartCount > 99 ? "99+" : cartCount}
                        </span>
                      )}
                    </span>

                    <span className="text-[10px] font-semibold tracking-[-0.02em]">
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