"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
var service = new userService_1.UserService();
// Login Controller
const login = ((req, res) => {
    service.login(req.body).then((res1) => {
        console.log(res1);
        res.send(res1);
    });
});
// Create User Controller
const createUser = ((req, res) => {
    service.createUser(req.body).then((res1) => {
        console.log(res1);
        res.status(200).json(res1);
    }).catch((error) => {
        res.status(400).json({ message: error.message });
    });
});
// Find User Controller
const findUser = ((req, res) => {
    service.findUser(req.body).then((res1) => {
        if (res1.found) {
            res.status(200).json(res1.result);
        }
        else {
            res.status(400).json({ message: "user not found" });
        }
    });
});
// Get All Users Controller
const getAllUsers = ((req, res) => {
    res.send(service.findUser(req.body));
});
// // DeleteUser
// const deleteUser = ((req: Request, res: Response) => {
//     res.send(service.findUser(req.body));
// })
// // Update Password
// const updatePassword = ((req: Request, res: Response) => {
//     res.send(service.findUser(req.body));
// })
// // Update Role
// const updateUserRole = ((req: Request, res: Response) => {
//     res.send(service.findUser(req.body));
// })
module.exports = {
    login,
    createUser,
    getAllUsers
};
