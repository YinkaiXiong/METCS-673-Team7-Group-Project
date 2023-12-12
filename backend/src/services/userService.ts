import { User, Role, TempUser } from '../models/model';
import base64 from 'base-64';
import { sendMail } from '../util/Email';
const crypto = require('crypto');


export class UserService {
    constructor() {

    }
    /**
     * Authenticates a user using email and password from request headers.
     * @param req - Request object containing authorization header with email and password.
     * @returns Authentication token if successful, otherwise throws an error.
     */
    async login(req: any) {
        if (!req.authorization || req.authorization.length === 0) {
            throw Error("Invalid Input");
        }

        const auth = base64.decode(req.authorization.split(" ")[1]).split(":");
        if (auth.length <= 1) {
            throw new Error("Invalid Credentials");
        }

        const email = auth[0];
        const password = auth[1];
        if (!email || email.length === 0 || !password || password.length === 0) {
            throw Error("Invalid Input");
        }

        const user = await User.findOne({ email: email }).select('+password');

        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordMatch = await user.matchPassword(password);

        if (isPasswordMatch) {
            return this.sendTokenResponse(email);
        }

        throw new Error("Incorrect password");
    }

    /**
     * Generates a token and options for authenticated user.
     * @param email - Email of the user for which token needs to be generated.
     * @returns Token and options object.
     */
    async sendTokenResponse(email: string) {
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error("User not found");
        }

        const token = user.getSignedJwtToken();
        const jwtExpire: any = process.env.JWT_EXPIRE;

        const options = {
            expires: new Date(Date.now() + jwtExpire * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true
        };

        return { token: token, options: options };
    }

    /**
     * Processes a new user registration request.
     * @param req - The request object containing user details.
     * @returns A success message if the user registration is completed successfully.
     * @throws Error if the input is incorrect or if a duplicate user is found.
     */
    async newUserRequest(req: any) {
        // Verify the required fields in the request
        if (!(req.last_name) || !req.first_name || !req.email || !req.password || req.email.length === 0 || req.password.length === 0 || req.first_name.length === 0 || req.last_name.length === 0) {
            throw new Error("Incorrect Input");
        }

        // Find if the user already exists
        var userFound = await this.findUser(req);

        try {
            if (!userFound) {
                // Check if there's a temporary user with the same email
                const tempUser = await TempUser.findOne({ email: req.email });
                if (tempUser != null) {
                    // If a temporary user exists, throw error
                    throw new Error("Duplicate");
                }

                // Create a new temporary user
                const newUser = new TempUser(req);
                await newUser.save();

                // Get the newly saved user details
                const response = await TempUser.findOne({ email: req.email });


                if (response) {
                    // Generate a verification token for email confirmation (assuming this method exists in your TempUser model)
                    const verificationToken = await response.generateVerificationToken();

                    // Prepare mail details
                    const mail = {
                        email: req.email,
                        subject: "Complete Account Creation",
                        url: `http://localhost:3001/verify/${verificationToken}/${req.email}`
                    };

                    // Send verification email (adjust based on your email sending mechanism)
                    return mail;
                } else {
                    throw new Error("Error generating verification token");
                }
            } else {
                throw new Error("Duplicate");
            }
        } catch (e) {
            throw e;
        }
    }


    /**
     * Creates a new user based on the provided request and parameters.
     * @param req - The request object.
     * @param params - The parameters object containing user details.
     * @returns A success message if the user is created successfully.
     * @throws Error if the input is incorrect, role is invalid, or if a duplicate user is found.
     */
    async createUser(req: any, params: any) {

        try {

            // Find if the user already exists
            const userFound = await this.findUser(params);

            if (!userFound) {
                // Verify the user based on the verification token
                const verificationResult = await this.newUserVerification(req, params);

                // If verification is successful, create a new user
                if (verificationResult) {
                    // Create a new user object
                    const newUser = new User({
                        first_name: verificationResult.first_name,
                        last_name: verificationResult.last_name,
                        email: verificationResult.email,
                        password: verificationResult.password, // Password should be hashed before storing
                        updated_by: verificationResult.email
                    });

                    // Find the role for the user
                    const role = await Role.findOne({ role: "USER" });

                    if (!role) {
                        throw new Error("Invalid Role");
                    }

                    // Assign the role ID to the user
                    newUser.role_type_id = role._id;

                    // Save the user
                    await newUser.save();

                    await TempUser.deleteOne({ email: verificationResult.email });

                    return "User Created Successfully";
                } else {
                    throw new Error("User verification failed");
                }
            } else {
                throw new Error("Duplicate");
            }
        } catch (e) {
            throw e;
        }

    }


    /**
     * Resets the password for a user based on the reset token and new password.
     * @param req - The request object.
     * @param params - The parameters object containing the reset token and new password.
     * @returns A success message if the password is reset successfully.
     * @throws Error if the token is invalid or the password reset fails.
     */
    async resetPassword(req: any, params: any) {
        // Generate the hash for the reset token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(params.resettoken)
            .digest('hex')

        // Find the user based on the reset token and expiry date
        const user: any = await User.findOne({
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
            await user.save();

            // Return token response (might need to handle this based on the implementation)
            return this.sendTokenResponse(user.email);
        } catch (error) {
            throw error;
        }
    }


    /**
     * Updates the user's password after verifying the old password.
     * @param req - The request object containing old and new passwords.
     * @returns A success message if the password is updated successfully.
     * @throws Error if the old password is incorrect or the update fails.
     */
    async updatePassword(req: any) {
        try {

            // Find the user based on the provided email
            const user = await User.findOne({ email: req.email }).select('+password');

            if (!user) {
                throw new Error('User not found');
            }

            // Match the provided old password with the stored password
            const isMatch = await user.matchPassword(req.oldPassword);

            if (!isMatch) {
                throw new Error('Incorrect old password');
            }

            // Update the user's password with the new password
            user.password = req.newPassword; // Password should be hashed before storing
            user.updated_by = req.email;
            user.updated_ts = new Date();

            // Save the updated user
            await user.save();

            return "Password updated successfully";
        } catch (error) {
            throw error;
        }
    }




    /**
     * Verifies the user based on the provided verification token and parameters.
     * @param req - The request object.
     * @param params - The parameters object containing verification details.
     * @returns The user details upon successful verification.
     * @throws Error if the token is invalid or the verification fails.
     */
    async newUserVerification(req: any, params: any) {
        // Verify the token in the request parameters
        const verificationToken = crypto
            .createHash('sha256')
            .update(params.token)
            .digest('hex');

        try {
            // Find the user based on the verification token
            const user = await TempUser.findOne({ verificationToken });

            if (!user) {
                throw new Error('Invalid token');
            }

            // Check if the token matches the provided email in params
            if (params.email === user.email) {
                return user;
            } else {
                throw new Error("Incorrect Token");
            }
        } catch (error) {
            throw error;
        }
    }


    /**
     * Handles the reset password functionality for a user.
     * @param req - The request object containing the user's email.
     * @returns A success message if the email with reset password instructions is sent.
     * @throws Error if there's no user with the provided email or if the email could not be sent.
     */
    async forgetPassword(req: any) {
        // Find the user based on the email in the request
        const user: any = await User.findOne({ email: req.email.toLowerCase() });
        try {

            if (!user) {
                throw new Error('There is no user with that email');
            }

            // Generate a reset password token for the user
            const token = await user.getResetPasswordToken();

            // Prepare the email body with reset password URL
            const emailBody = {
                reply_to: req.email.toLowerCase(),
                url: `http://localhost:3001/resetpassword/${token}`
            };

            // Send the email with the reset password link
            return emailBody;

        } catch (error) {
            console.error(error);
            // Reset token and expiry if email couldn't be sent (as per your implementation)
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            throw new Error('Email could not be sent');
        }
    }




    /**
     * Finds a user by email.
     * @param req - Request object containing email to find the user.
     * @returns Object indicating whether user is found and the result.
     */
    async findUser(req: any) {
        if (!req.email || req.email.length === 0) {
            throw new Error("Incorrect Input");
        }

        const result = await User.findOne({ email: req.email }, "first_name last_name email").select('-password');

        return result;
    }

    /**
     * Deletes a user by email.
     * @param req - Request object containing email to delete the user.
     * @returns Object indicating whether user is deleted.
     */
    async deleteUser(req: any) {
        if (!req.email || req.email.length === 0) {
            throw new Error("Incorrect Input");
        }

        const deletionResult = await User.deleteOne({ email: req.email });
        const deleted = deletionResult && deletionResult.deletedCount === 1;

        return { deleted };
    }

    /**
     * Updates user role based on email and role.
     * @param req - Request object containing email and new role.
     * @returns Object indicating whether user's role is updated.
     */
    async updateUserRole(req: any) {
        if (!req.email || !req.role || req.role.length === 0 || req.email.length === 0) {
            throw new Error("Incorrect Input");
        }

        const role = await Role.findOne({ role: req.role });

        if (!role) {
            throw new Error("Invalid Role");
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: req.email },
            {
                role_type_id: role._id,
                updated_by: req.updated_by,
                updated_ts: new Date(),
            }
        );

        const updated = !!updatedUser;

        return { updated };
    }

    /**
     * Retrieves all users with their details except passwords.
     * @returns List of users.
     */
    async getAllUsers() {
        const users = await User.find().select('-password');
        return users;
    }



    /**
     * Retrieves all roles.
     * @returns List of roles.
     */
    async getAllRoles() {
        const roles = await Role.find();
        return roles;
    }

    /**
     * Finds a role by its name.
     * @param req - Request object containing the role name to find.
     * @returns Object indicating whether role is found and the result.
     */
    async findRole(req: any) {
        if (!req.role || req.role.length === 0) {
            throw new Error("Invalid Input");
        }

        const result = await Role.find({ role: req.role });
        const found = result && result.length !== 0;

        return { found, result };
    }





}
