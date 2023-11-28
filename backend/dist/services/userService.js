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
exports.UserService = void 0;
const model_1 = require("../models/model");
class UserService {
    constructor() {
    }
    login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.email || !req.password) {
                throw Error("Invalid Input");
            }
            var a = null;
            yield model_1.User.find({ email: req.email }).then((response) => {
                if (response[0].password == req.password) {
                    a = true;
                }
                else {
                    a = false;
                }
            });
            return a;
        });
    }
    createUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(req.last_name) || !req.first_name || !req.email || !req.password || !req.role) {
                throw new Error("Incorrect Input");
            }
            var a = yield this.findUser(req);
            console.log(a);
            if (!a.found) {
                const data = new model_1.User({
                    first_name: req.first_name,
                    last_name: req.last_name,
                    email: req.email,
                    password: req.password,
                    created_ts: new Date(),
                    updated_ts: new Date(),
                    updated_by: req.email
                });
                yield model_1.Role.find({ role: req.role }).then((response) => {
                    data.role_type_id = response[0]._id;
                    data.save();
                    return "User Created Successfully";
                });
            }
            else {
                throw new Error("Duplicate");
            }
        });
    }
    findUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.email) {
                throw new Error("Incorrect Input");
            }
            var a = { found: false, result: null };
            yield model_1.User.find({ email: req.email }).select('-password').then((response) => {
                console.log(response);
                if (undefined != response && response.length != 0) {
                    a = { found: true, result: response };
                }
            });
            return a;
        });
    }
    deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.email) {
                throw new Error("Incorrect Input");
            }
            var a = { deleted: false };
            yield model_1.User.deleteOne({ email: req.email }).then((response) => {
                a = { deleted: true };
            }).catch((error) => {
                console.log(error); // Failure
            });
            return a;
        });
    }
    updateUserRole(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.email || !req.role) {
                throw new Error("Incorrect Input");
            }
            var a = { updated: false };
            const role = yield model_1.Role.find({ role: req.role });
            if (role.length == 0) {
                throw new Error("Invalid Role");
            }
            yield model_1.User.findOneAndUpdate({ email: req.email }, { role_type_id: role[0]._id }).then(() => {
                a = { updated: true };
            }).catch((error) => {
                console.log(error); // Failure
            });
            return a;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            var result = null;
            yield model_1.User.find().select('-password').then((response) => {
                result = response;
            });
            return result;
        });
    }
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            var result = null;
            yield model_1.Role.find().then((response) => {
                result = response;
            });
            return result;
        });
    }
    findRole(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.role) {
                throw new Error("Invalid Input");
            }
            var a = { found: false, result: null };
            yield model_1.Role.find({ role: req.role }).then((res1) => {
                console.log(res1);
                if (undefined != res1 && res1.length != 0) {
                    a = { found: true, result: res1 };
                }
            });
            return a;
        });
    }
}
exports.UserService = UserService;
