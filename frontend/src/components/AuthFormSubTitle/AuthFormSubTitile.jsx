import './AuthFormSubTitle.css';
import PropTypes from 'prop-types';

function AuthFormSubTitle({ subtitle }) {
    return (
        <div className='auth-form-sub-title'>
            <h3>{subtitle}</h3>
        </div>
    );
}

AuthFormSubTitle.propTypes = {
    subtitle: PropTypes.string.isRequired,
};

export default AuthFormSubTitle;
