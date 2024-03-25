import { Button, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";

function LoadMoreButton({ onClick, buttonText }) {
  return (
    <Grid>
      <Grid.Column textAlign="center">
        <Button
          primary
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </Grid.Column>
    </Grid>
  );
}

// Définition des types de props attendues
LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default LoadMoreButton;
