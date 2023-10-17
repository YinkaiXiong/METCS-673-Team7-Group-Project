"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { login, createUser } = require('../controllers/userController');
const userRouter = express_1.default.Router();
userRouter.post('/login', login);
userRouter.post('/createUser', createUser);
module.exports = userRouter;
