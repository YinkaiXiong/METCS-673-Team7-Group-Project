import './UserRolesRoleButton.css';
import PropTypes from 'prop-types';

function UserRolesRoleButton({ role, onClick, disabled }) {
    const handleButtonClick = () => {
        console.log('role button');
        onClick();
    }

    return (
       <div className='user-roles-role-button'>
            <button type='submit' onClick={handleButtonClick} disabled={disabled}>
                {role}
            </button>
       </div>
    );
}

UserRolesRoleButton.propTypes = {
    role: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};
    
UserRolesRoleButton.defaultProps = {
    disabled: false,
};

export default UserRolesRoleButton;
