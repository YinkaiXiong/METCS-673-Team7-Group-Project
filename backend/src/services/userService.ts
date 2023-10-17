import { error } from "console";

const { User, Role, OperationSystem, Server, ServerData } = require('../models/model.js');


export class UserService {
    constructor() {
    }
    async login(req: any) {
        var a = null;
        await User.findOne({ email: req.email }).then((res1: any) => {
            console.log(res1);
            if (res1.password == req.password) {
                a = true;
            } else {
                a = false;
            }
        })
        return a;

    }


    async createUser(req: any) {
        var a = await this.findUser(req);
        console.log(a);
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
            Role.find({ role: 'USER' }).then((res1: any) => {
                data.role_type_id = res1[0]._id;
                return data.save();
            })
        } else {
            throw new Error("Duplicate");
        }

    }


    async findUser(req: any) {
        var a = { found: false, result: null };
        await User.find({ email: req.email }).then((res1: any) => {
            if (undefined != res1 || res1.body.length != 0) {
                a = { found: true, result: res1 };
            }
        })
        return a;
    }



    getAllUsers() {
        User.find().then((res1: any) => {
            return res1;
        })
        return null;
    }

}