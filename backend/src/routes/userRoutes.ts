import express from 'express';
import {UserController} from '../controllers/userController';
const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/login', userController.login); //done
userRouter.post('/createUser', userController.createUser); //done
userRouter.get('/getAllUsers', userController.getAllUsers); //done
userRouter.delete('/deleteUser', userController.deleteUser); //done
userRouter.post('/getUser', userController.findUser); // done
userRouter.get('/getAllRoles', userController.getAllRoles); //done
userRouter.patch('/updateUserRole', userController.updateUserRole); 


module.exports = userRouter;

