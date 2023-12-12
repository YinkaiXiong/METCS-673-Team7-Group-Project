import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function VerifyAccount() {
    const navigate = useNavigate();
    const { email, token } = useParams()



    const verifyEmail = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:3000/user/createUser/${token}/${email}`, requestOptions)
            .then(response => response.text())
            .then(result => navigate("/"))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        verifyEmail();
    }, [])

    return (
        <div>Verifying...</div>
    );
}

export default VerifyAccount;