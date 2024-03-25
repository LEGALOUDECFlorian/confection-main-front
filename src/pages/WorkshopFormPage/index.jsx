import WorkshopForm from "../../components/Form/WorkshopForm/index.jsx";
import "./WorkshopFormPage.scss";

function LoginPage() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Devenir créateur</h1>
      <section className="container">
        <WorkshopForm />
      </section>
    </>
  );
}

export default LoginPage;
