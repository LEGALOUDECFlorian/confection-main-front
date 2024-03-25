import FormLogin from "../../components/Form/FormLogin/index.jsx";
import FormInscription from "../../components/Form/FormInscription/index.jsx";
import "./loginpage.scss";

function LoginPage() {
  return (
    <div className="container form--divider">
      <div className="left-form">
        <h2>Se connecter</h2>
        <FormLogin />
      </div>
      <div className="right-form">
        <h2>S'inscrire</h2>
        <FormInscription />
      </div>
    </div>
  );
}

export default LoginPage;
