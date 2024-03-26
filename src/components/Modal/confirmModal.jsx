import PropTypes from "prop-types";

function ConfirmationModal({
  showModal,
  confirmationMessage,
  handleModalConfirm,
  handleCancelConfirm,
  validateButton,
  cancelButton,
}) {
  if (!showModal) {
    return null;
  }
  return (
    <div className="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
      <div className="modal-content">
        <p id="modalDescription">{confirmationMessage}</p>
        <div className="modal-buttons" role="group" aria-label="Actions">
          <button
            type="button"
            onClick={handleModalConfirm}
            aria-label={validateButton}
          >
            {validateButton}
          </button>
          <button
            type="button"
            onClick={handleCancelConfirm}
            aria-label={cancelButton}
          >
            {cancelButton}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;

ConfirmationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  confirmationMessage: PropTypes.string.isRequired,
  handleModalConfirm: PropTypes.bool.isRequired,
  handleCancelConfirm: PropTypes.bool.isRequired,
  validateButton: PropTypes.string.isRequired,
  cancelButton: PropTypes.string.isRequired,
};
