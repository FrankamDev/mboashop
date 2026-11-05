import { useEffect, useState } from "react";

export default function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstalled = () => {
      const installed =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      setIsInstalled(installed);
    };

    checkInstalled();

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      const installed =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      if (installed) return;

      setDeferredPrompt(event);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt || isInstalled) return;

    await deferredPrompt.prompt();

    setDeferredPrompt(null);
  };

  return {
    installApp,
    canInstall: !!deferredPrompt && !isInstalled,
    isInstalled,
  };
}