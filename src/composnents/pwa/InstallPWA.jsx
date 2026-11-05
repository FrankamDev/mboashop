import { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { useDarkMode } from "../../DarkModeContext";

export default function InstallPWA() {
  const { darkMode } = useDarkMode();

  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkIfInstalled = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      setIsInstalled(standalone);

      if (standalone) {
        setShowInstall(false);
        setInstallPrompt(null);
      }
    };

    checkIfInstalled();

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      if (standalone) {
        return;
      }

      setInstallPrompt(event);
      setShowInstall(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setShowInstall(false);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt || isInstalled) return;

    try {
      await installPrompt.prompt();

      const result = await installPrompt.userChoice;

      if (result.outcome === "accepted") {
        setIsInstalled(true);
        setShowInstall(false);
        setInstallPrompt(null);
      }
    } catch (error) {
      console.error("Erreur installation PWA :", error);
    }
  };

  const handleClose = () => {
    setShowInstall(false);
  };

  if (isInstalled || !showInstall || !installPrompt) {
    return null;
  }

  return (
    <div
      className="
        fixed bottom-20 left-4 right-4 z-[1000]
        sm:left-auto sm:right-5 sm:w-[380px]
      "
    >
      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          p-4
          shadow-[0_15px_50px_rgba(15,23,42,0.15)]
          transition-colors duration-300

          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-[0_15px_50px_rgba(0,0,0,0.45)]
        "
      >
        <div className="flex items-start gap-3">

          {/* ICON */}

          <div
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl
              bg-slate-950
              text-white
              shadow-sm

              dark:bg-blue-600
              dark:text-white
            "
          >
            <Download size={18} strokeWidth={2} />
          </div>

          {/* CONTENU */}

          <div className="min-w-0 flex-1">

            <div className="flex items-center gap-2">
              <h3
                className="
                  text-sm font-extrabold
                  text-slate-950

                  dark:text-white
                "
              >
                Installer MboaShop
              </h3>

              <span
                className="
                  hidden rounded-full
                  bg-blue-50
                  px-2 py-0.5
                  text-[9px] font-bold
                  text-blue-600

                  dark:bg-blue-950/60
                  dark:text-blue-400

                  sm:inline-flex
                "
              >
                APPLICATION
              </span>
            </div>

            <p
              className="
                mt-1
                text-[11px]
                leading-5
                text-slate-500

                dark:text-slate-400
              "
            >
              Ajoutez MboaShop à votre écran d’accueil
              pour accéder rapidement à votre boutique.
            </p>

            {/* BOUTON */}

            <button
              type="button"
              onClick={handleInstall}
              className="
                mt-3
                inline-flex
                items-center gap-2
                rounded-lg
                bg-slate-950
                px-3.5
                py-2
                text-[11px]
                font-bold
                text-white
                transition-all duration-200

                hover:bg-blue-600
                active:scale-[0.98]

                dark:bg-blue-600
                dark:hover:bg-blue-500
              "
            >
              <Download size={14} />

              Installer maintenant
            </button>
          </div>

          {/* FERMER */}

          <button
            type="button"
            onClick={handleClose}
            className="
              flex h-7 w-7 shrink-0
              items-center justify-center
              rounded-lg
              text-slate-400
              transition-colors

              hover:bg-slate-100
              hover:text-slate-900

              dark:text-slate-500
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
            aria-label="Fermer"
          >
            <X size={15} />
          </button>
        </div>

        {/* PETIT INDICATEUR */}

        <div
          className="
            mt-3 flex items-center gap-2
            border-t border-slate-100
            pt-3

            dark:border-slate-800
          "
        >
          <Smartphone
            size={13}
            className="
              text-slate-400
              dark:text-slate-500
            "
          />

          <span
            className="
              text-[9px]
              font-medium
              text-slate-400

              dark:text-slate-500
            "
          >
            Installation rapide · Accès depuis votre écran d’accueil
          </span>
        </div>
      </div>
    </div>
  );
}