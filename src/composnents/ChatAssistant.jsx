import { useEffect, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  Minus,
  MessageCircle,
  User,
} from "lucide-react";

/**
 * Assistant client MboaShop
 *
 * Pour connecter une vraie IA plus tard :
 * remplace simplement sendToAI() par un appel API.
 */

const QUICK_QUESTIONS = [
  "Comment commander ?",
  "Quels sont vos délais de livraison ?",
  "Je cherche un produit",
];

const INITIAL_MESSAGE = {
  id: 1,
  role: "assistant",
  content:
    "Bonjour ! Je suis l’assistant MboaShop. Je peux vous aider à trouver un produit, comprendre les commandes ou obtenir des informations sur la livraison.",
};

const PRODUCTS = [
  {
    keywords: ["montre", "watch", "montres"],
    answer:
      "Nous proposons plusieurs modèles de montres et montres connectées. Rendez-vous dans la boutique pour voir les modèles disponibles.",
    link: "/produits?category=Gadgets",
  },
  {
    keywords: ["chargeur", "usb", "charge"],
    answer:
      "Nous proposons des chargeurs rapides USB-C. Vous pouvez consulter les produits disponibles dans notre boutique.",
    link: "/produits?category=Gadgets",
  },
  {
    keywords: ["enceinte", "bluetooth", "son", "audio"],
    answer:
      "Nous avons des produits audio, notamment des enceintes Bluetooth. Consultez notre catégorie Audio pour voir les modèles disponibles.",
    link: "/produits?category=Audio",
  },
  {
    keywords: ["gaming", "manette", "jeu", "console"],
    answer:
      "Vous cherchez du matériel gaming ? Nous proposons notamment des manettes. Consultez notre catégorie Gaming.",
    link: "/produits?category=Gaming",
  },
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getLocalResponse(message) {
  const text = normalizeText(message);

  if (
    text.includes("bonjour") ||
    text.includes("salut") ||
    text.includes("hello") ||
    text.includes("bonsoir")
  ) {
    return {
      content:
        "Bonjour ! Comment puis-je vous aider aujourd’hui ? Vous pouvez me demander un produit, une information sur la livraison ou comment commander.",
    };
  }

  if (
    text.includes("commande") ||
    text.includes("acheter") ||
    text.includes("achat")
  ) {
    return {
      content:
        "Pour commander, choisissez votre produit dans la boutique, indiquez la quantité puis utilisez l’option de commande disponible. Si vous préférez, vous pouvez également nous contacter directement sur WhatsApp.",
      link: "/produits",
    };
  }

  if (
    text.includes("livraison") ||
    text.includes("livrer") ||
    text.includes("delai") ||
    text.includes("délais")
  ) {
    return {
      content:
        "Les modalités et délais de livraison peuvent dépendre de votre ville et du produit commandé. Contactez-nous sur WhatsApp avec votre localisation pour obtenir les informations adaptées.",
      link: "/livraison",
    };
  }

  if (
    text.includes("prix") ||
    text.includes("cout") ||
    text.includes("coût") ||
    text.includes("fcfa")
  ) {
    return {
      content:
        "Les prix sont affichés directement sur les fiches produits. Vous pouvez consulter la boutique pour comparer les produits et leurs prix.",
      link: "/produits",
    };
  }

  if (
    text.includes("whatsapp") ||
    text.includes("contact") ||
    text.includes("numero") ||
    text.includes("numéro")
  ) {
    return {
      content:
        "Vous pouvez nous contacter directement sur WhatsApp pour une commande ou une question personnalisée.",
      whatsapp: true,
    };
  }

  const product = PRODUCTS.find((item) =>
    item.keywords.some((keyword) => text.includes(keyword))
  );

  if (product) {
    return {
      content: product.answer,
      link: product.link,
    };
  }

  if (
    text.includes("merci") ||
    text.includes("super") ||
    text.includes("parfait")
  ) {
    return {
      content:
        "Avec plaisir. Si vous avez besoin d’aide pour choisir un produit, je suis disponible.",
    };
  }

  return {
    content:
      "Je peux vous aider à trouver un produit, connaître son prix, comprendre comment commander ou obtenir des informations sur la livraison. Que recherchez-vous exactement ?",
  };
}

export default function ChatAssistant({
  whatsappNumber = "237XXXXXXXXX",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem("mboashop_chat");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // On utilise simplement l'historique initial.
    }

    return [INITIAL_MESSAGE];
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  // Sauvegarde pendant la session
  useEffect(() => {
    try {
      sessionStorage.setItem("mboashop_chat", JSON.stringify(messages));
    } catch {
      // sessionStorage peut être indisponible.
    }
  }, [messages]);

  // Scroll automatique
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isOpen, isMinimized]);

  // Focus input
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  // Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsMinimized(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sendToAI = async (userMessage) => {
    /*
     * FUTURE API IA
     *
     * Exemple :
     *
     * const response = await fetch("/api/chat", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify({
     *     message: userMessage,
     *     history: messages,
     *   }),
     * });
     *
     * return await response.json();
     *
     * Le backend Laravel pourra ensuite appeler
     * OpenAI, Gemini, etc.
     */

    await new Promise((resolve) => setTimeout(resolve, 700));

    return getLocalResponse(userMessage);
  };

  const handleSend = async (message = input) => {
    const cleanMessage = message.trim();

    if (!cleanMessage || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: cleanMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await sendToAI(cleanMessage);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "assistant",
            content: response.content,
            link: response.link,
            whatsapp: response.whatsapp,
          },
        ]);

        setIsTyping(false);
      }, 300);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Une erreur est survenue. Vous pouvez nous contacter directement sur WhatsApp.",
          whatsapp: true,
        },
      ]);

      setIsTyping(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend();
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);

    try {
      sessionStorage.removeItem("mboashop_chat");
    } catch {
      // Rien à faire.
    }
  };

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && !isMinimized && (
        <div
          className="fixed inset-0 z-[998] bg-black/10 backdrop-blur-[1px] sm:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Fenêtre */}
      {isOpen && !isMinimized && (
        <div
          className="
            fixed z-[999]
            bottom-0 left-0 right-0
            h-[min(680px,92dvh)]
            sm:bottom-24 sm:right-5 sm:left-auto
            sm:h-[620px] sm:w-[390px]
            overflow-hidden
            rounded-t-3xl sm:rounded-2xl
            border border-gray-200
            bg-white
            shadow-[0_20px_80px_rgba(15,23,42,0.18)]
            animate-in fade-in slide-in-from-bottom-4
            duration-200
          "
          role="dialog"
          aria-label="Assistant MboaShop"
          aria-modal="false"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white shadow-sm">
                <Bot size={20} />

                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="truncate text-sm font-extrabold text-gray-950">
                    Assistant MboaShop
                  </h2>

                  <Sparkles size={13} className="text-blue-600" />
                </div>

                <p className="mt-0.5 text-[10px] text-gray-500">
                  En ligne • Réponse rapide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                aria-label="Réduire le chat"
              >
                <Minus size={17} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                aria-label="Fermer le chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="
              h-[calc(100%-132px)]
              overflow-y-auto
              bg-gray-50/70
              px-3 py-4
              sm:px-4
            "
          >
            <div className="mx-auto flex max-w-md flex-col gap-3">
              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="mb-1 flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => handleSend(question)}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-gray-600 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex items-end gap-2 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-950 text-white">
                        <Bot size={14} />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] ${
                        isUser
                          ? "rounded-2xl rounded-br-md bg-gray-950 text-white"
                          : "rounded-2xl rounded-bl-md border border-gray-100 bg-white text-gray-700 shadow-sm"
                      }`}
                    >
                      <div className="px-3 py-2.5">
                        <p className="whitespace-pre-wrap text-[11px] leading-[1.6] sm:text-xs">
                          {message.content}
                        </p>

                        {message.link && (
                          <Link
                            to={message.link}
                            onClick={() => setIsOpen(false)}
                            className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700"
                          >
                            Voir les produits
                            <ArrowRight size={12} />
                          </Link>
                        )}

                        {message.whatsapp && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-[10px] font-bold text-white transition hover:bg-green-600"
                          >
                            <MessageCircle size={13} />
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </div>

                    {isUser && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <User size={14} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing */}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-950 text-white">
                    <Bot size={14} />
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-gray-100 bg-white px-3 py-2.5 shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 bg-white p-3">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-2 py-2 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Écrivez votre question..."
                  disabled={isTyping}
                  className="min-w-0 flex-1 bg-transparent px-2 text-xs text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
                  aria-label="Votre message"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-950 text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Envoyer"
                >
                  <Send size={14} />
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between px-1">
                <p className="text-[9px] text-gray-400">
                  Assistant MboaShop
                </p>

                <button
                  type="button"
                  onClick={resetChat}
                  className="text-[9px] font-medium text-gray-400 transition hover:text-gray-700"
                >
                  Nouvelle conversation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bouton flottant */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="
            fixed
            bottom-20 right-4
            z-[997]
            flex
            h-12 w-12
            items-center justify-center
            rounded-full
            bg-gray-950
            text-white
            shadow-[0_10px_35px_rgba(15,23,42,0.25)]
            transition
            hover:scale-105
            hover:bg-blue-600
            active:scale-95
            sm:bottom-6 sm:right-6
            sm:h-14 sm:w-14
          "
          aria-label="Ouvrir l'assistant MboaShop"
        >
          <Bot size={22} strokeWidth={1.8} className="sm:h-6 sm:w-6" />

          <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />

          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-blue-500/20" />
        </button>
      )}

      {/* Bouton réduit */}
      {isOpen && isMinimized && (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="
            fixed bottom-20 right-4 z-[997]
            flex items-center gap-2
            rounded-full
            border border-gray-200
            bg-white
            px-3 py-2
            text-[10px] font-bold
            text-gray-800
            shadow-lg
            transition hover:border-blue-300 hover:text-blue-600
            sm:bottom-6 sm:right-6
          "
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-950 text-white">
            <Bot size={14} />
          </span>

          Assistant MboaShop
        </button>
      )}
    </>
  );
}