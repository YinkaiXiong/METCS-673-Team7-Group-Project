"use strict";
// import { ServerController } from '../controllers/serverController'; // Import your ServerController class
// import { Request, Response } from 'express';
// import { UserController } from '../controllers/userController'; // Import your UserController class
// import { UserService } from '../services/userService';
// // Mocked dependencies or services
// const mockedRequest: Partial<Request> = {};
// const mockedResponse: Partial<Response> = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn(),
//     send: jest.fn(),
// };
// const mockServerService = {
//     addServer: jest.fn(),
//     findServer: jest.fn(),
//     getAllServer: jest.fn(),
//     deleteServer: jest.fn(),
//     updateServer: jest.fn(),
//     getServerData: jest.fn(),
//     saveServerData: jest.fn(),
// };
// const mockUserService = {
//     // Mocking all UserService methods used in the UserController
//     login: jest.fn(),
//     createUser: jest.fn(),
//     findUser: jest.fn(),
//     getAllUsers: jest.fn(),
//     getAllRoles: jest.fn(),
//     deleteUser: jest.fn(),
//     updateUserRole: jest.fn(),
// };
// const controllerServer = new ServerController();
// controllerServer.service = mockServerService as any; // Type casting to any for simplicity
// describe('ServerController', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });
//     it('should add a server', async () => {
//         mockServerService.addServer.mockResolvedValue('Server added successfully');
//         await controllerServer.addServer(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(200);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: 'Server added successfully' });
//     });
//     it('should handle error while adding a server', async () => {
//         const errorMessage = 'Error occurred while adding server';
//         mockServerService.addServer.mockRejectedValue(new Error(errorMessage));
//         await controllerServer.addServer(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(503);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: errorMessage });
//     });
//     it('should find a server', async () => {
//         const foundServer = { found: true, result: {} };
//         mockServerService.findServer.mockResolvedValue(foundServer);
//         await controllerServer.findServer(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(200);
//         expect(mockedResponse.json).toHaveBeenCalledWith(foundServer.result);
//     });
//     it('should handle an error while deleting a server', async () => {
//         const serverToDelete = { /* Mocked server data to delete */ };
//         const errorMessage = 'Error occurred while deleting server';
//         mockServerService.deleteServer.mockRejectedValue(new Error(errorMessage));
//         await controllerServer.deleteServer(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(500);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: errorMessage });
//     });
//     it('should handle error when server is not found', async () => {
//         const notFoundServer = { found: false };
//         mockServerService.findServer.mockResolvedValue(notFoundServer);
//         await controllerServer.findServer(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(400);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: 'user not found' });
//     });
//     // Test cases for other methods: getAllServers, deleteServer, updateServer, getServerData, saveServerData
//     it('should get all servers', async () => {
//         const servers = [{}, {}]; // Mocked server data
//         mockServerService.getAllServer.mockResolvedValue(servers);
//         await controllerServer.getAllServers(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.send).toHaveBeenCalledWith(servers);
//     });
//     it('should delete a server', async () => {
//         const deletedServer = { deleted: true };
//         mockServerService.deleteServer.mockResolvedValue(deletedServer);
//         await controllerServer.deleteServer(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(200);
//         expect(mockedResponse.json).toHaveBeenCalledWith(deletedServer);
//     });
//     it('should update a server', async () => {
//         const updatedServer = { updated: true };
//         mockServerService.updateServer.mockResolvedValue(updatedServer);
//         await controllerServer.updateServer(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(200);
//         expect(mockedResponse.json).toHaveBeenCalledWith(updatedServer);
//     });
//     it('should handle an error while finding a user', async () => {
//         const errorMessage = 'Error occurred while finding user';
//         mockUserService.findUser.mockRejectedValue(new Error(errorMessage));
//         await controllerUser.findUser(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(500);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: errorMessage });
//     });
//     it('should handle error when updateServer fails', async () => {
//         const errorMessage = 'Error occurred while updating server';
//         mockServerService.updateServer.mockRejectedValue(new Error(errorMessage));
//         await controllerServer.updateServer(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(400);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: errorMessage });
//     });
//     it('should get server data', async () => {
//         const serverData = { found: true, result: {} };
//         mockServerService.getServerData.mockResolvedValue(serverData);
//         await controllerServer.getServerData(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(200);
//         expect(mockedResponse.json).toHaveBeenCalledWith(serverData);
//     });
//     it('should handle error when server data is not found', async () => {
//         const serverData = { found: false };
//         mockServerService.getServerData.mockResolvedValue(serverData);
//         await controllerServer.getServerData(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(400);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: 'error occurred' });
//     });
//     it('should save server data', async () => {
//         const savedServerData = { saved: true };
//         mockServerService.saveServerData.mockResolvedValue(savedServerData);
//         await controllerServer.saveServerData(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(200);
//         expect(mockedResponse.json).toHaveBeenCalledWith(savedServerData);
//     });
//     it('should handle error when saving server data fails', async () => {
//         const errorMessage = 'Error occurred while saving server data';
//         mockServerService.saveServerData.mockRejectedValue(new Error(errorMessage));
//         await controllerServer.saveServerData(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(400);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: errorMessage });
//     });
//     // Add similar test cases for other controller methods (findServer, getAllServers, deleteServer, etc.)
// });
// const controllerUser = new UserController();
// const userService = new UserService();
// // userService = mockUserService as any;
// describe('UserController', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });
//     it('should log in a user', async () => {
//         const loggedInUser = { /* Mocked logged-in user data */ };
//         mockUserService.login.mockResolvedValue(loggedInUser);
//         await controllerUser.login(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.send).toHaveBeenCalledWith(loggedInUser);
//     });
//     it('should create a user', async () => {
//         const createdUserMessage = 'User created successfully';
//         mockUserService.createUser.mockResolvedValue(createdUserMessage);
//         await controllerUser.createUser(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(200);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: createdUserMessage });
//     });
//     // Add more test cases for other methods: findUser, getAllUsers, getAllRoles, deleteUser, updateUserRole
//     it('should find a user', async () => {
//         const foundUser = { found: true, result: {} };
//         mockUserService.findUser.mockResolvedValue(foundUser);
//         await controllerUser.findUser(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(200);
//         expect(mockedResponse.json).toHaveBeenCalledWith(foundUser.result);
//     });
//     it('should get all users', async () => {
//         const users = [{}, {}]; // Mocked user data
//         mockUserService.getAllUsers.mockReturnValue(users);
//         await controllerUser.getAllUsers(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.send).toHaveBeenCalledWith(users);
//     });
//     it('should get all roles', async () => {
//         const roles = [{}, {}]; // Mocked role data
//         mockUserService.getAllRoles.mockReturnValue(roles);
//         await controllerUser.getAllRoles(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.send).toHaveBeenCalledWith(roles);
//     });
//     it('should delete a user', async () => {
//         const deletedUser = { deleted: true };
//         mockUserService.deleteUser.mockResolvedValue(deletedUser);
//         await controllerUser.deleteUser(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(200);
//         expect(mockedResponse.json).toHaveBeenCalledWith(deletedUser);
//     });
//     it('should handle error when deleting a user fails', async () => {
//         const errorMessage = 'Error occurred while deleting user';
//         mockUserService.deleteUser.mockRejectedValue(new Error(errorMessage));
//         await controllerUser.deleteUser(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(400);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: errorMessage });
//     });
//     it('should update user role', async () => {
//         const updatedUserRole = { updated: true };
//         mockUserService.updateUserRole.mockResolvedValue(updatedUserRole);
//         await controllerUser.updateUserRole(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(200);
//         expect(mockedResponse.json).toHaveBeenCalledWith(updatedUserRole);
//     });
//     it('should handle error when updating user role fails', async () => {
//         const errorMessage = 'Error occurred while updating user role';
//         mockUserService.updateUserRole.mockRejectedValue(new Error(errorMessage));
//         await controllerUser.updateUserRole(mockedRequest as Request, mockedResponse as Response);
//         expect(mockedResponse.status).toHaveBeenCalledWith(400);
//         expect(mockedResponse.json).toHaveBeenCalledWith({ message: errorMessage });
//     });
// });
