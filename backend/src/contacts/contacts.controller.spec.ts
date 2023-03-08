import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { Contact, ContactSchema } from './schemas/contact.schema';
var mongoose = require('mongoose');

const contactData = {
  _id: '507f1f77bcf86cd799439011',
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: 5555555555,
  userOwner: mongoose.Types.ObjectId('507f1f77bcf86cd799439012')
};

describe('ContactsController', () => {
  let contactsController: ContactsController;
  let contactsService: ContactsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let contactModel: Model<Contact>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    contactModel = mongoConnection.model(Contact.name, ContactSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        ContactsService,
        {
          provide: getModelToken(Contact.name),
          useValue: contactModel
        }
      ],
    }).compile();

    contactsController = module.get<ContactsController>(ContactsController);
    contactsService = module.get<ContactsService>(ContactsService);
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
    expect(contactsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new contact', async () => {
      jest.spyOn(contactsService, 'create').mockImplementation(async () => contactData);
      const result = await contactsController.create(contactData);

      expect(result).toMatchObject(expect.objectContaining({
        _id: expect.any(String),
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        userOwner: contactData.userOwner
      }));
    });
  });

  describe('create', () => {
    it('should create a new contact', async () => {
      jest.spyOn(contactsService, 'create').mockImplementation(async () => contactData);
      const result = await contactsController.create(contactData);

      expect(result).toMatchObject(expect.objectContaining({
        _id: expect.any(String),
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        userOwner: contactData.userOwner
      }));
    });
  });

  describe('findOne', () => {
    it('should return a contact by ID', async () => {
      jest.spyOn(contactsService, 'findOne').mockImplementation(async () => contactData);
      const result = await contactsService.findOne(contactData._id);

      expect(result).toMatchObject(expect.objectContaining({
        _id: contactData._id,
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        userOwner: contactData.userOwner
      }));
    });
  });

  describe('update', () => {
    it('should update an existing contact', async () => {
      jest.spyOn(contactsService, 'update').mockImplementation(async () => contactData);
      const result = await contactsController.update(contactData._id, contactData);

      expect(result).toMatchObject(expect.objectContaining({
        _id: contactData._id,
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone
      }));
    });
  });

  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      jest.spyOn(contactsService, 'findAll').mockImplementation(async () => [contactData]);
      const result = await contactsController.findAll();

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(expect.objectContaining({
        _id: expect.any(String),
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone
      }));
    });
  });

  describe('remove', () => {
    it('should remove an existing contact', async () => {
      const result = await contactsService.remove(contactData._id);

      expect(result).toEqual({ success: true });
    });
  });
});
