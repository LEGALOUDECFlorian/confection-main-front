/* eslint-disable linebreak-style */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../../../store/reducers/user.js";

function FormLogin() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const initialFormData = {
    email: "marty.mcfly@hillvalley.com",
    password: "Password1234!",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Déclaration de response en dehors du bloc try pour le rendre accessible dans le catch
  let response;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Initialise response à undefined afin de lui attribuer une valeur
      // et ainsi éviter les erreurs
      response = undefined;

      response = await dispatch(userLogin(formData));

      // Vérifie la présence du token avant de le décoder
      if (!response.payload || !response.payload.accessToken) {
        toast.error("Email ou mot de passe incorrect.");
      }

      const decodedToken = jwtDecode(response.payload.accessToken);
      // Redirection en fonction du rôle de l'utilisateur
      if (decodedToken.role === "membre") {
        navigate("/");
        toast.success("Vous êtes connecté", { type: "success" });
      } else if (decodedToken.role === "createur") {
        navigate("/");
      } else {
        navigate("/");
      }

      setFormData(initialFormData);
    } catch (err) {
      console.error(err);
      if (response && response.status === 401) {
        toast.info("Email ou mot de passe incorrect.");
      } else {
        toast.error("Une erreur est survenue pendant la requête.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="username"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Mot de passe
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
            required
          />
        </label>
      </div>
      {error && <div>{error.message}</div>}
      <button type="submit">Connexion</button>
    </form>
  );
}

export default FormLogin;
