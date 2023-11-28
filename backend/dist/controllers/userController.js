"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const userService = new userService_1.UserService();
// Login Controller
class UserController {
    constructor() {
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(res);
            userService.login(req.body).then((response) => {
                if (response) {
                    res.status(200).send(response);
                }
                else {
                    res.status(503).send(response);
                }
            }).catch((error) => {
                res.status(503).json({ message: error.message });
            });
            ;
        });
    }
    // Create User Controller
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userService.createUser(req.body).then((response) => {
                res.status(200).json({ message: response });
            }).catch((error) => {
                res.status(503).json({ message: error.message });
            });
        });
    }
    // Find User Controller
    findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userService.findUser(req.body).then((response) => {
                if (response.found) {
                    res.status(200).json(response.result);
                }
                else {
                    res.status(400).json({ message: "user not found" });
                }
            }).catch((error) => {
                res.status(503).json({ message: error.message });
            });
        });
    }
    // Get All Users Controller
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req);
            userService.getAllUsers().then((response) => {
                res.send(response);
            });
        });
    }
    // Get All Users Controller
    getAllRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userService.getAllRoles().then((response) => {
                res.send(response);
            });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userService.deleteUser(req.body).then((res1) => {
                if (res1.deleted) {
                    res.status(200).json(res1);
                }
                else {
                    res.status(400).json({ message: "error occurred" });
                }
            }).catch((error) => {
                res.status(503).json({ message: error.message });
            });
        });
    }
    ;
    updateUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userService.updateUserRole(req.body).then((res1) => {
                if (res1.updated) {
                    res.status(200).json(res1);
                }
                else {
                    res.status(400).json({ message: "error occurred" });
                }
            }).catch((error) => {
                res.status(503).json({ message: error.message });
            });
        });
    }
}
exports.UserController = UserController;
