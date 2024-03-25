/* eslint-disable linebreak-style */
import PasswordChecklist from "react-password-checklist";
import PropTypes from "prop-types";

function PasswordCheck({
  password, confirmPassword, isPasswordInputActive, isConfirmPasswordInputActive,
}) {
  // Fonctions de validation individuelles
  const isLengthValid = (pass) => pass.length >= 8;
  const containsSpecialChar = (pass) => /[!@#$%^&*(),.?":{}|<>]/.test(pass);
  const containsNumber = (pass) => /\d/.test(pass);
  const containsUpperCase = (pass) => /[A-Z]/.test(pass);
  const passwordsMatch = (pass, confirmPass) => pass === confirmPass;

  // Vérification globale du mot de passe
  const isPasswordValid = isLengthValid(password)
    && containsSpecialChar(password)
    && containsNumber(password)
    && containsUpperCase(password)
    && passwordsMatch(password, confirmPassword);

  return (
    <>
      {/* Affiche la liste de vérification du mot de passe
       uniquement quand les champs password et confirmPassword
       sont actifs et si le mot de passe n'est pas valide */}
      {!isPasswordValid && (isPasswordInputActive || isConfirmPasswordInputActive) && (
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={8}
          value={password}
          valueAgain={confirmPassword}
          messages={{
            minLength: "Le mot de passe doit avoir au moins 8 caractères.",
            specialChar: "Le mot de passe doit contenir au moins un caractère spécial.",
            number: "Le mot de passe doit contenir au moins un chiffre.",
            capital: "Le mot de passe doit contenir au moins une majuscule.",
            match: "Les mots de passe doivent correspondre.",
          }}
        />
      )}
    </>
  );
}

// Définition des types attendus pour les props
// (https://stackoverflow.com/questions/64012257/proptype-name-is-not-required-but-has-no-corresponding-defaultprops-declarati)
PasswordCheck.propTypes = {
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  isPasswordInputActive: PropTypes.bool.isRequired,
  isConfirmPasswordInputActive: PropTypes.bool.isRequired,
};

export default PasswordCheck;
