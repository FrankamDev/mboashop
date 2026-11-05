import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Search,
  ArrowUpDown,
  X,
  PackageSearch,
  ChevronDown,
  SlidersHorizontal,
  ShoppingBag,
  Sparkles,
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

const normalize = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

/*
|--------------------------------------------------------------------------
| Système de personnalisation
|--------------------------------------------------------------------------
| Chaque visiteur reçoit un identifiant unique.
| Cet identifiant permet de générer un ordre différent des produits.
|
| Exemple :
| Visiteur A → Produit 5 → Produit 2 → Produit 8 → Produit 1
| Visiteur B → Produit 3 → Produit 7 → Produit 1 → Produit 5
|
| L'ordre reste stable pendant la journée afin d'éviter que les produits
| changent à chaque rechargement de la page.
*/

const USER_SEED_KEY = "mboashop_visitor_seed";

function getVisitorSeed() {
  try {
    let seed = localStorage.getItem(USER_SEED_KEY);

    if (!seed) {
      seed = `${Date.now()}-${Math.random()}-${Math.random()}`;

      localStorage.setItem(USER_SEED_KEY, seed);
    }

    return seed;
  } catch {
    return `${Date.now()}-${Math.random()}`;
  }
}

function hashString(value) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);

    hash |= 0;
  }

  return Math.abs(hash);
}

function getTodayKey() {
  const now = new Date();

  return `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function personalizedShuffle(items) {
  const visitorSeed = getVisitorSeed();
  const today = getTodayKey();

  return [...items]
    .map((product) => ({
      product,
      score: hashString(
        `${visitorSeed}-${today}-${product.id}`
      ),
    }))
    .sort((a, b) => a.score - b.score)
    .map(({ product }) => product);
}

export default function AllProducts({ onAddToCart = () => {} }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [sort, setSort] = useState(
    searchParams.get("sort") || "for-you"
  );

  /*
  |--------------------------------------------------------------------------
  | Synchronisation URL
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setSearch(searchParams.get("search") || "");

    setCategory(
      searchParams.get("category") || "All"
    );

    setSort(
      searchParams.get("sort") || "for-you"
    );
  }, [searchParams]);

  /*
  |--------------------------------------------------------------------------
  | Produits filtrés + recommandation personnalisée
  |--------------------------------------------------------------------------
  */

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (product) => product.isPublished !== false
    );

    const query = normalize(search);

    /*
    |--------------------------------------------------------------------------
    | Recherche
    |--------------------------------------------------------------------------
    */

    if (query) {
      result = result.filter((product) => {
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
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Catégorie
    |--------------------------------------------------------------------------
    */

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Tri
    |--------------------------------------------------------------------------
    */

    switch (sort) {
      case "for-you":
        /*
        | Le système "Pour vous" est différent pour chaque visiteur.
        */
        result = personalizedShuffle(result);
        break;

      case "featured":
        /*
        | On garde l'ordre original du fichier products.js.
        */
        break;

      case "price-asc":
        result.sort(
          (a, b) => Number(a.price || 0) - Number(b.price || 0)
        );
        break;

      case "price-desc":
        result.sort(
          (a, b) => Number(b.price || 0) - Number(a.price || 0)
        );
        break;

      case "rating":
        result.sort(
          (a, b) =>
            Number(b.rating || 0) -
            Number(a.rating || 0)
        );
        break;

      case "popular":
        result.sort(
          (a, b) =>
            Number(
              b.reviewsCount || b.reviews || 0
            ) -
            Number(
              a.reviewsCount || a.reviews || 0
            )
        );
        break;

      default:
        break;
    }

    return result;
  }, [search, category, sort]);

  /*
  |--------------------------------------------------------------------------
  | Reset
  |--------------------------------------------------------------------------
  */

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("for-you");

    setSearchParams({});
  };

  /*
  |--------------------------------------------------------------------------
  | Clear search
  |--------------------------------------------------------------------------
  */

  const clearSearch = () => {
    setSearch("");

    const params = new URLSearchParams(searchParams);

    params.delete("search");

    setSearchParams(params);
  };

  /*
  |--------------------------------------------------------------------------
  | Filtres actifs
  |--------------------------------------------------------------------------
  */

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All" ||
    sort !== "for-you";

  /*
  |--------------------------------------------------------------------------
  | Changement de tri
  |--------------------------------------------------------------------------
  */

  const handleSortChange = (value) => {
    setSort(value);

    const params = new URLSearchParams(searchParams);

    if (value === "for-you") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    setSearchParams(params);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f9fb] pb-24 font-sans text-slate-900">
      <Navbar />

      {/* =========================================================
          EN-TÊTE
      ========================================================= */}

      <section className="mx-auto max-w-[1440px] px-4 pt-7 sm:px-8 sm:pt-10 lg:px-12">
        <div className="relative overflow-hidden rounded-[22px] border border-slate-100 bg-white px-5 py-7 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.2)] sm:rounded-[28px] sm:px-8 sm:py-9 lg:px-10">
          {/* Décoration */}

          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 right-[20%] h-48 w-48 rounded-full bg-indigo-100/50 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5">
              <Sparkles
                size={13}
                className="text-blue-600"
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-700 sm:text-[10px]">
                MBOASHOP STORE
              </span>
            </div>

            <h1 className="mt-4 max-w-2xl text-[28px] font-bold leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-[42px]">
              Découvrez les produits,

              <span className="block text-blue-700">
                sélectionnés pour vous.
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-[12px] leading-6 text-slate-500 sm:text-sm sm:leading-7">
              Découvrez notre catalogue et trouvez les produits
              qui correspondent à vos besoins, au meilleur prix.
            </p>

            <div className="mt-5 flex items-center gap-2 text-[11px] font-medium text-slate-500">
              <ShoppingBag
                size={15}
                className="text-blue-600"
              />

              <span>
                {filteredProducts.length} produit(s)
                disponible(s)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RECHERCHE ET FILTRES
      ========================================================= */}

      <section className="mx-auto max-w-[1440px] px-4 pt-7 sm:px-8 sm:pt-9 lg:px-12">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600">
              Notre catalogue
            </p>

            <h2 className="mt-1 text-[19px] font-bold tracking-[-0.035em] text-slate-950 sm:text-2xl">
              Explorer la boutique
            </h2>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-500 sm:hidden">
            <SlidersHorizontal size={17} />
          </div>
        </div>

        {/* Recherche + tri */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Recherche */}

          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Rechercher un produit..."
              aria-label="Rechercher un produit"
              className="h-[48px] w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-[12px] font-medium text-slate-800 shadow-sm outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-[50px] sm:text-[13px]"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Effacer la recherche"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Tri */}

          <div className="relative w-full sm:w-[230px] sm:shrink-0">
            <ArrowUpDown
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={sort}
              onChange={(event) =>
                handleSortChange(event.target.value)
              }
              aria-label="Trier les produits"
              className="h-[48px] w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-[12px] font-semibold text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-[50px] sm:text-[13px]"
            >
              <option value="for-you">
                Pour vous
              </option>

              <option value="featured">
                En vedette
              </option>

              <option value="popular">
                Plus populaires
              </option>

              <option value="rating">
                Mieux notés
              </option>

              <option value="price-asc">
                Prix : croissant
              </option>

              <option value="price-desc">
                Prix : décroissant
              </option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* Catégories */}

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-700">
              Catégories
            </p>

            <span className="text-[10px] font-medium text-slate-400">
              Faites défiler
            </span>
          </div>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:px-0">
            {categories.map((item) => {
              const isActive = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setCategory(item);

                    const params = new URLSearchParams(
                      searchParams
                    );

                    if (item === "All") {
                      params.delete("category");
                    } else {
                      params.set("category", item);
                    }

                    setSearchParams(params);
                  }}
                  aria-pressed={isActive}
                  className={`flex min-h-[39px] shrink-0 items-center justify-center rounded-xl px-4 text-[11px] font-semibold transition-all duration-200 active:scale-95 sm:text-xs ${
                    isActive
                      ? "bg-blue-700 text-white shadow-[0_5px_15px_-5px_rgba(37,99,235,0.5)]"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item === "All"
                    ? "Tous les produits"
                    : item}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          RÉSULTATS
      ========================================================= */}

      <section className="mx-auto mt-6 max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200/70 pb-4">
          <div>
            <h2 className="text-[13px] font-bold tracking-[-0.02em] text-slate-900 sm:text-base">
              {search.trim()
                ? "Résultats de recherche"
                : category !== "All"
                ? category
                : sort === "for-you"
                ? "Pour vous"
                : "Tous les produits"}
            </h2>

            <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
              <span className="font-semibold text-slate-700">
                {filteredProducts.length}
              </span>{" "}
              produit(s) trouvé(s)
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex min-h-[35px] shrink-0 items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 text-[10px] font-semibold text-red-600 transition hover:bg-red-100 sm:text-xs"
            >
              <X size={13} />
              Réinitialiser
            </button>
          )}
        </div>

        {/* =======================================================
            GRILLE PRODUITS
        ======================================================= */}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 items-stretch gap-2.5 min-[390px]:gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-0"
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
        ) : (
          /* =====================================================
             AUCUN RÉSULTAT
          ===================================================== */

          <div className="my-8 flex flex-col items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-white px-5 py-12 text-center sm:my-10 sm:rounded-[28px] sm:py-16">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <PackageSearch
                size={30}
                strokeWidth={1.7}
              />
            </div>

            <h3 className="max-w-md text-[16px] font-bold tracking-[-0.03em] text-slate-900 sm:text-xl">
              Aucun produit trouvé
            </h3>

            <p className="mt-2 max-w-sm text-[11px] leading-6 text-slate-500 sm:text-sm">
              Aucun produit ne correspond à votre recherche.
              Essayez un autre nom ou modifiez vos filtres.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 text-[11px] font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-800 active:scale-95 sm:text-xs"
            >
              <X size={15} />
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* =======================================================
            BAS DE CATALOGUE
        ======================================================= */}

        {filteredProducts.length > 0 && (
          <div className="mt-10 border-t border-slate-200/70 py-7 text-center">
            <p className="text-[10px] font-medium text-slate-400 sm:text-xs">
              Vous consultez les {filteredProducts.length} produit(s)
              correspondant à votre sélection.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}