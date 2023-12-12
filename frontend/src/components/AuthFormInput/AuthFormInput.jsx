import './AuthFormInput.css';
import PropTypes from 'prop-types';

function AuthFormInput({ label, type, name, value, onChange, required }) {
    return (
        <div className='auth-form-input'>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder=' '
                className='auth-input'
            />
            <label>{label}</label>
        </div>
    );
}

AuthFormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['email', 'password', 'text']),
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
};

AuthFormInput.defaultProps = {
    type: 'text',
    required: true
};

export default AuthFormInput;
