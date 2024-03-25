/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import { useState, useEffect } from "react";
import {
  Form, Input, Button, Icon, Dropdown,
} from "semantic-ui-react";
// import { toast } from "react-toastify";
import axios from "axios";

function CompagnyInformation() {
  const userId = localStorage.getItem("id");

  // Options pour le dropdown des réseaux sociaux
  const socialMediaOptions = [
    { key: "instagram", text: "Instagram", value: "instagram" },
    { key: "Tik-Tok", text: "Tik-Tok", value: "Tik-Tok" },
    { key: "facebook", text: "Facebook", value: "facebook" },
  ];

  // Données entreprise initiales
  const initialCompanyData = {
    workshop_id: "",
    workshop_name: "",
    registration_number: "",
    workshop_phone_number: "",
    workshop_email: "",
    workshop_description: "",
    workshop_address: "",
    workshop_city: "",
    workshop_zipcode: "",
    socialMedia: [],
  };

  const [companyData, setCompanyData] = useState(initialCompanyData);
  const [editMode, setEditMode] = useState(false);

  // Fonction pour activer le mode édition
  const handleEditClick = () => {
    // Réinitialiser les données de l'entreprise à partir de initialCompanyData
    setEditMode(true);
  };

  // Fonction pour ajouter un réseau social
  const handleAddSocialMedia = (socialMedia) => {
    setCompanyData({
      ...companyData,
      socialMedia: [...companyData.socialMedia, socialMedia],
    });
  };

  // Fonction pour supprimer un réseau social
  const handleRemoveSocialMedia = (index) => {
    const updatedSocialMedia = [...companyData.socialMedia];
    updatedSocialMedia.splice(index, 1);
    setCompanyData({ ...companyData, socialMedia: updatedSocialMedia });
  };

  // Effet pour charger les données de l'entreprise lors du chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Effectue une requête GET pour récupérer les données de l'entreprise depuis le backend
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}/createur`,

        );
        console.log("Données de l'API :", response.data);
        // Mettre à jour les données de l'entreprise dans l'état local
        setCompanyData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    // Appele la fonction fetchData pour charger les données de l'entreprise
    fetchData();
  }, [userId]); // Le tableau vide en second argument signifie que cet effet
  // ne s'exécute qu'une fois après le montage du composant

  const workshopId = companyData.workshop_id;
  console.log("workshopId:", workshopId);
  // Fonction pour soumettre les modifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    // Objet pour les données à mettre à jour
      const updateData = {
        name: companyData.workshop_name,
        registration_number: companyData.registration_number,
        phone_number: companyData.workshop_phone_number,
        email: companyData.workshop_email,
        description: companyData.workshop_description,
        address: companyData.workshop_address,
        city: companyData.workshop_city,
        zipcode: companyData.workshop_zipcode,
      };

      // Envoi les nouvelles valeurs au backend
      console.log("updateData:", updateData);
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/createurs/${workshopId}`,
        updateData,
      );

      // Désactive le mode édition après la soumission
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la soumission des données:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ fontSize: "1.1em" }}>
      {/* Section des informations sur l'entreprise */}
      <h2>Infos entreprise</h2>
      <Button
        icon
        style={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={(e) => {
          e.preventDefault();
          handleEditClick();
        }}
      >
        <Icon name="pencil" />
      </Button>
      <Form.Group widths="equal">
        {/* Champs pour le nom de l'entreprise, le numéro de SIRET et le numéro de téléphone */}
        <Form.Field>
          <label htmlFor="workShopName" style={{ fontWeight: "bold" }}>
            Nom entreprise
          </label>
          <Input
            id="workShopName"
            type="text"
            placeholder="Nom entreprise"
            value={companyData.workshop_name}
            onChange={(e) => setCompanyData({
              ...companyData, workshop_name: e.target.value,
            })}
            disabled={!editMode}
          />
        </Form.Field>

        <Form.Field>
          <label htmlFor="siretNumber" style={{ fontWeight: "bold" }}>
            Numéro SIRET
            <Input
              id="siretNumber"
              type="text"
              placeholder="Numéro SIRET"
              value={companyData.registration_number}
              onChange={(e) => setCompanyData({
                ...companyData,
                registration_number: e.target.value,
              })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="siretNumber" style={{ fontWeight: "bold" }}>
            Numéro de téléphone
            <Input
              id="siretNumber"
              type="text"
              placeholder="Numéro de téléphone"
              value={companyData.workshop_phone_number}
              onChange={(e) => setCompanyData({
                ...companyData, workshop_phone_number: e.target.value,
              })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
      </Form.Group>
      {/* Champ pour le workshop_email professionnel */}
      <div>
        <h2>Adresse e-mail pro</h2>
        <Form.Field>
          <label htmlFor="siretNumber" style={{ fontWeight: "bold" }}>
            E-mail Pro
            <Input
              id="siretNumber"
              type="email"
              placeholder="E-mail Pro"
              value={companyData.workshop_email}
              onChange={(e) => setCompanyData({
                ...companyData, workshop_email: e.target.value,
              })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
      </div>
      {/* Champ pour la description de l'entreprise */}
      <div>
        <h2>Description entreprise</h2>
        <Form.Field>
          <label htmlFor="description" style={{ fontWeight: "bold" }}>
            Description
            <Input
              id="description"
              type="text"
              placeholder="Description"
              value={companyData.workshop_description}
              onChange={(e) => setCompanyData({
                ...companyData, workshop_description: e.target.value,
              })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
      </div>
      {/* Section pour l'adresse de l'entreprise */}
      <div>
        <h2>Adresse</h2>
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="address" style={{ fontWeight: "bold" }}>
              Adresse
              <Input
                id="address"
                type="text"
                placeholder="Adresse"
                value={companyData.workshop_address}
                onChange={(e) => setCompanyData({
                  ...companyData,
                  workshop_address: e.target.value,
                })}
                disabled={!editMode}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="zipCode" style={{ fontWeight: "bold" }}>
              Code Postal
              <Input
                id="zipCode"
                type="text"
                placeholder="Code Postal"
                value={companyData.workshop_zipcode}
                onChange={(e) => setCompanyData({
                  ...companyData,
                  workshop_zipcode: e.target.value,
                })}
                disabled={!editMode}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="city" style={{ fontWeight: "bold" }}>
              Ville
              <Input
                id="city"
                type="text"
                placeholder="Ville"
                value={companyData.workshop_city}
                onChange={(e) => setCompanyData({
                  ...companyData, workshop_city: e.target.value,
                })}
                disabled={!editMode}
              />
            </label>
          </Form.Field>
        </Form.Group>
      </div>
      {/* Section pour les réseaux sociaux */}
      <div>
        <h2>Réseaux sociaux</h2>
        {/* Affichage des réseaux sociaux existants */}
        {companyData.socialMedia
          && companyData.socialMedia.map((socialMedia) => (
            <Form.Group key={socialMedia.id} widths="equal">
              <label htmlFor={`socialMedia_${socialMedia.name}`} style={{ fontWeight: "bold" }}>
                Réseau social
              </label>
              <Form.Field>
                <Dropdown
                  id={`socialMedia_${socialMedia.id}`}
                  placeholder="Choisissez un réseau social"
                  fluid
                  selection
                  options={socialMediaOptions}
                  value={socialMedia.name}
                  onChange={(e, { value }) => setCompanyData({
                    ...companyData,
                    socialMedia: companyData.socialMedia
                      .map((item, i) => (i === socialMedia.id ? { ...item, name: value } : item)),
                  })}
                  disabled={!editMode}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  type="text"
                  placeholder="URL"
                  value={socialMedia.url}
                  onChange={(e) => setCompanyData({
                    ...companyData,
                    socialMedia: companyData.socialMedia
                    // ! / //
                    // TODO //
                      // eslint-disable-next-line no-undef
                      .map((item, i) => (i === index ? { ...item, url: e.target.value } : item)),
                  })}
                  disabled={!editMode}
                />
              </Form.Field>
              {/* Bouton pour supprimer un réseau social */}
              {editMode && (
                <Button icon onClick={() => handleRemoveSocialMedia(socialMedia.id)}>
                  <Icon name="trash" />
                </Button>
              )}
            </Form.Group>
          ))}
        {/* Bouton pour ajouter un nouveau réseau social */}
        {editMode && (
        <Button
          type="button"
          onClick={() => handleAddSocialMedia({ name: "", url: "" })}
          style={{ color: "white" }}
        >
          Ajouter un réseau social
        </Button>
        )}
      </div>
      {/* Bouton pour enregistrer les modifications */}
      {editMode ? (
        <Button type="submit">Enregistrer les modifications</Button>
      ) : null}
    </Form>
  );
}

export default CompagnyInformation;
