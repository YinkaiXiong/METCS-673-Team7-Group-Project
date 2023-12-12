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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempUser = exports.ServerData = exports.Server = exports.OperatingSystem = exports.Role = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EncryptionUtil_1 = require("../util/EncryptionUtil");
// TempUser schema
const tempUserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Expiration time in seconds (1 hour)
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        // Password complexity validation
        validate: {
            validator: function (value) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/;
                return passwordRegex.test(value);
            },
            message: 'Password must meet the complexity requirements.'
        },
    },
    first_name: String,
    verificationToken: String,
    last_name: String,
});
// Method to generate a verification token for TempUser
tempUserSchema.methods.generateVerificationToken = function () {
    const resetToken = crypto_1.default.randomBytes(20).toString('hex');
    this.verificationToken = crypto_1.default
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    return this.save().then(() => resetToken); // Returning the non-hashed token for use
};
const usersSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        uniqueCaseInsensitive: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        validate: {
            validator: function (value) {
                // Password complexity // Password complexity check (example: requiring at least one uppercase, one lowercase, one number, one special character and a minimum length of 12 characters
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/;
                return passwordRegex.test(value);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and be at least 12 characters long.'
        },
        select: false
    },
    created_ts: {
        type: Date,
        default: Date.now,
        select: false,
    },
    updated_ts: {
        type: Date,
        default: Date.now,
        select: false,
    },
    role_type_id: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    updated_by: {
        select: false,
        type: String
    }
}, {
    collection: 'users',
    versionKey: false
});
// Pre-save hook to hash the password before saving User
usersSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        try {
            const salt = yield bcryptjs_1.default.genSalt(10);
            this.password = yield bcryptjs_1.default.hash(this.password, salt);
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
// Method to compare entered password with stored hashed password
usersSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isMatch = yield bcryptjs_1.default.compare(enteredPassword, this.password);
            return isMatch;
        }
        catch (err) {
            return false;
        }
    });
};
// Method to generate a JWT for User authentication
usersSchema.methods.getSignedJwtToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET || '', {
        expiresIn: process.env.JWT_EXPIRE || '1h'
    });
};
// Method to generate a reset password token for User
usersSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto_1.default.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto_1.default
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Set expiration to 10 minutes
    return this.save().then(() => resetToken); // Returning the non-hashed token for use
};
// Define the Role schema
const roleSchema = new mongoose_1.default.Schema({
    role: {
        type: String,
        // Add any additional validations or constraints for the 'role' field
    },
    components: {
        type: String,
        // Add any additional validations or constraints for the 'components' field
    }
}, {
    collection: 'roles',
    versionKey: false // Disable versioning (_v field)
});
// Define the OperatingSystem schema
const operatingSystemSchema = new mongoose_1.default.Schema({
    os_type: {
        type: String,
        // Add any additional validations or constraints for the 'os_type' field
    }
}, {
    collection: 'operating_systems',
    versionKey: false // Disable versioning (_v field)
});
// Schema for the Server collection
const serverSchema = new mongoose_1.default.Schema({
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
        type: String,
        select: false // Don't include password by default in queries
    },
    os_type_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Operating_System' // Reference to the 'Operating_System' model
    },
    created_ts: {
        type: Date,
        default: Date.now,
        select: false // Don't include created_ts in queries
    },
    updated_ts: {
        type: Date,
        default: Date.now,
        select: false // Don't include updated_ts in queries
    },
    created_by: {
        type: String,
        select: false // Don't include created_by in queries
    },
    updated_by: {
        type: String,
        select: false // Don't include updated_by in queries
    }
});
// Pre-save hook to encrypt the password before saving Server
serverSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        try {
            const hashedPassword = yield (0, EncryptionUtil_1.encrypt)(this.password); // Assuming encrypt function returns a hashed password
            this.password = hashedPassword;
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
// Method to compare entered password with stored hashed password
serverSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (enteredPassword === (0, EncryptionUtil_1.decrypt)(this.password));
        }
        catch (err) {
            return false;
        }
    });
};
const serverData = new mongoose_1.default.Schema({
    created_ts: {
        type: Date,
        default: Date.now,
    },
    server_ip: {
        type: String
    },
    cpu_percent: { type: Number },
    disk_total: { type: Number },
    disk_used: { type: Number },
    disk_free: { type: Number },
    mem_used: { type: Number },
    mem_free: { type: Number },
    mem_total: { type: Number },
    server_name: {
        type: String
    },
    active_connections: { type: Number },
    uptime: { type: Boolean },
    network: { type: Boolean }
}, {
    collection: 'server_data',
    versionKey: false
});
exports.User = mongoose_1.default.model('User', usersSchema);
exports.Role = mongoose_1.default.model('Role', roleSchema);
exports.OperatingSystem = mongoose_1.default.model('Operating_System', operatingSystemSchema);
exports.Server = mongoose_1.default.model('Server', serverSchema);
exports.ServerData = mongoose_1.default.model('Server_Data', serverData);
exports.TempUser = mongoose_1.default.model('Temp_User', tempUserSchema);
module.exports = { User: exports.User, Role: exports.Role, OperatingSystem: exports.OperatingSystem, Server: exports.Server, ServerData: exports.ServerData, TempUser: exports.TempUser };
