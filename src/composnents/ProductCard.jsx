
import { ShoppingCart, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  const handleAddToCart = () => {
    if (product.stock <= 0) return;

    addToCart(product);
    showToast(`${product.name} a été ajouté à votre panier.`);
  };

  return (
    <article className="group relative min-w-[155px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-900/10 sm:min-w-0">

      {/* IMAGE DU PRODUIT */}
      <Link
        to={`/produit/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-gray-50"
      >
        <img
          src={product.images?.[0] || "/images/placeholder.webp"}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/placeholder.webp";
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* VOILE DISCRET AU SURVOL */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.03]" />

        {/* BADGE */}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-700 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-white shadow-lg">
            {product.badge}
          </span>
        )}

        {/* PROMOTION */}
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1.5 text-[10px] font-extrabold text-white shadow-lg">
            -{discount}%
          </span>
        )}

        {/* STOCK */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-900">
              Rupture de stock
            </span>
          </div>
        )}
      </Link>

      {/* INFORMATIONS */}
      <div className="p-3 sm:p-4">

        {/* CATÉGORIE */}
        <p className="mb-1 truncate text-[9px] font-bold uppercase tracking-[1.5px] text-blue-600">
          {product.category}
        </p>

        {/* NOM */}
        <Link to={`/produit/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-10 text-xs font-bold leading-5 text-gray-900 transition-colors group-hover:text-blue-700 sm:text-sm">
            {product.name}
          </h3>
        </Link>

        {/* AVIS */}
        <div className="mt-2 flex items-center gap-1.5">
          <Star
            size={13}
            className="fill-yellow-400 text-yellow-400"
          />
          <span className="text-[10px] font-bold text-gray-700">
            {product.rating ?? "Nouveau"}
          </span>
          <span className="text-[10px] text-gray-400">
            ({product.reviewsCount ?? 0} avis)
          </span>
        </div>

        {/* PRIX */}
        <div className="mt-3 flex min-h-9 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-black tracking-tight text-gray-950 sm:text-base">
            {Number(product.price).toLocaleString("fr-FR")} FCFA
          </span>

          {discount > 0 && (
            <span className="text-[10px] font-medium text-gray-400 line-through">
              {Number(product.oldPrice).toLocaleString("fr-FR")} FCFA
            </span>
          )}
        </div>

        {/* AJOUT AU PANIER */}
        <button
          type="button"
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
          aria-label={`Ajouter ${product.name} au panier`}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 py-3 text-[10px] font-extrabold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {product.stock > 0 ? (
            <>
              <ShoppingCart size={15} />
              Ajouter au panier
            </>
          ) : (
            <>
              <Check size={15} />
              Indisponible
            </>
          )}
        </button>
      </div>
    </article>
  );
}
