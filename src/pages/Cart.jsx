import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

export default function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const message = `
Bonjour MBOASHOP, je souhaite commander :

${cart
  .map(
    (item, index) => `
${index + 1}. ${item.name}
Quantité : ${item.quantity}
Prix unitaire : ${formatPrice(item.price)}
Total : ${formatPrice(item.price * item.quantity)}
`
  )
  .join("\n")}

Nombre total d'articles : ${cartCount}
TOTAL À CONFIRMER : ${formatPrice(cartTotal)}

Merci de me confirmer la disponibilité et les frais de livraison.
`;

    window.open(
      `[https://wa.me/237690372977?text=$](https://wa.me/237690372977?text=$){encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* ÉCRAN PANIER VIDE */
  if (cart.length === 0) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gray-50/50 px-4 py-12">
        <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-gray-200/80 bg-white p-8 text-center shadow-xs sm:p-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
            <ShoppingBag size="{38}" strokeWidth="{1.8}"/>
          </div>

          <h1 className="mt-6 text-2xl font-black text-gray-950 sm:text-3xl">
            Votre panier est vide
          </h1>

          <p className="mt-2.5 text-xs text-gray-500 sm:text-sm leading-relaxed">
            Vous n'avez pas encore ajouté d'article. Explorez notre catalogue pour découvrir nos meilleures offres.
          </p>

          <Link className="mt-8 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-600 active:scale-95 sm:text-sm" to="/all-products">
            <span>Découvrir la boutique</span>
            <ArrowRight size="{18}"/>
          </Link>
        </div>
      </main>
    );
  }

  /* ÉCRAN PANIER AVEC ARTICLES */
  return (
    <main className="min-h-screen bg-gray-50/50 px-3.5 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* RETOUR BOUTIQUE */}
        <Link className="inline-flex min-h-[40px] items-center gap-2 text-xs font-bold text-gray-500 transition-colors hover:text-blue-600" to="/all-products">
          <ArrowLeft size="{16}"/>
          <span>Continuer mes achats</span>
        </Link>

        {/* EN-TÊTE PAGE */}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200/60 pb-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600">
              MBOASHOP
            </span>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Mon panier
            </h1>
            <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
              <span className="font-bold text-gray-900">{cartCount}</span> article(s) sélectionné(s)
            </p>
          </div>

          {/* BOUTON VIDER LE PANIER */}
          <button
            type="button"
            onClick={clearCart}
            className="flex min-h-[36px] items-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50/80 px-3 text-xs font-bold text-rose-600 transition-all hover:bg-rose-100 active:scale-95"
          >
            <Trash2 size="{14}"/>
            <span>Vider le panier</span>
          </button>
        </div>

        {/* CONTENU : LISTE ARTICLES + RÉSUMÉ */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
          
          {/* LISTE DES ARTICLES */}
          <section className="space-y-3.5">
            {cart.map((item) => (
              <article
                key={item.id}
                className="group relative flex flex-col gap-4 rounded-2xl border border-gray-200/80 bg-white p-3.5 shadow-xs transition-all hover:border-gray-300 sm:flex-row sm:items-center sm:p-4"
              >
                {/* VIGNETTE PRODUIT */}
                <Link className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2 sm:h-28 sm:w-28" to="{`/produit/${item.slug}`}">
                  <img
                    src={item.images?.[0] || "/images/placeholder.webp"}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.webp";
                    }}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* DETAILS DU PRODUIT */}
                <div className="flex min-w-0 flex-1 flex-col justify-between space-y-3">
                  <div>
                    <Link className="text-xs font-bold text-gray-900 transition-colors hover:text-blue-600 sm:text-sm line-clamp-2" to="{`/produit/${item.slug}`}">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs font-extrabold text-blue-600">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* CONTROLES DE QUANTITE & SUPPRESSION */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    {/* STEPPER QUANTITÉ */}
                    <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/60 p-1">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label="Diminuer la quantité"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-700 shadow-2xs transition-all hover:bg-gray-100 active:scale-95"
                      >
                        <Minus size="{13}"/>
                      </button>

                      <span className="min-w-9 text-center text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        disabled={item.quantity >= item.stock}
                        aria-label="Augmenter la quantité"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-700 shadow-2xs transition-all hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white active:scale-95"
                      >
                        <Plus size="{13}"/>
                      </button>
                    </div>

                    {/* BOUTON SUPPRIMER */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="flex min-h-[36px] items-center gap-1 rounded-lg px-2.5 text-xs font-bold text-rose-500 transition-all hover:bg-rose-50 active:scale-95"
                    >
                      <Trash2 size="{14}"/>
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>

                {/* SOUS-TOTAL DE L'ARTICLE */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 sm:flex-col sm:items-end sm:justify-center sm:border-0 sm:pt-0 sm:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:hidden">
                    Sous-total
                  </span>
                  <p className="text-sm font-black text-gray-950 sm:text-base">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </article>
            ))}
          </section>

          {/* RÉSUMÉ DE LA COMMANDE (SIDEBAR) */}
          <aside className="h-fit rounded-3xl border border-gray-200/80 bg-white p-5 shadow-xs sm:p-6 lg:sticky lg:top-8">
            <h2 className="text-base font-extrabold text-gray-950 sm:text-lg">
              Résumé de la commande
            </h2>

            <div className="mt-5 space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Articles ({cartCount})</span>
                <span className="font-bold text-gray-900">{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Frais de livraison</span>
                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">
                  À confirmer
                </span>
              </div>
            </div>

            <div className="my-5 border-t border-gray-100" />

            {/* TOTAL */}
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-gray-900">Total estimé</span>
              <span className="text-xl font-black text-blue-600 sm:text-2xl">
                {formatPrice(cartTotal)}
              </span>
            </div>

            {/* BOUTON COMMANDER VIA WHATSAPP */}
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.98] sm:text-sm"
            >
              <MessageCircle className="fill-white/20" size="{20}"/>
              <span>Commander sur WhatsApp</span>
            </button>

            {/* MESSAGE REASSURANCE */}
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-gray-50 p-3 text-[11px] leading-relaxed text-gray-500">
              <ShieldCheck className="mt-0.5 shrink-0 text-emerald-600" size="{16}"/>
              <p>
                Commande directe. Les modalités et frais de livraison seront validés directement avec notre équipe.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}