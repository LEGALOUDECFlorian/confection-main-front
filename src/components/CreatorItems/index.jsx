import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import currencyFormat from "../../utils/currencyFormat.js";
import "./creatoritems.scss";

function CreatorItems() {
  const [creatorArticles, setCreatorArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const confirmationMessage = "êtes-vous sûr de vouloir supprimer cette article ?";
  const workshopId = localStorage.getItem("workshopId");
  useEffect(() => {
    const fetchCreatorArticles = async () => {
      try {
        const articlesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/articles/createurs/${workshopId}`);
        setCreatorArticles(articlesResponse.data);
      } catch (error) {
        console.error("Error fetching creator articles:", error);
      }
    };

    fetchCreatorArticles();
  }, [workshopId]);

  const handleDeletedItem = async (itemId) => {
    try {
      console.log("itemId", itemId);
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}//articles/${itemId}`);
      console.log(response.status);
      if (response.status === 204) {
        toast.success("l'article a bien été supprimé !");
        setCreatorArticles((updatedArticles) => updatedArticles
          .filter((item) => item.item_id !== itemId));
      }
    } catch (error) {
      console.error("Error deleted articles:", error);
      toast.error("Erreur lors de la suppression de l'article");
    }
  };

  const handleModalConfirm = () => {
    if (itemIdToDelete) {
      handleDeletedItem(itemIdToDelete);
      setShowModal(false);
    }
  };

  const handleCancelConfirm = () => {
    setShowModal(false);
  };

  const openDeleteModal = (itemId) => {
    setItemIdToDelete(itemId);
    setShowModal(true);
  };

  return (
    <div className="ui three column doubling stackable grid container">
      {/* Bouton "Créer un article" */}
      <div className="column">
        <div className="item-preview__container">
          <div className="item-preview-info">
            <Link to="/ajout-article">
              <button type="button" className="ui inverted green button">
                <i className="plus icon" />
                Créer un article
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Liste des articles existants */}
      {creatorArticles.map((item) => (
        <div key={item.item_id} className="column">
          <article className="item-preview__container">
            <img
              src={item.item_picture}
              alt={item.item_name}
              className="item-image"
            />
            <aside className="item-preview-info">
              <h3>{item.item_name}</h3>
              <p>{item.item_description}</p>
              <p>
                Prix :
                {" "}
                {currencyFormat(item.item_price)}
              </p>
              <div className="buttons">
                <Link to={`/articles/${item.item_id}`}>
                  <button type="button" className="ui inverted violet button"><i role="button" aria-label="item description" className="eye icon" /></button>
                </Link>
                {/*
                //TODO ajouter les liens
                */}
                <Link to="/">
                  <button type="button" className="ui inverted violet button"><i role="button" aria-label="update item" className="pencil alternate icon" /></button>
                </Link>

                <button type="button" className="ui inverted red button" onClick={() => openDeleteModal(item.item_id)}><i role="button" aria-label="delete item" className="trash icon" /></button>

              </div>
            </aside>
          </article>
        </div>
      ))}

      {/* Modal de confirmation */}
      {showModal && (
      <div className="modal">
        <div className="modal-content">
          <p>{confirmationMessage}</p>
          <div className="modal-buttons">
            <button type="button" onClick={handleModalConfirm}>Confirmer</button>
            <button type="button" onClick={handleCancelConfirm}>Annuler</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default CreatorItems;
