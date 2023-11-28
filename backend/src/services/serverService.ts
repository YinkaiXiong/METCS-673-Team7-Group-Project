import { error } from "console";
import * as fs from 'fs';
import * as path from 'path';
import { Client } from 'ssh2';
import { OperationSystem, Server, ServerData } from '../models/model';


export class ServerService {
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

            const connSettings = {
                host: req.server_ip,
                port: 22,
                username: req.username,
                password: req.password
            };

            const client = new Client();

            client.on('ready', function () {
                console.log('SSH connection established');

                const remotePath = '/home/user/scripts/';
                const filePath = '/home/user/scripts/server_monitor.sh';

                const cronJob = `0 2 * * * ${filePath}`; // Your cron job command

                // Local path of the file to copy
                const localFilePath = '/path/to/local/file.txt';

                client.sftp(function (err, sftp) {
                    if (err) throw err;

                    const localFileStream = fs.createReadStream(localFilePath);
                    const remoteFileStream = sftp.createWriteStream(
                        path.join(remotePath, 'file.txt')
                    );

                    localFileStream.pipe(remoteFileStream);
                    remoteFileStream.on('close', function () {
                        console.log('File transferred successfully');

                        // Add cron job after file transfer completion
                        client.exec(`echo "${cronJob}" | crontab -`, function (err, stream) {
                            if (err) throw err;

                            stream.on('close', function () {
                                console.log('Cron job added successfully');

                                // Change permissions after cron job addition
                                client.exec(`chmod 777 "${filePath}"`, function (err, stream) {
                                    if (err) throw err;

                                    stream.on('close', function () {
                                        console.log('Permissions changed successfully');
                                        client.end();
                                    }).on('data', function (data: any) {
                                        console.log('STDOUT: ' + data);
                                    }).stderr.on('data', function (data) {
                                        console.log('STDERR: ' + data);
                                    });
                                });
                            }).on('data', function (data: any) {
                                console.log('STDOUT: ' + data);
                            }).stderr.on('data', function (data) {
                                console.log('STDERR: ' + data);
                            });
                        });
                    });
                });
            });

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
        var a = { deleted: false };
        await Server.deleteOne({ hostname: req.hostname }).then((res1: any) => {
            a = { deleted: true };
            console.log("Deleted Server");
        }).catch((error: any) => {
            console.log(error); // Failure
        });
        return a;
    }

    async updateServer(req: any) {
        console.log(req);
        var a = { updated: false };
        await Server.findOneAndUpdate({ hostname: req.hostname }).then((response) => {
            a = { updated: true };
        }).catch((err) => {
            console.log(err)
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