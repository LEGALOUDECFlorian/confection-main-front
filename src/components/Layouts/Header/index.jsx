/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Logo from "../../../images/logo.svg";
import "./header.scss";
import { logout } from "../../../store/reducers/user.js";
import SearchComponent from "./SearchComponent.jsx";
import { useCart } from "../../../context/CartContext.jsx";

function Header() {
  const role = localStorage.getItem("role");
  // On récupère le panier, qu'il soit vide ou non
  const { cart } = useCart();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const accountOptions = [
    { key: "profile", text: "Mon Espace", icon: "user" },
    { key: "logout", text: "Déconnexion", icon: "sign-out" },
  ];

  const [searchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchIconClick = (event) => {
    event.stopPropagation();
    toggleSearch();
  };

  const handleLogout = () => {
    // Vérifie si l'utilisateur est connecté avant de déclencher la déconnexion
    if (isLoggedIn) {
      try {
        // Déclenche la déconnexion en dispatchant l'action de déconnexion
        dispatch(logout());
        toast.success("Vous êtes déconnecté.");
        // Redirige vers l'accueil après la déconnexion réussie
        navigate("/");
      } catch (error) {
        // Gère les erreurs de déconnexion, par exemple affiche une notification
        toast.error("Erreur de déconnexion", error);
      }
    } else {
      // L'utilisateur n'est pas connecté, pas besoin de déconnexion
      toast.info("Vous n'êtes pas connecté.");
    }
  };

  // Calcule la quantité totale d'articles dans le panier
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    // TODO: revoir le style du header dont div logo
    <header>
      <div className="ui inverted menu">
        <Link to="/">
          <h2 className="ui header">
            <img src={Logo} alt="logo d'une machine à coudre" className="ui circular image enlarged-logo" />
            Confection Main
          </h2>
        </Link>
        <div className="right menu">
          {searchVisible ? (
            <div className="item" ref={searchRef}>
              <SearchComponent />
            </div>
          ) : (
            <div className="item" onClick={handleSearchIconClick} type="button" tabIndex={0} aria-label="Search">
              <i className="search icon" />
            </div>
          )}
          {isLoggedIn ? (
            <Dropdown
              className="custom-dropdown"
              item
              trigger={<span className="item"><i className="user icon" /></span>}
              options={accountOptions.map((option) => ({
                key: option.key,
                text: option.text,
                icon: option.icon,
                as: Link,
                // eslint-disable-next-line no-nested-ternary
                to: option.key === "profile"
                  // Redirection en fonction du rôle de l'utilisateur
                  ? role === "membre" ? `/monespace/membre/${userId}` : `/monespace/createur/${userId}`
                  // Redirection pour la déconnexion
                  : "#",
                // Ajout d'un gestionnaire d'événements pour la déconnexion
                onClick: option.key === "logout" ? handleLogout : undefined,
              }))}
            />
          ) : (
            <Link to="/login" className="item">
              <i className="user icon" />
            </Link>
          )}
          <Link to="/panier" className="item cart">
            <i className="shopping cart icon">
              {totalQuantity > 0 && <span className="cart-items-quantity">{totalQuantity}</span>}
            </i>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
