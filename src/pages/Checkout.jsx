import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Phone,
  User,
  Truck,
  ShoppingBag,
  ShieldCheck,
  MessageCircle,
  AlertCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

const WHATSAPP_NUMBER = "237690372977";

export default function Checkout() {
  const navigate = useNavigate();

  const { cart, cartCount, cartTotal, isEmpty } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "Yaoundé",
    neighborhood: "",
    deliveryMethod: "home",
    note: "",
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Votre nom est requis.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Votre numéro est requis.";
    } else if (!/^[0-9+\s()-]{8,}$/.test(form.phone.trim())) {
      newErrors.phone = "Numéro de téléphone invalide.";
    }

    if (!form.city.trim()) {
      newErrors.city = "Votre ville est requise.";
    }

    if (!form.neighborhood.trim()) {
      newErrors.neighborhood = "Votre quartier est requis.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const generateOrderReference = () => {
    const random = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();

    return `MBOA-${random}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEmpty) {
      navigate("/cart");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const orderReference = generateOrderReference();

    const deliveryLabel =
      form.deliveryMethod === "home"
        ? "Livraison à domicile"
        : "Point de rendez-vous";

    const message = `
Bonjour MBOASHOP,

Je souhaite confirmer ma commande ${orderReference}.

👤 CLIENT
Nom : ${form.name}
Téléphone : ${form.phone}

📍 LIVRAISON
Ville : ${form.city}
Quartier : ${form.neighborhood}
Mode : ${deliveryLabel}

🛒 PRODUITS
${cart
  .map(
    (item, index) =>
      `${index + 1}. ${item.name}
Quantité : ${item.quantity}
Prix unitaire : ${formatPrice(item.price)}
Sous-total : ${formatPrice(item.price * item.quantity)}`
  )
  .join("\n\n")}

📦 TOTAL
${cartCount} article(s)
Sous-total : ${formatPrice(cartTotal)}
Livraison : À confirmer
Total estimé : ${formatPrice(cartTotal)}

${form.note ? `📝 NOTE\n${form.note}\n` : ""}

Merci de me confirmer la disponibilité et les frais de livraison.
    `.trim();

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    // Sauvegarde locale temporaire de la commande.
    const order = {
      reference: orderReference,
      customer: {
        name: form.name,
        phone: form.phone,
        city: form.city,
        neighborhood: form.neighborhood,
        deliveryMethod: form.deliveryMethod,
        note: form.note,
      },
      items: cart,
      subtotal: cartTotal,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(
        `mboashop-order-${orderReference}`,
        JSON.stringify(order)
      );

      localStorage.setItem(
        "mboashop-last-order",
        JSON.stringify(order)
      );
    } catch (error) {
      console.error(
        "Impossible de sauvegarder la commande :",
        error
      );
    }

    navigate(`/order-success?reference=${orderReference}`);
  };

  if (isEmpty) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <ShoppingBag size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
            Votre panier est vide
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Ajoutez des produits avant de passer commande.
          </p>

          <Link
            to="/all-products"
            className="mt-6 flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Découvrir la boutique
            <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/70 px-4 py-7 transition-colors duration-300 dark:bg-slate-950 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Retour */}
        <Link
          to="/cart"
          className="inline-flex min-h-10 items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 sm:text-sm"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <ArrowLeft size={15} />
          </span>

          Retour au panier
        </Link>

        {/* Header */}
        <div className="mt-6 border-b border-slate-200 pb-6 dark:border-slate-800">
          <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-blue-600 dark:text-blue-400">
            MBOASHOP / CHECKOUT
          </span>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Finaliser ma commande
          </h1>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Renseignez vos informations pour recevoir votre commande.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px]"
        >
          {/* FORMULAIRE */}
          <section className="space-y-5">

            {/* Informations client */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <User size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-950 dark:text-white">
                    Informations client
                  </h2>

                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    Comment pouvons-nous vous contacter ?
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {/* Nom */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Nom complet *
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        updateField("name", e.target.value)
                      }
                      placeholder="Ex : Frank Kamgang"
                      className={`
                        min-h-[50px] w-full rounded-xl border
                        bg-slate-50 pl-10 pr-4 text-sm
                        font-medium text-slate-900
                        outline-none transition
                        placeholder:text-slate-400
                        focus:bg-white focus:ring-4
                        dark:bg-slate-800/70
                        dark:text-white
                        dark:placeholder:text-slate-500
                        dark:focus:bg-slate-800
                        ${
                          errors.name
                            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/10 dark:border-rose-800"
                            : "border-slate-200 focus:border-blue-400 focus:ring-blue-500/10 dark:border-slate-700"
                        }
                      `}
                    />
                  </div>

                  {errors.name && (
                    <ErrorMessage message={errors.name} />
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Téléphone *
                  </label>

                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        updateField("phone", e.target.value)
                      }
                      placeholder="6 XX XX XX XX"
                      className={inputClass(errors.phone)}
                    />
                  </div>

                  {errors.phone && (
                    <ErrorMessage message={errors.phone} />
                  )}
                </div>

                {/* Ville */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Ville *
                  </label>

                  <select
                    value={form.city}
                    onChange={(e) =>
                      updateField("city", e.target.value)
                    }
                    className={inputClass(errors.city)}
                  >
                    <option value="Yaoundé">Yaoundé</option>
                    <option value="Douala">Douala</option>
                    <option value="Bafoussam">Bafoussam</option>
                    <option value="Autre">Autre</option>
                  </select>

                  {errors.city && (
                    <ErrorMessage message={errors.city} />
                  )}
                </div>

                {/* Quartier */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Quartier / lieu de livraison *
                  </label>

                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={form.neighborhood}
                      onChange={(e) =>
                        updateField(
                          "neighborhood",
                          e.target.value
                        )
                      }
                      placeholder="Ex : Oyomabang, Camp Sonel..."
                      className={inputClass(
                        errors.neighborhood
                      )}
                    />
                  </div>

                  {errors.neighborhood && (
                    <ErrorMessage
                      message={errors.neighborhood}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Livraison */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Truck size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-950 dark:text-white">
                    Mode de livraison
                  </h2>

                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    Choisissez votre préférence.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                <DeliveryOption
                  value="home"
                  selected={form.deliveryMethod}
                  onChange={(value) =>
                    updateField(
                      "deliveryMethod",
                      value
                    )
                  }
                  icon={<Truck size={18} />}
                  title="À domicile"
                  description="Livraison à votre adresse"
                />

                <DeliveryOption
                  value="meeting"
                  selected={form.deliveryMethod}
                  onChange={(value) =>
                    updateField(
                      "deliveryMethod",
                      value
                    )
                  }
                  icon={<MapPin size={18} />}
                  title="Point de rendez-vous"
                  description="Lieu convenu avec vous"
                />
              </div>
            </div>

            {/* Note */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Note de commande
                <span className="ml-1 font-normal text-slate-400">
                  (facultatif)
                </span>
              </label>

              <textarea
                value={form.note}
                onChange={(e) =>
                  updateField("note", e.target.value)
                }
                rows={4}
                placeholder="Une précision pour votre commande..."
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-800"
              />
            </div>
          </section>

          {/* RÉSUMÉ */}
          <aside className="h-fit rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:sticky lg:top-28">

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <ShoppingBag size={18} />
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Résumé
                </h2>

                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  {cartCount} article(s)
                </p>
              </div>
            </div>

            {/* Produits */}
            <div className="mt-5 max-h-72 space-y-3 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800">
                    <img
                      src={
                        item.images?.[0] ||
                        "/images/placeholder.webp"
                      }
                      alt={item.name}
                      className="h-full w-full object-contain p-1.5"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/placeholder.webp";
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[11px] font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Qté : {item.quantity}
                    </p>
                  </div>

                  <p className="text-[11px] font-black text-slate-900 dark:text-white">
                    {formatPrice(
                      item.price * item.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 dark:border-slate-800">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Sous-total
                </span>

                <span className="font-bold text-slate-900 dark:text-white">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Livraison
                </span>

                <span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                  À confirmer
                </span>
              </div>

              <div className="border-t border-dashed border-slate-200 dark:border-slate-800" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Total estimé
                </span>

                <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="mt-6 flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-4 text-xs font-extrabold text-white shadow-lg shadow-emerald-600/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-[0.98] sm:text-sm"
            >
              <MessageCircle size={18} />
              Confirmer sur WhatsApp
            </button>

            {/* Réassurance */}
            <div className="mt-5 flex items-start gap-2.5 border-t border-slate-100 pt-4 dark:border-slate-800">
              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
                Vos informations sont utilisées uniquement
                pour traiter votre commande.
              </p>
            </div>

            <div className="mt-3 flex items-start gap-2.5">
              <AlertCircle
                size={16}
                className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
              />

              <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
                Le montant de la livraison sera confirmé
                avec notre équipe avant validation.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

/* =========================
   COMPOSANTS
========================= */

function inputClass(error) {
  return `
    min-h-[50px] w-full rounded-xl border
    bg-slate-50 px-4 text-sm
    font-medium text-slate-900
    outline-none transition
    placeholder:text-slate-400
    focus:bg-white focus:ring-4

    dark:bg-slate-800/70
    dark:text-white
    dark:placeholder:text-slate-500
    dark:focus:bg-slate-800

    ${
      error
        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/10 dark:border-rose-800"
        : "border-slate-200 focus:border-blue-400 focus:ring-blue-500/10 dark:border-slate-700"
    }
  `;
}

function ErrorMessage({ message }) {
  return (
    <p className="mt-1.5 text-[10px] font-semibold text-rose-500">
      {message}
    </p>
  );
}

function DeliveryOption({
  value,
  selected,
  onChange,
  icon,
  title,
  description,
}) {
  const active = selected === value;

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`
        flex min-h-[78px] items-center gap-3
        rounded-xl border p-3.5 text-left
        transition-all

        ${
          active
            ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/10 dark:border-blue-500 dark:bg-blue-500/10"
            : "border-slate-200 bg-slate-50 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-500/50"
        }
      `}
    >
      <div
        className={`
          flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
          ${
            active
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-400 dark:bg-slate-700 dark:text-slate-400"
          }
        `}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-xs font-extrabold ${
            active
              ? "text-blue-700 dark:text-blue-400"
              : "text-slate-900 dark:text-white"
          }`}
        >
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
          {description}
        </p>
      </div>

      {active && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
          <Check size={12} strokeWidth={3} />
        </div>
      )}
    </button>
  );
}