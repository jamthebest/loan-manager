import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersService: UsersService;
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: 5555555555,
        username: 'johndoe',
        password: '@sD123'
      };

      jest.spyOn(usersService, 'create').mockImplementation(async () => userData);
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

      const result = await usersController.findOne(userId);

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
        phone: 5555555555
      };

      jest.spyOn(usersService, 'update').mockImplementation(async () => userData);
      const result = await usersController.update(userId, userData);

      expect(result).toEqual(expect.objectContaining({
        id: userId,
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      }));
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: 5555555555, username: 'johndoe' }
      ];

      jest.spyOn(usersService, 'findAll').mockImplementation(async () => users);
      const result = await usersController.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('remove', () => {
    it('should remove an existing user', async () => {
      const userId = 1;

      const result = await usersService.remove(userId);

      expect(result).toEqual({ success: true });
    });
  });
});
