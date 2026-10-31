
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  MessageCircle,
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
      `https://wa.me/237690372977?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#f7f8fa] px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <ShoppingBag size={40} />
          </div>

          <h1 className="mt-7 text-3xl font-extrabold text-slate-950">
            Votre panier est vide
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Découvrez notre sélection de produits et ajoutez vos articles préférés.
          </p>

          <Link
            to="/all-products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Découvrir la boutique
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/all-products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Continuer mes achats
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              MBOASHOP
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Mon panier
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {cartCount} article(s) dans votre panier
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-semibold text-red-500 hover:text-red-700"
          >
            Vider le panier
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {cart.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <Link
                  to={`/produit/${item.slug}`}
                  className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-[#f7f8fa] p-3 sm:w-28"
                >
                  <img
                    src={item.images?.[0] || "/images/placeholder.webp"}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.webp";
                    }}
                    className="h-full w-full object-contain"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    to={`/produit/${item.slug}`}
                    className="font-bold text-slate-900 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>

                  <p className="mt-2 text-sm font-bold text-blue-600">
                    {formatPrice(item.price)}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center rounded-lg border border-slate-200 p-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-9 text-center text-sm font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        disabled={item.quantity >= item.stock}
                        className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100 disabled:opacity-30"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={15} />
                      Supprimer
                    </button>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    Sous-total
                  </p>

                  <p className="mt-1 text-lg font-extrabold text-slate-950">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:sticky lg:top-8">
            <h2 className="text-xl font-extrabold text-slate-950">
              Résumé de la commande
            </h2>

            <div className="mt-7 flex justify-between text-sm">
              <span className="text-slate-500">Articles</span>
              <span className="font-semibold">{cartCount}</span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-slate-500">Sous-total</span>
              <span className="font-semibold">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-slate-500">Livraison</span>
              <span className="text-xs font-medium text-slate-400">
                À confirmer
              </span>
            </div>

            <div className="my-6 border-t border-slate-100" />

            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-xl font-extrabold text-blue-600">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-sm font-bold text-white transition hover:bg-green-700"
            >
              <MessageCircle size={19} />
              Commander sur WhatsApp
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-slate-400">
              Les frais de livraison seront confirmés avec notre équipe.
              Vous pourrez vérifier votre commande avant de l'envoyer.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
