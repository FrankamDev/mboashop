
import { useMemo, useState } from "react";
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

export default function MobileBottomNav() {
  const { cartCount } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Normaliser le texte : accents, majuscules, espaces
  const normalize = (value = "") =>
    String(value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  // Recherche instantanée dans les produits
  const results = useMemo(() => {
    const query = normalize(searchValue);

    if (!query) return [];

    return products
      .filter((product) => {
        if (product.isPublished === false) return false;

        const searchableText = normalize([
          product.name,
          product.category,
          product.shortDescription,
          product.description,
          ...(product.tags || []),
        ].join(" "));

        return searchableText.includes(query);
      })
      .slice(0, 6);
  }, [searchValue]);

  const formatPrice = (price) =>
    `${Number(price || 0).toLocaleString("fr-FR")} FCFA`;

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchValue("");
  };

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
        className={`fixed inset-x-0 bottom-[76px] z-[70] px-3 transition-all duration-300 md:hidden ${searchOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-5 opacity-0 pointer-events-none"
          }`}
      >
        <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/15">

          {/* CHAMP DE RECHERCHE */}
          <div className="flex items-center gap-3 border-b border-gray-100 p-3">
            <Search size={20} className="shrink-0 text-blue-600" />

            <input
              type="search"
              autoFocus={searchOpen}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Rechercher un produit..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />

            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                aria-label="Effacer la recherche"
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
              >
                <X size={17} />
              </button>
            )}

            <button
              onClick={closeSearch}
              aria-label="Fermer la recherche"
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            >
              <X size={19} />
            </button>
          </div>

          {/* RÉSULTATS */}
          <div className="max-h-[55vh] overflow-y-auto p-3">

            {!searchValue.trim() ? (
              <div className="py-7 text-center">
                <Search size={30} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-semibold text-gray-700">
                  Que recherchez-vous ?
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Les produits apparaîtront pendant votre saisie.
                </p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Résultats de recherche
                  </p>
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">
                    {results.length} résultat(s) affiché(s)
                  </span>
                </div>

                <div className="space-y-2">
                  {results.map((product, index) => (
                    <Link
                      key={product.id}
                      to={`/produit/${product.slug}`}
                      onClick={closeSearch}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className="flex animate-in fade-in slide-in-from-bottom-2 items-center gap-3 rounded-xl p-2 transition duration-200 hover:bg-blue-50"
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          "/images/placeholder.webp"
                        }
                        alt={product.name}
                        className="h-14 w-14 shrink-0 rounded-lg bg-gray-100 object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-800">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {product.category}
                        </p>

                        <p className="mt-1 text-sm font-extrabold text-blue-700">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <ArrowRight
                        size={17}
                        className="shrink-0 text-gray-400"
                      />
                    </Link>
                  ))}
                </div>

                <Link
                  to={`/all-products?search=${encodeURIComponent(searchValue.trim())}`}
                  onClick={closeSearch}
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-xs font-bold text-white transition hover:bg-blue-800"
                >
                  Voir tous les résultats
                  <ArrowRight size={15} />
                </Link>
              </>
            ) : (
              <div className="py-8 text-center">
                <Search size={30} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-bold text-gray-700">
                  Aucun produit trouvé
                </p>
                <p className="mt-1 text-xs text-gray-400">
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
        onClick={closeSearch}
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${searchOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
      />

      {/* MENU MOBILE */}
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
                  aria-expanded={searchOpen}
                  className={`relative flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-all duration-300 ${searchOpen ? "text-blue-700" : "text-gray-400"
                    }`}
                >
                  <span className={`flex h-9 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${searchOpen ? "scale-105 bg-blue-50" : "active:scale-90"
                    }`}>
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
                  `relative flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-all duration-300 ${isActive ? "text-blue-700" : "text-gray-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`relative flex h-9 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${isActive ? "scale-105 bg-blue-50" : "active:scale-90"
                      }`}>
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
