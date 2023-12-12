import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { encrypt, decrypt } from '../util/EncryptionUtil';

interface TempUserDocument extends Document {
    email: string;
    createdAt: Date;
    password: string;
    first_name?: string;
    last_name?: string;
    verificationToken?:string,
    generateVerificationToken: () => string;
}

// TempUser schema
const tempUserSchema = new mongoose.Schema<TempUserDocument>({
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
            validator: function (value: string) {
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
tempUserSchema.methods.generateVerificationToken = function (): string {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.verificationToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    return this.save().then(() => resetToken); // Returning the non-hashed token for use
};

// Interface for the User document
interface UserDocument extends Document {
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
    created_ts: Date;
    updated_ts: Date;
    role_type_id: mongoose.Types.ObjectId;
    updated_by: string;
    resetPasswordToken: string;
    resetPasswordExpire: Date;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
    getSignedJwtToken: () => string;
    getResetPasswordToken: () => string;
}


const usersSchema = new mongoose.Schema<UserDocument>({
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
    }
    ,
    password: {
        type: String,
        required: [true, 'Please add a password'],
        validate: {
            validator: function (value: string) {
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
        type: Schema.Types.ObjectId
    },
    updated_by: {
        select: false,
        type: String
    }

}, {
    collection: 'users',
    versionKey: false
})

// Pre-save hook to hash the password before saving User
usersSchema.pre<UserDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err: any) {
        return next(err);
    }
});


// Method to compare entered password with stored hashed password
usersSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    } catch (err) {
        return false;
    }
};

// Method to generate a JWT for User authentication
usersSchema.methods.getSignedJwtToken = function (): string {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET || '', {
        expiresIn: process.env.JWT_EXPIRE || '1h'
    });
};

// Method to generate a reset password token for User
usersSchema.methods.getResetPasswordToken = function (): string {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Set expiration to 10 minutes
    return this.save().then(() => resetToken); // Returning the non-hashed token for use
};





interface RoleDocument extends Document {
    role: string;
    components: string;
}

// Define the Role schema
const roleSchema = new mongoose.Schema<RoleDocument>({
    role: {
        type: String,
        // Add any additional validations or constraints for the 'role' field
    },
    components: {
        type: String,
        // Add any additional validations or constraints for the 'components' field
    }
}, {
    collection: 'roles', // Set the collection name to 'roles'
    versionKey: false // Disable versioning (_v field)
});

// Create and export the Role model


// Define the OperatingSystem document interface representing the Operating_System collection schema
interface OperatingSystemDocument extends Document {
    os_type: string;
}

// Define the OperatingSystem schema
const operatingSystemSchema = new mongoose.Schema<OperatingSystemDocument>({
    os_type: {
        type: String,
        // Add any additional validations or constraints for the 'os_type' field
    }
}, {
    collection: 'operating_systems', // Set the collection name to 'operating_systems'
    versionKey: false // Disable versioning (_v field)
});

// Create and export the OperatingSystem model



// Define the ServerDocument interface representing the schema of the Server collection
interface ServerDocument extends Document {
    server_name: string;
    server_ip: string;
    username: string;
    password: string;
    os_type_id: Schema.Types.ObjectId;
    created_ts: Date;
    updated_ts: Date;
    created_by: string;
    updated_by: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// Schema for the Server collection
const serverSchema = new mongoose.Schema<ServerDocument>({
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
        type: Schema.Types.ObjectId, // Define os_type_id as Schema.Types.ObjectId
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
serverSchema.pre<ServerDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const hashedPassword = await encrypt(this.password); // Assuming encrypt function returns a hashed password
        this.password = hashedPassword;
        return next();
    } catch (err: any) {
        return next(err);
    }
});

// Method to compare entered password with stored hashed password
serverSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    try {
        return (enteredPassword === decrypt(this.password));
    } catch (err) {
        return false;
    }
};



const serverData = new mongoose.Schema({
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
})

export const User = mongoose.model<UserDocument>('User', usersSchema);
export const Role = mongoose.model<RoleDocument>('Role', roleSchema);
export const OperatingSystem = mongoose.model<OperatingSystemDocument>('Operating_System', operatingSystemSchema);
export const Server = mongoose.model<ServerDocument>('Server', serverSchema);
export const ServerData = mongoose.model('Server_Data', serverData);
export const TempUser = mongoose.model('Temp_User', tempUserSchema);

module.exports = { User, Role, OperatingSystem, Server, ServerData, TempUser };