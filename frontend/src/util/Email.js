
import emailjs from 'emailjs-com';

// SERVICE_ID=portfolio_contact
// TEMPLATE_ID=template_watchdog
// USER_ID=FP63d5ww5ixQOzPt

export function sendMail(req) {
    console.log(req)

  const SERVICE_ID= "portfolio_contact";
  const TEMPLATE_ID= "template_watchdog";
  const USER_ID= "FP63d5ww5ixQOzPt_";
  console.log(SERVICE_ID, TEMPLATE_ID, req, USER_ID);
  try {
    const response = emailjs.send(SERVICE_ID, TEMPLATE_ID, req, USER_ID);
    return response;

  } catch (error) {
    console.log(error.message);
    throw new Error('Ooops, something went wrong');
  }

}