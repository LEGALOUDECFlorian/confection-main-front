import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container, Grid, Segment, Image, Header, Button, List,
} from "semantic-ui-react";
import IncrementDecrementBtn from "../../components/IncrementDecrementBtn/index.jsx";
import currencyFormat from "../../utils/currencyFormat.js";
import { useCart } from "../../context/CartContext.jsx";
import { saveCartToLocalStorage } from "../../utils/localStorage.js";
import "./itemdetails.scss";

function ItemDetailsPage() {
  const [item, setItem] = useState(null);
  const [creator, setCreator] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { itemId } = useParams();
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchItemAndCreator = async () => {
      try {
        const responseItem = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${itemId}`);
        setItem(responseItem.data);

        // Utiliser le workshop_id de l'article pour récupérer le créateur
        const workshopId = responseItem.data.workshop_id;
        const responseCreator = await axios.get(`${import.meta.env.VITE_API_URL}/createurs/${workshopId}`);
        setCreator(responseCreator.data);
      } catch (err) {
        setError("Error fetching data");
      }
    };

    fetchItemAndCreator();
  }, [itemId]);

  const handleAddToCart = () => {
    addItemToCart({ ...item, quantity });
  };

  useEffect(() => {
    // Sauvegarde le panier dans localStorage chaque fois qu'il est mis à jour
    saveCartToLocalStorage();
  }, []);

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  if (!item || !creator) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>{item.name}</h1>
      <Container className="item-page-container">
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column width={6}>
              <Segment raised padded="very" className="item-info__container">
                <Image
                  src={item.picture}
                  alt={`Article ${item.name}`}
                  className="item-image"
                  size="medium"
                  centered
                />
                <div className="creator-details">
                  <Image
                    src={creator.picture}
                    alt={`Créateur ${creator.name}`}
                    className="creator-image"
                    size="small"
                    centered
                  />
                  <Header as="h3" color="grey" className="creator-name">
                    {creator.name}
                  </Header>
                  <Button
                    primary
                    onClick={() => { window.location.href = `/createurs/${creator.id}`; }}
                  >
                    Visiter l'atelier
                  </Button>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment raised padded="very">
                <Header as="h2" color="grey" className="item-description">{item.name}</Header>
                <p>{item.description}</p>
                <div>
                  <IncrementDecrementBtn setQuantity={setQuantity} quantity={quantity} />
                </div>
                <Button
                  primary
                  className="cart-btn"
                  onClick={handleAddToCart}
                >
                  Ajouter au panier
                </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment raised padded="very">
                <List className="item-info-list">
                  <List.Item className="item-info-list-item item-price">
                    Prix :
                    {" "}
                    {currencyFormat(item.price)}
                  </List.Item>
                  <List.Item className="item-info-list-item item-material">
                    Matériau :
                    {" "}
                    {item.material}
                  </List.Item>
                  {item.customizable ? (
                    <>
                      <List.Item className="item-info-list-item">Personnalisable : Oui</List.Item>
                      <List.Item className="item-info-list-item">
                        <Button
                          primary
                          onClick={() => { window.location.href = `mailto:${creator.email}`; }}
                        >
                          Contactez-moi
                        </Button>
                      </List.Item>
                    </>
                  ) : (
                    <List.Item className="item-info-list-item">Personnalisable : Non</List.Item>
                  )}
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </section>
  );
}

export default ItemDetailsPage;
