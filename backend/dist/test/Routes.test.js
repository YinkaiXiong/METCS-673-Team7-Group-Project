"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
// const serverController = require('../controllers/serverController');
// const serverRouter = require('../routes/serverRouter');
const userRoutes = require('../routes/userRoutes');
const userController_1 = require("../controllers/userController");
// import {userRouter} from '../routes/userRoutes';
const app = (0, express_1.default)();
const index = require("../index");
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/", index);
const loginData = { email: "shivani.roy1@gmail.com",
    password: "shivani_roy1" };
test("index route works", done => {
    (0, supertest_1.default)(app)
        .post("/user/login")
        .send(loginData)
        .expect(true);
});
// app.use('/servers', serverRouter);
// Mocking controller methods (ensure these methods return proper values or use jest.fn() for mocking)
// serverController.addServer = jest.fn();
// serverController.getAllServers = jest.fn();
// serverController.updateServer = jest.fn();
// serverController.deleteServer = jest.fn();
// serverController.getServerData = jest.fn();
// describe('Server Routes', () => {
//     it('should add a server', async () => {
//         it('should fail to add a server if server already exists', async () => {
//             const serverData = { /* Mocked server data */ };
//             serverController.addServer.mockRejectedValue(new Error('Duplicate'));
//             const response = await request(app)
//                 .post('/servers/addServer')
//                 .send(serverData);
//             expect(response.status).toBe(503);
//             expect(response.body).toEqual({ message: 'Duplicate' });
//         });
//         it('should fail to add a server with invalid data', async () => {
//             // Mocked invalid server data
//             const invalidServerData = { /* Invalid server data */ };
//             serverController.addServer.mockResolvedValue('Server added successfully');
//             const response = await request(app)
//                 .post('/servers/addServer')
//                 .send(invalidServerData);
//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ message: 'Invalid server data' }); // Assuming validation error message
//         });
//         it('should fail to update a non-existing server', async () => {
//             const updatedServerData = { /* Updated server data */ };
//             serverController.updateServer.mockResolvedValue(null); // Simulate non-existing server
//             const response = await request(app)
//                 .patch('/servers/updateServer')
//                 .send(updatedServerData);
//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ message: 'Server not found' }); // Assuming error message for non-existent server
//         });
//         // Mocked request body
//         const serverData = { /* Mocked server data */ };
//         serverController.addServer.mockResolvedValue('Server added successfully');
//         const response = await request(app)
//             .post('/servers/addServer')
//             .send(serverData);
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({ message: 'Server added successfully' });
//     });
//     it('should get all servers', async () => {
//         // Mocked servers data
//         const servers = [{}, {}];
//         serverController.getAllServers.mockResolvedValue(servers);
//         const response = await request(app)
//             .get('/servers/getAllServers');
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual(servers);
//     });
//     it('should update a server', async () => {
//         // Mocked updated server data
//         const updatedServer = { /* Updated server data */ };
//         serverController.updateServer.mockResolvedValue(updatedServer);
//         const response = await request(app)
//             .patch('/servers/updateServer')
//             .send(updatedServer);
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual(updatedServer);
//     });
//     it('should delete a server', async () => {
//         // Mocked request body for server deletion
//         const serverToDelete = { /* Server data to delete */ };
//         serverController.deleteServer.mockResolvedValue({ deleted: true });
//         const response = await request(app)
//             .delete('/servers/deleteServer')
//             .send(serverToDelete);
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({ deleted: true });
//     });
//     it('should get server data', async () => {
//         // Mocked server data
//         const serverData = { /* Server data to retrieve */ };
//         serverController.getServerData.mockResolvedValue(serverData);
//         const response = await request(app)
//             .get('/servers/getServerData');
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual(serverData);
//     });
//     it('should handle an empty response when getting all servers', async () => {
//         serverController.getAllServers.mockResolvedValue([]);
//         const response = await request(app)
//             .get('/servers/getAllServers');
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual([]); // No servers available, expecting an empty array
//     });
//     it('should handle a server deletion failure', async () => {
//         const serverToDelete = { /* Mocked server data to delete */ };
//         serverController.deleteServer.mockResolvedValue({ deleted: false }); // Simulating failure to delete server
//         const response = await request(app)
//             .delete('/servers/deleteServer')
//             .send(serverToDelete);
//         expect(response.status).toBe(400);
//         expect(response.body).toEqual({ message: 'Failed to delete server' }); // Assuming error message for failed deletion
//     });
//     it('should handle a failure to get server data', async () => {
//         const serverData = { /* Server data to retrieve */ };
//         serverController.getServerData.mockResolvedValue(null); // Simulate failure to fetch server data
//         const response = await request(app)
//             .get('/servers/getServerData');
//         expect(response.status).toBe(404);
//         expect(response.body).toEqual({ message: 'Server data not found' }); // Assuming error message for failed server data retrieval
//     });
// });
app.use('/user', userRoutes);
const userController = new userController_1.UserController();
// Mocking controller methods (ensure these methods return proper values or use jest.fn() for mocking)
userController.login = jest.fn();
userController.createUser = jest.fn();
userController.getAllUsers = jest.fn();
userController.updateUserRole = jest.fn();
userController.deleteUser = jest.fn();
userController.getAllRoles = jest.fn();
userController.findUser = jest.fn();
// describe('User Routes', () => {
//     it('should login', async () => {
//         // Mocked login data
//         const loginData = {email:"shivani.roy1@gmail.com",
//         password: "shivani_roy1"};
//         // userController.login.mockResolvedValue(loginData);
//         const response = await request(app)
//             .post('/user/login')
//             .send(loginData);
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual(true);
//     });
//     // it('should create a user', async () => {
//     //     const userData = { /* Mocked user data */ };
//     //     userController.createUser.mockResolvedValue('User created successfully');
//     //     const response = await request(app)
//     //         .post('/users/createUser')
//     //         .send(userData);
//     //     expect(response.status).toBe(200);
//     //     expect(response.body).toEqual({ message: 'User created successfully' });
//     // });
//     // it('should get all users', async () => {
//     //     const users = [{}, {}]; // Mocked user data
//     //     userController.getAllUsers.mockReturnValue(users);
//     //     const response = await request(app)
//     //         .get('/users/getAllUsers');
//     //     expect(response.status).toBe(200);
//     //     expect(response.body).toEqual(users);
//     // });
//     // it('should update user role', async () => {
//     //     const updatedUserRole = { /* Mocked updated user role data */ };
//     //     userController.updateUserRole.mockResolvedValue(updatedUserRole);
//     //     const response = await request(app)
//     //         .patch('/users/updateUserRole')
//     //         .send(updatedUserRole);
//     //     expect(response.status).toBe(200);
//     //     expect(response.body).toEqual(updatedUserRole);
//     // });
//     // it('should delete a user', async () => {
//     //     const userToDelete = { /* Mocked user data to delete */ };
//     //     userController.deleteUser.mockResolvedValue({ deleted: true });
//     //     const response = await request(app)
//     //         .delete('/users/deleteUser')
//     //         .send(userToDelete);
//     //     expect(response.status).toBe(200);
//     //     expect(response.body).toEqual({ deleted: true });
//     // });
//     // it('should fail to login with incorrect credentials', async () => {
//     //     const invalidLoginData = { /* Incorrect login data */ };
//     //     userController.login.mockResolvedValue(false); // Simulate login failure
//     //     const response = await request(app)
//     //         .post('/users/login')
//     //         .send(invalidLoginData);
//     //     expect(response.status).toBe(401);
//     //     expect(response.body).toEqual({ message: 'Invalid credentials' }); // Assuming error message for failed login
//     // });
//     // it('should fail to create a user with invalid data', async () => {
//     //     const invalidUserData = { /* Invalid user data */ };
//     //     userController.createUser.mockRejectedValue(new Error('Invalid user data'));
//     //     const response = await request(app)
//     //         .post('/users/createUser')
//     //         .send(invalidUserData);
//     //     expect(response.status).toBe(400);
//     //     expect(response.body).toEqual({ message: 'Invalid user data' });
//     // });
//     // it('should update user role', async () => {
//     //     const updatedRole = { /* Mocked updated role data */ };
//     //     userController.updateRole.mockResolvedValue(updatedRole);
//     //     const response = await request(app)
//     //         .patch('/users/updateRole')
//     //         .send(updatedRole);
//     //     expect(response.status).toBe(200);
//     //     expect(response.body).toEqual(updatedRole);
//     // });
//     // it('should get a user', async () => {
//     //     const user = { /* Mocked user data */ };
//     //     userController.getUser.mockResolvedValue(user);
//     //     const response = await request(app)
//     //         .get('/users/getUser');
//     //     expect(response.status).toBe(200);
//     //     expect(response.body).toEqual(user);
//     // });
//     // it('should create a role', async () => {
//     //     const newRole = { /* Mocked new role data */ };
//     //     userController.createRole.mockResolvedValue(newRole);
//     //     const response = await request(app)
//     //         .post('/users/createRole')
//     //         .send(newRole);
//     //     expect(response.status).toBe(200);
//     //     expect(response.body).toEqual(newRole);
//     // });
//     // it('should handle an empty response when getting all users', async () => {
//     //     userController.getAllUsers.mockReturnValue([]); // No users available
//     //     const response = await request(app)
//     //         .get('/users/getAllUsers');
//     //     expect(response.status).toBe(200);
//     //     expect(response.body).toEqual([]); // Expecting an empty array for no users
//     // });
//     // it('should handle a failure to update user role', async () => {
//     //     const updatedUserRole = { /* Mocked updated user role data */ };
//     //     userController.updateUserRole.mockResolvedValue(null); // Simulate failure to update user role
//     //     const response = await request(app)
//     //         .patch('/users/updateUserRole')
//     //         .send(updatedUserRole);
//     //     expect(response.status).toBe(404);
//     //     expect(response.body).toEqual({ message: 'User role update failed' }); // Assuming error message for failed user role update
//     // });
//     // it('should handle a failure to create a role', async () => {
//     //     const newRole = { /* Mocked new role data */ };
//     //     userController.createRole.mockResolvedValue(null); // Simulate failure to create a new role
//     //     const response = await request(app)
//     //         .post('/users/createRole')
//     //         .send(newRole);
//     //     expect(response.status).toBe(500);
//     //     expect(response.body).toEqual({ message: 'Role creation failed' }); // Assuming error message for failed role creation
//     // });
// });
