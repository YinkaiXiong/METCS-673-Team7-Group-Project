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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const userService_1 = require("../services/userService");
const base_64_1 = __importDefault(require("base-64"));
const userService = new userService_1.UserService();
const app = (0, server_1.default)();
exports.payload = {
    first_name: "Shivani",
    last_name: "Roy",
    email: "shivani.roy1@gmail.com",
    password: "shivani_roy1",
    role: "USER"
};
describe('user', function () {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const mongoserver = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoserver.getUri());
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe('get user route', () => {
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
            //     await supertest(app).get('/user/login').set("Authorization","Basic "+token).expect('true');
            // })
            it("should return 503 when no password provided, ", () => __awaiter(this, void 0, void 0, function* () {
                const token = base_64_1.default.encode("shivani.roy1@gmail.com");
                yield (0, supertest_1.default)(app).get('/user/login').set("Authorization", "Basic " + token).expect(503);
            }));
            it("should return user not found when user not present, ", () => __awaiter(this, void 0, void 0, function* () {
                const token = base_64_1.default.encode("shivani.roy3417@gmail.com:shivani_roy1");
                yield (0, supertest_1.default)(app).get('/user/login').set("Authorization", "Basic " + token).expect({ 'message': 'User not found' });
            }));
            it("should return false on incorrect password", () => __awaiter(this, void 0, void 0, function* () {
                const token = base_64_1.default.encode("shivani.roy1@gmail.com:shivani_roy2");
                yield (0, supertest_1.default)(app).get('/user/login').set("Authorization", "Basic " + token).expect('false');
            }));
            it("should return Invalid input on empty data", () => __awaiter(this, void 0, void 0, function* () {
                const token = base_64_1.default.encode("shivani.roy1@gmail.com:");
                yield (0, supertest_1.default)(app).get('/user/login').set("Authorization", "Basic " + token).expect({ 'message': 'Invalid Input' });
            }));
        });
        describe('create user', () => {
            it('should handle incorrect input', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    // Incomplete or incorrect user data
                    first_name: '',
                    last_name: 'User',
                    email: 'testuser@example.com',
                    password: '',
                    role: 'USER'
                };
                const { body, statusCode } = yield (0, supertest_1.default)(app).post('/user/createUser').send(userData);
                expect(statusCode).toBe(503);
                expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
            }));
            it('should create new user', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    // Incomplete or incorrect user data
                    first_name: 'User',
                    last_name: 'User',
                    email: 'testuser@example.com',
                    password: 'User',
                    role: 'USER'
                };
                const { statusCode } = yield (0, supertest_1.default)(app).post('/user/createUser').send(userData);
                expect(statusCode).toBe(200);
            }));
            it('should not create new user', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    // Incomplete or incorrect user data
                    first_name: 'User',
                    last_name: 'User',
                    email: 'testuser@example.com',
                    password: 'User',
                    role: 'USER'
                };
                const { body, statusCode } = yield (0, supertest_1.default)(app).post('/user/createUser').send(userData);
                expect(statusCode).toBe(503);
                expect(body).toStrictEqual({ 'message': 'Duplicate' });
            }));
            it('should return 503 when incorrect role provided', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    // Incomplete or incorrect user data
                    first_name: 'User1',
                    last_name: 'User1',
                    email: 'testuser1@example.com',
                    password: 'User1',
                    role: 'ROLE'
                };
                const { body, statusCode } = yield (0, supertest_1.default)(app).post('/user/createUser').send(userData);
                expect(statusCode).toBe(503);
                expect(body).toStrictEqual({ 'message': 'Invalid Role' });
            }));
        });
        describe('delete user', () => {
            it('should handle empty input', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    email: '',
                };
                const { body, statusCode } = yield (0, supertest_1.default)(app).delete('/user/deleteUser').send(userData);
                expect(statusCode).toBe(503);
                expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
            }));
            it('should handle missing input', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {};
                const { body, statusCode } = yield (0, supertest_1.default)(app).delete('/user/deleteUser').send(userData);
                expect(statusCode).toBe(503);
                expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
            }));
            it('should delete user', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    email: 'testuser@example.com',
                };
                const { body, statusCode } = yield (0, supertest_1.default)(app).delete('/user/deleteUser').send(userData);
                // expect(statusCode).toBe(200);
                expect(body).toStrictEqual({ 'deleted': true });
            }));
        });
        describe('get all users', () => {
            it('should return 200 and get all user', () => __awaiter(this, void 0, void 0, function* () {
                const { body, statusCode } = yield (0, supertest_1.default)(app).get('/user/getAllUsers');
                expect(statusCode).toBe(200);
            }));
        });
        describe('get all roles', () => {
            it('should return 200 and get all roles', () => __awaiter(this, void 0, void 0, function* () {
                const { body, statusCode } = yield (0, supertest_1.default)(app).get('/user/getAllRoles');
                expect(statusCode).toBe(200);
            }));
        });
        describe('find user', () => {
            it('should handle empty input', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    email: '',
                };
                const { body, statusCode } = yield (0, supertest_1.default)(app).post('/user/getUser').send(userData);
                expect(statusCode).toBe(503);
                expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
            }));
            it('should handle missing input', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {};
                const { body, statusCode } = yield (0, supertest_1.default)(app).post('/user/getUser').send(userData);
                expect(statusCode).toBe(503);
                expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
            }));
            it('should find user', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    email: 'shivani.roy1@gmail.com',
                };
                const { body, statusCode } = yield (0, supertest_1.default)(app).post('/user/getUser').send(userData);
                expect(statusCode).toBe(200);
                expect(body.length).toEqual(1);
            }));
        });
        describe('update user', () => {
            it('should handle incorrect input', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    email: 'testuser@example.com',
                    role: ''
                };
                const { body, statusCode } = yield (0, supertest_1.default)(app).patch('/user/updateUserRole').send(userData);
                expect(statusCode).toBe(503);
                expect(body).toStrictEqual({ 'message': 'Incorrect Input' });
            }));
            it('should return 503 when user not found', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    // Incomplete or incorrect user data
                    email: 'shiavn@example.com',
                    role: 'USER'
                };
                const { statusCode } = yield (0, supertest_1.default)(app).patch('/user/updateUserRole').send(userData);
                expect(statusCode).toBe(503);
            }));
            it('should update and return 200 when user found', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    // Incomplete or incorrect user data
                    email: 'shivani.roy1@gmail.com',
                    role: 'USER'
                };
                const { statusCode } = yield (0, supertest_1.default)(app).patch('/user/updateUserRole').send(userData);
                expect(statusCode).toBe(200);
            }));
            it('should return 503 when incorrect role provided', () => __awaiter(this, void 0, void 0, function* () {
                const userData = {
                    // Incomplete or incorrect user data
                    email: 'shivani.roy1@gmail.com',
                    role: 'ROLE'
                };
                const { body, statusCode } = yield (0, supertest_1.default)(app).patch('/user/updateUserRole').send(userData);
                expect(statusCode).toBe(503);
                expect(body).toStrictEqual({ 'message': 'Invalid Role' });
            }));
        });
    });
});
