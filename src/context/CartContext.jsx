import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { saveCartToLocalStorage, getCartFromLocalStorage } from "../utils/localStorage.js";

const CartContext = createContext({});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getCartFromLocalStorage() || []);

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  // Mise à jour du panier
  function updateItemQuantity(itemId, newQuantity) {
    const updateCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updateCart);
  }

  // Bouton ajout au panier
  function addItemToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      updateItemQuantity(item.id, existingItem.quantity + item.quantity);
    } else {
      setCart([...cart, item]);
    }
  }

  // Supprime l'article du panier
  function removeItemFromCart(itemId) {
    setCart(cart.filter((item) => item.id !== itemId));
  }

  function incrementItemQuantity(itemId) {
    setCart((cartItems) => cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  }

  function decrementItemQuantity(itemId) {
    setCart((cartItems) => cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  }

  //
  const contextValue = useMemo(() => ({
    cart,
    addItemToCart,
    removeItemFromCart,
    incrementItemQuantity,
    decrementItemQuantity,
    updateItemQuantity,
  }), [cart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
