import PersonalInformation from "../../components/Infos/PersonalInfomation/index.jsx";
import CompagnyInformation from "../../components/Infos/CompagnyInformation/index.jsx";
import CreatorItems from "../../components/CreatorItems/index.jsx";

function CreatorSpacePage() {
  return (
    <>
      <section>
        <h2>Mes Infos</h2>
        <PersonalInformation />
      </section>
      <section>
        <h2>Mon Atelier</h2>
        <CompagnyInformation />
      </section>
      <section>
        <h2>Mes Articles</h2>
        <CreatorItems />
      </section>
    </>
  );
}

export default CreatorSpacePage;
