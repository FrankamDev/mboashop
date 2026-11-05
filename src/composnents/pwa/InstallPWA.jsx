import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

export default function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      setInstallPrompt(event);
      setShowInstall(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();

    const result = await installPrompt.userChoice;

    if (result.outcome === "accepted") {
      setInstallPrompt(null);
      setShowInstall(false);
    }
  };

  const handleClose = () => {
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[1000] sm:left-auto sm:right-5 sm:w-[360px]">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_15px_50px_rgba(15,23,42,0.15)]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white">
            <Download size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-extrabold text-gray-950">
              Installer MboaShop
            </h3>

            <p className="mt-1 text-[11px] leading-5 text-gray-500">
              Ajoutez MboaShop à votre écran d’accueil pour y accéder
              rapidement.
            </p>

            <button
              type="button"
              onClick={handleInstall}
              className="mt-3 rounded-lg bg-gray-950 px-3 py-2 text-[11px] font-bold text-white transition hover:bg-blue-600"
            >
              Installer maintenant
            </button>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Fermer"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}