/* eslint-disable linebreak-style */
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "../store/reducers/user.js";
import { CartProvider } from "../context/CartContext.jsx";
import Header from "../components/Layouts/Header/index.jsx";
import Navbar from "../components/NavBar/index.jsx";
import BackToTopButton from "../components/BackToTop/index.jsx";
import Footer from "../components/Layouts/Footer/index.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <CartProvider>
      <Header />
      <Navbar />
      <main>
        <Outlet />
        <BackToTopButton />
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
