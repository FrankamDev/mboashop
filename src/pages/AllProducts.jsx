
import { useMemo, useState } from "react";
import {
  Search,
  
  ArrowUpDown,
  X,
  PackageSearch,
} from "lucide-react";

import { products } from "../data/products";
import ProductCard from "../composnents/ProductCard";
import Navbar from "../composnents/Navbar";
// import ProductCard from "../components/ProductCard";

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
        result.sort((a, b) => b.reviews - a.reviews);
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

  return (
    <main className="min-h-screen bg-gray-50 pb-16">

      {/* En-tête */}
      <section className="mx-auto max-w-7xl px-4 pt-7 sm:pt-10">
<Navbar />
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            MBOASHOP STORE
          </p>

          <h1 className="mt-2 text-2xl font-black text-gray-950 sm:text-3xl">
            All Products
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Découvrez tous nos produits et trouvez ce dont vous avez besoin.
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="flex flex-col gap-3 sm:flex-row">

          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative">
            <ArrowUpDown
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm outline-none focus:border-blue-500 sm:w-52"
            >
              <option value="featured">Featured products</option>
              <option value="popular">Most popular</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Catégories */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                category === item
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {item === "All" ? "All products" : item}
            </button>
          ))}
        </div>

      </section>

      {/* Liste des produits */}
      <section className="mx-auto mt-7 max-w-7xl px-4">

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Explore our products
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {filteredProducts.length} product(s) found
            </p>
          </div>

          {(search || category !== "All" || sort !== "featured") && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700"
            >
              <X size={15} />
              Reset filters
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <PackageSearch size={42} className="text-gray-300" />

            <h3 className="mt-4 font-bold text-gray-800">
              Aucun produit trouvé
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Essaie une autre recherche ou change de catégorie.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
            >
              Voir tous les produits
            </button>
          </div>
        )}

      </section>
    </main>
  );
}
