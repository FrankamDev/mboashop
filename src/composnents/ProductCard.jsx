
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  return (
    <article className="group min-w-[155px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:min-w-0">

      {/* Image et badge */}
      <Link
        to={`/produit/${product.slug}`}
        className="relative flex h-36 items-center justify-center bg-gray-50 p-3 sm:h-44"
      >
        <img
          src={product.images?.[0] || "/images/placeholder.webp"}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.webp";
          }}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />

        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-blue-700 px-2 py-1 text-[8px] font-bold text-white">
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-[8px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Informations */}
      <div className="p-2.5 sm:p-3">

        <Link to={`/produit/${product.slug}`}>
          <p className="line-clamp-2 min-h-8 text-[11px] font-semibold leading-4 text-gray-800 hover:text-blue-600 sm:text-xs">
            {product.name}
          </p>
        </Link>

        {/* Note */}
        <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-500">
          <Star
            size={12}
            className="fill-yellow-400 text-yellow-400"
          />
          <span className="font-semibold text-gray-700">
            {product.rating}
          </span>
          <span>({product.reviewsCount})</span>
        </div>

        {/* Prix */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-extrabold text-gray-950">
            {product.price.toLocaleString("fr-FR")} FCFA
          </span>

          {product.oldPrice > product.price && (
            <span className="text-[10px] text-gray-400 line-through">
              {product.oldPrice.toLocaleString("fr-FR")} FCFA
            </span>
          )}
        </div>

        {/* Ajouter au panier */}
        <button
          type="button"
          disabled={product.stock <= 0}
          onClick={() => onAddToCart?.(product)}
          aria-label={`Ajouter ${product.name} au panier`}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-2 text-[10px] font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <ShoppingCart size={14} />
          {product.stock > 0 ? "Ajouter au panier" : "Épuisé"}
        </button>

      </div>
    </article>
  );
}
