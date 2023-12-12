"use strict";
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
exports.UserService = void 0;
const model_1 = require("../models/model");
const base_64_1 = __importDefault(require("base-64"));
const crypto = require('crypto');
class UserService {
    constructor() {
    }
    /**
     * Authenticates a user using email and password from request headers.
     * @param req - Request object containing authorization header with email and password.
     * @returns Authentication token if successful, otherwise throws an error.
     */
    login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.authorization || req.authorization.length === 0) {
                throw Error("Invalid Input");
            }
            const auth = base_64_1.default.decode(req.authorization.split(" ")[1]).split(":");
            if (auth.length <= 1) {
                throw new Error("Invalid Credentials");
            }
            const email = auth[0];
            const password = auth[1];
            if (!email || email.length === 0 || !password || password.length === 0) {
                throw Error("Invalid Input");
            }
            const user = yield model_1.User.findOne({ email: email }).select('+password');
            if (!user) {
                throw new Error("User not found");
            }
            const isPasswordMatch = yield user.matchPassword(password);
            if (isPasswordMatch) {
                return this.sendTokenResponse(email);
            }
            throw new Error("Incorrect password");
        });
    }
    /**
     * Generates a token and options for authenticated user.
     * @param email - Email of the user for which token needs to be generated.
     * @returns Token and options object.
     */
    sendTokenResponse(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.User.findOne({ email: email });
            if (!user) {
                throw new Error("User not found");
            }
            const token = user.getSignedJwtToken();
            const jwtExpire = process.env.JWT_EXPIRE;
            const options = {
                expires: new Date(Date.now() + jwtExpire * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true
            };
            return { token: token, options: options, user: user };
        });
    }
    /**
     * Processes a new user registration request.
     * @param req - The request object containing user details.
     * @returns A success message if the user registration is completed successfully.
     * @throws Error if the input is incorrect or if a duplicate user is found.
     */
    newUserRequest(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify the required fields in the request
            if (!(req.last_name) || !req.first_name || !req.email || !req.password || req.email.length === 0 || req.password.length === 0 || req.first_name.length === 0 || req.last_name.length === 0) {
                throw new Error("Incorrect Input");
            }
            // Find if the user already exists
            var userFound = yield this.findUser(req);
            try {
                if (!userFound) {
                    // Check if there's a temporary user with the same email
                    const tempUser = yield model_1.TempUser.findOne({ email: req.email });
                    if (tempUser != null) {
                        // If a temporary user exists, throw error
                        throw new Error("Duplicate");
                    }
                    // Create a new temporary user
                    const newUser = new model_1.TempUser(req);
                    yield newUser.save();
                    // Get the newly saved user details
                    const response = yield model_1.TempUser.findOne({ email: req.email });
                    if (response) {
                        // Generate a verification token for email confirmation (assuming this method exists in your TempUser model)
                        const verificationToken = yield response.generateVerificationToken();
                        // Prepare mail details
                        const mail = {
                            email: req.email,
                            subject: "Complete Account Creation",
                            url: `http://localhost:3001/verify/${verificationToken}/${req.email}`
                        };
                        // Send verification email (adjust based on your email sending mechanism)
                        return mail;
                    }
                    else {
                        throw new Error("Error generating verification token");
                    }
                }
                else {
                    throw new Error("Duplicate");
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Creates a new user based on the provided request and parameters.
     * @param req - The request object.
     * @param params - The parameters object containing user details.
     * @returns A success message if the user is created successfully.
     * @throws Error if the input is incorrect, role is invalid, or if a duplicate user is found.
     */
    createUser(req, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find if the user already exists
                const userFound = yield this.findUser(params);
                if (!userFound) {
                    // Verify the user based on the verification token
                    const verificationResult = yield this.newUserVerification(req, params);
                    // If verification is successful, create a new user
                    if (verificationResult) {
                        // Create a new user object
                        const newUser = new model_1.User({
                            first_name: verificationResult.first_name,
                            last_name: verificationResult.last_name,
                            email: verificationResult.email,
                            password: verificationResult.password,
                            updated_by: verificationResult.email
                        });
                        // Find the role for the user
                        const role = yield model_1.Role.findOne({ role: "USER" });
                        if (!role) {
                            throw new Error("Invalid Role");
                        }
                        // Assign the role ID to the user
                        newUser.role_type_id = role._id;
                        // Save the user
                        yield newUser.save();
                        yield model_1.TempUser.deleteOne({ email: verificationResult.email });
                        return "User Created Successfully";
                    }
                    else {
                        throw new Error("User verification failed");
                    }
                }
                else {
                    throw new Error("Duplicate");
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Resets the password for a user based on the reset token and new password.
     * @param req - The request object.
     * @param params - The parameters object containing the reset token and new password.
     * @returns A success message if the password is reset successfully.
     * @throws Error if the token is invalid or the password reset fails.
     */
    resetPassword(req, params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate the hash for the reset token
            const resetPasswordToken = crypto
                .createHash('sha256')
                .update(params.resettoken)
                .digest('hex');
            // Find the user based on the reset token and expiry date
            const user = yield model_1.User.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() }
            });
            try {
                if (!user) {
                    throw new Error('Invalid token');
                }
                // Update the user's password and reset token details
                user.password = req.password; // Password should be hashed before storing
                user.updated_by = user.email;
                user.updated_ts = new Date();
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;
                // Save the updated user
                yield user.save();
                // Return token response (might need to handle this based on the implementation)
                return this.sendTokenResponse(user.email);
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Updates the user's password after verifying the old password.
     * @param req - The request object containing old and new passwords.
     * @returns A success message if the password is updated successfully.
     * @throws Error if the old password is incorrect or the update fails.
     */
    updatePassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the user based on the provided email
                const user = yield model_1.User.findOne({ email: req.email }).select('+password');
                if (!user) {
                    throw new Error('User not found');
                }
                // Match the provided old password with the stored password
                const isMatch = yield user.matchPassword(req.oldPassword);
                if (!isMatch) {
                    throw new Error('Incorrect old password');
                }
                // Update the user's password with the new password
                user.password = req.newPassword; // Password should be hashed before storing
                user.updated_by = req.email;
                user.updated_ts = new Date();
                // Save the updated user
                yield user.save();
                return "Password updated successfully";
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Verifies the user based on the provided verification token and parameters.
     * @param req - The request object.
     * @param params - The parameters object containing verification details.
     * @returns The user details upon successful verification.
     * @throws Error if the token is invalid or the verification fails.
     */
    newUserVerification(req, params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify the token in the request parameters
            const verificationToken = crypto
                .createHash('sha256')
                .update(params.token)
                .digest('hex');
            try {
                // Find the user based on the verification token
                const user = yield model_1.TempUser.findOne({ verificationToken });
                if (!user) {
                    throw new Error('Invalid token');
                }
                // Check if the token matches the provided email in params
                if (params.email === user.email) {
                    return user;
                }
                else {
                    throw new Error("Incorrect Token");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Handles the reset password functionality for a user.
     * @param req - The request object containing the user's email.
     * @returns A success message if the email with reset password instructions is sent.
     * @throws Error if there's no user with the provided email or if the email could not be sent.
     */
    forgetPassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the user based on the email in the request
            const user = yield model_1.User.findOne({ email: req.email.toLowerCase() });
            try {
                if (!user) {
                    throw new Error('There is no user with that email');
                }
                // Generate a reset password token for the user
                const token = yield user.getResetPasswordToken();
                // Prepare the email body with reset password URL
                const emailBody = {
                    reply_to: req.email.toLowerCase(),
                    url: `http://localhost:3001/resetpassword/${token}`
                };
                // Send the email with the reset password link
                return emailBody;
            }
            catch (error) {
                console.error(error);
                // Reset token and expiry if email couldn't be sent (as per your implementation)
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;
                yield user.save({ validateBeforeSave: false });
                throw new Error('Email could not be sent');
            }
        });
    }
    /**
     * Finds a user by email.
     * @param req - Request object containing email to find the user.
     * @returns Object indicating whether user is found and the result.
     */
    findUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.email || req.email.length === 0) {
                throw new Error("Incorrect Input");
            }
            const result = yield model_1.User.findOne({ email: req.email }, "first_name last_name email role_type_id").select('-password');
            return result;
        });
    }
    /**
     * Deletes a user by email.
     * @param req - Request object containing email to delete the user.
     * @returns Object indicating whether user is deleted.
     */
    deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.email || req.email.length === 0) {
                throw new Error("Incorrect Input");
            }
            const deletionResult = yield model_1.User.deleteOne({ email: req.email });
            const deleted = deletionResult && deletionResult.deletedCount === 1;
            return { deleted };
        });
    }
    /**
     * Updates user role based on email and role.
     * @param req - Request object containing email and new role.
     * @returns Object indicating whether user's role is updated.
     */
    updateUserRole(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.email || !req.role || req.role.length === 0 || req.email.length === 0) {
                throw new Error("Incorrect Input");
            }
            const role = yield model_1.Role.findOne({ role: req.role });
            if (!role) {
                throw new Error("Invalid Role");
            }
            const updatedUser = yield model_1.User.findOneAndUpdate({ email: req.email }, {
                role_type_id: role._id,
                updated_by: req.updated_by,
                updated_ts: new Date(),
            });
            const updated = !!updatedUser;
            return { updated };
        });
    }
    /**
     * Retrieves all users with their details except passwords.
     * @returns List of users.
     */
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield model_1.User.find().select('-password');
            return users;
        });
    }
    /**
     * Retrieves all roles.
     * @returns List of roles.
     */
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield model_1.Role.find();
            return roles;
        });
    }
    /**
     * Finds a role by its name.
     * @param req - Request object containing the role name to find.
     * @returns Object indicating whether role is found and the result.
     */
    findRole(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.role || req.role.length === 0) {
                throw new Error("Invalid Input");
            }
            const result = yield model_1.Role.find({ role: req.role });
            const found = result && result.length !== 0;
            return { found, result };
        });
    }
}
exports.UserService = UserService;
