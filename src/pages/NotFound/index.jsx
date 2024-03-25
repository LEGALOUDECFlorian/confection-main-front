import { Link } from "react-router-dom";
import "../../styles/styles.scss";
import "./notfound.scss";

function NotFound() {
  return (
    <div className="main--errorpage">
      <h1>Ouaf ! Cette magnifique tenue est à moi </h1>
      <h2><Link to="/"> Retournez plutôt sur la page d'accueil </Link></h2>
      <div>
        <img
          src="https://res.cloudinary.com/dey9vc5kc/image/upload/v1710975992/qi6l2nxvgrcbnc6e06g1.jpg"
          alt="chien portant des lunettes de soleil, un béret rouge et une chemise"
        />
      </div>
    </div>
  );
}

export default NotFound;
