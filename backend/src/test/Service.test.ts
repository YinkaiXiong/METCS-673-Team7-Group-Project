import { UserService } from '../services/userService'; // Import your UserService class
import { ServerService } from '../services/serverService'; // Import your serverService class
import { Server, ServerData, OperatingSystem } from '../models/model';

// Mocking the required modules
const mockUserModel: jest.Mocked<any> = {
    find: jest.fn(),
    deleteOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    save: jest.fn(),
};

jest.mock('../models/model.ts', () => ({
    Server: {
        find: jest.fn(),
        deleteOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    },
    ServerData: {
        find: jest.fn(),
    },
    OperationSystem: {
        find: jest.fn(),
    },
}));


const mockRoleModel = {
    find: jest.fn(),
};

jest.mock('../models/model.ts', () => ({
    User: mockUserModel,
    Role: mockRoleModel,
}));

const userService = new UserService();

describe('UserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should login successfully', async () => {
        const mockUser = { password: 'password' };
        const req = { email: 'test@example.com', password: 'password' };
        mockUserModel.find.mockResolvedValue([mockUser]);

        const result = await userService.login(req);

        expect(mockUserModel.find).toHaveBeenCalledWith({ email: req.email });
        expect(result).toBe(true);
    });

    // it('should create a user successfully', async () => {
    //     const req = {
    //         first_name: 'John',
    //         last_name: 'Doe',
    //         email: 'john@example.com',
    //         password: 'password',
    //     };
    //     mockUserModel.find.mockResolvedValue({ found: false });
    //     mockRoleModel.find.mockResolvedValue([{ _id: 'role_id' }]);
    //     mockUserModel.save.mockImplementation();

    //     const result = await userService.createUser(req);

    //     expect(mockUserModel.find).toHaveBeenCalledWith({ email: req.email });
    //     expect(mockRoleModel.find).toHaveBeenCalledWith({ role: 'USER' });
    //     expect(mockUserModel.save).toHaveBeenCalled();
    //     expect(result).toBe('User Created Successfully');
    // });

    it('should handle an error when finding a role fails', async () => {
        const req = { role: 'ADMIN' };
        const errorMessage = 'Error occurred while finding role';
        mockRoleModel.find.mockRejectedValue(new Error(errorMessage));

        const result = await userService.findRole(req);

        expect(mockRoleModel.find).toHaveBeenCalledWith({ role: req.role });
        expect(result).toEqual({ message: errorMessage });
    });

    // it('should handle an error when creating a user fails', async () => {
    //     const req = {
    //         first_name: 'Jane',
    //         last_name: 'Doe',
    //         email: 'jane@example.com',
    //         password: 'password',
    //     };
    //     const errorMessage = 'Error occurred while creating a user';
    //     mockUserModel.find.mockResolvedValue({ found: false });
    //     mockRoleModel.find.mockResolvedValue([{ _id: 'role_id' }]);
    //     mockUserModel.save.mockRejectedValue(new Error(errorMessage));

    //     const result = await userService.createUser(req);

    //     expect(mockUserModel.find).toHaveBeenCalledWith({ email: req.email });
    //     expect(mockRoleModel.find).toHaveBeenCalledWith({ role: 'USER' });
    //     expect(mockUserModel.save).toHaveBeenCalled();
    //     expect(result).toEqual({ message: errorMessage });
    // });

    it('should delete a user successfully', async () => {
        const req = { email: 'john@example.com' };
        mockUserModel.deleteOne.mockResolvedValue({ deleted: true });

        const result = await userService.deleteUser(req);

        expect(mockUserModel.deleteOne).toHaveBeenCalledWith({ email: req.email });
        expect(result).toEqual({ deleted: true });
    });

    it('should update user role successfully', async () => {
        const req = { email: 'john@example.com' };
        mockUserModel.findOneAndUpdate.mockResolvedValue({ updated: true });

        const result = await userService.updateUserRole(req);

        expect(mockUserModel.findOneAndUpdate).toHaveBeenCalledWith(
            { email: req.email },
            { role_id: 'abc' },
            null,
            expect.any(Function)
        );
        expect(result).toEqual({ updated: true });
    });

    it('should get all users', async () => {
        const mockUsers = [{}, {}];
        mockUserModel.find.mockResolvedValue(mockUsers);

        const result = await userService.getAllUsers();

        expect(mockUserModel.find).toHaveBeenCalled();
        expect(result).toEqual(mockUsers);
    });

    it('should get all roles', async () => {
        const mockRoles = [{}, {}];
        mockRoleModel.find.mockResolvedValue(mockRoles);

        const result = await userService.getAllRoles();

        expect(mockRoleModel.find).toHaveBeenCalled();
        expect(result).toEqual(mockRoles);
    });

    it('should find a role successfully', async () => {
        const req = { role: 'ADMIN' };
        mockRoleModel.find.mockResolvedValue([{ role: 'ADMIN' }]);

        const result = await userService.findRole(req);

        expect(mockRoleModel.find).toHaveBeenCalledWith({ role: req.role });
        expect(result).toEqual({ found: true, result: [{ role: 'ADMIN' }] });
    });
});


jest.mock('../models/model', () => ({
    Server: {
        find: jest.fn(),
        deleteOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    },
    ServerData: {
        find: jest.fn(),
    },
    OperationSystem: {
        find: jest.fn(),
    },
}));

const mockedServer = Server as jest.Mocked<typeof Server>;
const mockedServerData = ServerData as jest.Mocked<typeof ServerData>;
const mockedOperationSystem = OperatingSystem as jest.Mocked<typeof OperatingSystem>;


const mockReq = {
    server_name: 'TestServer',
    server_ip: '192.168.1.100',
    username: 'testuser',
    password: 'testpassword',
    os_type: 'Linux',
    // Add other necessary properties for your request object
};
const serverService = new ServerService()
describe('serverService', () => {

    it('should add a server', async () => {
        mockedServer.find.mockResolvedValue([]);
        (mockedOperationSystem.find as jest.MockedFunction<typeof mockedOperationSystem.find>).mockResolvedValue([
            { _id: '123', os_type: 'Linux' },
        ]);

        const result = await serverService.addServer(mockReq);

        expect(mockedOperationSystem.find).toHaveBeenCalledWith({ os_type: mockReq.os_type });
        expect(result).toBe('User Created Successfully');
    });

    it('should handle an error when adding a server fails', async () => {
        const errorMessage = 'Error occurred while adding a server';
        mockedServer.find.mockRejectedValue(new Error(errorMessage));

        const result = await serverService.addServer(mockReq);

        expect(mockedServer.find).toHaveBeenCalledWith();
        expect(mockedOperationSystem.find).not.toHaveBeenCalled();
        expect(result).toEqual({ message: errorMessage });
    });

    it('should handle an error when deleting a server fails', async () => {
        const errorMessage = 'Error occurred while deleting a server';
        mockedServer.deleteOne.mockRejectedValue(new Error(errorMessage));

        const result = await serverService.deleteServer({ hostname: 'TestServer' });

        expect(mockedServer.deleteOne).toHaveBeenCalledWith({ hostname: 'TestServer' });
        expect(result).toEqual({ message: errorMessage });
    });

    it('should find a server', async () => {
        const mockServer = { hostname: 'TestServer', /* Add other properties */ };
        mockedServer.find.mockResolvedValue([mockServer]);

        const result = await serverService.findServer({ hostname: 'TestServer' });

        expect(mockedServer.find).toHaveBeenCalledWith({ hostname: 'TestServer' });
        expect(result).toEqual({ found: true, result: [mockServer] });
    });

    it('should get all servers', async () => {
        const mockServers = [{ hostname: 'Server1' }, { hostname: 'Server2' }]; // Mock server data
        mockedServer.find.mockResolvedValue(mockServers);

        const result = await serverService.getAllServer();

        expect(mockedServer.find).toHaveBeenCalledWith();
        expect(result).toEqual(mockServers);
    });

    it('should get server data', async () => {
        const mockServerData = [{ /* Mock server data */ }];
        mockedServerData.find.mockResolvedValue(mockServerData);

        const result = await serverService.getServerData({ hostname: 'TestServer' });

        expect(mockedServerData.find).toHaveBeenCalledWith({ hostname: 'TestServer' });
        expect(result).toEqual({ found: true, result: mockServerData });
    });


    it('should delete a server', async () => {
        const deleteResult = { acknowledged: true, deletedCount: 1 }; // Match the DeleteResult structure
        mockedServer.deleteOne.mockResolvedValue(deleteResult);

        const result = await serverService.deleteServer({ hostname: 'TestServer' });

        expect(mockedServer.deleteOne).toHaveBeenCalledWith({ hostname: 'TestServer' });
        expect(result).toEqual({ deleted: true });
    });

});



