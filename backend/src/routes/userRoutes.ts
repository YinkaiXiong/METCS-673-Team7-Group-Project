import { log } from 'console';
import express, { Request, Response } from 'express';
const {login, createUser} = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/createUser', createUser);


module.exports = userRouter;