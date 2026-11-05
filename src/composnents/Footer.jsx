import {
  ArrowRight,
  MapPin,
  Phone,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SocialIcons } from "./icons/SocialIcons";

const whatsappNumber = "237690372977";
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white text-gray-900 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
      {/* CTA principal */}
      <div className="bg-gray-50 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 sm:text-xs">
              MboaShop
            </span>

            <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-gray-950 sm:text-2xl dark:text-white">
              Trouvez ce qu’il vous faut, simplement.
            </h2>

            <p className="mt-1.5 max-w-md text-xs leading-5 text-gray-500 sm:text-sm dark:text-slate-400">
              Découvrez nos produits et commandez facilement depuis votre
              téléphone.
            </p>
          </div>

          <Link
            to="/produits"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-600 sm:w-fit sm:px-5 sm:text-sm dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
          >
            Découvrir les produits
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-10">

          {/* Marque */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
                M
              </div>

              <div>
                <div className="text-base font-black tracking-tight">
                  MBOA<span className="text-blue-600">SHOP</span>
                </div>

                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-slate-500">
                  Shopping simple
                </p>
              </div>
            </Link>

            <p className="mt-3 max-w-xs text-[11px] leading-5 text-gray-500 sm:text-xs dark:text-slate-400">
              Votre boutique en ligne pour découvrir des produits pratiques,
              modernes et accessibles.
            </p>

            {/* Réseaux */}
            {/* <div className="mt-4 flex items-center gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-[11px] font-black text-gray-700 transition hover:border-gray-950 hover:bg-gray-950 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-950"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-[9px] font-black text-gray-700 transition hover:border-gray-950 hover:bg-gray-950 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-950"
              >
                IG
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-green-500 hover:bg-green-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <MessageCircle size={14} />
              </a>
            </div> */}

            <div className="mt-4 flex items-center gap-2">
  <a
    href="#"
    aria-label="Facebook"
    className="
      flex h-8 w-8 items-center justify-center rounded-full
      border border-gray-200 bg-white text-gray-700
      transition-all duration-200
      hover:border-blue-600 hover:bg-blue-600 hover:text-white
      dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300
      dark:hover:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white
    "
  >
    <SocialIcons.Facebook size={13} />
  </a>

  <a
    href="#"
    aria-label="Instagram"
    className="
      flex h-8 w-8 items-center justify-center rounded-full
      border border-gray-200 bg-white text-gray-700
      transition-all duration-200
      hover:border-pink-500 hover:bg-pink-500 hover:text-white
      dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300
      dark:hover:border-pink-500 dark:hover:bg-pink-500 dark:hover:text-white
    "
  >
    <SocialIcons.Instagram size={14} />
  </a>

  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="
      flex h-8 w-8 items-center justify-center rounded-full
      border border-gray-200 bg-white text-gray-700
      transition-all duration-200
      hover:border-green-500 hover:bg-green-500 hover:text-white
      dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300
      dark:hover:border-green-500 dark:hover:bg-green-500 dark:hover:text-white
    "
  >
    <SocialIcons.WhatsApp size={15} />
  </a>
</div>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="mb-3 text-[11px] font-extrabold text-gray-950 sm:text-xs dark:text-white">
              Boutique
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/produits"
                  className="group flex items-center text-[11px] text-gray-500 transition hover:text-blue-600 sm:text-xs dark:text-slate-400"
                >
                  <ChevronRight
                    size={11}
                    className="mr-1 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                  Tous les produits
                </Link>
              </li>

              <li>
                <Link
                  to="/produits?sort=popular"
                  className="group flex items-center text-[11px] text-gray-500 transition hover:text-blue-600 sm:text-xs dark:text-slate-400"
                >
                  <ChevronRight
                    size={11}
                    className="mr-1 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                  Produits populaires
                </Link>
              </li>

              <li>
                <Link
                  to="/produits?sort=price-asc"
                  className="group flex items-center text-[11px] text-gray-500 transition hover:text-blue-600 sm:text-xs dark:text-slate-400"
                >
                  <ChevronRight
                    size={11}
                    className="mr-1 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                  Petits prix
                </Link>
              </li>

              <li>
                <Link
                  to="/produits?category=Gadgets"
                  className="group flex items-center text-[11px] text-gray-500 transition hover:text-blue-600 sm:text-xs dark:text-slate-400"
                >
                  <ChevronRight
                    size={11}
                    className="mr-1 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                  Gadgets
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="mb-3 text-[11px] font-extrabold text-gray-950 sm:text-xs dark:text-white">
              Informations
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/a-propos"
                  className="text-[11px] text-gray-500 transition hover:text-blue-600 sm:text-xs dark:text-slate-400"
                >
                  À propos
                </Link>
              </li>

              <li>
                <Link
                  to="/livraison"
                  className="text-[11px] text-gray-500 transition hover:text-blue-600 sm:text-xs dark:text-slate-400"
                >
                  Livraison
                </Link>
              </li>

              <li>
                <Link
                  to="/conditions"
                  className="text-[11px] text-gray-500 transition hover:text-blue-600 sm:text-xs dark:text-slate-400"
                >
                  Conditions générales
                </Link>
              </li>

              <li>
                <Link
                  to="/confidentialite"
                  className="text-[11px] text-gray-500 transition hover:text-blue-600 sm:text-xs dark:text-slate-400"
                >
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-3 text-[11px] font-extrabold text-gray-950 sm:text-xs dark:text-white">
              Contact
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-slate-900 dark:text-slate-300">
                  <MapPin size={13} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-500">
                    Localisation
                  </p>

                  <p className="mt-0.5 text-[11px] text-gray-500 sm:text-xs dark:text-slate-400">
                    Yaoundé, Cameroun
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-slate-900 dark:text-slate-300">
                  <Phone size={13} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-500">
                    Commandes
                  </p>

                  <p className="mt-0.5 text-[11px] text-gray-500 sm:text-xs dark:text-slate-400">
                    Disponible sur WhatsApp
                  </p>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-3 py-2.5 text-[10px] font-bold text-white transition hover:bg-green-600 sm:text-xs dark:bg-white dark:text-slate-950 dark:hover:bg-green-600 dark:hover:text-white"
              >
                <MessageCircle size={14} />
                Commander sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 bg-gray-50 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-1.5 px-4 py-3.5 text-[9px] text-gray-400 sm:px-6 sm:text-[10px] lg:px-8 md:flex-row md:items-center md:justify-between dark:text-slate-500">
          <p>
            © {currentYear} MboaShop. Tous droits réservés.
          </p>

          <div className="flex items-center gap-2">
            <span>Paiement sécurisé</span>

            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-slate-700" />

            <span>Shopping au Cameroun</span>
          </div>
        </div>
      </div>
    </footer>
  );
}