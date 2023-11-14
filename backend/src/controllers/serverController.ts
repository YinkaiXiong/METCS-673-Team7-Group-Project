import express, {Request, Response} from 'express';

import {UserService} from '../services/userService';
import {error} from 'console';
import {serverService} from "../services/serverService";




// Login Controller
export class ServerController {
    constructor() {
    }

    service = new serverService();




// Create User Controller

    async addServer(req: Request, res: Response) {
        this.service.addServer(req.body).then((res1: any) => {
            console.log(res1);
            res.status(200).json({message: res1})

        }).catch((error) => {
            res.status(503).json({message: error.message})
        });
    }

// Find User Controller

    async findServer(req: Request, res: Response) {

        this.service.findServer(req.body).then((res1) => {
            if (res1.found) {
                res.status(200).json(res1.result);
            } else {
                res.status(400).json({message: "user not found"})
            }
        });
    }



// Get All Users Controller

    async getAllServers(req: Request, res: Response) {
        res.send(this.service.getAllServer());
    }


// Get All Users Controller
    async deleteServer(req: Request, res: Response) {
        this.service.deleteServer(req.body).then((res1) => {
            if (res1.deleted) {
                res.status(200).json(res1);
            } else {
                res.status(400).json({message: "error occurred"});
            }
        });
    };

    async updateServer(req: Request, res: Response) {
        this.service.updateServer(req.body).then((res1) => {
            if (res1.updated) {
                res.status(200).json(res1);
            } else {
                res.status(400).json({message: "error occurred"});
            }
        });
    }


    async getServerData(req: Request, res: Response) {
        this.service.getServerData(req.body).then((res1) => {
            if (res1) {
                res.status(200).json(res1);
            } else {
                res.status(400).json({message: "error occurred"});
            }
        });
    }

    async saveServerData(req: Request, res: Response) {
        this.service.saveServerData(req.body).then((res1) => {
            if (res1) {
                res.status(200).json(res1);
            } else {
                res.status(400).json({message: "error occurred"});
            }
        });
    }

}
