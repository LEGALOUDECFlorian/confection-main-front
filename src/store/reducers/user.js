/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Création du state initial
const initialState = {
  // Indique si l'utilisateur est connecté ou non
  isLoggedIn: false,
  // Token d'accès pour authentifier les requêtes API
  accessToken: null,
  // Token de rafraîchissement pour générer de nouveaux tokens d'accès
  refreshToken: null,
  decodedToken: null,
  // Message d'erreur en cas de problème lors de la connexion
  error: null,
  // Indique si une requête de connexion est en cours
  loading: false,
};

// Création de l'action pour la connexion
export const userLogin = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      // Effectue une requête POST à l'API de connexion avec les données du formulaire
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData,
      );
      // Extrait les tokens d'accès et de rafraîchissement de la réponse de l'API
      const { accessToken, refreshToken } = response.data;
      // Stocke les tokens dans le stockage local du navigateur
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // Décodage du token d'accès
      const decodedToken = jwtDecode(accessToken);
      localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
      // Stockage des informations utilisateur décodées
      return { accessToken, refreshToken, decodedToken };
    } catch (error) {
      const message = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Echec de la connexion. Vérifiez vos identifiants.";
      // En cas d'erreur lors de la requête, rejette la promesse avec les détails de l'erreur
      return rejectWithValue(message);
    }
  },
);

//
export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const id = localStorage.getItem("id");
      // Token d'accès pour authentifier les requêtes API
      const accessToken = localStorage.getItem("accessToken");
      // Token de rafraîchissement pour générer de nouveaux tokens d'accès
      const refreshToken = localStorage.getItem("refreshToken");
      const decodedToken = localStorage.getItem("decodedToken");
      return {
        id, accessToken, refreshToken, decodedToken,
      };
    }
    //!
    // Création d'un nouvel objet pour éviter de modifier le paramètre 'state'
    const newState = { ...initialState };
    newState.error = null;
    newState.loading = false;
    return newState;
    // // Message d'erreur en cas de problème lors de la connexion
    // state.error = null;
    // // Indique si une requête de connexion est en cours
    // state.loading = false;
  },
);

// Création de l'action asynchrone pour la suppression du token de rafraîchissement
export const deleteRefreshToken = createAsyncThunk(
  "user/deleteRefreshToken",
  async () => {
    try {
      // Effectue une requête DELETE à l'API pour supprimer le token de rafraîchissement
      await axios.delete(`${import.meta.env.VITE_API_URL}/login/refresh_token`);
    } catch (error) {
      console.error("Error deleting refresh token:", error);
      throw error; // Relance l'erreur pour être gérée par le thunk
    }
  },
);

// Création de l'action pour la déconnexion
export const logout = createAsyncThunk("user/logout", async (_, { dispatch }) => {
  // Suppression du token de rafraîchissement
  await dispatch(deleteRefreshToken());
});

// Création du reducer pour gérer l'état de la connexion de l'utilisateur
const userReducer = createReducer(initialState, (builder) => {
  builder
    // Gère le cas où la requête de connexion est en attente de réponse
    .addCase(userLogin.pending, (state) => {
      // Indique que la requête est en cours
      state.loading = true;
      // Efface les éventuels messages d'erreur précédents
      state.error = null;
    })
    // Gère le cas où la connexion est réussie et les tokens sont reçus
    .addCase(userLogin.fulfilled, (state, action) => {
      // Indique que la requête est terminée
      state.loading = false;
      // Marque l'utilisateur comme connecté
      state.isLoggedIn = true;
      // Stockage du token d'accès
      state.accessToken = action.payload.accessToken;
      // Stockage du token de rafraîchissement
      state.refreshToken = action.payload.refreshToken;
      // Stockage des informations utilisateur décodées
      state.decodedToken = action.payload.decodedToken;
      localStorage.setItem("id", action.payload.decodedToken.id);
      localStorage.setItem("email", action.payload.decodedToken.email);
      localStorage.setItem("lastname", action.payload.decodedToken.lastname);
      localStorage.setItem("firstname", action.payload.decodedToken.firstname);
      localStorage.setItem("workshopId", action.payload.decodedToken.workshopId);
      localStorage.setItem("role", action.payload.decodedToken.role);

      // Efface les éventuels messages d'erreur précédents
      state.error = null;
    })
    // Gère le cas où la connexion est rejetée en raison d'une erreur
    .addCase(userLogin.rejected, (state, action) => {
      // Indique que la requête est terminée
      state.loading = false;
      // Stocke le message d'erreur renvoyé par l'API ou un message générique
      state.error = action.payload
        ? action.payload
        : "Une erreur est survenue, veuillez réessayer plus tard ...";
    })
    .addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("lastname");
      localStorage.removeItem("firstname");
      localStorage.removeItem("worshopId");
      localStorage.removeItem("role");
      console.log("Utilisateur déconnecté avec succès.");
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      if (!state.isLoggedIn) {
        state.isLoggedIn = true;
        state.id = action.payload.id;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        console.log(action.payload.decodedToken);
        state.decodedToken = JSON.parse(action.payload.decodedToken);
        state.error = null;
      }
    })
    // Gère le cas où la suppression du token de rafraîchissement est réussie
    .addCase(deleteRefreshToken.fulfilled, () => {
    })
    // Gère le cas où la suppression du token de rafraîchissement échoue
    .addCase(deleteRefreshToken.rejected, (state, action) => {
      console.error("Error deleting refresh token:", action.error);
    });
});

export default userReducer;
