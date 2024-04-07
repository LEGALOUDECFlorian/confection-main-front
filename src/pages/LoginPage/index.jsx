import FormLogin from "../../components/Form/FormLogin/index.jsx";
import FormInscription from "../../components/Form/FormInscription/index.jsx";
import "./loginpage.scss";

function LoginPage() {
  return (
    <div className="container form--divider">
      <section className="left-form" aria-labelledby="login-heading">
        <h2 id="login-heading">Se connecter</h2>
        <FormLogin />
      </section>
      <section className="right-form" aria-labelledby="inscription-heading">
        <h2 id="inscription-heading">S'inscrire</h2>
        <FormInscription />
      </section>
    </div>
  );
}

export default LoginPage;
