import { Request, Response } from 'express';
import { UserService } from '../services/userService';




const userService = new UserService();
export class UserController {
    constructor() {
    }

    /**
     * Handles the user login operation.
     * @param req - The HTTP request containing user credentials in headers.
     * @param res - The HTTP response to send back to the client.
     */
    async login(req: Request, res: Response): Promise<void> {
        try {
            // Call userService to perform login operation
            userService.login(req.headers).then((response: any) => {
                if (response != null) {
                    // If login is successful, retrieve token from the response
                    const token: any = response.token;
                    // Send the token in a cookie and as a JSON response
                    res.status(200)
                        .cookie('token', token, response.options)
                        .json({ success: true, token });
                } else {
                    // If login fails, throw an error
                    throw new Error("Incorrect Credentials");
                }
            }).catch((error) => {
                // Handle catch block error - return status code and error message
                res.status(503).json({ message: error.message });
            });
        } catch (error:any) {
            // Handle general error - return status code and error message
            res.status(500).json({ message: error.message });
        }
    }


    

    // Create User Controller

    async createUser(req: Request, res: Response) {
        userService.createUser(req.body, req.params).then((response: any) => {
            res.status(200).json({ message: response })

        }).catch((error) => {
            res.status(503).json({ message: error.message })
        });
    }

    async newUserRequest(req: Request, res: Response) {
        try {
            const response = await userService.newUserRequest(req.body);
            res.status(200).json({ message: response });
        } catch (error:any) {
            res.status(503).json({ message: error.message });
        }
    }

    // Find User Controller

    async findUser(req: Request, res: Response) {
        userService.findUser(req.body).then((response:any) => {
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(400).json({ message: "user not found" })
            }
        }).catch((error) => {
            res.status(503).json({ message: error.message })
        });
    }

    async forgotPassword(req: Request, res: Response) {
        try {
            const response = await userService.forgetPassword(req.body);
            res.status(200).json({ message: response });
        } catch (error:any) {
            res.status(503).json({ message: error.message });
        }

    }


    async updatePassword(req: Request, res: Response){
        try {
            const response = await userService.updatePassword(req.body);
            res.status(200).json({ message: response });
        } catch (error:any) {
            res.status(503).json({ message: error.message });
        }

    }

    async resetPassword(req: Request, res: Response) {
        userService.resetPassword(req.body, req.params).then((response:any) => {
            if(response != null){
                const token:any = response.token;
                res.status(200)
                    .cookie('token', token, response.options)
                    .json({success:true, token});
            }else{
                throw new Error("Error Occurred");
            }

        }).catch((error) => {
            res.status(503).json({ message: error.message })
        });

    }


    async getAllUsers(req: Request, res: Response) {
        userService.getAllUsers().then((response) => {
            res.send(response);
        });
    }


    // Get All Users Controller
    async getAllRoles(req: Request, res: Response) {
        userService.getAllRoles().then((response) => {
            res.send(response);
        });
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
