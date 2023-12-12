import './ChangePasswordPage.css';
import { useState, useEffect } from 'react';
import errorIcon from '../../assets/icons/errorIcon.svg';
import PropTypes from 'prop-types';
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput';
import AuthFormSubTitle from '../../components/AuthFormSubTitle/AuthFormSubTitile';
import AuthFormTitle from '../../components/AuthFormTitle/AuthFormTitle';
import AuthPagesWatchDogLogo from '../../components/AuthPagesWatchDogLogo/AuthPagesWatchDogLogo';
import AuthFormSubmitButton from '../../components/AuthFormSubmitButton/AuthFormSubmitButton';
import AuthFormIconMessage from '../../components/AuthFormIconMessage/AuthFormIconMessage';
import AuthFormErrorsList from '../../components/AuthFormErrorsList/AuthFormErrorsList';
import Header from '../../components/Header/Header';
import { useUser } from '../LoginPage/UserContext';
import { useParams, useNavigate } from 'react-router-dom';

function ChangePasswordPage() {
    const { user } = useUser();
    const [password, setPassword] = useState('');
    const [oldpassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrros] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const containsAlphabet = /[A-Za-z]/;
        const containsNumber = /\d/;
        const containsSpecial = /[^A-Za-z0-9]/;

        if (password.length === 0) {
            newErrors.password = "Password can't be blank";
        } else if (password.length < 6) {
            newErrors.password = 'Password is too short (minimum is 6 characters)';
        } else if (!containsAlphabet.test(password) || !containsNumber.test(password) || !containsSpecial.test(password)) {
            newErrors.confirmPassword = 'Password must contain at least one alphabet, one number, and one special character';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'The password confirmation must match the provided password';
        }

        setErrros(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleChangePasswordClick = (event) => {
        event.preventDefault();
        if (password === confirmPassword && user) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "oldPassword": oldpassword,
                "newPassword": password,
                "email": user
            });

            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/user/updatePassword", requestOptions)
                .then(response => response.json())
                .then(result => window.alert(result.message)).then(() => {
                    setPassword('');
                    setOldPassword('');
                    setConfirmPassword('')
                })
                .catch(error => console.log('error', error));
        }
    }
    return (
        <>
            <Header />
            <div className='reset-account-password-page'>
                <AuthPagesWatchDogLogo />
                <div className='reset-account-password-container'>
                    <div className='heading'>
                        <AuthFormTitle title='Change account password' />
                        <AuthFormSubTitle subtitle={`Enter a new password`} />
                    </div>
                    {(Object.keys(errors).length !== 0) && (
                        <div>
                            <AuthFormIconMessage
                                iconSrc={errorIcon}
                                imgAlt='error'
                                message='Please adjust the following:'
                            />
                            <AuthFormErrorsList
                                errors={Object.values(errors)}
                            />
                        </div>
                    )}
                    <AuthFormInput
                        type='password'
                        label='Old Password'
                        value={oldpassword}
                        onChange={(e) => { setOldPassword(e.target.value) }}
                        name='old-password'
                    />
                    <AuthFormInput
                        type='password'
                        label='Password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        name='password'
                    />
                    <AuthFormInput
                        type='password'
                        label='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        name='confirm-password'
                    />
                    <AuthFormSubmitButton
                        text='RESET PASSWORD'
                        onClick={handleChangePasswordClick}
                    />
                </div>
            </div>

        </>
    );
}

ChangePasswordPage.propTypes = {
    email: PropTypes.string.isRequired,
}

export default ChangePasswordPage;
