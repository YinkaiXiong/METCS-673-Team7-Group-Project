import './ResetAccountPasswordPage.css';
import { useState,useEffect } from 'react';
import errorIcon from '../../assets/icons/errorIcon.svg';
import PropTypes from 'prop-types';
import { useParams, useNavigate} from 'react-router-dom';
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput';
import AuthFormSubTitle from '../../components/AuthFormSubTitle/AuthFormSubTitile';
import AuthFormTitle from '../../components/AuthFormTitle/AuthFormTitle';
import AuthPagesWatchDogLogo from '../../components/AuthPagesWatchDogLogo/AuthPagesWatchDogLogo';
import AuthFormSubmitButton from '../../components/AuthFormSubmitButton/AuthFormSubmitButton';
import AuthFormIconMessage from '../../components/AuthFormIconMessage/AuthFormIconMessage';
import AuthFormErrorsList from '../../components/AuthFormErrorsList/AuthFormErrorsList';

function ResetAccountPasswordPage() {
    const navigate = useNavigate()
    const { token } = useParams()
    useEffect(() => {
    }, [])
    const [password, setPassword] = useState('');
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

    const handleResetPasswordClick = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "password": password
            });

            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw
            };

            fetch(`http://localhost:3000/user/resetpassword/${token}`, requestOptions)
                .then(response => response.text())
                .then(result => navigate("/"))
                .catch(error => console.log('error', error));
            
        }
    }

    return (
        <div className='reset-account-password-page'>
            <AuthPagesWatchDogLogo />
            <div className='reset-account-password-container'>
                <div className='heading'>
                    <AuthFormTitle title='Reset account password'/>
                    <AuthFormSubTitle subtitle={`Enter a new password`}/>
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
                    label='Password'
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    name='password'
                />
                <AuthFormInput 
                    type='password'
                    label='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                    name='confirm-password'
                />
                <AuthFormSubmitButton
                    text='RESET PASSWORD'
                    onClick={handleResetPasswordClick}
                />
            </div>
        </div>
    );
}

ResetAccountPasswordPage.propTypes = {
    email: PropTypes.string.isRequired,
}

export default ResetAccountPasswordPage;
