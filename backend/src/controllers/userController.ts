import express, {Request, Response} from 'express';

import {UserService} from '../services/userService';




// Login Controller
export class UserController {
    constructor() {
    }
    service = new UserService();

    async login(req: Request, res: Response) {
        this.service.login(req.body).then((res1) => {
            console.log(res1);
            res.send(res1);
        });
    }

// Create User Controller

    async createUser(req: Request, res: Response) {
        this.service.createUser(req.body).then((res1: any) => {
            console.log(res1);
            res.status(200).json({message: res1})

        }).catch((error) => {
            res.status(503).json({message: error.message})
        });
    }

// Find User Controller

    async findUser(req: Request, res: Response) {
        this.service.findUser(req.body).then((res1) => {
            if (res1.found) {
                res.status(200).json(res1.result);
            } else {
                res.status(400).json({message: "user not found"})
            }
        });
    }


// Get All Users Controller

    async getAllUsers(req: Request, res: Response) {
        res.send(this.service.getAllUsers());
    }


// Get All Users Controller
    async getAllRoles(req: Request, res: Response) {
        res.send(this.service.getAllRoles());
    }

    async deleteUser(req: Request, res: Response) {
        this.service.deleteUser(req.body).then((res1) => {
            if (res1.deleted) {
                res.status(200).json(res1);
            } else {
                res.status(400).json({message: "error occurred"});
            }
        });
    };

    async updateUserRole(req: Request, res: Response) {
        this.service.updateUserRole(req.body).then((res1) => {
            if (res1.updated) {
                res.status(200).json(res1);
            } else {
                res.status(400).json({message: "error occurred"});
            }
        });
    }

}
