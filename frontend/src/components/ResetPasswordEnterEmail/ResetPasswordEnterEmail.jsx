import { useState } from 'react';
import AuthFormInput from '../AuthFormInput/AuthFormInput';
import AuthFormSubTitle from '../AuthFormSubTitle/AuthFormSubTitile';
import AuthFormTitle from '../AuthFormTitle/AuthFormTitle';
import './ResetPasswordEnterEmail.css';
import PropTypes from 'prop-types';
import AuthFormSubmitButton from '../AuthFormSubmitButton/AuthFormSubmitButton';
import AuthHelpLink from '../AuthHelpLink/AuthHelpLink';
import { sendMail } from '../../util/Email';

function ResetPasswordEnterEmail({ onClickCancel, onEmailSent }) {
    const [email, setEmail] = useState('');

    const handleEmailSubmit = async () => {

        
        if (email) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                "email": email
            });
    
            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            const emailBody = await fetch("http://localhost:3000/user/forgotPassword/", requestOptions)
                .then(response => response.json())
                .then(result => sendMail(result.message))
                .catch(error => console.log('error', error));
            console.log(emailBody);
            if(emailBody.status === 200){
                onEmailSent();
            }
        }
    }

    return (
        <div className='reset-password-enter-email'>
            <div className='heading'>
                <AuthFormTitle title='Reset your password' />
                <AuthFormSubTitle subtitle='We will send you an email to reset your password' />
            </div>
            <AuthFormInput
                type='email'
                label='Email'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                name='email'
                required
            />
            <AuthFormSubmitButton
                text='SUBMIT'
                onClick={handleEmailSubmit}
            />
            <AuthHelpLink
                actionText='CANCEL'
                onClickActionLink={onClickCancel}
            />
        </div>
    );
}

ResetPasswordEnterEmail.propTypes = {
    onClickCancel: PropTypes.func.isRequired,
}

export default ResetPasswordEnterEmail;
