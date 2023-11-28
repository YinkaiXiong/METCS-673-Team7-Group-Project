"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverController_1 = require("../controllers/serverController");
const serverRouter = express_1.default.Router();
const serverController = new serverController_1.ServerController();
serverRouter.post('/addServer', serverController.addServer);
serverRouter.get('/getAllServers', serverController.getAllServers);
serverRouter.patch('/updateServer', serverController.updateServer);
serverRouter.delete('/deleteServer', serverController.deleteServer);
serverRouter.post('/addServer', serverController.addServer);
serverRouter.get('/getServerData', serverController.getServerData);
module.exports = serverRouter;
