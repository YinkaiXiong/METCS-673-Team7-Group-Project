import { log } from 'console';
import express, { Request, Response } from 'express';
const userController= require('../controllers/userController');
const serverController= require('../controllers/serverController');
const userRouter = express.Router();

userRouter.post('/login', userController.login);
userRouter.post('/createUser', userController.createUser);
userRouter.get('/getAllUsers', userController.getAllUsers);
userRouter.patch('/updateUserRole', userController.updateUserRole);
userRouter.delete('/deleteUser', userController.deleteUser);
userRouter.patch('/updateRole', userController.updateRole);
userRouter.get('/getUser', userController.getUser);
userRouter.post('/createRole', userController.createRole);
userRouter.post('/createUser', userController.createUser);
module.exports = userRouter;

