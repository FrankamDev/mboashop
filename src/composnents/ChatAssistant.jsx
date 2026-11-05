import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Minus,
  PackageSearch,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import {products,  formatPrice } from "../data/products";

const WHATSAPP_NUMBER = "237690372977";
const CHAT_STORAGE_KEY = "mboashop_chat";
const WHATSAPP_DELAY = 5000;

const QUICK_QUESTIONS = [
  "Je cherche une montre",
  "Quel est le prix des produits ?",
  "Comment commander ?",
  "Quels sont les délais de livraison ?",
];

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Bonjour ! Je suis l’assistant MboaShop. Je peux vous aider à trouver un produit, connaître son prix, vérifier sa disponibilité ou comprendre comment commander.",
};

function normalizeText(text) {
  return String(text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function createId(prefix = "msg") {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function safeSessionGet() {
  try {
    const saved = sessionStorage.getItem(CHAT_STORAGE_KEY);

    if (!saved) {
      return [INITIAL_MESSAGE];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [INITIAL_MESSAGE];
    }

    return parsed.filter(
      (message) =>
        message &&
        typeof message === "object" &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim()
    );
  } catch {
    return [INITIAL_MESSAGE];
  }
}

function getProductSearchText(product) {
  return normalizeText(
    [
      product.name,
      product.category,
      product.slug,
      product.shortDescription,
      product.description,
      ...(Array.isArray(product.tags) ? product.tags : []),
    ].join(" ")
  );
}

function findProducts(message) {
  const text = normalizeText(message);

  if (!text) return [];

  const words = text
    .split(/\s+/)
    .filter((word) => word.length >= 3);

  const scored = products
    .filter((product) => product?.published !== false)
    .map((product) => {
      const searchable = getProductSearchText(product);
      let score = 0;

      words.forEach((word) => {
        if (searchable.includes(word)) {
          score += 1;
        }

        if (normalizeText(product.name).includes(word)) {
          score += 4;
        }

        if (normalizeText(product.category).includes(word)) {
          score += 2;
        }
      });

      return {
        product,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((item) => item.product);
}

function isGreeting(text) {
  return [
    "bonjour",
    "salut",
    "hello",
    "bonsoir",
    "bjr",
    "coucou",
  ].some((word) => text === word || text.startsWith(`${word} `));
}

function isPriceQuestion(text) {
  return (
    text.includes("prix") ||
    text.includes("cout") ||
    text.includes("combien") ||
    text.includes("tarif") ||
    text.includes("fcfa")
  );
}

function isOrderQuestion(text) {
  return (
    text.includes("commande") ||
    text.includes("commander") ||
    text.includes("acheter") ||
    text.includes("achat") ||
    text.includes("prendre") ||
    text.includes("je veux")
  );
}

function isDeliveryQuestion(text) {
  return (
    text.includes("livraison") ||
    text.includes("livrer") ||
    text.includes("delai") ||
    text.includes("expedition") ||
    text.includes("transport")
  );
}

function isStockQuestion(text) {
  return (
    text.includes("stock") ||
    text.includes("disponible") ||
    text.includes("disponibilite")
  );
}

function isContactQuestion(text) {
  return (
    text.includes("whatsapp") ||
    text.includes("contact") ||
    text.includes("numero") ||
    text.includes("telephone")
  );
}

function buildWhatsAppUrl(message = "") {
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");

  const text =
    message ||
    "Bonjour MboaShop, j’ai besoin d’aide concernant un produit.";

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

function generateResponse(message) {
  const text = normalizeText(message);
  const matches = findProducts(message);

  if (isGreeting(text)) {
    return {
      content:
        "Bonjour ! Que recherchez-vous aujourd’hui ? Je peux vous aider à trouver un produit, vérifier un prix, connaître la disponibilité ou passer une commande.",
      confidence: 1,
    };
  }

  if (isContactQuestion(text)) {
    return {
      content:
        "Bien sûr. Notre équipe peut vous répondre directement sur WhatsApp si vous souhaitez une assistance personnalisée.",
      whatsapp: true,
      confidence: 1,
    };
  }

  if (matches.length > 0) {
    const product = matches[0];

    if (isPriceQuestion(text)) {
      return {
        content: `${product.name} est actuellement proposé à ${formatPrice(
          product.price
        )}. ${
          product.oldPrice
            ? `Le prix précédent était de ${formatPrice(product.oldPrice)}.`
            : ""
        }`,
        product,
        link: `/produit/${product.slug}`,
        confidence: 0.95,
      };
    }

    if (isStockQuestion(text)) {
      const stock = Number(product.stock ?? 0);

      return {
        content:
          stock > 0
            ? `Oui, ${product.name} est actuellement disponible. Il reste environ ${stock} unité${
                stock > 1 ? "s" : ""
              } en stock.`
            : `${product.name} semble actuellement indisponible.`,
        product,
        link: `/produit/${product.slug}`,
        confidence: 0.95,
      };
    }

    if (isOrderQuestion(text)) {
      return {
        content: `Oui. Vous pouvez commander ${product.name} directement depuis sa fiche produit. Son prix actuel est de ${formatPrice(
          product.price
        )}.`,
        product,
        link: `/produit/${product.slug}`,
        confidence: 0.95,
      };
    }

    return {
      content: `J’ai trouvé ${product.name} à ${formatPrice(
        product.price
      )}. Je peux aussi vous aider à vérifier sa disponibilité ou à passer la commande.`,
      product,
      link: `/produit/${product.slug}`,
      confidence: 0.9,
    };
  }

  if (isOrderQuestion(text)) {
    return {
      content:
        "Pour commander, choisissez d’abord votre produit dans la boutique, ouvrez sa fiche puis sélectionnez la quantité et l’option de commande. Si vous préférez être accompagné, je peux vous orienter vers WhatsApp.",
      link: "/produits",
      confidence: 0.8,
    };
  }

  if (isDeliveryQuestion(text)) {
    return {
      content:
        "Les délais de livraison peuvent varier selon votre ville et le produit choisi. Pour obtenir un délai précis, indiquez-moi votre ville ou contactez notre équipe.",
      link: "/livraison",
      confidence: 0.8,
    };
  }

  if (isPriceQuestion(text)) {
    return {
      content:
        "Les prix sont indiqués directement sur les fiches produits. Si vous me donnez le nom du produit recherché, je peux essayer de le retrouver.",
      link: "/produits",
      confidence: 0.65,
    };
  }

  return {
    content:
      "Je veux m’assurer de bien comprendre votre demande. Pouvez-vous préciser le produit ou l’information que vous recherchez ?",
    confidence: 0.25,
    needsHelp: true,
  };
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(safeSessionGet);
  const [showWhatsAppHelp, setShowWhatsAppHelp] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const isMountedRef = useRef(true);
  const whatsappTimerRef = useRef(null);

  const whatsappUrl = buildWhatsAppUrl();

  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      if (whatsappTimerRef.current) {
        clearTimeout(whatsappTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify(messages)
      );
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (!isOpen || isMinimized) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isOpen, isMinimized, isTyping, showWhatsAppHelp]);

  useEffect(() => {
    if (!isOpen || isMinimized) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen, isMinimized]);

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

  const startWhatsAppFallback = () => {
    if (whatsappTimerRef.current) {
      clearTimeout(whatsappTimerRef.current);
    }

    setShowWhatsAppHelp(false);

    whatsappTimerRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;

      setShowWhatsAppHelp(true);
    }, WHATSAPP_DELAY);
  };

  const cancelWhatsAppFallback = () => {
    if (whatsappTimerRef.current) {
      clearTimeout(whatsappTimerRef.current);
      whatsappTimerRef.current = null;
    }

    setShowWhatsAppHelp(false);
  };

  const handleSend = async (message = input) => {
    const cleanMessage = String(message ?? "").trim();

    if (!cleanMessage || isTyping) return;

    cancelWhatsAppFallback();

    const userMessage = {
      id: createId("user"),
      role: "user",
      content: cleanMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Petite latence naturelle pour l'effet "assistant qui réfléchit"
      await new Promise((resolve) => setTimeout(resolve, 450));

      if (!isMountedRef.current) return;

      const response = generateResponse(cleanMessage);

      const assistantMessage = {
        id: createId("assistant"),
        role: "assistant",
        content:
          response.content ||
          "Je n’ai pas réussi à traiter votre demande.",
        link: response.link,
        whatsapp: Boolean(response.whatsapp),
        product: response.product || null,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      setIsTyping(false);

      // Si le niveau de confiance est faible,
      // on attend 5 secondes avant de proposer WhatsApp.
      if (response.needsHelp || response.confidence < 0.5) {
        startWhatsAppFallback();
      }
    } catch (error) {
      console.error("Erreur ChatAssistant :", error);

      if (!isMountedRef.current) return;

      setMessages((prev) => [
        ...prev,
        {
          id: createId("error"),
          role: "assistant",
          content:
            "Je rencontre une difficulté pour traiter votre demande. Notre équipe peut vous aider directement sur WhatsApp.",
          whatsapp: true,
        },
      ]);

      setIsTyping(false);

      startWhatsAppFallback();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend();
  };

  const resetChat = () => {
    cancelWhatsAppFallback();

    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setIsTyping(false);

    try {
      sessionStorage.removeItem(CHAT_STORAGE_KEY);
    } catch {}
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowWhatsAppHelp(false);
  };

  const productLink = (product) => {
    if (!product?.slug) return "/produits";

    return `/produit/${product.slug}`;
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

      {/* Fenêtre principale */}
      {isOpen && !isMinimized && (
        <div
          className="
            fixed z-[999]
            bottom-0 left-0 right-0
            flex h-[min(720px,92dvh)] flex-col
            overflow-hidden
            rounded-t-3xl
            border border-gray-200
            bg-white
            shadow-[0_25px_100px_rgba(15,23,42,0.2)]
            animate-in slide-in-from-bottom-4 duration-300
            sm:bottom-24 sm:left-auto sm:right-5
            sm:h-[650px] sm:w-[400px]
            sm:rounded-2xl
          "
          role="dialog"
          aria-label="Assistant MboaShop"
        >
          {/* Header */}
          <div className="shrink-0 border-b border-gray-100 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
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

                    <Sparkles
                      size={13}
                      className="shrink-0 text-blue-600"
                    />
                  </div>

                  <p className="mt-0.5 text-[10px] text-gray-500">
                    En ligne • Assistant shopping
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
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                    cancelWhatsAppFallback();
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Fermer le chat"
                >
                  <X size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50/70 px-3 py-4 sm:px-4">
            <div className="mx-auto flex max-w-md flex-col gap-3">
              {/* Questions rapides */}
              {messages.length === 1 && !isTyping && (
                <div className="mb-1">
                  <p className="mb-2 px-1 text-[9px] font-bold uppercase tracking-wider text-gray-400">
                    Questions rapides
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {QUICK_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => handleSend(question)}
                        className="
                          rounded-full border border-gray-200
                          bg-white px-3 py-1.5
                          text-[10px] font-semibold text-gray-600
                          shadow-sm transition-all duration-200
                          hover:-translate-y-0.5
                          hover:border-blue-300
                          hover:text-blue-600
                          hover:shadow-md
                        "
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
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
                      className={`
                        max-w-[84%]
                        ${
                          isUser
                            ? "rounded-2xl rounded-br-md bg-gray-950 text-white"
                            : "rounded-2xl rounded-bl-md border border-gray-100 bg-white text-gray-700 shadow-sm"
                        }
                      `}
                    >
                      <div className="px-3 py-2.5">
                        <p className="whitespace-pre-wrap text-[11px] leading-[1.65] sm:text-xs">
                          {message.content}
                        </p>

                        {/* Lien produit */}
                        {message.product && (
                          <Link
                            to={productLink(message.product)}
                            onClick={() => setIsOpen(false)}
                            className="
                              mt-3 block rounded-xl border border-gray-100
                              bg-gray-50 p-2.5
                              transition hover:border-blue-200 hover:bg-blue-50/50
                            "
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500">
                                <PackageSearch size={15} />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[10px] font-extrabold text-gray-900">
                                  {message.product.name}
                                </p>

                                <p className="mt-0.5 text-[10px] font-bold text-blue-600">
                                  {formatPrice(message.product.price)}
                                </p>
                              </div>

                              <ArrowRight
                                size={14}
                                className="text-gray-400"
                              />
                            </div>
                          </Link>
                        )}

                        {/* Lien produits */}
                        {message.link && !message.product && (
                          <Link
                            to={message.link}
                            onClick={() => setIsOpen(false)}
                            className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700"
                          >
                            Voir les produits
                            <ArrowRight size={12} />
                          </Link>
                        )}

                        {/* WhatsApp */}
                        {message.whatsapp && (
                          <a
                            href={buildWhatsAppUrl(
                              "Bonjour MboaShop, j’ai besoin d’aide concernant un produit ou une commande."
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              mt-3 inline-flex items-center gap-1.5
                              rounded-xl bg-green-500 px-3 py-2
                              text-[10px] font-bold text-white
                              shadow-sm
                              transition-all duration-200
                              hover:-translate-y-0.5
                              hover:bg-green-600
                              hover:shadow-md
                            "
                          >
                            <MessageCircle size={13} />
                            Continuer sur WhatsApp
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

              {/* Fallback WhatsApp après 5 secondes */}
              {showWhatsAppHelp && (
                <div className="animate-in slide-in-from-bottom-3 fade-in duration-500">
                  <div className="
                    relative overflow-hidden
                    rounded-2xl border border-green-100
                    bg-white p-3
                    shadow-[0_10px_35px_rgba(34,197,94,0.12)]
                  ">
                    <div className="absolute left-0 top-0 h-1 w-full bg-green-500" />

                    <div className="flex items-start gap-3 pt-1">
                      <div className="
                        flex h-9 w-9 shrink-0 items-center justify-center
                        rounded-xl bg-green-50 text-green-600
                      ">
                        <MessageCircle size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-[11px] font-extrabold text-gray-950">
                            Besoin d'une aide humaine ?
                          </p>

                          <CheckCircle2
                            size={13}
                            className="text-green-500"
                          />
                        </div>

                        <p className="mt-1 text-[10px] leading-5 text-gray-500">
                          Je peux vous rediriger vers notre équipe
                          WhatsApp pour une réponse personnalisée.
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <a
                            href={buildWhatsAppUrl(
                              "Bonjour MboaShop, j’étais en train de discuter avec votre assistant et j’ai besoin d’une aide personnalisée."
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex items-center gap-1.5
                              rounded-lg bg-green-500
                              px-3 py-2
                              text-[10px] font-extrabold text-white
                              shadow-sm
                              transition-all duration-200
                              hover:-translate-y-0.5
                              hover:bg-green-600
                              hover:shadow-md
                            "
                          >
                            <MessageCircle size={13} />
                            Parler à l'équipe
                          </a>

                          <button
                            type="button"
                            onClick={cancelWhatsAppFallback}
                            className="
                              rounded-lg px-2.5 py-2
                              text-[10px] font-bold text-gray-400
                              transition hover:bg-gray-100 hover:text-gray-700
                            "
                          >
                            Pas maintenant
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-gray-100 bg-white p-3">
            <form onSubmit={handleSubmit}>
              <div className="
                flex items-center gap-2
                rounded-xl border border-gray-200
                bg-gray-50 px-2 py-2
                transition
                focus-within:border-blue-400
                focus-within:bg-white
                focus-within:ring-2
                focus-within:ring-blue-100
              ">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Écrivez votre question..."
                  disabled={isTyping}
                  className="
                    min-w-0 flex-1 bg-transparent
                    px-2 text-xs text-gray-900
                    outline-none
                    placeholder:text-gray-400
                    disabled:cursor-not-allowed
                  "
                  aria-label="Votre message"
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="
                    flex h-8 w-8 shrink-0 items-center justify-center
                    rounded-lg bg-gray-950 text-white
                    transition-all duration-200
                    hover:scale-105 hover:bg-blue-600
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                  "
                  aria-label="Envoyer"
                >
                  <Send size={14} />
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between px-1">
                <p className="flex items-center gap-1 text-[9px] text-gray-400">
                  <Clock3 size={9} />
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
          onClick={handleOpen}
          className="
            fixed bottom-20 right-4 z-[997]
            flex h-12 w-12 items-center justify-center
            rounded-full bg-gray-950 text-white
            shadow-[0_10px_35px_rgba(15,23,42,0.25)]
            transition-all duration-300
            hover:scale-110 hover:bg-blue-600
            active:scale-95
            sm:bottom-6 sm:right-6
            sm:h-14 sm:w-14
          "
          aria-label="Ouvrir l'assistant MboaShop"
        >
          <Bot size={22} strokeWidth={1.8} />

          <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />

          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-blue-500/20" />
        </button>
      )}

      {/* Mode réduit */}
      {isOpen && isMinimized && (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="
            fixed bottom-20 right-4 z-[997]
            flex items-center gap-2
            rounded-full border border-gray-200
            bg-white px-3 py-2
            text-[10px] font-bold text-gray-800
            shadow-lg transition
            hover:border-blue-300 hover:text-blue-600
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