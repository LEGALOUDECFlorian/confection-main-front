import { Icon } from "semantic-ui-react";
import "./footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="ui container">
        <p>&copy; 2024 Confection Main - Tous droits réservés.</p>
        <div className="footer-links">
          <Link to="/contact">Contact</Link>
          <Link to="/mentions-legales">Mentions Légales</Link>
          <Link to="/cgv">CGU</Link>
          <Link to="/cgu">CGV</Link>
          <Link to="/vendre-sur-mon-site">Vendre sur mon site</Link>
        </div>
        <div className="social-medias">
          <Icon name="facebook" link />
          <Icon name="twitter" link />
          <Icon name="instagram" link />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
