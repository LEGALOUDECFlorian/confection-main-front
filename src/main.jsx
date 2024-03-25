// Import des fonctions pour création du routeur
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
// eslint-disable-next-line import/extensions
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./store/index.js";
import "react-toastify/dist/ReactToastify.css";

import "./styles/styles.scss";

// Importation des composants
import App from "./App/app.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import WorkshopFormPage from "./pages/WorkshopFormPage/index.jsx";
import CartPage from "./pages/CartPage/index.jsx";
import CreatorsPage from "./pages/CreatorsPage/index.jsx";
import CreatorSpacePage from "./pages/CreatorSpacePage/index.jsx";
import ClientSpacePage from "./pages/ClientSpacePage/index.jsx";
import ItemsPage from "./pages/ItemsPage/index.jsx";
import ItemDetailsPage from "./pages/ItemDetailsPage/index.jsx";
import CreatorDetailsPage from "./pages/CreatorDetailsPage/index.jsx";
import CategoryPage from "./pages/CategoryPage/index.jsx";
import SubcategoryPage from "./pages/SubcategoryPage/index.jsx";
import FormAddArticle from "./pages/FormAddArticle/index.jsx";
import NotFound from "./pages/NotFound/index.jsx";

// Création du routeur
const router = createBrowserRouter([
  /* Premier élément: le layout qui va accueillir tous les sous-composants de nos pages */
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "login/createur", element: <WorkshopFormPage /> },
      { path: "monespace/membre/:userId", element: (<ClientSpacePage />) },
      { path: "monespace/createur/:userId", element: (<CreatorSpacePage />) },
      { path: "createurs", element: <CreatorsPage /> },
      { path: "createurs/:creatorId", element: <CreatorDetailsPage /> },
      { path: "categories/:categoryId", element: <CategoryPage /> },
      { path: "sous-categories/:subcategoryId", element: <SubcategoryPage /> },
      { path: "articles", element: <ItemsPage /> },
      { path: "articles/:itemId", element: <ItemDetailsPage /> },
      { path: "ajout-article", element: <FormAddArticle /> },
      { path: "panier", element: <CartPage /> },
      { path: "*", element: <NotFound /> }, // pour toutes les routes inexistantes renvoyant une 404

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
