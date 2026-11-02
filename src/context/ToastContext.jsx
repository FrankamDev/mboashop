
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CheckCircle2, ShoppingBag, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  const showToast = (message) => {
    setToast({
      id: Date.now(),
      message,
    });
    setVisible(true);
  };

  useEffect(() => {
    if (!toast) return;

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2600);

    const removeTimer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className={`fixed bottom-24 left-1/2 z-[200] w-[calc(100%-32px)] max-w-sm -translate-x-1/2 transition-all duration-300 sm:bottom-8 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-4 shadow-2xl shadow-gray-900/15">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckCircle2 size={25} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-gray-900">
                Ajouté au panier !
              </p>
              <p className="mt-0.5 truncate text-xs text-gray-500">
                {toast.message}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <ShoppingBag size={19} className="text-green-600" />

              <button
                type="button"
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => setToast(null), 250);
                }}
                aria-label="Fermer la notification"
                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast doit être utilisé dans ToastProvider");
  }

  return context;
}
