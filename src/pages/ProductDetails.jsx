
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
  ZoomIn,
  MessageCircle,
  Star,
  PackageCheck,
} from "lucide-react";

import { products, formatPrice } from "../data/products";

const WHATSAPP_NUMBER = "237690372977";
const PLACEHOLDER = "/images/placeholder.webp";

export default function ProductDetails() {
  const { slug } = useParams();

  const product = products.find(
    (item) => item.slug === slug && item.isPublished
  );

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [zoomOpen, setZoomOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [copied, setCopied] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    city: "",
    neighborhood: "",
    phone: "",
  });

  const imageRef = useRef(null);
  const touchStartX = useRef(null);

  const images = useMemo(
    () =>
      product?.images?.length
        ? product.images
        : [PLACEHOLDER],
    [product]
  );

  const specifications = product?.specifications || [];
  const stock = Number(product?.stock ?? 0);
  const isAvailable = stock > 0;

  const discount =
    product?.oldPrice > product?.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  const total = (product?.price || 0) * quantity;

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter(
        (item) =>
          item.id !== product.id &&
          item.category === product.category &&
          item.isPublished
      )
      .slice(0, 4);
  }, [product]);

  // Réinitialiser les options lorsqu'on change de produit.
  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setSelectedColor(product?.variants?.colors?.[0] || "");
    setFavorite(false);
    setActiveTab("description");
  }, [slug]);

  // Fermer les fenêtres avec la touche Échap.
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setZoomOpen(false);
        setOrderOpen(false);
      }

      if (event.key === "ArrowLeft" && zoomOpen) {
        changeImage(-1);
      }

      if (event.key === "ArrowRight" && zoomOpen) {
        changeImage(1);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [zoomOpen, images.length]);

  // Empêcher le défilement de la page derrière les fenêtres modales.
  useEffect(() => {
    if (!zoomOpen && !orderOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [zoomOpen, orderOpen]);

  const changeImage = (direction) => {
    setActiveImage((current) => {
      return (current + direction + images.length) % images.length;
    });
  };

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = PLACEHOLDER;
  };

  // Effet de perspective sur ordinateur.
  const handleMouseMove = (event) => {
    if (!imageRef.current || window.innerWidth < 1024) return;

    const rect = imageRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 5;
    const rotateX = (0.5 - y) * 5;

    imageRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.025, 1.025, 1.025)
    `;
  };

  const resetImagePosition = () => {
    if (imageRef.current) {
      imageRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  // Navigation tactile dans la galerie.
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const difference =
      touchStartX.current - event.changedTouches[0].clientX;

    if (Math.abs(difference) > 50 && images.length > 1) {
      changeImage(difference > 0 ? 1 : -1);
    }

    touchStartX.current = null;
  };

  // Partager le produit.
  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Découvre ${product.name} sur MBOASHOP`,
          url,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);

        window.setTimeout(() => {
          setCopied(false);
        }, 2500);
      } else {
        window.prompt("Copiez le lien du produit :", url);
      }
    } catch (error) {
      // L'utilisateur peut annuler le partage.
    }
  };

  // Préparer la commande WhatsApp.
  const handleOrder = (event) => {
    event.preventDefault();

    if (!customer.name.trim() || !customer.phone.trim()) return;

    const message = `
Bonjour MBOASHOP, je souhaite passer une commande.

PRODUIT : ${product.name}
COULEUR : ${selectedColor || "Non précisée"}
QUANTITÉ : ${quantity}
PRIX UNITAIRE : ${formatPrice(product.price)}
TOTAL : ${formatPrice(total)}

INFORMATIONS CLIENT
Nom : ${customer.name}
Ville : ${customer.city}
Quartier : ${customer.neighborhood}
Téléphone : ${customer.phone}

Merci de me confirmer la disponibilité et les modalités de livraison.
    `.trim();

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setOrderOpen(false);
  };

  const updateCustomer = (event) => {
    const { name, value } = event.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Produit introuvable.
  if (!product) {
    return (
      <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#f8f9fb] px-5 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-sm">
          <PackageCheck size={34} className="text-slate-300" />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-[-0.04em] text-slate-900 sm:text-3xl">
          Produit introuvable
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
          Ce produit n'est pas disponible actuellement.
        </p>

        <Link
          to="/all-products"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          Découvrir nos produits
          <ArrowRight size={17} />
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f9fb] font-sans text-[#15171c]">
      {/* FIL D'ARIANE */}
      <div className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2 text-[11px] font-medium text-slate-400 sm:text-xs">
            <Link to="/" className="shrink-0 transition hover:text-blue-700">
              Accueil
            </Link>

            <ChevronRight size={13} className="shrink-0" />

            <Link
              to="/all-products"
              className="shrink-0 transition hover:text-blue-700"
            >
              Boutique
            </Link>

            <ChevronRight size={13} className="shrink-0" />

            <span className="max-w-[130px] truncate font-semibold text-slate-700 sm:max-w-xs">
              {product.name}
            </span>
          </div>

          <Link
            to="/all-products"
            className="hidden shrink-0 items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-blue-700 sm:flex"
          >
            <ArrowLeft size={15} />
            Retour à la boutique
          </Link>
        </div>
      </div>

      {/* ZONE PRINCIPALE */}
      <section className="mx-auto max-w-[1440px] px-4 pb-14 pt-6 sm:px-8 sm:pt-9 lg:px-12 lg:pb-20 lg:pt-12">
        <div className="grid items-start gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
          {/* GALERIE */}
          <div className="min-w-0">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_15px_50px_-35px_rgba(15,23,42,0.25)] sm:rounded-[30px]">
                {/* Fond décoratif */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl sm:h-80 sm:w-80" />

                  <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl" />

                  <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>

                {/* Badge produit */}
                {product.badge && (
                  <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
                    <span className="rounded-full bg-slate-950 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg sm:text-[10px]">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Réduction */}
                {discount > 0 && (
                  <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
                    <span className="rounded-full bg-red-500 px-3.5 py-2 text-[10px] font-bold text-white shadow-lg">
                      -{discount}%
                    </span>
                  </div>
                )}

                {/* Image principale */}
                <div
                  className="relative flex aspect-square items-center justify-center p-7 sm:p-12 lg:p-14"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={resetImagePosition}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="pointer-events-none absolute bottom-[12%] left-[20%] right-[20%] h-8 rounded-[50%] bg-slate-900/10 blur-2xl" />

                  <img
                    ref={imageRef}
                    src={images[activeImage]}
                    alt={product.name}
                    onError={handleImageError}
                    className="relative z-10 max-h-full w-full select-none object-contain drop-shadow-[0_25px_25px_rgba(15,23,42,0.15)] transition-transform duration-300 ease-out will-change-transform"
                  />
                </div>

                {/* Bouton zoom */}
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  aria-label="Agrandir l'image"
                  className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:scale-110 hover:bg-slate-950 hover:text-white sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
                >
                  <ZoomIn size={19} />
                </button>

                {/* Navigation des images */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => changeImage(-1)}
                      aria-label="Image précédente"
                      className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/90 text-slate-800 shadow-md transition hover:bg-slate-950 hover:text-white sm:left-5 sm:h-11 sm:w-11"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={() => changeImage(1)}
                      aria-label="Image suivante"
                      className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/90 text-slate-800 shadow-md transition hover:bg-slate-950 hover:text-white sm:right-5 sm:h-11 sm:w-11"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Miniatures */}
              {images.length > 1 && (
                <div className="mt-4 flex gap-2.5 overflow-x-auto pb-2 sm:mt-5 sm:gap-3">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`Afficher l'image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl border-2 bg-white p-2 transition-all duration-200 sm:h-[88px] sm:w-[88px] sm:rounded-2xl ${
                        activeImage === index
                          ? "border-blue-600 shadow-[0_8px_25px_-10px_rgba(37,99,235,0.5)]"
                          : "border-transparent opacity-65 hover:border-slate-300 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        onError={handleImageError}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />

                      {activeImage === index && (
                        <span className="absolute bottom-0 left-1/2 h-1 w-7 -translate-x-1/2 rounded-full bg-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <p className="mt-2 text-[9px] font-medium tracking-[0.08em] text-slate-400 sm:text-[10px]">
                FAITES DÉFILER LES IMAGES POUR EXPLORER LE PRODUIT
              </p>
            </div>

            {/* POINTS DE CONFIANCE */}
            <div className="mt-7 grid grid-cols-3 gap-2.5 sm:mt-8 sm:gap-3">
              <div className="rounded-2xl border border-slate-100 bg-white px-2 py-4 text-center sm:p-4">
                <Truck size={21} className="mx-auto text-blue-600" />

                <p className="mt-2 text-[10px] font-semibold text-slate-800 sm:text-xs">
                  Livraison
                </p>

                <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">
                  Selon votre ville
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white px-2 py-4 text-center sm:p-4">
                <ShieldCheck size={21} className="mx-auto text-blue-600" />

                <p className="mt-2 text-[10px] font-semibold text-slate-800 sm:text-xs">
                  Assistance
                </p>

                <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">
                  Avant commande
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white px-2 py-4 text-center sm:p-4">
                <PackageCheck size={21} className="mx-auto text-blue-600" />

                <p className="mt-2 text-[10px] font-semibold text-slate-800 sm:text-xs">
                  Disponibilité
                </p>

                <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">
                  À confirmer
                </p>
              </div>
            </div>
          </div>

          {/* PANNEAU D'ACHAT */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_15px_50px_-35px_rgba(15,23,42,0.25)] sm:rounded-[28px] sm:p-7 lg:p-8">
              {/* Catégorie et actions */}
              <div className="flex items-center justify-between gap-3">
                <span className="max-w-[65%] truncate rounded-full bg-blue-50 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-700 sm:text-[10px]">
                  {product.category}
                </span>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => setFavorite((value) => !value)}
                    aria-label={
                      favorite
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"
                    }
                    aria-pressed={favorite}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                      favorite
                        ? "border-red-100 bg-red-50 text-red-500"
                        : "border-slate-100 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Heart
                      size={18}
                      className={favorite ? "fill-current" : ""}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Partager le produit"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 text-slate-500 transition hover:bg-slate-50"
                  >
                    {copied ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Share2 size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Nom du produit */}
              <h1 className="mt-6 text-[27px] font-bold leading-[1.15] tracking-[-0.045em] text-[#111827] sm:mt-7 sm:text-[36px] lg:text-[40px]">
                {product.name}
              </h1>

              {/* Description courte */}
              <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-500 sm:mt-4 sm:text-sm sm:leading-7">
                {product.shortDescription || product.description}
              </p>

              {/* Évaluation */}
              {product.rating != null && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Star
                        key={item}
                        size={13}
                        className={
                          item <= Math.round(Number(product.rating))
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }
                      />
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-slate-800">
                    {product.rating}
                  </span>

                  <span className="text-xs text-slate-400">
                    ({product.reviewsCount ?? 0} avis)
                  </span>
                </div>
              )}

              {/* PRIX */}
              <div className="mt-7 rounded-2xl bg-[#f7f8fa] p-4 sm:mt-8 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Prix du produit
                </p>

                <div className="mt-2 flex flex-wrap items-end gap-3">
                  <span className="text-[29px] font-bold tracking-[-0.045em] text-slate-950 sm:text-[36px]">
                    {formatPrice(product.price)}
                  </span>

                  {product.oldPrice > product.price && (
                    <span className="pb-1 text-sm font-medium text-slate-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                {discount > 0 && (
                  <p className="mt-2 text-xs font-semibold text-green-600">
                    Vous économisez{" "}
                    {formatPrice(product.oldPrice - product.price)}
                  </p>
                )}
              </div>

              {/* DISPONIBILITÉ */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isAvailable ? "bg-green-500" : "bg-red-500"
                    }`}
                  />

                  <span className="text-xs font-semibold text-slate-700">
                    {isAvailable ? "Disponible" : "Indisponible"}
                  </span>
                </div>

                <span className="text-[11px] text-slate-400 sm:text-xs">
                  {isAvailable
                    ? `${stock} unité(s) en stock`
                    : "Rupture de stock"}
                </span>
              </div>

              {/* COULEURS */}
              {product.variants?.colors?.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-[13px] font-semibold text-slate-900">
                      Choisir une couleur
                    </span>

                    <span className="text-xs font-medium text-slate-400">
                      {selectedColor}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.variants.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        aria-pressed={selectedColor === color}
                        className={`rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                          selectedColor === color
                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
                        }`}
                      >
                        {selectedColor === color && (
                          <Check size={12} className="mr-1 inline" />
                        )}

                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* QUANTITÉ */}
              <div className="mt-7 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-900">
                  Quantité
                </span>

                <div className="flex items-center rounded-xl border border-slate-200 p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    disabled={quantity <= 1}
                    aria-label="Diminuer la quantité"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 disabled:opacity-30"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="min-w-10 text-center text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) =>
                        Math.min(stock, value + 1)
                      )
                    }
                    disabled={quantity >= stock}
                    aria-label="Augmenter la quantité"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 disabled:opacity-30"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* TOTAL */}
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <span className="text-xs font-medium text-slate-500 sm:text-sm">
                  Total de votre sélection
                </span>

                <span className="text-lg font-bold tracking-[-0.03em] text-slate-950 sm:text-xl">
                  {formatPrice(total)}
                </span>
              </div>

              {/* COMMANDER */}
              <button
                type="button"
                onClick={() => setOrderOpen(true)}
                disabled={!isAvailable}
                className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#111827] px-5 py-4 text-[13px] font-semibold text-white shadow-[0_12px_25px_-12px_rgba(15,23,42,0.65)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_18px_35px_-12px_rgba(37,99,235,0.4)] disabled:cursor-not-allowed disabled:opacity-40 sm:rounded-2xl sm:py-[18px] sm:text-sm"
              >
                <ShoppingBag size={18} />
                Commander maintenant
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => setOrderOpen(true)}
                disabled={!isAvailable}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3.5 text-xs font-semibold text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40 sm:rounded-2xl sm:py-4"
              >
                <MessageCircle size={17} />
                Commander via WhatsApp
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-slate-400">
                Vous pourrez vérifier votre commande avant de l'envoyer sur
                WhatsApp.
              </p>
            </div>

            {/* ASSISTANCE */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 sm:mt-5 sm:gap-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-11 sm:w-11">
                <MessageCircle size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900">
                  Besoin d'informations ?
                </p>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-[11px] font-medium text-blue-600 transition hover:underline sm:text-xs"
                >
                  Contactez notre équipe
                </a>
              </div>

              <ArrowRight
                size={17}
                className="ml-auto shrink-0 text-slate-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION ET CARACTÉRISTIQUES */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
          {/* ONGLETS */}
          <div className="flex gap-7 border-b border-slate-100 sm:gap-9">
            {[
              { id: "description", label: "Description" },
              { id: "specifications", label: "Caractéristiques" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-4 text-[12px] font-semibold transition sm:pb-5 sm:text-sm ${
                  activeTab === tab.id
                    ? "text-blue-700"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab.label}

                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </div>

          <div className="grid gap-9 pt-8 sm:pt-10 lg:grid-cols-2 lg:gap-12">
            {/* TEXTE */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-600">
                {activeTab === "description"
                  ? "À propos du produit"
                  : "Informations techniques"}
              </p>

              <h2 className="mt-4 max-w-lg text-[24px] font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-3xl">
                {activeTab === "description"
                  ? "Découvrez chaque détail."
                  : "Les caractéristiques."}
              </h2>

              <p className="mt-4 max-w-xl whitespace-pre-line text-[13px] leading-7 text-slate-500 sm:mt-5 sm:text-sm sm:leading-8">
                {activeTab === "description"
                  ? product.description ||
                    product.shortDescription ||
                    "Aucune description disponible pour ce produit."
                  : "Retrouvez les informations disponibles sur ce produit."}
              </p>
            </div>

            {/* FICHE TECHNIQUE */}
            <div className="rounded-2xl bg-[#f7f8fa] p-5 sm:p-7">
              <h3 className="mb-5 text-[13px] font-semibold text-slate-900 sm:mb-6 sm:text-sm">
                {activeTab === "description"
                  ? "Informations du produit"
                  : "Fiche technique"}
              </h3>

              {specifications.length > 0 ? (
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div
                      key={spec.label || index}
                      className="flex justify-between gap-5 border-b border-slate-200 pb-4 last:border-0 last:pb-0"
                    >
                      <span className="text-xs text-slate-500">
                        {spec.label}
                      </span>

                      <span className="text-right text-xs font-semibold text-slate-800">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs leading-6 text-slate-400">
                  Aucune caractéristique supplémentaire disponible pour ce
                  produit.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUITS SIMILAIRES */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mb-7 flex items-end justify-between gap-4 sm:mb-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-600">
                Vous pourriez aimer
              </p>

              <h2 className="mt-2 text-[23px] font-bold tracking-[-0.04em] text-slate-950 sm:mt-3 sm:text-3xl">
                Produits similaires
              </h2>
            </div>

            <Link
              to="/all-products"
              className="hidden shrink-0 items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-blue-600 sm:flex"
            >
              Voir toute la boutique
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/produit/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white p-2.5 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-3"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#f7f8fa] p-3 sm:p-4">
                  <img
                    src={item.images?.[0] || PLACEHOLDER}
                    alt={item.name}
                    onError={handleImageError}
                    loading="lazy"
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="px-1 pb-1 pt-3 sm:pt-4">
                  <p className="line-clamp-2 min-h-9 text-[11px] font-semibold leading-5 text-slate-800 sm:text-xs">
                    {item.name}
                  </p>

                  <p className="mt-2 text-[13px] font-bold tracking-[-0.02em] text-slate-950 sm:text-sm">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            to="/all-products"
            className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-blue-700 sm:hidden"
          >
            Voir toute la boutique
            <ArrowRight size={15} />
          </Link>
        </section>
      )}

      {/* ZOOM IMAGE */}
      {zoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu du produit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label="Fermer"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <X size={22} />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                changeImage(-1);
              }}
              aria-label="Image précédente"
              className="absolute left-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          <img
            src={images[activeImage]}
            alt={product.name}
            onError={handleImageError}
            draggable="false"
            onClick={(event) => event.stopPropagation()}
            className="relative z-10 max-h-[85vh] max-w-full select-none object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          />

          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                changeImage(1);
              }}
              aria-label="Image suivante"
              className="absolute right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:h-12 sm:w-12"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <span className="absolute bottom-5 text-xs font-medium text-white/60">
            {activeImage + 1} / {images.length}
          </span>
        </div>
      )}

      {/* MODAL COMMANDE */}
      {orderOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-title"
          className="fixed inset-0 z-[110] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setOrderOpen(false)}
        >
          <div
            className="max-h-[94dvh] w-full max-w-[480px] overflow-y-auto rounded-t-[26px] bg-white p-5 shadow-2xl sm:max-h-[92vh] sm:rounded-[28px] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            {/* En-tête */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-600">
                  MBOASHOP
                </p>

                <h2
                  id="order-title"
                  className="mt-2 text-[23px] font-bold tracking-[-0.04em] text-slate-950 sm:text-2xl"
                >
                  Votre commande
                </h2>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Renseignez vos coordonnées pour continuer sur WhatsApp.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOrderOpen(false)}
                aria-label="Fermer la fenêtre"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Résumé produit */}
            <div className="mt-6 flex gap-3 rounded-2xl bg-[#f7f8fa] p-3.5 sm:mt-7 sm:gap-4 sm:p-4">
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl bg-white p-2 sm:h-20 sm:w-20">
                <img
                  src={images[0]}
                  alt={product.name}
                  onError={handleImageError}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-[12px] font-semibold leading-5 text-slate-900 sm:text-sm">
                  {product.name}
                </p>

                {selectedColor && (
                  <p className="mt-1 text-[10px] text-slate-500">
                    Couleur : {selectedColor}
                  </p>
                )}

                <p className="mt-1.5 text-[11px] text-slate-500">
                  Quantité : {quantity}
                </p>

                <p className="mt-1.5 text-sm font-bold text-blue-600">
                  {formatPrice(total)}
                </p>
              </div>
            </div>

            {/* FORMULAIRE */}
            <form onSubmit={handleOrder} className="mt-6 space-y-4 sm:mt-7">
              {[
                {
                  name: "name",
                  label: "Nom complet",
                  placeholder: "Votre nom et prénom",
                  type: "text",
                },
                {
                  name: "phone",
                  label: "Téléphone",
                  placeholder: "Ex : 690 46 18 30",
                  type: "tel",
                },
                {
                  name: "city",
                  label: "Ville",
                  placeholder: "Ex : Yaoundé",
                  type: "text",
                },
                {
                  name: "neighborhood",
                  label: "Quartier",
                  placeholder: "Ex : Bastos",
                  type: "text",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={`customer-${field.name}`}
                    className="mb-2 block text-[11px] font-semibold text-slate-700 sm:text-xs"
                  >
                    {field.label}
                  </label>

                  <input
                    id={`customer-${field.name}`}
                    name={field.name}
                    required
                    type={field.type}
                    value={customer[field.name]}
                    onChange={updateCustomer}
                    placeholder={field.placeholder}
                    autoComplete={
                      field.name === "name"
                        ? "name"
                        : field.name === "phone"
                          ? "tel"
                          : "off"
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-[#159b55] py-4 text-[13px] font-semibold text-white transition hover:bg-[#128348] active:scale-[0.99]"
              >
                <MessageCircle size={19} />
                Continuer sur WhatsApp
                <ArrowRight size={17} />
              </button>

              <p className="text-center text-[10px] leading-5 text-slate-400">
                Aucune commande n'est envoyée automatiquement. Vous pourrez
                vérifier et envoyer votre message dans WhatsApp.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
