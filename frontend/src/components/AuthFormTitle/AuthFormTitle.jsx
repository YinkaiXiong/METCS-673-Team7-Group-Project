import './AuthFormTitle.css';
import PropTypes from 'prop-types';

function AuthFormTitle({ title }) {
    return (
        <div className='auth-form-title'>
            <h2>{title}</h2>
        </div>
    );
}

AuthFormTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default AuthFormTitle;
