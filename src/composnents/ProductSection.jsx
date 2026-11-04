import { ArrowRight, Check, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

export default function ProductSection() {
  const [cartCount, setCartCount] = useState(0);
  const [message, setMessage] = useState("");

  const handleAddToCart = (product) => {
    setCartCount((count) => count + 1);
    setMessage(`${product.name} ajouté au panier`);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <section
      id="products"
      className="mx-auto my-8 w-full max-w-7xl px-3.5 sm:my-12 sm:px-6 lg:my-16"
    >
      {/* EN-TÊTE DE LA SECTION */}
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-gray-100 pb-4 sm:mb-8 sm:pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Sélection du moment
            </span>
          </div>
          <h2 className="text-lg font-extrabold tracking-tight text-gray-950 sm:text-2xl lg:text-3xl">
            Trending Products
          </h2>
          <p className="text-xs text-gray-500 sm:text-sm">
            Découvrez nos produits les plus populaires
          </p>
        </div>

        {/* LIEN VOIR TOUT / VIEW ALL */}
        <Link
          to="/all-products"
          className="group flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 transition-all hover:bg-gray-100 hover:text-blue-600 active:scale-95 sm:text-sm"
        >
          <span>Voir tout</span>
          <ArrowRight
            size={16}
            className="text-blue-600 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* GRILLE DE PRODUITS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* TOAST DE NOTIFICATION (AJOUT AU PANIER) */}
      {message && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-gray-800/80 bg-gray-950/90 px-4 py-3 text-xs font-medium text-white shadow-2xl backdrop-blur-md transition-all duration-300 sm:bottom-8 sm:text-sm"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <Check size={13} strokeWidth={2.5} />
          </div>
          <span className="truncate max-w-[220px] sm:max-w-xs">{message}</span>
        </div>
      )}

      {/* COMPTEUR TEMPORAIRE FLOTTANT */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-4 z-40 flex min-h-[44px] items-center gap-2.5 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 backdrop-blur-md transition-all duration-300 hover:bg-blue-700 active:scale-95 sm:bottom-8 sm:right-6 sm:text-sm">
          <div className="relative flex items-center justify-center">
            <ShoppingCart size={18} />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-black text-blue-600 shadow-xs">
              {cartCount}
            </span>
          </div>
          <span className="ml-1">Panier</span>
        </div>
      )}
    </section>
  );
}