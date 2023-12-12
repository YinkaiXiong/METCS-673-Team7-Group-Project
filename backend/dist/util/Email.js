"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const emailjs_com_1 = __importDefault(require("emailjs-com"));
function sendMail(req) {
    const SERVICE_ID = process.env.SERVICE_ID;
    const TEMPLATE_ID = process.env.TEMPLATE_ID;
    const USER_ID = process.env.USER_ID;
    console.log(SERVICE_ID, TEMPLATE_ID, req, USER_ID);
    try {
        const response = emailjs_com_1.default.send(SERVICE_ID, TEMPLATE_ID, req, USER_ID);
        return response;
    }
    catch (error) {
        console.log(error.message);
        throw new Error('Ooops, something went wrong');
    }
}
exports.sendMail = sendMail;
