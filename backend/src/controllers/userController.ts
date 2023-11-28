import { Request, Response } from 'express';
import { UserService } from '../services/userService';




const userService = new UserService();
// Login Controller
export class UserController {
    constructor() {
    }

    async login(req: Request, res: Response) {
        userService.login(req.headers).then((response) => {
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(503).send(response);
            }
        }).catch((error) => {
            res.status(503).json({ message: error.message })
        });;
    }

    // Create User Controller

    async createUser(req: Request, res: Response) {
        userService.createUser(req.body).then((response: any) => {
            res.status(200).json({ message: response })

        }).catch((error) => {
            res.status(503).json({ message: error.message })
        });
    }

    // Find User Controller

    async findUser(req: Request, res: Response) {
        userService.findUser(req.body).then((response) => {
            if (response.found) {
                res.status(200).json(response.result);
            } else {
                res.status(400).json({ message: "user not found" })
            }
        }).catch((error) => {
            res.status(503).json({ message: error.message })
        });
    }


    // Get All Users Controller

    async getAllUsers(req: Request, res: Response) {
        // console.log(req);
        userService.getAllUsers().then((response)=>{
            res.send(response);
        });
    }


    // Get All Users Controller
    async getAllRoles(req: Request, res: Response) {
        userService.getAllRoles().then((response)=>{
            res.send(response);});
    }

    async deleteUser(req: Request, res: Response) {
        userService.deleteUser(req.body).then((res1) => {
            if (res1.deleted) {
                res.status(200).json(res1);
            } else {
                res.status(400).json({ message: "error occurred" });
            }
        }).catch((error) => {
            res.status(503).json({ message: error.message })
        });
    };

    async updateUserRole(req: Request, res: Response) {
        userService.updateUserRole(req.body).then((res1) => {
            if (res1.updated) {
                res.status(200).json(res1);
            } else {
                res.status(400).json({ message: "error occurred" });
            }
        }).catch((error) => {
            res.status(503).json({ message: error.message })
        });
    }

}
