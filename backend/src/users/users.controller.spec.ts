import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

let userData = {
  _id: '507f1f77bcf86cd799439011',
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: 5555555555,
  username: 'johndoe',
  password: '@sD123'
};

describe('UsersController', () => {
  let usersService: UsersService;
  let usersController: UsersController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel
        }
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      jest.spyOn(usersService, 'create').mockImplementation(async () => userData);
      const result = await usersController.create(userData);

      expect(result).toMatchObject(expect.objectContaining({
        _id: expect.any(String),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        username: userData.username,
        password: expect.any(String)
      }));
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(async () => userData);
      const result = await usersController.findOne(userData._id);

      expect(result).toMatchObject(expect.objectContaining({
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        username: userData.username
      }));
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      jest.spyOn(usersService, 'update').mockImplementation(async () => userData);
      const result = await usersController.update(userData._id, userData);

      expect(result).toMatchObject(expect.objectContaining({
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      }));
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(usersService, 'findAll').mockImplementation(async () => [userData]);
      const result = await usersController.findAll();

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(expect.objectContaining({
        _id: expect.any(String),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        username: userData.username,
        password: expect.any(String)
      }));
    });
  });

  describe('remove', () => {
    it('should remove an existing user', async () => {
      const result = await usersController.remove(userData._id);

      expect(result).toEqual({ success: true });
    });
  });
});
