import './UserRolesPage.css';
import AuthFormTitle from '../../components/AuthFormTitle/AuthFormTitle';
import AuthFormSubTitle from '../../components/AuthFormSubTitle/AuthFormSubTitile';
import { useState, useEffect } from 'react';
import UserRolesBox from '../../components/UserRolesBox/UserRolesBox';
import Header from '../../components/Header/Header';

// this is for ui testing remove it after backend integration
const testUsers = [
    { userId: 1, email: 'knaren@bu.edu', role: 'User' },
    { userId: 2, email: 'shivroy@bu.edu', role: 'Admin' },
];

function UserRolesPage() {
    const [users, setUsers] = useState([]);
    const [loadingUserId, setLoadingUserId] = useState(null);
    const [userRoles, setUserRoles] = useState(0);
    const [userReverseRoles, setUserReverseRoles] = useState(0);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);
    const [isRolesLoaded, setIsRolesLoaded] = useState(false);



    const getUserRolesMap = () => {

        fetch("http://localhost:3000/user/getAllRoles")
            .then(response => response.json())
            .then(result => {
                const roleMap = new Map();
                const revRoleMap = new Map();
                result.forEach(obj => {
                    const key = obj._id // Assuming each object has only one key
                    const value = obj.role;
                    roleMap.set(key, value);
                    revRoleMap.set(value, key);
                });
                return { roleMap, revRoleMap };
            }).then((map) => { setUserReverseRoles(map.revRoleMap); setUserRoles(map.roleMap); setIsRolesLoaded(true) })
            .catch(error => console.log('error', error));
    }
    const updateUserRole = async (email, role) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "role": role
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return await fetch("http://localhost:3000/user/updateUserRole", requestOptions)
            .then(response => response.json())
            .then(result => { return result })
            .catch(error => console.log('error', error));
    }

    const getUserList = () => {
        fetch("http://localhost:3000/user/getAllUsers")
            .then(response => response.json())
            .then(result => { setUsers(result); setIsUsersLoaded(true) })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getUserRolesMap()
        getUserList()
    }, []);

    const toggleRole = async (userId) => {
        setLoadingUserId(userId);
        const updatedUsers = [...users];
        if (userId >= 0 && userId <= users.length) {
            const role = userRoles.get(users[userId].role_type_id) === 'USER' ? 'ADMIN' : 'USER';
            const updated = await updateUserRole(users[userId].email, role);
            if (updated.updated) {
                users[userId].role_type_id = userReverseRoles.get(role);
            }
        }
        setUsers(updatedUsers);

        // set this after backend change 
        setLoadingUserId(null);
    }

    return (
        <>
            <Header />
            <div className='user-roles-page'>
                <div className='user-roles-container'>
                    <AuthFormTitle title='User roles' />
                    <AuthFormSubTitle subtitle='Click blue to  swap between admin and user' />
                    {isUsersLoaded && (users.map((user, index) => (
                        <UserRolesBox
                            userEmail={user.email}
                            role={userRoles.get(user.role_type_id)}
                            disabled={loadingUserId === index}
                            onClickButton={() => { toggleRole(index) }}
                        />
                    )))}
                </div>
            </div>
        </>
    )
}

export default UserRolesPage;
