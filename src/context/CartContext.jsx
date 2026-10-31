
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "mboashop-cart";

function getInitialCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const product = action.product;

      if (product.stock <= 0) return state;

      const existing = state.find((item) => item.id === product.id);

      if (existing) {
        return state.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.stock),
              }
            : item
        );
      }

      return [...state, { ...product, quantity: 1 }];
    }

    case "INCREASE":
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.stock),
            }
          : item
      );

    case "DECREASE":
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "REMOVE":
      return state.filter((item) => item.id !== action.id);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialCart
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Impossible de sauvegarder le panier :", error);
    }
  }, [cart]);

  const addToCart = (product) =>
    dispatch({ type: "ADD", product });

  const increaseQuantity = (id) =>
    dispatch({ type: "INCREASE", id });

  const decreaseQuantity = (id) =>
    dispatch({ type: "DECREASE", id });

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE", id });

  const clearCart = () =>
    dispatch({ type: "CLEAR" });

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart doit être utilisé dans CartProvider");
  }

  return context;
}
