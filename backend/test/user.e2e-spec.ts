import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersService', () => {
    let usersService: UsersService;
    let usersController: UsersController;

    beforeEach(() => {
        usersService = new UsersService();
        usersController = new UsersController(usersService);
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const userData = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                phone: '555-555-5555',
                username: 'johndoe',
                password: '@sD123'
            };

            jest.spyOn(usersService, 'create').mockImplementation(() => userData);
            const result = await usersController.create(userData);

            expect(result).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                username: userData.username
            }));
        });
    });

    describe('findOne', () => {
        it('should return a user by ID', async () => {
            const userId = 1;

            const result = await usersService.findOne(userId);

            expect(result).toEqual(expect.objectContaining({
                id: userId,
                name: expect.any(String),
                email: expect.any(String),
                phone: expect.any(String),
                username: expect.any(String)
            }));
        });
    });

    describe('update', () => {
        it('should update an existing user', async () => {
            const userId = 1;
            const userData = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                phone: '555-555-5555',
                username: 'johndoe'
            };

            jest.spyOn(usersService, 'create').mockImplementation(() => userData);
            const result = await usersController.update(userId, userData);

            expect(result).toEqual(expect.objectContaining({
                id: userId,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                username: userData.username
            }));
        });
    });
    
    describe('findAll', () => {
        it('should return an array of users', async () => {
            const users = [
                { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '555-555-5555', username: 'johndoe' }
            ];

            jest.spyOn(usersService, 'create').mockImplementation(() => users);
            const result = await usersController.findAll();

            expect(result).toEqual(users);
        });
    });

    describe('delete', () => {
        it('should delete an existing user', async () => {
            const userId = 1;

            const result = await usersService.delete(userId);

            expect(result).toEqual({ success: true });
        });
    });

});
