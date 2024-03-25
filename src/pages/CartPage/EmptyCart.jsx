import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./cartpage.scss";

function EmptyCart() {
  return (
    <>
      <Container>
        <h1>Votre panier est vide</h1>
      </Container>
      <Link to="/" className="cart__back-link">
        <span className="chevron">&#10094; </span>
        Retourner sur la page d'accueil
      </Link>
    </>
  );
}

export default EmptyCart;
