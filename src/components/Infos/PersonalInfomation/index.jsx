/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import { useState, useEffect } from "react";
import {
  Form, Input, Button, Icon,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import axios from "axios";

function PersonalInformation() {
  const userId = localStorage.getItem("id");

  // Données utilisateur initiales
  const initialUserData = {
    firstname: "",
    lastname: "",
    email: "",
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
    address: "",
    zipcode: "",
    city: "",
    phone_number: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateUserData = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        newpassword: userData.newpassword,
        address: userData.address,
        city: userData.city,
        zipcode: userData.zipcode,
        phone_number: userData.phone_number,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        updateUserData,
      );
      setUserData((prevData) => ({
        ...prevData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setEditMode(false);
      if (response.status === 200) {
        toast.success("Vos modifications on bien était prises en compte");
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        toast.info("Les champs obligatoires du formulaire doivent être remplis. Celui-ci n'a pas pu être mis à jour.");
      } else {
        toast.error("Une erreur est survenue pendant la requête.");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Informations personnelles</h2>
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
        <Form.Field>
          <label htmlFor="firstName">
            Prénom
            <Input
              id="firstName"
              type="text"
              name="firstName"
              value={userData.firstname || ""}
              onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="lastName">
            Nom
            <Input
              id="lastName"
              type="text"
              name="lastName"
              value={userData.lastname || ""}
              onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="phone">
            Numéro de téléphone
            <Input
              id="phone"
              type="text"
              name="phoneNumber"
              value={userData.phone_number || ""}
              onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label htmlFor="email">
            Adresse E-mail
            <Input
              id="email"
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
      </Form.Group>
      <h2>Mot de passe</h2>
      <Form.Group widths="equal">
        <Form.Field>
          <label htmlFor="password">
            Mot de passe actuel
            <Input
              id="password"
              type="password"
              name="currentPassword"
              value={userData.currentpassword || ""}
              onChange={(e) => setUserData({ ...userData, currentpassword: e.target.value })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="newPassword">
            Nouveau mot de passe
            <Input
              id="newPassword"
              type="password"
              name="newPassword"
              value={userData.newpassword || ""}
              onChange={(e) => setUserData({ ...userData, newpassword: e.target.value })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="confirmPassword">
            Confirmer nouveau mot de passe
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={userData.confirmpassword || ""}
              onChange={(e) => setUserData({ ...userData, confirmpassword: e.target.value })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
      </Form.Group>
      <h2>Adresse</h2>
      <Form.Group widths="equal">
        <Form.Field>
          <label htmlFor="address">
            Rue
            <Input
              id="address"
              type="text"
              name="address"
              value={userData.address || ""}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="zipcode">
            Code Postal
            <Input
              id="zipcode"
              type="text"
              name="zipcode"
              value={userData.zipcode || ""}
              onChange={(e) => setUserData({ ...userData, zipcode: e.target.value })}
              disabled={!editMode}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="city">Ville</label>
          <Input
            id="city"
            type="text"
            name="city"
            value={userData.city || ""}
            onChange={(e) => setUserData({ ...userData, city: e.target.value })}
            disabled={!editMode}
          />
        </Form.Field>
      </Form.Group>

      {editMode ? (
        <Button type="submit">Enregistrer les modifications</Button>
      ) : null}
    </Form>
  );
}

export default PersonalInformation;
