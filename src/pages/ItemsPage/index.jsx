import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "semantic-ui-react";
import currencyFormat from "../../utils/currencyFormat.js";
import LoadMoreButton from "../../components/LoadMoreBtn/index.jsx";

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [noOfItems, setNoOfItems] = useState(9);

  const loadMore = () => {
    setNoOfItems((prevNoOfItems) => prevNoOfItems + 12);
  }; // Chargement de 12 articles supplémentaires à chaque clic de bouton
  const slice = items.slice(0, noOfItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/articles`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Liste de tous les articles */}
      <section>
        <h1>Retrouvez tous nos articles</h1>
        <div className="ui three column doubling stackable grid container">
          {slice.map((item) => (
            <div key={item.id} className="column">
              <article className="item-preview__container">
                <img
                  src={item.picture}
                  alt={item.name}
                  className="item-image"
                />
                <aside className="item-preview-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>
                    Prix :
                    {" "}
                    {currencyFormat(item.price)}
                  </p>
                  <Link to={`/articles/${item.id}`}>
                    <Button primary>Voir</Button>
                  </Link>
                </aside>
              </article>
            </div>
          ))}
        </div>
        {items.length > noOfItems && (
          <LoadMoreButton onClick={loadMore} buttonText="Voir plus de produits" />
        )}
      </section>
    </>
  );
}

export default ItemsPage;
