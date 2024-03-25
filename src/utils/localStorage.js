// Fonction pour sauvegarder le panier dans localStorage
export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fonction pour récupérer le panier depuis localStorage
// Retourne un panier vide si aucun panier n'est trouvé
export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  try {
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
