"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        type: String
    },
    created_ts: {
        type: Date
    },
    updated_ts: {
        type: Date
    },
    role_type_id: {
        type: mongoose_1.default.Types.ObjectId
    },
    updated_by: {
        required: true,
        type: String
    }
}, {
    collection: 'users',
    versionKey: false //here
});
const roles = new mongoose_1.default.Schema({
    role: {
        type: String
    }
}, {
    collection: 'roles',
    versionKey: false //here
});
const os = new mongoose_1.default.Schema({
    os_type: {
        type: String
    }
}, {
    collection: 'operating_systems',
    versionKey: false //here
});
const server = new mongoose_1.default.Schema({
    server_name: {
        type: String
    },
    server_ip: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    os_type_id: {
        type: String
    },
    created_ts: {
        type: Date
    },
    updated_ts: {
        type: Date
    },
    created_by: {
        type: String
    },
    updated_by: {
        type: String
    }
});
const serverData = new mongoose_1.default.Schema({
    timestamp: {
        type: Date
    },
    server_id: {
        type: String
    },
    cpu: { type: Number },
    disk: { type: Number },
    memory: { type: Number },
    uptime: { type: Boolean },
    network: { type: Boolean }
}, {
    collection: 'server_data',
    versionKey: false
});
const User = mongoose_1.default.model('User', usersSchema);
const Role = mongoose_1.default.model('Role', roles);
const OperationSystem = mongoose_1.default.model('Operating_System', os);
const Server = mongoose_1.default.model('Server', server);
const ServerData = mongoose_1.default.model('Server_Data', serverData);
module.exports = { User, Role, OperationSystem, Server, ServerData };
