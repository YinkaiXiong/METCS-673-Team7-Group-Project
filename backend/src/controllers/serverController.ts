import express, { Request, Response } from 'express';
import { ServerService } from '../services/serverService';

const serverService = new ServerService();

/**
 * Controller class for handling server-related routes.
 */
export class ServerController {
    constructor() {}

    /**
     * Add a new server.
     * @param {Request} req - Express request object containing server details.
     * @param {Response} res - Express response object to send the HTTP response.
     */
    async addServer(req: Request, res: Response) {
        try {
            const result = await serverService.addServer(req.body);
            res.status(200).json({ message: result });
        } catch (error:any) {
            res.status(503).json({ message: error.message });
        }
    }

    /**
     * Get all servers.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object to send the HTTP response.
     */
    async getAllServers(req: Request, res: Response) {
        try {
            const response = await serverService.getAllServer();
            res.status(200).send(response);
        } catch (error:any) {
            res.status(503).json({ message: error.message });
        }
    }

    /**
     * Delete a server.
     * @param {Request} req - Express request object containing server details.
     * @param {Response} res - Express response object to send the HTTP response.
     */
    async deleteServer(req: Request, res: Response) {
        try {
            const result = await serverService.deleteServer(req.body);
            if (result.deleted) {
                res.status(200).json(result);
            } else {
                res.status(503).json({ message: 'Error occurred' });
            }
        } catch (error:any) {
            res.status(503).json({ message: error.message });
        }
    }

    /**
     * Update a server.
     * @param {Request} req - Express request object containing server details.
     * @param {Response} res - Express response object to send the HTTP response.
     */
    async updateServer(req: Request, res: Response) {
        try {
            const result = await serverService.updateServer(req.body);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(503).json({ message: 'Error occurred' });
            }
        } catch (error:any) {
            res.status(503).json({ message: error.message });
        }
    }

    /**
     * Get server data.
     * @param {Request} req - Express request object containing server details.
     * @param {Response} res - Express response object to send the HTTP response.
     */
    async getServerData(req: Request, res: Response) {
        try {
            const result = await serverService.getServerData(req.body);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(503).json({ message: 'Error occurred' });
            }
        } catch (error:any) {
            res.status(503).json({ message: error.message });
        }
    }
}
