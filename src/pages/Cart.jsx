import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  ShoppingCart,
  Truck,
  PackageCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

export default function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  /*
  |--------------------------------------------------------------------------
  | PANIER VIDE
  |--------------------------------------------------------------------------
  */

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-slate-50/70 px-4 py-12 transition-colors duration-300 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-7 text-center shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <ShoppingBag size={36} strokeWidth={1.6} />
          </div>

          <span className="mt-6 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Votre espace shopping
          </span>

          <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Votre panier est vide
          </h1>

          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Vous n'avez pas encore sélectionné de produits. Découvrez notre
            catalogue et trouvez ce qui vous plaît.
          </p>

          <Link
            to="/all-products"
            className="mt-8 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98]"
          >
            Découvrir la boutique
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400"
          >
            <ArrowLeft size={14} />
            Retour à l'accueil
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/70 px-3.5 py-7 transition-colors duration-300 dark:bg-slate-950 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =========================================================
            NAVIGATION
        ========================================================= */}

        <Link
          to="/all-products"
          className="group inline-flex min-h-10 items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 sm:text-sm"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all group-hover:border-blue-200 group-hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:group-hover:border-blue-500/40 dark:group-hover:bg-blue-500/10">
            <ArrowLeft size={15} />
          </span>

          Continuer mes achats
        </Link>

        {/* =========================================================
            EN-TÊTE
        ========================================================= */}

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-blue-600 dark:text-blue-400">
              MBOASHOP / SHOPPING BAG
            </span>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Mon panier
            </h1>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              <span className="font-bold text-slate-900 dark:text-white">
                {cartCount}
              </span>{" "}
              article(s) sélectionné(s)
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="flex min-h-10 items-center gap-2 rounded-xl border border-rose-100 bg-white px-3.5 text-xs font-bold text-rose-500 transition-all hover:border-rose-200 hover:bg-rose-50 active:scale-95 dark:border-rose-900/50 dark:bg-slate-900 dark:hover:border-rose-800 dark:hover:bg-rose-950/30"
          >
            <Trash2 size={15} />
            Vider le panier
          </button>
        </div>

        {/* =========================================================
            CONTENU
        ========================================================= */}

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] xl:gap-8">

          {/* =======================================================
              PRODUITS
          ======================================================= */}

          <section className="min-w-0 space-y-3.5">

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Articles sélectionnés
              </h2>

              <span className="rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold text-slate-500 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800">
                {cartCount} ARTICLE(S)
              </span>
            </div>

            {cart.map((item) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3.5 transition-all duration-300 hover:border-blue-200 hover:shadow-md hover:shadow-slate-900/[0.03] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/40 dark:hover:shadow-black/20 sm:p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                  {/* IMAGE */}

                  <Link
                    to={`/produit/${item.slug}`}
                    className="relative flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70 sm:h-28 sm:w-28"
                  >
                    <img
                      src={
                        item.images?.[0] ||
                        "/images/placeholder.webp"
                      }
                      alt={item.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src =
                          "/images/placeholder.webp";
                      }}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />

                    {item.stock <= 3 && item.stock > 0 && (
                      <span className="absolute bottom-1.5 left-1.5 rounded-md bg-amber-100 px-1.5 py-1 text-[9px] font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                        Stock limité
                      </span>
                    )}
                  </Link>

                  {/* INFORMATIONS */}

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">

                    <div>
                      <Link
                        to={`/produit/${item.slug}`}
                        className="line-clamp-2 text-sm font-extrabold leading-snug text-slate-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400 sm:text-[15px]"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-1.5 text-sm font-black text-blue-600 dark:text-blue-400">
                        {formatPrice(item.price)}
                      </p>

                      <p className="mt-1 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                        Prix unitaire
                      </p>
                    </div>

                    {/* QUANTITÉ */}

                    <div className="flex flex-wrap items-center justify-between gap-3">

                      <div className="flex h-10 items-center rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          aria-label="Diminuer la quantité"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600 active:scale-90 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="min-w-10 text-center text-xs font-extrabold tabular-nums text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          disabled={
                            item.quantity >= item.stock
                          }
                          aria-label="Augmenter la quantité"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                        >
                          <Plus size={14} />
                        </button>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-bold text-rose-500 transition-colors hover:bg-rose-50 active:scale-95 dark:hover:bg-rose-950/30"
                      >
                        <Trash2 size={14} />
                        Supprimer
                      </button>

                    </div>
                  </div>

                  {/* SOUS-TOTAL */}

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800 sm:min-w-[115px] sm:flex-col sm:items-end sm:justify-center sm:border-0 sm:pt-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 sm:hidden">
                      Sous-total
                    </span>

                    <div className="text-right">
                      <p className="text-sm font-black text-slate-950 dark:text-white sm:text-base">
                        {formatPrice(
                          item.price * item.quantity
                        )}
                      </p>

                      <p className="mt-1 hidden text-[10px] font-medium text-slate-400 dark:text-slate-500 sm:block">
                        Sous-total
                      </p>
                    </div>
                  </div>

                </div>
              </article>
            ))}

            {/* CONTINUER */}

            <Link
              to="/all-products"
              className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white/60 text-xs font-bold text-slate-500 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/5 dark:hover:text-blue-400"
            >
              <ShoppingBag size={16} />
              Ajouter d'autres produits
              <ArrowRight size={15} />
            </Link>
          </section>

          {/* =======================================================
              RÉSUMÉ
          ======================================================= */}

          <aside className="h-fit rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:sticky lg:top-28">

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <ShoppingCart size={18} />
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Résumé de commande
                </h2>

                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Vérifiez votre sélection
                </p>
              </div>
            </div>

            {/* DÉTAILS */}

            <div className="mt-6 space-y-4">

              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  Sous-total ({cartCount} article(s))
                </span>

                <span className="font-bold text-slate-900 dark:text-white">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  Livraison
                </span>

                <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                  À confirmer
                </span>
              </div>

              <div className="border-t border-dashed border-slate-200 dark:border-slate-800" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Total estimé
                </span>

                <span className="text-xl font-black tracking-tight text-blue-600 dark:text-blue-400 sm:text-2xl">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* COMMANDER */}

            <Link
              to="/checkout"
              className="mt-6 flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-4 text-xs font-extrabold text-white shadow-lg shadow-blue-600/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/25 active:scale-[0.98] sm:text-sm"
            >
              <ShoppingCart size={19} />
              Passer la commande
            </Link>

            {/* RÉASSURANCE */}

            <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">

              <div className="flex items-start gap-2.5">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  Commande directe et confirmation avec notre équipe.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                />

                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  Les frais et délais de livraison seront confirmés avant
                  validation.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <PackageCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                />

                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  Vérification de la disponibilité de vos produits avant
                  commande.
                </p>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}