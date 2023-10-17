import express, { Request, Response } from 'express';

import { UserService } from '../services/userService';
import { error } from 'console';
var service = new UserService();

// Login Controller
const login = ((req: Request, res: Response) => {
    service.login(req.body).then((res1)=>{
        console.log(res1);
        res.send(res1);
    });
})

// Create User Controller
const createUser = ((req: Request, res: Response) => {
        service.createUser(req.body).then((res1:any)=>{
            console.log(res1);
            res.status(200).json(res1)

        }).catch((error)=>{
            res.status(400).json({ message: error.message })
        });
    })

// Find User Controller
const findUser = ((req: Request, res: Response) => {
    service.findUser(req.body).then((res1)=>{
        if(res1.found){
            res.status(200).json(res1.result);
        }else{
            res.status(400).json({ message: "user not found" })
        }
    });
})


// Get All Users Controller
const getAllUsers = ((req: Request, res: Response) => {
    res.send(service.findUser(req.body));
})


// // DeleteUser
// const deleteUser = ((req: Request, res: Response) => {
//     res.send(service.findUser(req.body));
// })


// // Update Password
// const updatePassword = ((req: Request, res: Response) => {
//     res.send(service.findUser(req.body));
// })

// // Update Role

// const updateUserRole = ((req: Request, res: Response) => {
//     res.send(service.findUser(req.body));
// })



module.exports = {
    login,
    createUser,
    getAllUsers
}