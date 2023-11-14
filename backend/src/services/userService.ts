import { error } from "console";

const { User, Role } = require('../models/model.js');


export class UserService {
    constructor() {
    }
    async login(req: any) {
        var a = null;
        await User.find({ email: req.email }).then((res1: any) => {
            console.log(res1);
            if (res1[0].password == req.password) {
                a = true;
            } else {
                a = false;
            }
        })
        return a;

    }


    async createUser(req: any) {
        var a = await this.findUser(req);
        if (!a.found) {
            const data = new User({
                first_name: req.first_name,
                last_name: req.last_name,
                email: req.email,
                password: req.password,
                created_ts: new Date(),
                updated_ts: new Date(),
                updated_by: req.email
            })
            await Role.find({ role: 'USER' }).then((res1: any) => {
                data.role_type_id = res1[0]._id;
                data.save();
                return "User Created Successfully";
            })
        } else {
            throw new Error("Duplicate");
        }

    }


    async findUser(req: any) {
        console.log(req);
        var a = { found: false, result: null };
        await User.find({ email: req.email }).then((res1: any) => {
            console.log(res1);
            if (undefined != res1 && res1.length != 0) {
                a = { found: true, result: res1 };
            }
        })
        return a;
    }


    async deleteUser(req: any) {
        console.log(req);
        var a = { deleted: false};
        await User.deleteOne({ email: req.email }).then((res1: any) => {
            a = { deleted: true};
            console.log("Deleted User");
        }).catch((error:any) =>{
            console.log(error); // Failure
        });
        return a;
    }

    async updateUserRole(req: any) {
        console.log(req);
        var a = { updated: false};
        await User.findOneAndUpdate({ email: req.email },  
            {role_id:"abc"}, null, function (err:Error, docs:any) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                var a = { updated: true};
            } 
        });
        return a; 
    }

    async getAllUsers() {
        await User.find().then((res1: any) => {
            return res1;
        })
        return null;
    }

    async getAllRoles() {
        await Role.find().then((res1: any) => {
            return res1;
        })
        return null;
    }

    
    async findRole(req: any) {
        console.log(req);
        var a = { found: false, result: null };
        await Role.find({ role: req.role }).then((res1: any) => {
            console.log(res1);
            if (undefined != res1 && res1.length != 0) {
                a = { found: true, result: res1 };
            }
        })
        return a;
    }

}