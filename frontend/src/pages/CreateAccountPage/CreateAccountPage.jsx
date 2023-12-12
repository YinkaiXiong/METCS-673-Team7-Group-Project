import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormTitle from '../../components/AuthFormTitle/AuthFormTitle';
import AuthPagesWatchDogLogo from '../../components/AuthPagesWatchDogLogo/AuthPagesWatchDogLogo';
import './CreateAccountPage.css';
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput';
import AuthFormSubmitButton from '../../components/AuthFormSubmitButton/AuthFormSubmitButton';
import AuthHelpLink from '../../components/AuthHelpLink/AuthHelpLink';
import { sendMail } from '../../util/Email';

function CreateAccountPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateCLick = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzUxNzQ5YzgyNmE3OTI3MzgxMzE0NSIsImlhdCI6MTcwMjE3Mjg2OSwiZXhwIjoxNzAyMTcyODY5fQ.2bSNlutEMkLQCq7wZhi2xVrlBKUzhireUNrj4sEcD1Y");

        var raw = JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/user/newUserRequest", requestOptions)
            .then(response => response.json())
            .then(async (result) => {
                const emailBody = {reply_to:result.message.email, subject: result.message.subject, url:result.message.url};
                return emailBody
            }).then(async (data)=>{await sendMail(data)}).then(navigate("/"))
            .catch(error => console.log('error', error));
    };

    return (
        <div className='create-account-page'>
            <AuthPagesWatchDogLogo />
            <div className='create-account-container'>
                <AuthFormTitle title='Create account' />
                <AuthFormInput
                    type='email'
                    name='email'
                    label='Email'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <div className='first-last-name-row-div'>
                    <div className='first-last-name-row-item'>
                        <AuthFormInput
                            type='text'
                            name='first-name'
                            label='First name'
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value) }}
                        />
                    </div>
                    <div className='first-last-name-row-item'>
                        <AuthFormInput
                            type='text'
                            name='last-name'
                            label='Last name'
                            value={lastName}
                            onChange={(e) => { setLastName(e.target.value) }}
                        />
                    </div>
                </div>
                <AuthFormInput
                    type='password'
                    name='password'
                    label='Password'
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <AuthFormSubmitButton
                    text='CREATE'
                    onClick={handleCreateCLick}
                />
                <AuthHelpLink
                    inquiryText='Already have an account? '
                    href="/" actionText='LOGIN'
                />
            </div>
        </div>
    )
}

export default CreateAccountPage;
