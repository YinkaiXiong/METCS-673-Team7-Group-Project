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
exports.payload = void 0;
// import { ServerController } from '../controllers/serverController'; // Import your ServerController class
// import { Request, Response } from 'express';
const userController_1 = require("../controllers/userController"); // Import your UserController class
const userService_1 = require("../services/userService");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const userController = new userController_1.UserController();
exports.payload = {
    first_name: "Shivani",
    last_name: "Roy",
    email: "shivani.roy1@gmail.com",
    password: "shivani_roy1",
    role: "USER"
};
describe('user', function () {
    let userService;
    let userController;
    let mockRequest;
    let mockResponse;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        userController = new userController_1.UserController();
        userService = new userService_1.UserService();
        const mongoserver = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoserver.getUri());
        const mockRequest = {
            body: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
                password: 'password123',
            }
        };
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn(),
        };
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
        jest.clearAllMocks();
    }));
    describe('get user controller', () => {
        describe('login', () => {
            // it("should return true on successful login", async () => {
            //     const role = new Role({
            //         role: 'USER'
            //     })
            //     await role.save();
            //     const token = base64.encode("shivani.roy1@gmail.com:shivani_roy1")
            //     const user = await userService.createUser(payload);
            //     const loginData = {
            //         email: "shivani.roy1@gmail.com",
            //         password: "shivani_roy1"
            //     };
            //     // await userController.createUser()
            // })
            // it("should return 503 when no password provided, ", async () => {
            //     const token = base64.encode("shivani.roy1@gmail.com")
            //     await supertest(app).get('/user/login').set("Authorization","Basic "+token).expect(503);
            // })
            // it("should return user not found when user not present, ", async () => {
            //     const token = base64.encode("shivani.roy3417@gmail.com:shivani_roy1")
            //     await supertest(app).get('/user/login').set("Authorization","Basic "+token).expect({ 'message': 'User not found' });
            // })
            // it("should return false on incorrect password", async () => {
            //     const token = base64.encode("shivani.roy1@gmail.com:shivani_roy2");
            //     await supertest(app).get('/user/login').set("Authorization","Basic "+token).expect('false');
            // })
            // it("should return Invalid input on empty data", async () => {
            //     const token = base64.encode("shivani.roy1@gmail.com:");
            //     await supertest(app).get('/user/login').set("Authorization","Basic "+token).expect({ 'message': 'Invalid Input' });
            // })
        });
        // describe('create user', () => {
        //     it('should handle incorrect input', async () => {
        //         const userData = {
        //             // Incomplete or incorrect user data
        //             first_name: '',
        //             last_name: 'User',
        //             email: 'testuser@example.com',
        //             password: '',
        //             role: 'USER'
        //         };
        //         const { body, statusCode } = await supertest(app).post('/user/createUser').send(userData);
        //         expect(statusCode).toBe(503);
        //         expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
        //     });
        //     it('should create new user', async () => {
        //         const userData = {
        //             // Incomplete or incorrect user data
        //             first_name: 'User',
        //             last_name: 'User',
        //             email: 'testuser@example.com',
        //             password: 'User',
        //             role: 'USER'
        //         };
        //         const { statusCode } = await supertest(app).post('/user/createUser').send(userData);
        //         expect(statusCode).toBe(200);
        //     });
        //     it('should not create new user', async () => {
        //         const userData = {
        //             // Incomplete or incorrect user data
        //             first_name: 'User',
        //             last_name: 'User',
        //             email: 'testuser@example.com',
        //             password: 'User',
        //             role: 'USER'
        //         };
        //         const { body, statusCode } = await supertest(app).post('/user/createUser').send(userData);
        //         expect(statusCode).toBe(503);
        //         expect(body).toStrictEqual({ 'message': 'Duplicate' });
        //     });
        //     it('should return 503 when incorrect role provided', async () => {
        //         const userData = {
        //             // Incomplete or incorrect user data
        //             first_name: 'User1',
        //             last_name: 'User1',
        //             email: 'testuser1@example.com',
        //             password: 'User1',
        //             role: 'ROLE'
        //         };
        //         const { body, statusCode } = await supertest(app).post('/user/createUser').send(userData);
        //         expect(statusCode).toBe(503);
        //         expect(body).toStrictEqual({ 'message': 'Invalid Role' });
        //     });
        // });
        // describe('delete user', () => {
        //     it('should handle empty input', async () => {
        //         const userData = {
        //             email: '',
        //         };
        //         const { body, statusCode } = await supertest(app).delete('/user/deleteUser').send(userData);
        //         expect(statusCode).toBe(503);
        //         expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
        //     });
        //     it('should handle missing input', async () => {
        //         const userData = {
        //         };
        //         const { body, statusCode } = await supertest(app).delete('/user/deleteUser').send(userData);
        //         expect(statusCode).toBe(503);
        //         expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
        //     });
        //     it('should delete user', async () => {
        //         const userData = {
        //             email: 'testuser@example.com',
        //         };
        //         const { body, statusCode } = await supertest(app).delete('/user/deleteUser').send(userData);
        //         // expect(statusCode).toBe(200);
        //         expect(body).toStrictEqual({ 'deleted': true });
        //     });
        // });
        // describe('get all users', () => {
        //     it('should return 200 and get all user', async () => {
        //         const { body, statusCode } = await supertest(app).get('/user/getAllUsers');
        //         expect(statusCode).toBe(200);
        //     });
        // });
        // describe('get all roles', () => {
        //     it('should return 200 and get all roles', async () => {
        //         const { body, statusCode } = await supertest(app).get('/user/getAllRoles');
        //         expect(statusCode).toBe(200);
        //     });
        // });
        // describe('find user', () => {
        //     it('should handle empty input', async () => {
        //         const userData = {
        //             email: '',
        //         };
        //         const { body, statusCode } = await supertest(app).post('/user/getUser').send(userData);
        //         expect(statusCode).toBe(503);
        //         expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
        //     });
        //     it('should handle missing input', async () => {
        //         const userData = {
        //         };
        //         const { body, statusCode } = await supertest(app).post('/user/getUser').send(userData);
        //         expect(statusCode).toBe(503);
        //         expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
        //     });
        //     it('should find user', async () => {
        //         const userData = {
        //             email: 'shivani.roy1@gmail.com',
        //         };
        //         const { body, statusCode } = await supertest(app).post('/user/getUser').send(userData);
        //         expect(statusCode).toBe(200);
        //         expect(body.length).toEqual(1);
        //     });
        // });
        // describe('update user', () => {
        //     it('should handle incorrect input', async () => {
        //         const userData = {
        //             email: 'testuser@example.com',
        //             role: ''
        //         };
        //         const { body, statusCode } = await supertest(app).patch('/user/updateUserRole').send(userData);
        //         expect(statusCode).toBe(503);
        //         expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
        //     });
        //     it('should return 503 when user not found', async () => {
        //         const userData = {
        //             // Incomplete or incorrect user data
        //             email: 'shiavn@example.com',
        //             role: 'USER'
        //         };
        //         const { statusCode } = await supertest(app).patch('/user/updateUserRole').send(userData);
        //         expect(statusCode).toBe(503);
        //     });
        //     it('should update and return 200 when user found', async () => {
        //         const userData = {
        //             // Incomplete or incorrect user data
        //             email: 'shivani.roy1@gmail.com',
        //             role: 'USER'
        //         };
        //         const { statusCode } = await supertest(app).patch('/user/updateUserRole').send(userData);
        //         expect(statusCode).toBe(200);
        //     });
        //     it('should return 503 when incorrect role provided', async () => {
        //         const userData = {
        //             // Incomplete or incorrect user data
        //             email: 'shivani.roy1@gmail.com',
        //             role: 'ROLE'
        //         };
        //         const { body, statusCode } = await supertest(app).patch('/user/updateUserRole').send(userData);
        //         expect(statusCode).toBe(503);
        //         expect(body).toStrictEqual({ 'message': 'Invalid Role' });
        //     });
        // });
    });
});
