import mongoose from 'mongoose';
export class Model{
    User = mongoose.model('User', usersSchema);
    Role = mongoose.model('Role', roles);
    OperationSystem = mongoose.model('Operating_System', os);
    Server = mongoose.model('Server', server);
    ServerData = mongoose.model('Server_Data', serverData);
}



const usersSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        required: true,
        type: String
    }
    ,
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
        type: mongoose.Types.ObjectId
    },
    updated_by: {
        required: true,
        type: String
    }

}, {
    collection: 'users',
    versionKey: false //here
})


const roles = new mongoose.Schema({
    role: {
        type: String
    },

    components: {
        type: String
    }
}, {
    collection: 'roles',
    versionKey: false //here
})

const os = new mongoose.Schema({
    os_type: {
        type: String
    }
}, {
    collection: 'operating_systems',
    versionKey: false //here
})



const server = new mongoose.Schema({
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
})


const serverData = new mongoose.Schema({
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
})

export const User = mongoose.model('User', usersSchema);
export const Role = mongoose.model('Role', roles);
export const OperationSystem = mongoose.model('Operating_System', os);
export const Server = mongoose.model('Server', server);
export const ServerData = mongoose.model('Server_Data', serverData);

module.exports = { User, Role, OperationSystem, Server, ServerData };