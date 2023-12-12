import './AuthFormIconMessage.css';
import PropTypes from 'prop-types';

function AuthFormIconMessage({ iconSrc, imgAlt, message }) {
    return (
        <div className='auth-form-icon-message'>
            <img 
                src={iconSrc} 
                alt={imgAlt}
            /> 
            <div>
                <p>{message}</p>
            </div>
        </div>
    );
}

AuthFormIconMessage.propTypes = {
    iconSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default AuthFormIconMessage;
