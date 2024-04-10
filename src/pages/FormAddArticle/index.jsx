/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from "react";
import {
  Form, Input, TextArea, Button, Checkbox, Dropdown, Image,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/Modal/confirmModal.jsx";

function FormAddArticle() {
  const navigate = useNavigate();
  const workshopId = parseInt(localStorage.getItem("workshopId"), 10);
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [articleData, setArticleData] = useState({
    name: "",
    description: "",
    picture: "",
    price: "",
    material: "",
    customizable: false,
    workshop_id: workshopId,
    category_id: "",
    subcategory_id: "",
    status_id: 2,
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // Message de la modale
  const confirmationMessage = "Votre article a bien été ajouté. Souhaitez-vous ajouter un autre article ?";
  const modalButtonMessage = {
    validateButton: "Confirmer",
    cancelButton: "Non merci",
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`,
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubCategory = async (categoryName) => {
    try {
      console.log("categoryName", categoryName);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/${categoryName}/sous-categories`,
      );
      setSubcategories(response.data);
    } catch (error) {
      console.error(`Error fetching subcategories for ${categoryName}:`, error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setArticleData({ ...articleData, customizable: !articleData.customizable });
  };

  const handlePictureChange = (e) => {
    setArticleData({ ...articleData, picture: e.target.files[0] });
  };

  const handleCategoryChange = (e, { value }) => {
    setArticleData({ ...articleData, category_id: value, subcategory_id: null });
    const selectedCategory = categories.find((category) => category.id === value);
    handleSubCategory(selectedCategory.name.toLowerCase());
  };

  const handleSubcategoryChange = (e, { value }) => {
    setArticleData({ ...articleData, subcategory_id: value });
  };

  const handleModalConfirm = () => {
    setArticleData({
      name: "",
      description: "",
      picture: "",
      price: "",
      material: "",
      customizable: false,
      workshop_id: workshopId,
      category_id: "",
      subcategory_id: "",
      status_id: 2,
    });
    setShowModal(false);
    setLoading(false);
  };

  const handleCancelConfirm = () => {
    setArticleData({
      name: "",
      description: "",
      picture: "",
      price: "",
      material: "",
      customizable: false,
      workshop_id: workshopId,
      category_id: "",
      subcategory_id: "",
      status_id: 2,
    });
    navigate(`/monespace/createur/${userId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const cloudinaryData = new FormData();
      cloudinaryData.append("picture", articleData.picture);
      const cloudinaryRes = await axios.post(`${import.meta.env.VITE_API_URL2}/upload`, cloudinaryData);
      const imageUrl = cloudinaryRes.data.secure_url;
      const newArticleData = { ...articleData, picture: imageUrl };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/articles`, newArticleData);
      if (response.status === 200) {
        toast.success("Article ajouté avec succès !");
        setShowModal(true);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      toast.error("Erreur lors de l'ajout de l'article");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
        <Form.Field>
          <label htmlFor="name">
            Nom de l'article
            <Input
              id="name"
              type="text"
              name="name"
              value={articleData.name}
              onChange={handleInputChange}
              placeholder="Entrez le nom de l'article"
              aria-label="Nom de l'article"
              aria-required
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="description">
            Description
            <TextArea
              id="description"
              name="description"
              value={articleData.description}
              onChange={handleInputChange}
              placeholder="Entrez la description de l'article"
              aria-label="Description de l'article"
              aria-required
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="item Picture">
            Image
            <Input
              id="item Picture"
              type="file"
              name="item Picture"
              onChange={handlePictureChange}
              accept="image/*"
              aria-label="Image de l'article"
              aria-required
            />
          </label>
          {articleData.picture && (
            <div className="image-preview">
              <Image src={URL.createObjectURL(articleData.picture)} size="small" />
            </div>
          )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="price">
            Prix
            <Input
              id="price"
              type="number"
              name="price"
              min="0"
              max="9999"
              value={articleData.price}
              onChange={handleInputChange}
              placeholder="Entrez le prix de l'article"
              aria-label="Prix de l'article"
              aria-required
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="item Picture">
            Matière
            <Input
              id="item Picture"
              type="text"
              name="material"
              value={articleData.material}
              onChange={handleInputChange}
              placeholder="Entrez la matière de fabrication de l'article"
              aria-label="Matière de l'article"
              aria-required
            />
          </label>
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="Personnalisable"
            checked={articleData.customizable}
            onChange={handleCheckboxChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="Select Category">
            Catégorie
            <Dropdown
              id="SelectCategory"
              placeholder="Sélectionner une catégorie"
              fluid
              selection
              options={categories.map((category) => ({
                key: category.id,
                text: category.name,
                value: category.id,
              }))}
              onChange={handleCategoryChange}
              value={articleData.category_id}
              aria-label="Catégorie de l'article"
              aria-required
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="Select Subcategory">Sous-catégorie</label>
          <Dropdown
            id="SelectSubcategory"
            placeholder="Sélectionner une sous-catégorie"
            fluid
            selection
            options={subcategories.map((subcategory) => ({
              key: subcategory.subcategory_id,
              text: subcategory.subcategory_name,
              value: subcategory.subcategory_id,
            }))}
            onChange={handleSubcategoryChange}
            value={articleData.subcategory_id}
            disabled={!articleData.category_id}
            aria-label="Sous-catégorie de l'article"
            aria-required
          />
        </Form.Field>
        <Button
          type="submit"
          style={{ color: "white" }}
        >
          Ajouter l'article
        </Button>
      </Form>

      {/* Modal de confirmation */}
      <ConfirmationModal
        showModal={showModal}
        confirmationMessage={confirmationMessage}
        handleModalConfirm={handleModalConfirm}
        handleCancelConfirm={handleCancelConfirm}
        validateButton={modalButtonMessage.validateButton}
        cancelButton={modalButtonMessage.cancelButton}
      />

      {/* Loader */}
      {loading && (
        <div className="ui active centered inline loader" />
      )}
    </>
  );
}

export default FormAddArticle;
