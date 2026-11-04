import { useMemo, useState } from "react";
import {
  Search,
  ArrowUpDown,
  X,
  PackageSearch,
  ChevronDown,
} from "lucide-react";

import { products } from "../data/products";
import ProductCard from "../composnents/ProductCard";
import Navbar from "../composnents/Navbar";

const categories = [
  "All",
  "Audio",
  "Electronics",
  "Gadgets",
  "Gaming",
  "Home",
  "Computers",
];

export default function AllProducts({ onAddToCart = () => {} }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Recherche
    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrage par catégorie
    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // Tri
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "popular":
        result.sort((a, b) => (b.reviewsCount || b.reviews || 0) - (a.reviewsCount || a.reviews || 0));
        break;

      default:
        break;
    }

    return result;
  }, [search, category, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("featured");
  };

  const hasActiveFilters = search.trim() !== "" || category !== "All" || sort !== "featured";

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      {/* NAVBAR */}
      <Navbar />

      {/* EN-TÊTE & FILTRES */}
      <section className="mx-auto max-w-7xl px-3.5 pt-4 sm:px-6 sm:pt-8">
        <div className="mb-6 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600">
            MBOASHOP STORE
          </span>
          <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-4xl">
            Tous nos produits
          </h1>
          <p className="text-xs text-gray-500 sm:text-sm">
            Découvrez notre catalogue complet et trouvez ce qu'il vous faut au meilleur prix.
          </p>
        </div>

        {/* BARRE DE RECHERCHE ET SELECTEUR DE TRI */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Champ de recherche */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit..."
              className="h-11 w-full rounded-2xl border border-gray-200 bg-white pl-10 pr-10 text-xs font-medium text-gray-900 shadow-xs transition-all placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:text-sm"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Effacer la recherche"
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sélecteur de Tri */}
          <div className="relative min-w-[180px] sm:w-56">
            <ArrowUpDown
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-white pl-10 pr-10 text-xs font-bold text-gray-700 shadow-xs transition-all focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:text-sm"
            >
              <option value="featured">En vedette</option>
              <option value="popular">Plus populaires</option>
              <option value="rating">Mieux notés</option>
              <option value="price-asc">Prix : Croissant</option>
              <option value="price-desc">Prix : Décroissant</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* CARROUSEL DES CATÉGORIES */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {categories.map((item) => {
            const isActive = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`flex min-h-[40px] shrink-0 items-center rounded-xl px-4 text-xs font-bold transition-all active:scale-95 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "border border-gray-200/80 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item === "All" ? "Tous les produits" : item}
              </button>
            );
          })}
        </div>
      </section>

      {/* LISTE DES PRODUITS & RÉSULTATS */}
      <section className="mx-auto mt-6 max-w-7xl px-3.5 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900 sm:text-base">
              Explorer le catalogue
            </h2>
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-900">{filteredProducts.length}</span> produit(s) trouvé(s)
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex min-h-[36px] items-center gap-1.5 rounded-lg border border-rose-100 bg-rose-50/80 px-3 text-xs font-bold text-rose-600 transition-all hover:bg-rose-100 active:scale-95"
            >
              <X size={14} />
              <span>Réinitialiser</span>
            </button>
          )}
        </div>

        {/* GRILLE OU EMPTY STATE */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="my-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-4 py-12 text-center shadow-xs sm:py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4">
              <PackageSearch size={32} />
            </div>

            <h3 className="text-base font-extrabold text-gray-900 sm:text-lg">
              Aucun produit ne correspond à votre recherche
            </h3>

            <p className="mt-1.5 max-w-md text-xs text-gray-500 sm:text-sm">
              Essayez de modifier votre terme de recherche ou de changer les filtres de catégorie.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 flex min-h-[44px] items-center justify-center rounded-xl bg-blue-600 px-6 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95 sm:text-sm"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </section>
    </main>
  );
}