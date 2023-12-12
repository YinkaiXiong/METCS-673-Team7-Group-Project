import './AuthFormSubmitButton.css';
import PropTypes from 'prop-types';

function AuthFormSubmitButton({ text, onClick, disabled }) {
    return (
       <div className='auth-form-submit-button'>
            <button type='submit' onClick={onClick} disabled={disabled}>
                {text}
            </button>
       </div>
    );
}

AuthFormSubmitButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

AuthFormSubmitButton.defaultProps = {
    disabled: false,
}

export default AuthFormSubmitButton;
