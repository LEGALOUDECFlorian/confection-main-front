/* eslint-disable linebreak-style */
import { useState, useEffect } from "react";
import {
  Form, Input, TextArea, Button, Image,
} from "semantic-ui-react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function WorkshopForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    registration_number: "",
    address: "",
    zipcode: "",
    city: "",
    phone_number: "",
    picture: "",

  });

  useEffect(() => {
    // Récupére l'ID de l'utilisateur depuis "location"
    // userId étant stocké depuis la page FormInscription
    const userFromLocation = location.state;
    if (userFromLocation && userFromLocation.userId) {
      setUserId(userFromLocation.userId);
    }
  }, [location.state]);

  // Fonction pour gérer les changements dans les champs de saisie
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePictureChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs du formulaire
    if (
      formData.registration_number.length !== 14
       || Number.isNaN(parseInt(formData.registration_number, 10))
       || formData.description.length < 80
       || formData.zipcode.length !== 5
       || Number.isNaN(parseInt(formData.zipcode, 10))
       || formData.phone_number.length !== 10
       || Number.isNaN(parseInt(formData.phone_number, 10))
       || formData.picture === ""
    ) {
      // Si les conditions de vérification ne sont pas remplies, afficher une erreur
      toast.error(
        "Veuillez remplir tous les champs du formulaire et sélectionner une image.",
      );
      return; // Arrêtez l'exécution de la fonction handleSubmit ici
    }

    try {
      // Envoi de l'image à Cloudinary
      const cloudinaryData = new FormData();
      console.log("log 1:", formData.picture);
      cloudinaryData.append("picture", formData.picture);

      const cloudinaryRes = await axios.post(
        "http://localhost:3000/upload",
        cloudinaryData,
      );

      // Récupération de l'URL de l'image depuis la réponse de Cloudinary
      const imageUrl = cloudinaryRes.data.secure_url;
      console.log("log 2:imageUrl:", imageUrl);
      // Ajout de l'URL de l'image au formulaire
      const newFormData = { ...formData, picture: imageUrl };
      console.log("log 3:formData.picture:", formData.picture);
      // Effectuer une requête POST à l'API pour créer un nouveau créateur
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/createurs`,
        newFormData,
      );

      // recupérer l'id de l'atelier pour mettre l'utilisateur à jour
      const creatorId = response.data.id;

      const updateUser = {
        workshop_id: creatorId,
        role_id: 2,
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        updateUser,
      );
      // redirection vers la page de login
      navigate("/login");
      // Afficher une notification de succès
      toast.success("Formulaire soumis avec succès, Vous pouvez vous connecter !");
    } catch (error) {
      // Afficher une notification d'erreur
      toast.error(`Erreur lors de la soumission du formulaire: ${error.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          type="email"
          label="Email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Form.Field
          control={Input}
          label="Nom de l'entreprise"
          placeholder="Nom de l'entreprise"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <Form.Field
          control={Input}
          label="SIRET"
          placeholder="SIRET"
          name="registration_number"
          value={formData.registration_number}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Field
        control={TextArea}
        label="Description de l'entreprise"
        placeholder="Description de l'entreprise"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <Form.Field
        control={Input}
        label="Adresse de l'entreprise"
        placeholder="Adresse de l'entreprise"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        required
      />
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Code postal"
          placeholder="Code postal"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleInputChange}
          required
        />
        <Form.Field
          control={Input}
          label="Ville"
          placeholder="Ville"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Field
        control={Input}
        label="Téléphone"
        placeholder="Téléphone"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleInputChange}
        required
      />
      <Form.Field
        control={Input}
        type="file"
        label="Photo ou logo de l'entreprise"
        accept="image/*"
        onChange={handlePictureChange}
        required
      />
      {formData.picture && (
        <Image src={URL.createObjectURL(formData.picture)} size="small" />
      )}
      <Form.Field control={Button} primary type="submit" style={{ marginTop: "1em" }}>
        S'inscrire
      </Form.Field>
    </Form>
  );
}

export default WorkshopForm;
