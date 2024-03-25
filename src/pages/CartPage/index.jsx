import EmptyCart from "./EmptyCart.jsx";
import CartWithItems from "./CartWithItems.jsx";
import { useCart } from "../../context/CartContext.jsx";
import "./cartpage.scss";

function CartPage() {
  const {
    cart,
  } = useCart();

  return (cart.length === 0 ? <EmptyCart /> : <CartWithItems />);
}

export default CartPage;
