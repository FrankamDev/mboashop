
import { ShoppingCart, Star, Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const price = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || 0;
  const stock = Number(product.stock) || 0;

  const discount =
    oldPrice > price && oldPrice > 0
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const isOutOfStock = stock <= 0;

  const image = product.images?.[0] || FALLBACK_IMAGE;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addToCart(product);
    showToast(`${product.name} a été ajouté à votre panier.`);
  };

  const formattedPrice = price.toLocaleString("fr-FR");
  const formattedOldPrice = oldPrice.toLocaleString("fr-FR");

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-gray-900/[0.06]">

      {/* IMAGE PRODUIT */}
      <div className="relative overflow-hidden bg-gray-50">
        <Link
          to={`/produit/${product.slug}`}
          aria-label={`Voir ${product.name}`}
          className="relative block aspect-square w-full overflow-hidden"
        >
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
            className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
              isOutOfStock ? "grayscale opacity-60" : ""
            }`}
          />

          {/* Léger voile au survol */}
          <div className="absolute inset-0 bg-black/[0.02] transition-colors duration-300 group-hover:bg-black/[0.06]" />

          {/* BADGE PRODUIT */}
          {product.badge && (
            <span className="absolute left-2.5 top-2.5 max-w-[75%] truncate rounded-full bg-blue-600 px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white shadow-sm sm:left-3 sm:top-3 sm:text-[10px]">
              {product.badge}
            </span>
          )}

          {/* PROMOTION */}
          {discount > 0 && (
            <span className="absolute right-2.5 top-2.5 rounded-full bg-rose-500 px-2 py-1.5 text-[10px] font-extrabold text-white shadow-sm sm:right-3 sm:top-3">
              -{discount}%
            </span>
          )}

          {/* RUPTURE DE STOCK */}
          {isOutOfStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-950/35 backdrop-blur-[2px]">
              <span className="rounded-full bg-white px-3 py-2 text-[10px] font-bold text-gray-900 shadow-lg sm:text-xs">
                Rupture de stock
              </span>
            </div>
          )}

          {/* ICÔNE DÉTAILS */}
          <span className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white text-gray-900 opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </div>

      {/* INFORMATIONS PRODUIT */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">

        <div className="flex-1">
          {/* CATÉGORIE */}
          {product.category && (
            <p className="mb-1.5 truncate text-[9px] font-bold uppercase tracking-[0.13em] text-blue-600 sm:text-[10px]">
              {product.category}
            </p>
          )}

          {/* NOM */}
          <Link to={`/produit/${product.slug}`} className="block">
            <h3 className="line-clamp-2 min-h-[2.5rem] text-[12px] font-bold leading-[1.45] tracking-[-0.02em] text-gray-900 transition-colors group-hover:text-blue-600 sm:text-sm">
              {product.name}
            </h3>
          </Link>

          {/* NOTE */}
          <div className="mt-2.5 flex items-center gap-1.5">
            {product.rating != null ? (
              <>
                <div className="flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-1">
                  <Star
                    size={11}
                    className="fill-amber-400 text-amber-400"
                  />
                  <span className="text-[10px] font-bold text-amber-700">
                    {product.rating}
                  </span>
                </div>

                <span className="text-[10px] font-medium text-gray-400">
                  ({product.reviewsCount ?? 0} avis)
                </span>
              </>
            ) : (
              <span className="text-[10px] font-semibold text-gray-400">
                Nouveau produit
              </span>
            )}
          </div>
        </div>

        {/* PRIX */}
        <div className="mt-4 border-t border-gray-100 pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[15px] font-extrabold tracking-tight text-gray-950 sm:text-lg">
              {formattedPrice}
              <span className="ml-1 text-[10px] font-bold text-gray-500 sm:text-xs">
                FCFA
              </span>
            </span>

            {discount > 0 && (
              <span className="text-[10px] font-medium text-gray-400 line-through sm:text-xs">
                {formattedOldPrice}
              </span>
            )}
          </div>

          {/* BOUTON PANIER */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            aria-label={`Ajouter ${product.name} au panier`}
            className="mt-3 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-2 py-2.5 text-[11px] font-bold text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none sm:text-xs"
          >
            {isOutOfStock ? (
              <>
                <Check size={15} />
                <span>Indisponible</span>
              </>
            ) : (
              <>
                <ShoppingCart
                  size={15}
                  className="transition-transform group-hover:scale-110"
                />
                <span>Ajouter au panier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
