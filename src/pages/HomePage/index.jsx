import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Banner from "../../components/Banner/index.jsx";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [creators, setCreators] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const decodedToken = useSelector((state) => state.user.decodedToken);

  const fetchData = async () => {
    try {
      const categoriesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`,
      );
      setCategories(categoriesResponse.data);
      // Récupérer les 6 derniers créateurs inscrits
      const workshopResponse = await axios.get(`${import.meta.env.VITE_API_URL}/createurs/derniers-inscrits`);
      setCreators(workshopResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>
        {isLoggedIn && decodedToken ? (
          <p>
            Bonjour
            {" "}
            {decodedToken.firstname}
          </p>
        ) : "Bienvenue sur Confection Main"}
      </h1>

      <section>
        <div className="ui three column doubling stackable grid container">
          {categories.map((category) => (
            <div key={category.id} className="column">
              <Link to={`/categories/${category.id}`} className="category-link">
                <div className="category-container">
                  <img
                    src={`/images/${category.name}.png`}
                    alt={`Catégorie ${category.name}`}
                    className="category-image"
                  />
                  <div className="category-label">{category.name}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Banner />

      {/* Liste des 6 derniers créateurs inscrits */}
      <section>
        <h2>Découvrez de nouveaux créateurs</h2>
        <div className="ui three column doubling stackable grid container" style={{ marginBottom: "1.5rem" }}>
          {creators.map((creator) => (
            <div key={creator.workshop_id} className="column">
              <Link to={`/createurs/${creator.workshop_id}`} className="creator-link">
                <div className="creator-container">
                  <img
                    src={`${creator.workshop_picture}`}
                    alt={`Créateur ${creator.workshop_name}`}
                    className="workshop-image"
                  />
                  <div className="creator-label">{creator.workshop_name}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
