
import { ArrowRight, Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
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
      className="mx-auto mt-7 w-full max-w-7xl px-3 sm:px-4"
    >
      {/* En-tête */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-gray-950 sm:text-xl">
            Trending Products
          </h2>

          <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
            Découvrez nos produits populaires
          </p>
        </div>

        <Link
          to="/all-products"
          className="flex items-center gap-1 text-xs font-semibold text-gray-700 transition hover:text-blue-600"
        >
          View All
          <ArrowRight size={16} className="text-blue-600" />
        </Link>
      </div>

      {/* Produits */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Notification */}
      {message && (
        <div
          role="status"
          className="fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-gray-950 px-4 py-3 text-xs font-medium text-white shadow-xl"
        >
          <Check size={16} className="text-green-400" />
          {message}
        </div>
      )}

      {/* Compteur temporaire */}
      {cartCount > 0 && (
        <div className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg">
          <ShoppingCart size={17} />
          {cartCount}
        </div>
      )}
    </section>
  );
}
