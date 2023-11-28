"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
const userController = new userController_1.UserController();
userRouter.post('/login', userController.login);
userRouter.post('/createUser', userController.createUser);
userRouter.get('/getAllUsers', userController.getAllUsers);
userRouter.delete('/deleteUser', userController.deleteUser);
userRouter.post('/getUser', userController.findUser);
userRouter.get('/getAllRoles', userController.getAllRoles);
userRouter.patch('/updateUserRole', userController.updateUserRole);
module.exports = userRouter;
