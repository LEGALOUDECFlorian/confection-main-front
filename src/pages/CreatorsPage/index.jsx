import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadMoreButton from "../../components/LoadMoreBtn/index.jsx";
import "./creatorslist.scss";

function CreatorsPage() {
  const [creators, setCreators] = useState([]);
  const [noOfCreators, setNoOfCreators] = useState(9);

  const loadMore = () => {
    setNoOfCreators((prevNoOfCreators) => prevNoOfCreators + 6);
  }; // Chargement de 6 créateurs supplémentaires à chaque clic de bouton
  const slice = creators.slice(0, noOfCreators);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/createurs`);
        setCreators(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Liste des créateurs */}
      <h1>Découvrez tous nos créateurs</h1>
      <section className="ui three column doubling stackable grid container">
        {slice.map((creator) => (
          <div key={creator.id} className="column">
            <Link to={`/createurs/${creator.id}`} className="creator-link">
              <div className="creator-container">
                <img
                  src={`${creator.picture}`}
                  alt={`Créateur ${creator.name}`}
                  className="workshop-image"
                />
                <div className="creator-label">{creator.name}</div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      {creators.length > noOfCreators && (
        <LoadMoreButton onClick={loadMore} buttonText="Voir plus de créateurs" />
      )}
    </>
  );
}

export default CreatorsPage;
