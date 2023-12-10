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
const serverService = new serverService_1.ServerService();
/**
 * Controller class for handling server-related routes.
 */
class ServerController {
    constructor() { }
    /**
     * Add a new server.
     * @param {Request} req - Express request object containing server details.
     * @param {Response} res - Express response object to send the HTTP response.
     */
    addServer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield serverService.addServer(req.body);
                res.status(200).json({ message: result });
            }
            catch (error) {
                res.status(503).json({ message: error.message });
            }
        });
    }
    /**
     * Get all servers.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object to send the HTTP response.
     */
    getAllServers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield serverService.getAllServer();
                res.status(200).send(response);
            }
            catch (error) {
                res.status(503).json({ message: error.message });
            }
        });
    }
    /**
     * Delete a server.
     * @param {Request} req - Express request object containing server details.
     * @param {Response} res - Express response object to send the HTTP response.
     */
    deleteServer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield serverService.deleteServer(req.body);
                if (result.deleted) {
                    res.status(200).json(result);
                }
                else {
                    res.status(503).json({ message: 'Error occurred' });
                }
            }
            catch (error) {
                res.status(503).json({ message: error.message });
            }
        });
    }
    /**
     * Update a server.
     * @param {Request} req - Express request object containing server details.
     * @param {Response} res - Express response object to send the HTTP response.
     */
    updateServer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield serverService.updateServer(req.body);
                if (result) {
                    res.status(200).json(result);
                }
                else {
                    res.status(503).json({ message: 'Error occurred' });
                }
            }
            catch (error) {
                res.status(503).json({ message: error.message });
            }
        });
    }
    /**
     * Get server data.
     * @param {Request} req - Express request object containing server details.
     * @param {Response} res - Express response object to send the HTTP response.
     */
    getServerData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield serverService.getServerData(req.body);
                if (result) {
                    res.status(200).json(result);
                }
                else {
                    res.status(503).json({ message: 'Error occurred' });
                }
            }
            catch (error) {
                res.status(503).json({ message: error.message });
            }
        });
    }
}
exports.ServerController = ServerController;
