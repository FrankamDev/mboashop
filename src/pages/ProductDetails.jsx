import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
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
  const galleryRef = useRef(null);

  const images = product?.images?.length
    ? product.images
    : ["/images/placeholder.webp"];

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setSelectedColor(product?.variants?.colors?.[0] || "");
  }, [slug]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setZoomOpen(false);
        setOrderOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (!product) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <PackageCheck size={48} className="text-slate-300" />

        <h1 className="mt-5 text-3xl font-bold text-slate-900">
          Produit introuvable
        </h1>

        <p className="mt-3 text-slate-500">
          Ce produit n'est pas disponible actuellement.
        </p>

        <Link
          to="/all-products"
          className="mt-7 rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white"
        >
          Découvrir nos produits
        </Link>
      </main>
    );
  }

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  const total = product.price * quantity;

  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category &&
        item.isPublished
    )
    .slice(0, 4);

  const changeImage = (direction) => {
    setActiveImage((current) => {
      return (current + direction + images.length) % images.length;
    });
  };

  const handleMouseMove = (event) => {
    if (!imageRef.current || window.innerWidth < 1024) return;

    const rect = imageRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;

    imageRef.current.style.transform = `
      perspective(1100px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.025, 1.025, 1.025)
    `;
  };

  const resetImagePosition = () => {
    if (imageRef.current) {
      imageRef.current.style.transform =
        "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Découvre ${product.name} sur MBOASHOP`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // L'utilisateur peut simplement annuler le partage.
    }
  };

  const handleOrder = (event) => {
    event.preventDefault();

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
    `;

    const whatsappUrl = `https://wa.me/237690372977?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#15171c]">

      {/* Fil d'Ariane */}
      <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/" className="transition hover:text-blue-600">
              Accueil
            </Link>

            <ChevronRight size={13} />

            <Link
              to="/all-products"
              className="transition hover:text-blue-600"
            >
              Boutique
            </Link>

            <ChevronRight size={13} />

            <span className="max-w-[150px] truncate font-semibold text-slate-700">
              {product.name}
            </span>
          </div>

          <Link
            to="/all-products"
            className="hidden items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-blue-600 sm:flex"
          >
            <ArrowLeft size={15} />
            Retour à la boutique
          </Link>
        </div>
      </div>

      {/* Zone principale */}
      <section className="mx-auto max-w-[1440px] px-4 pb-16 pt-7 sm:px-8 sm:pt-10 lg:px-12 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">

          {/* GALERIE */}
          <div className="min-w-0">

            <div className="relative">

              {/* Grande image */}
              <div
                ref={galleryRef}
                className="relative overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.25)] sm:rounded-[36px]"
              >
                {/* Décoration de fond */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
                  <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

                  <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>

                {/* Étiquette */}
                {product.badge && (
                  <div className="absolute left-5 top-5 z-20">
                    <span className="rounded-full bg-[#111827] px-4 py-2 text-[10px] font-bold tracking-[0.15em] text-white shadow-lg">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Remise */}
                {discount > 0 && (
                  <div className="absolute right-5 top-5 z-20">
                    <span className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                      -{discount}%
                    </span>
                  </div>
                )}

                {/* Image */}
                <div
                  className="relative flex aspect-square items-center justify-center p-8 sm:p-12 lg:p-16"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={resetImagePosition}
                >
                  <div className="pointer-events-none absolute bottom-[12%] left-[20%] right-[20%] h-8 rounded-[50%] bg-slate-900/10 blur-2xl" />

                  <img
                    ref={imageRef}
                    src={images[activeImage]}
                    alt={product.name}
                    onError={(event) => {
                      event.currentTarget.src = "/images/placeholder.webp";
                    }}
                    className="relative z-10 max-h-full w-full object-contain drop-shadow-[0_30px_25px_rgba(15,23,42,0.18)] transition-transform duration-300 ease-out will-change-transform"
                  />
                </div>

                {/* Zoom */}
                <button
                  onClick={() => setZoomOpen(true)}
                  className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:scale-110 hover:bg-slate-950 hover:text-white"
                  aria-label="Agrandir l'image"
                >
                  <ZoomIn size={19} />
                </button>

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => changeImage(-1)}
                      className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/90 text-slate-800 shadow-md transition hover:bg-slate-950 hover:text-white sm:left-5"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={() => changeImage(1)}
                      className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/90 text-slate-800 shadow-md transition hover:bg-slate-950 hover:text-white sm:right-5"
                      aria-label="Image suivante"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Miniatures */}
              <div className="mt-5 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-2xl border-2 bg-white p-2 transition-all duration-300 sm:h-[94px] sm:w-[94px] ${
                      activeImage === index
                        ? "border-blue-600 shadow-[0_8px_25px_-10px_rgba(37,99,235,0.5)]"
                        : "border-transparent opacity-65 hover:border-slate-300 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      onError={(event) => {
                        event.currentTarget.src = "/images/placeholder.webp";
                      }}
                      className="h-full w-full object-contain"
                    />

                    {activeImage === index && (
                      <span className="absolute bottom-0 left-1/2 h-1 w-7 -translate-x-1/2 rounded-full bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>

              <p className="mt-2 text-[10px] font-medium tracking-wide text-slate-400">
                FAITES DÉFILER LES IMAGES POUR EXPLORER LE PRODUIT
              </p>
            </div>

            {/* Points de confiance */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
                <Truck className="mx-auto text-blue-600" size={22} />
                <p className="mt-2 text-[10px] font-bold text-slate-800 sm:text-xs">
                  Livraison
                </p>
                <p className="mt-1 text-[9px] text-slate-400">
                  Selon votre ville
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
                <ShieldCheck className="mx-auto text-blue-600" size={22} />
                <p className="mt-2 text-[10px] font-bold text-slate-800 sm:text-xs">
                  Assistance
                </p>
                <p className="mt-1 text-[9px] text-slate-400">
                  Avant commande
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
                <PackageCheck className="mx-auto text-blue-600" size={22} />
                <p className="mt-2 text-[10px] font-bold text-slate-800 sm:text-xs">
                  Disponibilité
                </p>
                <p className="mt-1 text-[9px] text-slate-400">
                  À confirmer
                </p>
              </div>
            </div>
          </div>

          {/* PANNEAU D'ACHAT */}
          <div className="lg:sticky lg:top-8 lg:h-fit">

            <div className="rounded-[28px] border border-white bg-white p-5 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.3)] sm:rounded-[32px] sm:p-8">

              {/* Catégorie et actions */}
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  {product.category}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setFavorite(!favorite)}
                    aria-label="Ajouter aux favoris"
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
                    onClick={handleShare}
                    aria-label="Partager le produit"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 text-slate-500 transition hover:bg-slate-50"
                  >
                    {copied ? <Check size={18} /> : <Share2 size={18} />}
                  </button>
                </div>
              </div>

              {/* Nom */}
              <h1 className="mt-7 text-[30px] font-extrabold leading-[1.12] tracking-[-0.045em] text-[#111827] sm:text-[40px]">
                {product.name}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                {product.shortDescription || product.description}
              </p>

              {/* Note */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star
                      key={item}
                      size={14}
                      className={
                        item <= Math.round(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }
                    />
                  ))}
                </div>

                <span className="text-xs font-bold text-slate-800">
                  {product.rating}
                </span>

                <span className="text-xs text-slate-400">
                  ({product.reviewsCount} avis)
                </span>
              </div>

              {/* Prix */}
              <div className="mt-8 rounded-2xl bg-[#f7f8fa] p-5">
                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-[32px] font-black tracking-[-0.04em] text-slate-950 sm:text-[38px]">
                    {formatPrice(product.price)}
                  </span>

                  {product.oldPrice > product.price && (
                    <span className="pb-1 text-sm text-slate-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                {discount > 0 && (
                  <p className="mt-2 text-xs font-semibold text-green-600">
                    Vous économisez {formatPrice(product.oldPrice - product.price)}
                  </p>
                )}
              </div>

              {/* Disponibilité */}
              <div className="mt-6 flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      product.stock > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  />

                  <span className="text-xs font-semibold text-slate-700">
                    {product.stock > 0
                      ? "Disponible"
                      : "Indisponible"}
                  </span>
                </div>

                <span className="text-xs text-slate-400">
                  {product.stock > 0
                    ? `${product.stock} unité(s) en stock`
                    : "Rupture de stock"}
                </span>
              </div>

              {/* Couleurs */}
              {product.variants?.colors?.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      Choisir une couleur
                    </span>

                    <span className="text-xs text-slate-400">
                      {selectedColor}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.variants.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
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

              {/* Quantité */}
              <div className="mt-7 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  Quantité
                </span>

                <div className="flex items-center rounded-xl border border-slate-200 p-1">
                  <button
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    disabled={quantity <= 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 disabled:opacity-30"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="min-w-10 text-center text-sm font-bold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((value) =>
                        Math.min(product.stock, value + 1)
                      )
                    }
                    disabled={quantity >= product.stock}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 disabled:opacity-30"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                <span className="text-sm text-slate-500">
                  Total de votre sélection
                </span>

                <span className="text-xl font-extrabold text-slate-950">
                  {formatPrice(total)}
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={() => setOrderOpen(true)}
                disabled={product.stock <= 0}
                className="group mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#111827] px-6 py-[18px] text-sm font-bold text-white shadow-[0_12px_25px_-12px_rgba(15,23,42,0.65)] transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_18px_35px_-12px_rgba(37,99,235,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag size={19} />
                Commander maintenant
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => setOrderOpen(true)}
                disabled={product.stock <= 0}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-xs font-bold text-green-700 transition hover:bg-green-100 disabled:opacity-40"
              >
                <MessageCircle size={17} />
                Commander via WhatsApp
              </button>

              <p className="mt-5 text-center text-[10px] leading-5 text-slate-400">
                Vous pourrez vérifier votre commande avant de l'envoyer sur WhatsApp.
              </p>
            </div>

            {/* Assistance */}
            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MessageCircle size={21} />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900">
                  Besoin d'informations ?
                </p>
                <a
                  href="https://wa.me/237690372977"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-xs font-medium text-blue-600 hover:underline"
                >
                  Contactez notre équipe
                </a>
              </div>

              <ArrowRight size={17} className="ml-auto text-slate-300" />
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION ET CARACTÉRISTIQUES */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-12">

          <div className="flex flex-wrap gap-8 border-b border-slate-100">
            {[
              { id: "description", label: "Description" },
              { id: "specifications", label: "Caractéristiques" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-5 text-sm font-bold transition ${
                  activeTab === tab.id
                    ? "text-blue-600"
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

          <div className="grid gap-12 pt-10 lg:grid-cols-2">
            <div>
              {activeTab === "description" ? (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                    À propos du produit
                  </p>

                  <h2 className="mt-4 max-w-lg text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl">
                    Découvrez chaque détail.
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-8 text-slate-500">
                    {product.description}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                    Informations techniques
                  </p>

                  <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950">
                    Les caractéristiques.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    Retrouvez les informations disponibles sur ce produit.
                  </p>
                </>
              )}
            </div>

            <div className="rounded-2xl bg-[#f7f8fa] p-6 sm:p-8">
              <h3 className="mb-6 text-sm font-bold text-slate-900">
                {activeTab === "description"
                  ? "Informations du produit"
                  : "Fiche technique"}
              </h3>

              <div className="space-y-4">
                {product.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-5 border-b border-slate-200 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-xs text-slate-500">
                      {spec.label}
                    </span>

                    <span className="text-right text-xs font-bold text-slate-800">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUITS SIMILAIRES */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                Vous pourriez aimer
              </p>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                Produits similaires
              </h2>
            </div>

            <Link
              to="/all-products"
              className="hidden items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-blue-600 sm:flex"
            >
              Voir toute la boutique
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/produit/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#f7f8fa] p-4">
                  <img
                    src={item.images?.[0] || "/images/placeholder.webp"}
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.src = "/images/placeholder.webp";
                    }}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="px-1 pb-1 pt-4">
                  <p className="line-clamp-2 min-h-9 text-xs font-bold text-slate-800">
                    {item.name}
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-slate-950">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ZOOM IMAGE */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-5 backdrop-blur-md"
          onClick={() => setZoomOpen(false)}
        >
          <button
            onClick={() => setZoomOpen(false)}
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Fermer"
          >
            <X size={23} />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              changeImage(-1);
            }}
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={images[activeImage]}
            alt={product.name}
           className="relative z-10 block h-full w-full select-none object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)] animate-in fade-in zoom-in-95 duration-300"
      draggable="false"
            onClick={(event) => event.stopPropagation()}
          />

          <button
            onClick={(event) => {
              event.stopPropagation();
              changeImage(1);
            }}
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8"
          >
            <ChevronRight size={22} />
          </button>

          <span className="absolute bottom-6 text-xs font-medium text-white/60">
            {activeImage + 1} / {images.length}
          </span>
        </div>
      )}

      {/* MODAL COMMANDE */}
      {orderOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setOrderOpen(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-[480px] overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                  MBOASHOP
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                  Votre commande
                </h2>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Renseignez vos coordonnées pour continuer sur WhatsApp.
                </p>
              </div>

              <button
                onClick={() => setOrderOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <X size={19} />
              </button>
            </div>

            {/* Résumé produit */}
            <div className="mt-7 flex gap-4 rounded-2xl bg-[#f7f8fa] p-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white p-2">
                <img
                  src={images[0]}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-bold text-slate-900">
                  {product.name}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Quantité : {quantity}
                </p>

                <p className="mt-2 font-extrabold text-blue-600">
                  {formatPrice(total)}
                </p>
              </div>
            </div>

            <form onSubmit={handleOrder} className="mt-7 space-y-4">
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
                  placeholder: "Ex : 690 00 00 00",
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
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    {field.label}
                  </label>

                  <input
                    required
                    type={field.type}
                    value={customer[field.name]}
                    onChange={(event) =>
                      setCustomer((current) => ({
                        ...current,
                        [field.name]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-[#159b55] py-4 text-sm font-bold text-white transition hover:bg-[#128348]"
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