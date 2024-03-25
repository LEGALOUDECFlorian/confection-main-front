/* eslint-disable linebreak-style */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordCheck from "./PasswordCheck/index.jsx";

function FormInscription() {
  const navigate = useNavigate();

  // Initialisation de l'état du formulaire
  const [formData, setFormData] = useState({
    lastname: "Doe",
    firstname: "John",
    email: "john.doe@example.com",
    password: "Password1234!",
    confirmPassword: "Password1234!",
    role: "",
    confirmConditions: false,
  });

  // État pour gérer l'activité des champs de mot de passe
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false);
  const [isConfirmPasswordInputActive, setIsConfirmPasswordInputActive] = useState(false);

  // État pour afficher la modal de confirmation après soumission
  const [showModal, setShowModal] = useState(false);
  // Message de confirmation en fonction du rôle
  const [confirmationMessage, setConfirmationMessage] = useState(
    "Veuillez confirmer votre inscription.",
  );

  // Fonction pour gérer les changements dans les champs de saisie
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    // Déterminer la nouvelle valeur en fonction du type de champ
    const newValue = e.target.type === "checkbox" ? checked : value;
    // Mettre à jour l'état du formulaire avec les nouvelles valeurs
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Mettre à jour le message de confirmation en fonction du rôle sélectionné
    if (name === "role") {
      const message = value === "client"
        ? "Veuillez confirmer votre inscription."
        : "En confirmant, vous serez redirigé pour finaliser votre inscription et ainsi pouvoir vendre sur notre site, rejoignant ainsi la grande famille des créateurs.";
      setConfirmationMessage(message);
    }
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérification si les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      toast.info("Le mot de passe et la confirmation doivent être identiques.");
      return;
    }

    // Affiche la modal de confirmation après soumission
    setShowModal(true);
  };

  // Fonction pour gérer la confirmation dans la modal
  const handleConfirmation = async () => {
    try {
      const {
        lastname, firstname, email, password,
      } = formData;
      const newFormData = {
        lastname, firstname, email, password,
      };
      // Effectuer une requête POST à l'API pour créer un nouvel utilisateur
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        newFormData,
      );
      // Log des données du formulaire
      const userId = response.data.id; // Récupérer l'ID de l'utilisateur créé

      // Réinitialiser le formulaire après soumission
      setFormData({
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "client",
        confirmConditions: false,
      });

      // Cacher la modal après confirmation
      setShowModal(false);

      // Logique conditionnelle basée sur le rôle sélectionné
      if (formData.role === "client") {
        toast.success("Inscription réussie. Vous pouvez maintenant vous connecter.");
      } else if (formData.role === "creator") {
        navigate("/login/createur", { state: { userId } });
      }
    } catch (error) {
      toast.error("Erreur lors de la création de l'utilisateur:", error);
    }
  };

  // Fonction pour annuler la confirmation dans la modal
  const handleCancelConfirmation = () => {
    setShowModal(false);
  };

  // Rendu du composant de formulaire
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Champ de saisie pour le nom */}
        <div>
          <label htmlFor="lastname">
            Nom
            {" "}
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Nom"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        {/* Champ de saisie pour le prénom */}
        <div>
          <label htmlFor="firstname">
            Prénom
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Prénom"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        {/* Champ email */}
        <div>
          <label htmlFor="emailInscription">
            Email
            <input
              type="email"
              id="emailInscription"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              required
            />
          </label>
        </div>
        {/* Champ mot de passe */}
        <div>
          <label htmlFor="passwordInscription">
            Mot de passe
            <input
              type="password"
              id="passwordInscription"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => setIsPasswordInputActive(true)}
              onBlur={() => setIsPasswordInputActive(false)}
              autoComplete="current-password"
              required
            />
          </label>
        </div>
        {/* Champ confirmation de mot de passe */}
        <div>
          <label htmlFor="confirmPasswordInscription">
            Confirmer le mot de passe
            <input
              type="password"
              id="confirmPasswordInscription"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onFocus={() => setIsConfirmPasswordInputActive(true)}
              onBlur={() => setIsConfirmPasswordInputActive(false)}
              autoComplete="current-password"
              required
            />
          </label>
        </div>
        {/* Utilisation du composant PasswordCheck pour vérifier la force du mot de passe */}
        <PasswordCheck
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          isPasswordInputActive={isPasswordInputActive}
          isConfirmPasswordInputActive={isConfirmPasswordInputActive}
        />
        {/* Sélection du rôle */}
        <div>
          <label htmlFor="inscriptionClient" style={{ marginLeft: "0.5em" }}>
            <input
              type="radio"
              id="inscriptionClient"
              name="role"
              value="client"
              checked={formData.role === "client"}
              onChange={handleInputChange}
              required
            />
            Je suis client
          </label>
        </div>
        <div>
          <label htmlFor="inscriptionCreator" style={{ marginLeft: "0.5em" }}>
            <input
              type="radio"
              id="inscriptionCreator"
              name="role"
              value="creator"
              checked={formData.role === "creator"}
              onChange={handleInputChange}
              required
            />
            Je suis créateur
          </label>
        </div>
        {/* Case à cocher pour accepter les conditions */}
        <div>
          <label htmlFor="confirmConditions" style={{ marginLeft: "0.5em" }}>
            <input
              type="checkbox"
              id="confirmConditions"
              name="confirmConditions"
              checked={formData.confirmConditions}
              onChange={handleInputChange}
              required
            />
            Accepter les conditions d'utilisation.
          </label>
        </div>
        {/* Bouton pour soumettre le formulaire */}
        <button type="submit">Inscription</button>
      </form>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{confirmationMessage}</p>
            <div className="modal-buttons">
              <button type="button" onClick={handleConfirmation}>Confirmer</button>
              <button type="button" onClick={handleCancelConfirmation}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FormInscription;
