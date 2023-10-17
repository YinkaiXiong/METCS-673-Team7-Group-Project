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
const { User, Role, OperationSystem, Server, ServerData } = require('../models/model.js');
class UserService {
    constructor() {
    }
    login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var a = null;
            yield User.findOne({ email: req.email }).then((res1) => {
                console.log(res1);
                if (res1.password == req.password) {
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
            var a = yield this.findUser(req);
            console.log(a);
            if (!a.found) {
                const data = new User({
                    first_name: req.first_name,
                    last_name: req.last_name,
                    email: req.email,
                    password: req.password,
                    created_ts: new Date(),
                    updated_ts: new Date(),
                    updated_by: req.email
                });
                Role.find({ role: 'USER' }).then((res1) => {
                    data.role_type_id = res1[0]._id;
                    return data.save();
                });
            }
            else {
                throw new Error("Duplicate");
            }
        });
    }
    findUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var a = { found: false, result: null };
            yield User.find({ email: req.email }).then((res1) => {
                if (undefined != res1 || res1.body.length != 0) {
                    a = { found: true, result: res1 };
                }
            });
            return a;
        });
    }
    getAllUsers() {
        User.find().then((res1) => {
            return res1;
        });
        return null;
    }
}
exports.UserService = UserService;
