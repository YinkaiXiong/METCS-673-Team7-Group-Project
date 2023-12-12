"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
const userController = new userController_1.UserController();
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
