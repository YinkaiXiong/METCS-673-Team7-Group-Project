import './LoginPage.css';
import { useEffect, useState } from 'react';
import successIcon from '../../assets/icons/success-icon.svg';
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput';
import AuthFormSubmitButton from '../../components/AuthFormSubmitButton/AuthFormSubmitButton';
import AuthFormTitle from '../../components/AuthFormTitle/AuthFormTitle';
import AuthHelpLink from '../../components/AuthHelpLink/AuthHelpLink';
import AuthFormSubTitle from '../../components/AuthFormSubTitle/AuthFormSubTitile';
import AuthFormErrorsList from '../../components/AuthFormErrorsList/AuthFormErrorsList';
import AuthFormIconMessage from '../../components/AuthFormIconMessage/AuthFormIconMessage';
import AuthPagesWatchDogLogo from '../../components/AuthPagesWatchDogLogo/AuthPagesWatchDogLogo';
import ResetPasswordEnterEmail from '../../components/ResetPasswordEnterEmail/ResetPasswordEnterEmail';
import { Link, useNavigate } from "react-router-dom";
import base64 from 'base-64';
import { useUser } from './UserContext';
import { useRole } from './RoleContext';
import errorIcon from '../../assets/icons/errorIcon.svg';

function LoginPage() {
    const { setUserData } = useUser();
    const { setRoleData } = useRole();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCredentialsNotValid, setIsCredentialsNotValid] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [showResetPasswordEnterEmail, setShowResetPasswordEnterEmail] = useState(false);
    const [userRoles, setUserRoles] = useState(0);

    const getUserRolesMap = () => {

        fetch("http://localhost:3000/user/getAllRoles")
            .then(response => response.json())
            .then(result => {
                const roleMap = new Map();
                result.forEach(obj => {
                    const key = obj._id // Assuming each object has only one key
                    const value = obj.role;
                    roleMap.set(key, value);
                });
                return { roleMap };
            }).then((map) => {setUserRoles(map.roleMap);})
            .catch(error => console.log('error', error));
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const token = base64.encode(email + ":" + password);
        fetch("http://localhost:3000/user/login", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Basic " + token,
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json) {
                    if(json.success){
                        setUserData(email);
                        setRoleData(userRoles.get(json.user.role_type_id))
                        localStorage.setItem('session',JSON.stringify(json.token));
                        navigate("/serverStatus");
                    }else{
                        setIsEmailSent(false);
                        setIsCredentialsNotValid(true);
                        throw new Error(json.message);
                    }
                } else {
                    alert(json);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    };

    const handleCancelCLick = () => {
        setShowResetPasswordEnterEmail(false);
    };

    const handleForgotPasswordClick = () => {
        setShowResetPasswordEnterEmail(true);
        setIsCredentialsNotValid(false);
        setIsEmailSent(false);
    };

    const handleEmailSent = () => {
        setIsEmailSent(true);
        setShowResetPasswordEnterEmail(false);
    };

    useEffect(()=>{
        getUserRolesMap()

    },[])

    return (
        <div className='login-page'>
            <AuthPagesWatchDogLogo />
            <div className='login-reset-password-enter-email-container'>
                {!showResetPasswordEnterEmail ? (
                    <div className='login-form-container'>
                        <AuthFormTitle title='Login' />
                        {isCredentialsNotValid && (
                            <div>
                                <AuthFormIconMessage iconSrc={errorIcon} imgAlt='error' message='Please adjust the following:'/>
                                <AuthFormErrorsList errors={['Incorrect email or password.']} />
                            </div>
                        )}
                        {isEmailSent && (
                            <AuthFormIconMessage
                                iconSrc={successIcon}
                                imgAlt='success'
                                message="We've sent you an email with a link to update your password."
                            />
                        )}
                        <AuthFormInput
                            label='Email'
                            type='email'
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <AuthFormInput
                            label='Password'
                            type='password'
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <AuthHelpLink
                            actionText='FORGOT YOUR PASSWORD?'
                            onClickActionLink={handleForgotPasswordClick}
                        />
                        <AuthFormSubmitButton text='SIGN IN' onClick={handleLoginSubmit} />
                        <AuthHelpLink inquiryText="Don't have an account? " href="/signup" actionText='CREATE ACCOUNT' />
                    </div>
                ) : (
                    <ResetPasswordEnterEmail onClickCancel={handleCancelCLick} onEmailSent={handleEmailSent} />
                )}
            </div>
        </div>
    );
}

export default LoginPage;
