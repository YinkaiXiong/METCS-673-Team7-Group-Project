"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerService = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ssh2_1 = require("ssh2");
const model_js_1 = require("../models/model.js");
class ServerService {
    constructor() {
    }
    addServer(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var a = yield this.findServer(req);
            if (!a.found) {
                const data = new model_js_1.Server({
                    server_name: req.server_name,
                    server_ip: req.server_ip,
                    username: req.username,
                    password: req.password,
                    created_ts: new Date(),
                    updated_ts: new Date(),
                    created_by: req.created_by,
                    updated_by: req.created_by
                });
                const connSettings = {
                    host: req.server_ip,
                    port: 22,
                    username: req.username,
                    password: req.password
                };
                const client = new ssh2_1.Client();
                client.on('ready', function () {
                    console.log('SSH connection established');
                    const remotePath = '/home/user/scripts/';
                    const filePath = '/home/user/scripts/server_monitor.sh';
                    const cronJob = `0 2 * * * ${filePath}`; // Your cron job command
                    // Local path of the file to copy
                    const localFilePath = '/path/to/local/file.txt';
                    client.sftp(function (err, sftp) {
                        if (err)
                            throw err;
                        const localFileStream = fs.createReadStream(localFilePath);
                        const remoteFileStream = sftp.createWriteStream(path.join(remotePath, 'file.txt'));
                        localFileStream.pipe(remoteFileStream);
                        remoteFileStream.on('close', function () {
                            console.log('File transferred successfully');
                            // Add cron job after file transfer completion
                            client.exec(`echo "${cronJob}" | crontab -`, function (err, stream) {
                                if (err)
                                    throw err;
                                stream.on('close', function () {
                                    console.log('Cron job added successfully');
                                    // Change permissions after cron job addition
                                    client.exec(`chmod 777 "${filePath}"`, function (err, stream) {
                                        if (err)
                                            throw err;
                                        stream.on('close', function () {
                                            console.log('Permissions changed successfully');
                                            client.end();
                                        }).on('data', function (data) {
                                            console.log('STDOUT: ' + data);
                                        }).stderr.on('data', function (data) {
                                            console.log('STDERR: ' + data);
                                        });
                                    });
                                }).on('data', function (data) {
                                    console.log('STDOUT: ' + data);
                                }).stderr.on('data', function (data) {
                                    console.log('STDERR: ' + data);
                                });
                            });
                        });
                    });
                });
                yield model_js_1.OperationSystem.find({ os_type: req.os_type }).then((res1) => {
                    data.os_type_id = res1[0]._id;
                    data.save();
                    return "User Created Successfully";
                });
            }
            else {
                throw new Error("Duplicate");
            }
        });
    }
    findServer(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            var a = { found: false, result: null };
            yield model_js_1.Server.find({ hostname: req.hostname }).then((res1) => {
                console.log(res1);
                if (undefined != res1 && res1.length != 0) {
                    a = { found: true, result: res1 };
                }
            });
            return a;
        });
    }
    deleteServer(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            var a = { deleted: false };
            yield model_js_1.Server.deleteOne({ hostname: req.hostname }).then((res1) => {
                a = { deleted: true };
                console.log("Deleted Server");
            }).catch((error) => {
                console.log(error); // Failure
            });
            return a;
        });
    }
    updateServer(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            var a = { updated: false };
            yield model_js_1.Server.findOneAndUpdate({ hostname: req.hostname }).then((response) => {
                a = { updated: true };
            }).catch((err) => {
                console.log(err);
            });
            return a;
        });
    }
    getAllServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_js_1.Server.find().then((res1) => {
                return res1;
            });
            return null;
        });
    }
    //Change this
    getServerData(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            var a = { found: false, result: null };
            yield model_js_1.ServerData.find({ hostname: req.hostname }).then((res1) => {
                console.log(res1);
                if (undefined != res1 && res1.length != 0) {
                    a = { found: true, result: res1 };
                }
            });
            return a;
        });
    }
    //Change it
    saveServerData(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            var a = { found: false, result: null };
            yield model_js_1.ServerData.find({ hostname: req.hostname }).then((res1) => {
                console.log(res1);
                if (undefined != res1 && res1.length != 0) {
                    a = { found: true, result: res1 };
                }
            });
            return a;
        });
    }
}
exports.ServerService = ServerService;
