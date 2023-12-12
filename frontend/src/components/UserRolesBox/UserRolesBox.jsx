import UserRolesRoleButton from '../UserRolesRoleButton/UserRolesRoleButton';
import './UserRolesBox.css';

function UserRolesBox({ userEmail, role, disabled, onClickButton }) {
    const handleButtonClick = () => {
        console.log('role box');
        onClickButton();
    }

    return (
        <div className='user-roles-box'>
            <p>{userEmail}</p>
            <UserRolesRoleButton role={role} disabled={disabled} onClick={handleButtonClick} />
        </div>
    );
}

export default UserRolesBox;
