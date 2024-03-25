import {
  Container,
  Segment,
  List,
  Grid,
  GridColumn,
  Image,
  Button,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import currencyFormat from "../../utils/currencyFormat.js";
import "./cartpage.scss";

function CartWithItems() {
  const {
    cart,
    removeItemFromCart,
    decrementItemQuantity,
    incrementItemQuantity,
  } = useCart();

  const calculateSubtotal = () => cart
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryRate = 0.05; // frais de livraison à 5%
    const delivery = subtotal * deliveryRate;
    return subtotal + delivery;
  };

  return (
    <>
      <Container>
        <h1>Mon Panier</h1>
        <Grid stackable columns={2}>
          {/* Section d'un produit */}
          <GridColumn>
            <Segment.Group>
              <Segment>
                <List divided relaxed>
                  {cart.map((item) => (
                    <List.Item key={item.id}>
                      <Grid columns={2} divided>
                        <Grid.Row>
                          <GridColumn width={4}>
                            <Image src={item.picture} alt={item.name} />
                          </GridColumn>
                          {/* {détails du produits} */}
                          <GridColumn width={12}>
                            <Link to={`/articles/${item.id}`}>{item.name}</Link>
                            <div>
                              Prix:
                              {" "}
                              {currencyFormat(item.price)}
                              {" "}
                              | Quantité:
                              {" "}
                              {item.quantity}
                            </div>
                            <div className="quantity-controls">
                              <Button icon="minus" className="quantity-btn" size="mini" onClick={() => decrementItemQuantity(item.id)} />
                              <span className="quantity__span">{item.quantity}</span>
                              <Button icon="plus" className="quantity-btn" size="mini" onClick={() => incrementItemQuantity(item.id)} />
                              <button
                                type="button"
                                aria-label="supprimer l'article du panier"
                                onClick={() => removeItemFromCart(item.id)}
                                className="delete-item"
                              >
                                <i className="trash icon" />
                              </button>
                            </div>
                          </GridColumn>
                        </Grid.Row>
                      </Grid>
                    </List.Item>
                  ))}
                </List>
              </Segment>
            </Segment.Group>
          </GridColumn>
          {/* Section Sous-total, frais de livraison et Total */}
          <GridColumn>
            <Segment textAlign="left">
              <div className="cart-summary">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ textAlign: "left" }}>Sous-total :</div>
                  <div style={{ textAlign: "right" }}>
                    {currencyFormat(calculateSubtotal())}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ textAlign: "left" }}>Frais de livraison :</div>
                  <div style={{ textAlign: "right" }}>
                    {currencyFormat(calculateSubtotal() * 0.05)}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700" }}>
                  <div style={{ textAlign: "left" }}>TOTAL :</div>
                  <div style={{ textAlign: "right" }}>
                    {currencyFormat(calculateTotal())}
                  </div>
                </div>
              </div>
            </Segment>
            <div className="confirm-order-btn__container">
              <Button className="confirm-order-btn">Valider ma commande</Button>
            </div>
          </GridColumn>
        </Grid>
      </Container>
      <Link to="/" className="cart__back-link">
        <span className="chevron">&#10094; </span>
        Continuer mes achats
      </Link>
    </>
  );
}

export default CartWithItems;
