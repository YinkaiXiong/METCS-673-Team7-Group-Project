import express from 'express';
import {UserController} from '../controllers/userController';
const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/login', userController.login); //done
userRouter.post('/createUser/:token/:email', userController.createUser); //done
userRouter.get('/getAllUsers', userController.getAllUsers); //done
userRouter.delete('/deleteUser', userController.deleteUser); //done
userRouter.post('/getUser', userController.findUser); // done
userRouter.get('/getAllRoles', userController.getAllRoles); //done
userRouter.patch('/updateUserRole', userController.updateUserRole); //done
userRouter.patch('/resetpassword/:resettoken', userController.resetPassword); //done
userRouter.post('/newUserRequest', userController.newUserRequest); //done
userRouter.patch('/forgotPassword', userController.forgotPassword); //done
userRouter.patch('/updatePassword', userController.updatePassword); //done


module.exports = userRouter;

