import './ResetAccountPasswordPage.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate} from 'react-router-dom';
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput';
import AuthFormSubTitle from '../../components/AuthFormSubTitle/AuthFormSubTitile';
import AuthFormTitle from '../../components/AuthFormTitle/AuthFormTitle';
import AuthPagesWatchDogLogo from '../../components/AuthPagesWatchDogLogo/AuthPagesWatchDogLogo';
import AuthFormSubmitButton from '../../components/AuthFormSubmitButton/AuthFormSubmitButton';

function ResetAccountPasswordPage() {
    const navigate = useNavigate()
    const { token } = useParams()
    useEffect(() => {
    }, [])
    // const token = props.match.params.token;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                    <AuthFormTitle title='Reset account password' />
                    <AuthFormSubTitle subtitle={`Enter a new password`} />
                </div>
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
