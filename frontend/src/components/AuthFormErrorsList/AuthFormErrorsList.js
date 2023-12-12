import './AuthFormErrorsList.css';
import PropTypes from 'prop-types';

function AuthFormErrorsList({ errors }) {
    if (!errors || errors.length === 0) {
        return null;
    }

    return (
        <div className='auth-form-errors-list'>
            <ul>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    )
}

AuthFormErrorsList.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
};

export default AuthFormErrorsList;
