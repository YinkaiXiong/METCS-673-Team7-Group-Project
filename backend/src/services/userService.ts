import { User, Role } from '../models/model';
import base64 from 'base-64';


export class UserService {
    constructor() {

    }
    async login(req: any) {
        if (!req.authorization || req.authorization.length === 0) {
            throw Error("Invalid Input")
        }
        const auth = base64.decode(req.authorization.split(" ")[1]).split(":");
        if(auth.length <= 1){
            throw new Error("Invalid Credentials")
        }

        const email = auth[0];
        const password = auth[1];
        if (!email|| email.length === 0 || !password|| password.length === 0) {
            throw Error("Invalid Input")
        }

        var a = null;
        await User.find({ email: email }).then((response: any) => {
            if (response.length == 0) {
                throw new Error("User not found");
            }
            if (response[0].password == password) {
                a = true;
            } else {
                a = false;
            }
        })
        return a;
    }


    async createUser(req: any) {
        if (!(req.last_name) || !req.first_name || !req.email || !req.password || !req.role ||
            req.role.length === 0 || req.email.length === 0 || req.password.length === 0 || req.first_name.length === 0 || req.last_name.length === 0) {
            throw new Error("Incorrect Input");
        }
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
            await Role.find({ role: req.role }).then((response: any) => {

                if (response.length === 0) {
                    throw new Error("Invalid Role");
                }
                data.role_type_id = response[0]._id;
                data.save();
                return "User Created Successfully";
            })
        } else {
            throw new Error("Duplicate");
        }

    }


    async findUser(req: any) {
        if (!req.email || req.email.length === 0) {
            throw new Error("Incorrect Input");
        }
        var a = { found: false, result: null };
        await User.find({ email: req.email }).select('-password').then((response: any) => {
            if (undefined != response && response.length != 0) {
                a = { found: true, result: response };
            }
        })
        return a;
    }


    async deleteUser(req: any) {
        if (!req.email || req.email.length === 0) {
            throw new Error("Incorrect Input");
        }
        var a = { deleted: false };
        await User.deleteOne({ email: req.email }).then((response: any) => {
            a = { deleted: true };
        }).catch((error: any) => {
            console.log(error); // Failure
        });
        return a;
    }

    async updateUserRole(req: any) {
        if (!req.email || !req.role || req.role.length === 0 || req.email.length === 0) {
            throw new Error("Incorrect Input");
        }
        var a = { updated: false };
        const role = await Role.find({ role: req.role })

        const user = await User.findOne({ email: req.email });
        if (!user) {
            throw new Error("User not found");
        }
        if (role.length == 0) {
            throw new Error("Invalid Role")
        }
        await User.findOneAndUpdate({ email: req.email },
            { role_type_id: role[0]._id }).then(() => {
                a = { updated: true };
            }).catch((error: any) => {
                console.log(error); // Failure
            });
        return a;
    }

    async getAllUsers() {
        var result = null;
        await User.find().select('-password').then((response: any) => {
            result = response;
        })
        return result
    }

    async getAllRoles() {
        var result = null;
        await Role.find().then((response: any) => {
            result = response;
        })
        return result;
    }


    async findRole(req: any) {
        if (!req.role || req.role.length === 0) {
            throw new Error("Invalid Input")
        }
        var a = { found: false, result: null };
        await Role.find({ role: req.role }).then((res1: any) => {
            if (undefined != res1 && res1.length != 0) {
                a = { found: true, result: res1 };
            }
        })
        return a;
    }

}