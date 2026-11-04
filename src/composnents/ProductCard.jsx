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

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addToCart(product);
    showToast(`${product.name} a été ajouté à votre panier.`);
  };

  return (
    <article className="group relative flex h-full min-w-[155px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs transition-all duration-300 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-900/5 active:scale-[0.995] sm:min-w-0">
      
      {/* SECTION HAUTE : IMAGE ET BADGES */}
      <div className="relative block">
        <Link
          to={`/produit/${product.slug}`}
          className="relative block aspect-square w-full overflow-hidden bg-gray-50"
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
            className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
              isOutOfStock ? "opacity-75 grayscale-[30%]" : ""
            }`}
          />

          {/* OVERLAY DISCRET AU SURVOL */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.02]" />

          {/* BADGE CATEGORIE / CUSTOM */}
          {product.badge && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-blue-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md sm:left-3 sm:top-3">
              {product.badge}
            </span>
          )}

          {/* BADGE PROMOTION */}
          {discount > 0 && (
            <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-rose-500/90 px-2 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-md sm:right-3 sm:top-3">
              -{discount}%
            </span>
          )}

          {/* OVERLAY RUPTURE DE STOCK */}
          {isOutOfStock && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900/40 backdrop-blur-[2px]">
              <span className="rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-gray-900 shadow-lg backdrop-blur-md">
                Rupture de stock
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* SECTION BASSE : INFORMATIONS PRODUIT */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          {/* CATÉGORIE */}
          {product.category && (
            <p className="mb-1 truncate text-[10px] font-bold uppercase tracking-wider text-blue-600/90">
              {product.category}
            </p>
          )}

          {/* NOM DU PRODUIT */}
          <Link to={`/produit/${product.slug}`} className="group/title block">
            <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-gray-900 transition-colors group-hover/title:text-blue-600 sm:text-sm">
              {product.name}
            </h3>
          </Link>

          {/* NOTE & AVIS */}
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-amber-700">
              <Star
                size={12}
                className="fill-amber-400 text-amber-400"
              />
              <span className="text-[11px] font-bold">
                {product.rating ?? "Nouveau"}
              </span>
            </div>
            <span className="text-[11px] font-medium text-gray-400">
              ({product.reviewsCount ?? 0})
            </span>
          </div>
        </div>

        {/* PRIX ET BOUTON D'ACTION */}
        <div className="mt-3.5">
          <div className="flex min-h-[26px] items-baseline gap-2 flex-wrap">
            <span className="text-base font-extrabold tracking-tight text-gray-900 sm:text-lg">
              {Number(product.price).toLocaleString("fr-FR")} <span className="text-xs font-bold text-gray-600">FCFA</span>
            </span>

            {discount > 0 && (
              <span className="text-xs font-medium text-gray-400 line-through">
                {Number(product.oldPrice).toLocaleString("fr-FR")}
              </span>
            )}
          </div>

          {/* BOUTON D'AJOUT AU PANIER */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            aria-label={`Ajouter ${product.name} au panier`}
            className="mt-3 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-3 py-2.5 text-xs font-bold text-white shadow-xs transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
          >
            {!isOutOfStock ? (
              <>
                <ShoppingCart size={16} className="transition-transform group-hover:scale-110" />
                <span>Ajouter au panier</span>
              </>
            ) : (
              <>
                <Check size={16} />
                <span>Indisponible</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}