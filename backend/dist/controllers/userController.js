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
class UserController {
    constructor() {
    }
    /**
     * Handles the user login operation.
     * @param req - The HTTP request containing user credentials in headers.
     * @param res - The HTTP response to send back to the client.
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call userService to perform login operation
                userService.login(req.headers).then((response) => {
                    if (response != null) {
                        // If login is successful, retrieve token from the response
                        const token = response.token;
                        // Send the token in a cookie and as a JSON response
                        res.status(200)
                            .cookie('token', token, response.options)
                            .json({ success: true, token });
                    }
                    else {
                        // If login fails, throw an error
                        throw new Error("Incorrect Credentials");
                    }
                }).catch((error) => {
                    // Handle catch block error - return status code and error message
                    res.status(503).json({ message: error.message });
                });
            }
            catch (error) {
                // Handle general error - return status code and error message
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Create User Controller
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userService.createUser(req.body, req.params).then((response) => {
                res.status(200).json({ message: response });
            }).catch((error) => {
                res.status(503).json({ message: error.message });
            });
        });
    }
    newUserRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userService.newUserRequest(req.body);
                res.status(200).json({ message: response });
            }
            catch (error) {
                res.status(503).json({ message: error.message });
            }
        });
    }
    // Find User Controller
    findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userService.findUser(req.body).then((response) => {
                if (response) {
                    res.status(200).json(response);
                }
                else {
                    res.status(400).json({ message: "user not found" });
                }
            }).catch((error) => {
                res.status(503).json({ message: error.message });
            });
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userService.forgetPassword(req.body);
                res.status(200).json({ message: response });
            }
            catch (error) {
                res.status(503).json({ message: error.message });
            }
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userService.updatePassword(req.body);
                res.status(200).json({ message: response });
            }
            catch (error) {
                res.status(503).json({ message: error.message });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userService.resetPassword(req.body, req.params).then((response) => {
                if (response != null) {
                    const token = response.token;
                    res.status(200)
                        .cookie('token', token, response.options)
                        .json({ success: true, token });
                }
                else {
                    throw new Error("Error Occurred");
                }
            }).catch((error) => {
                res.status(503).json({ message: error.message });
            });
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
