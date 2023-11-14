import { error } from "console";

const {OperationSystem, Server, ServerData } = require('../models/model.js');


export class serverService {
    constructor() {
    }

    async addServer(req: any) {
        var a = await this.findServer(req);
        if (!a.found) {
            const data = new Server({

                server_name: req.server_name,
                server_ip: req.server_ip,
                username: req.username,
                password: req.password,
                created_ts: new Date(),
                updated_ts: new Date(),
                created_by: req.created_by,
                updated_by: req.created_by
            })
            await OperationSystem.find({ os_type: req.os_type }).then((res1: any) => {
                data.os_type_id = res1[0]._id;
                data.save();
                return "User Created Successfully";
            })
        } else {
            throw new Error("Duplicate");
        }

    }


    async findServer(req: any) {
        console.log(req);
        var a = { found: false, result: null };
        await Server.find({ hostname: req.hostname }).then((res1: any) => {
            console.log(res1);
            if (undefined != res1 && res1.length != 0) {
                a = { found: true, result: res1 };
            }
        })
        return a;
    }


    async deleteServer(req: any) {
        console.log(req);
        var a = { deleted: false};
        await Server.deleteOne({ hostname: req.hostname }).then((res1: any) => {
            a = { deleted: true};
            console.log("Deleted Server");
        }).catch((error:any) =>{
            console.log(error); // Failure
        });
        return a;
    }

    async updateServer(req: any) {
        console.log(req);
        var a = { updated: false};
        await Server.findOneAndUpdate({ hostname: req.hostname },
            req, null, function (err:Error, docs:any) {
                if (err){
                    console.log(err)
                }
                else{
                    var a = { updated: true};
                }
            });
        return a;
    }

    async getAllServer() {
        await Server.find().then((res1: any) => {
            return res1;
        })
        return null;
    }

//Change this
    async getServerData(req: any) {
        console.log(req);
        var a = { found: false, result: null };
        await ServerData.find({ hostname: req.hostname }).then((res1: any) => {
            console.log(res1);
            if (undefined != res1 && res1.length != 0) {
                a = { found: true, result: res1 };
            }
        })
        return a;
    }


    //Change it
    async saveServerData(req: any) {
        console.log(req);
        var a = { found: false, result: null };
        await ServerData.find({ hostname: req.hostname }).then((res1: any) => {
            console.log(res1);
            if (undefined != res1 && res1.length != 0) {
                a = { found: true, result: res1 };
            }
        })
        return a;
    }



}