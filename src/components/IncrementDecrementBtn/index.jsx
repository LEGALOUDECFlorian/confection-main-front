import { Button } from "semantic-ui-react";
import "./incrementDecrementBtn.scss";
import PropTypes from "prop-types";

function IncrementDecrementBtn({ setQuantity, quantity }) {
  const handleDecrementCounter = () => {
    if (quantity > 1) {
      setQuantity((previousQuantity) => previousQuantity - 1);
    }
  };

  const handleIncrementCounter = () => {
    setQuantity((previousQuantity) => previousQuantity + 1);
  };

  return (
    <>
      <Button icon="minus" className="quantity-btn" onClick={handleDecrementCounter} />
      <span className="quantity__span">{quantity}</span>
      <Button icon="plus" className="quantity-btn" onClick={handleIncrementCounter} />
    </>
  );
}

IncrementDecrementBtn.propTypes = {
  setQuantity: PropTypes.func.isRequired, // setQuantity doit être une fonction et est obligatoire
  quantity: PropTypes.number.isRequired, // quantity doit être un nombre et est obligatoire
};

export default IncrementDecrementBtn;
