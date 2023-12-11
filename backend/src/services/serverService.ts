import * as fs from 'fs';
import { Client } from 'ssh2';
import { OperatingSystem, Server, ServerData } from '../models/model';
import { decrypt, encrypt } from "../util/EncryptionUtil";


export class ServerService {
    constructor() {
    }
    /**
     * Add a new server.
     * @param {object} req - Request object containing server details.
     * @returns A promise resolving to a success message.
     * @throws {Error} Throws an error if the server is a duplicate.
     */
    async addServer(req: any) {
        try {
            const serverExists = await this.findServer(req);

            if (!serverExists) {
                const newServer = new Server({
                    server_name: req.server_name,
                    server_ip: req.server_ip,
                    username: req.username,
                    password: req.password,
                    created_by: req.created_by,
                    updated_by: req.created_by,
                });

                const os = await OperatingSystem.findOne({ os_type: req.os_type.toUpperCase() });

                if (!os) {
                    throw new Error("Invalid Operating System");
                }

                newServer.os_type_id = os._id;


                const connSettings = {
                    host: req.server_ip,
                    port: 22,
                    username: req.username,
                    password: req.password
                };

                const client = new Client();

                // Connect to SSH
                return await new Promise((resolve, reject) => {
                    client.on('ready', async () => {
                        console.log('SSH connection established');

                        const filePath = `/home/${req.username}/server_monitor.py`;
                        const cronJob = `* * * * * python3 ${filePath} > /home/${req.username}/cron`;

                        const localFilePath = process.env.LOCAL_PATH;

                        client.sftp(async (err, sftp) => {
                            if (err) {
                                reject(err);
                            }

                            if (filePath && localFilePath) {
                                const localFileStream = fs.createReadStream(localFilePath);
                                const remoteFileStream = sftp.createWriteStream(filePath);
                                localFileStream.pipe(remoteFileStream);

                                remoteFileStream.on('close', async () => {
                                    console.log('File transferred successfully');

                                    client.exec(`sudo yum -y install cronie; sudo yum -y install pip; pip install psutil; pip install pymongo; echo "${cronJob}" | crontab -; sudo systemctl restart crond`, async (err, stream) => {
                                        if (err) {
                                            reject(err);
                                        }

                                        stream.on('close', async () => {
                                            console.log('Cron job added successfully');

                                            client.exec(`chmod 777 "${filePath}"`, async (err, stream) => {
                                                if (err) {
                                                    reject(err);
                                                }

                                                stream.on('close', async () => {
                                                    console.log('Permissions changed successfully');

                                                    await newServer.save();
                                                    console.log('Server Added Successfully');

                                                    client.end(); // Close SSH connection
                                                    resolve('Server Added Successfully');
                                                }).on('data', (data: any) => {
                                                    console.log('STDOUT: ' + data);
                                                }).stderr.on('data', (data) => {
                                                    console.log('STDERR: ' + data);
                                                    reject(new Error(data));
                                                });
                                            });
                                        }).on('data', (data: any) => {
                                            console.log('STDOUT: ' + data);
                                        }).stderr.on('data', (data) => {
                                            console.log('STDERR: ' + data);
                                            reject(new Error(data));
                                        });
                                    });
                                });
                            } else {
                                reject(new Error("Missing File Path"));
                            }
                        });
                    }).connect(connSettings);
                });
            } else {
                throw new Error('Duplicate');
            }
        } catch (err) {
            console.error(err);
            throw new Error("Some Error Occurred");
        }
    }


    /**
      * Find a server based on the server name.
      * @param {object} req - Request object containing server details.
      * @returns A promise resolving to server information.
      */
    async findServer(req: any) {
        try {
            // Asynchronously query the database for servers with the given name
            const server = await Server.findOne({ server_name: req.server_name })

            // Return the result object
            return server;
        } catch (err) {
            // Handle errors or log them as needed
            console.error(err);
            // Return a default response in case of an error
            throw new Error("Server Not Found");
        }
    }



    /**
    * Delete server based on server name and credentials.
    * @param {object} req - Request object containing server details.
    * @returns A promise resolving to an object indicating if the server was deleted or not.
    * @throws {Error} Throws an error if the server is not found, invalid credentials for SSH connection, or deletion fails.
    */
    async deleteServer(req: any) {
        try {
            const serverDet = await Server.findOne({ server_name: req.server_name }).select('+password');

            if (!serverDet) {
                throw new Error("Server not found");
            }

            const connSettings = {
                host: serverDet.server_ip,
                port: 22,
                username: serverDet.username,
                password: decrypt(serverDet.password)
            };

            const client = new Client();

            await new Promise((resolve, reject) => {
                client.on('ready', () => {
                    console.log('SSH connection established');
                    client.exec(`crontab -r; rm -rf ${process.env.FILE_PATH}`, (err, stream) => {
                        if (err) {
                            reject(err);
                        } else {
                            client.end();
                            resolve("Deleted Successfully");
                        }
                    });
                }).on('error', (err) => {
                    reject(err);
                }).connect(connSettings);
            });

            const deletionResult = await Server.deleteOne({ hostname: req.hostname });

            if (deletionResult.deletedCount === 1) {
                return { deleted: true };
            } else {
                throw new Error("Deletion failed");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



    /**
     * Update server password based on server name and old password.
     * @param {object} req - Request object containing server details.
     * @returns A promise resolving to an object indicating if the server password was updated or not.
     * @throws {Error} Throws an error if the server is not found, old password is incorrect, or invalid credentials for SSH connection.
     */
    async updateServer(req: any) {
        try {
            let isPasswordMatch: any = false;
            const server = await Server.findOne({ server_name: req.server_name }).select('+password +username');

            if (!server) {
                throw new Error("Server not found");
            }

            isPasswordMatch = server.matchPassword(req.old_password);

            if (isPasswordMatch) {
                const connSettings = {
                    host: server.server_ip,
                    port: 22,
                    username: server.username,
                    password: req.password
                };

                const client = new Client();

                await new Promise((resolve, reject) => {
                    client.on('ready', () => {
                        console.log('SSH connection established');
                        client.end();
                        resolve("SSH connection established");
                    }).on('error', (err) => {
                        reject(err);
                    }).connect(connSettings);
                });

                const result = await Server.findOneAndUpdate({ hostname: req.hostname }, { password: encrypt(req.password) });

                if (result) {
                    return "Updated Successfully";
                } else {
                    throw new Error("Failed to update password");
                }
            } else {
                throw new Error("Incorrect Old Password");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



    /**
     * Retrieve all server names and IPs.
     * @returns {Promise<object[] | null>} A promise resolving to an array of server names and IPs, or null if an error occurs.
     */
    async getAllServer(): Promise<object[] | null> {
        try {
            // Asynchronously query the Server collection for server names and IPs
            const servers = await Server.find({}, 'server_name server_ip -_id');

            // Return the array of server names and IPs
            return servers;
        } catch (error) {
            // Handle errors or log them as needed
            console.error(error);
            return null; // Return null if an error occurs
        }
    }


    /**
     * Retrieve server data based on hostname.
     * @param {object} req - Request object containing hostname.
     * @returns {Promise<object>} A promise resolving to server data information.
     */
    async getServerData(req: any): Promise<{ [key: string]: { [key: string]: object }[] }> {
    try {
        const serverList:any = await this.getAllServer();
        const serverDataMap: { [key: string]: { [key: string]: object }[] } = {};

        for (const server of serverList) {
            const serverData = await ServerData.find({ hostname: server.hostname });

            if (serverData !== undefined && serverData.length !== 0) {
                if (!serverDataMap[server.server_name]) {
                    serverDataMap[server.server_name] = [];
                }

                const serverTimestampData: { [key: string]: object } = {};

                for (const data of serverData) {
                    const timestamp:any = data.created_ts;
                    serverTimestampData[timestamp] = {
                        mem_used: data.mem_used,
                        mem_total: data.mem_total,
                        mem_free: data.mem_free,
                        disk_total: data.disk_total,
                        disk_used: data.disk_used,
                        disk_free: data.disk_free,
                        active_connections: data.active_connections,
                        server_ip: data.server_ip,
                        cpu_percent: data.cpu_percent
                    };
                }

                serverDataMap[server.server_name].push(serverTimestampData);
            }
        }

        if (Object.keys(serverDataMap).length !== 0) {
            return serverDataMap;
        } else {
            throw new Error('No Data Found for Any Server');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}   



}