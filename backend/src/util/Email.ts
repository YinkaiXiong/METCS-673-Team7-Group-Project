
import emailjs from 'emailjs-com';



export function sendMail(req: any) {

  const SERVICE_ID: any = process.env.SERVICE_ID;
  const TEMPLATE_ID: any = process.env.TEMPLATE_ID;
  const USER_ID: any = process.env.USER_ID;
  console.log(SERVICE_ID, TEMPLATE_ID, req, USER_ID);
  try {
    const response = emailjs.send(SERVICE_ID, TEMPLATE_ID, req, USER_ID);
    return response;

  } catch (error: any) {
    console.log(error.message);
    throw new Error('Ooops, something went wrong');
  }

}