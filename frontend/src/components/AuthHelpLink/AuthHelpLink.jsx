import './AuthHelpLink.css';
import PropTypes from 'prop-types';

function AuthHelpLink({ href, inquiryText, actionText, onClickActionLink }) {
    return (
        <div className='auth-help-link'>
            <span className='inquiry-text'>{inquiryText}</span>
            <a onClick={onClickActionLink} href={href} className={inquiryText ? 'action-text-link' : 'only-action-text-link'}>{actionText}</a>
        </div>
    );
}

AuthHelpLink.propTypes = {
    href: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
}

AuthHelpLink.defaultTypes = {
    inquiryText: '',
    onClickActionLink: () => {},
}

export default AuthHelpLink;
