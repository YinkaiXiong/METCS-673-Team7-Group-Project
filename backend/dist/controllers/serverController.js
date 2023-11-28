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
exports.ServerController = void 0;
const serverService_1 = require("../services/serverService");
// Login Controller
class ServerController {
    constructor() {
        this.service = new serverService_1.ServerService();
    }
    // Create User Controller
    addServer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.service);
            this.service.addServer(req.body).then((res1) => {
                console.log(res1);
                res.status(200).json({ message: res1 });
            }).catch((error) => {
                res.status(503).json({ message: error.message });
            });
        });
    }
    // Find User Controller
    findServer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.findServer(req.body).then((res1) => {
                if (res1.found) {
                    res.status(200).json(res1.result);
                }
                else {
                    res.status(400).json({ message: "user not found" });
                }
            });
        });
    }
    // Get All Users Controller
    getAllServers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(this.service.getAllServer());
        });
    }
    // Get All Users Controller
    deleteServer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.deleteServer(req.body).then((res1) => {
                if (res1.deleted) {
                    res.status(200).json(res1);
                }
                else {
                    res.status(400).json({ message: "error occurred" });
                }
            });
        });
    }
    ;
    updateServer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.updateServer(req.body).then((res1) => {
                if (res1.updated) {
                    res.status(200).json(res1);
                }
                else {
                    res.status(400).json({ message: "error occurred" });
                }
            });
        });
    }
    getServerData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.getServerData(req.body).then((res1) => {
                if (res1) {
                    res.status(200).json(res1);
                }
                else {
                    res.status(400).json({ message: "error occurred" });
                }
            });
        });
    }
    saveServerData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.saveServerData(req.body).then((res1) => {
                if (res1) {
                    res.status(200).json(res1);
                }
                else {
                    res.status(400).json({ message: "error occurred" });
                }
            });
        });
    }
}
exports.ServerController = ServerController;
