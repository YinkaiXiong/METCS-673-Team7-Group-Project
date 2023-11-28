"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerData = exports.Server = exports.OperationSystem = exports.Role = exports.User = exports.Model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Model {
    constructor() {
        this.User = mongoose_1.default.model('User', usersSchema);
        this.Role = mongoose_1.default.model('Role', roles);
        this.OperationSystem = mongoose_1.default.model('Operating_System', os);
        this.Server = mongoose_1.default.model('Server', server);
        this.ServerData = mongoose_1.default.model('Server_Data', serverData);
    }
}
exports.Model = Model;
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
    },
    components: {
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
exports.User = mongoose_1.default.model('User', usersSchema);
exports.Role = mongoose_1.default.model('Role', roles);
exports.OperationSystem = mongoose_1.default.model('Operating_System', os);
exports.Server = mongoose_1.default.model('Server', server);
exports.ServerData = mongoose_1.default.model('Server_Data', serverData);
module.exports = { User: exports.User, Role: exports.Role, OperationSystem: exports.OperationSystem, Server: exports.Server, ServerData: exports.ServerData };
