import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container, Image, Header, Segment, List, Grid, Button,
} from "semantic-ui-react";
import "./creatordetails.scss";

function CreatorDetailsPage() {
  const { creatorId } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/createurs/${creatorId}`);
        setCreator(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [creatorId]);

  if (!creator) {
    return <div>Chargement du créateur...</div>;
  }

  return (
    <>
      <section>
        <Container className="creator-page-container">
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column width={8}>
                <Segment raised padded="very" className="creator-info__container">
                  <Image
                    src={creator.picture}
                    alt={`Creator ${creator.name}`}
                    className="creator-image"
                    size="medium"
                    centered
                  />
                  <Header as="h1" color="grey" textAlign="center">{creator.name}</Header>
                  <Button primary onClick={() => window.location.href === `mailto:${creator.email}`}>
                    Contactez-moi
                  </Button>
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                <Segment raised padded="very">
                  <Header as="h2" color="grey" className="creator-description">{creator.description}</Header>
                  <List className="creator-info-list">
                    <List.Item>
                      Email :
                      {" "}
                      {creator.email}
                    </List.Item>
                    <List.Item>
                      SIRET :
                      {" "}
                      {creator.registration_number}
                    </List.Item>
                    <List.Item>
                      Adresse :
                      {" "}
                      {creator.address}
                      ,
                      {" "}
                      {creator.zipcode}
                      {" "}
                      {creator.city}
                    </List.Item>
                    <List.Item>
                      Téléphone :
                      {" "}
                      {creator.phone_number}
                    </List.Item>
                  </List>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum iusto neque porro magnam, repellendus veniam commodi ex quo autem
                    in saepe
                    animi esse laborum blanditiis magni aliquam impedit.
                    Unde, sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsum fugiat beatae laudantium nemo soluta pariatur doloribus id, cum,
                    magnam asperiores ad commodi possimus quod. Atque repudiandae eaque
                    impedit ullam culpa.
                    Optio alias asperiores suscipit, vero dolor cum. Cumque aliquam corrupti
                    eos incidunt illo quia excepturi. Accusamus deleniti debitis magnam
                    aspernatur porro, accusantium, quibusdam fuga molestiae,
                    voluptas nemo perferendis harum ex.
                  </p>
                  <p>
                    Optio alias asperiores suscipit, vero dolor cum.
                    Cumque aliquam corrupti eos incidunt illo quia excepturi.
                    Accusamus deleniti debitis magnam aspernatur porro, accusantium,
                    quibusdam fuga molestiae, voluptas nemo perferendis harum ex.
                  </p>
                  <p>
                    Optio alias asperiores suscipit, vero dolor cum.
                    Cumque aliquam corrupti eos incidunt illo quia excepturi.
                    Accusamus deleniti debitis magnam aspernatur porro, accusantium,
                    quibusdam fuga molestiae, voluptas nemo perferendis harum ex.
                  </p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>

      <section>
        <Container className="creator-page-container">
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column width={8}>
                <Segment raised padded="very">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore animi dolor, amet voluptatibus unde libero in ea ut excepturi
                    vero assumenda dolorum necessitatibus illum ab. Incidunt
                    quasi cupiditate odit porro.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore animi dolor, amet voluptatibus unde libero in ea ut excepturi
                    vero assumenda dolorum necessitatibus illum ab. Incidunt
                    quasi cupiditate odit porro.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore animi dolor, amet voluptatibus unde libero in ea ut excepturi
                    vero assumenda dolorum necessitatibus illum ab. Incidunt
                    quasi cupiditate odit porro.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore animi dolor, amet voluptatibus unde libero in ea ut excepturi
                    vero assumenda dolorum necessitatibus illum ab. Incidunt
                    quasi cupiditate odit porro.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore animi dolor, amet voluptatibus unde libero in ea ut excepturi
                    vero assumenda dolorum necessitatibus illum ab. Incidunt
                    quasi cupiditate odit porro.
                  </p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                <Segment raised padded="very">
                  <Image
                    src={creator.picture}
                    alt={`Creator ${creator.name}`}
                    className="creator-image circular"
                    size="medium"
                    style={{ borderRadius: "100%" }}
                    centered
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
    </>

  );
}

export default CreatorDetailsPage;
