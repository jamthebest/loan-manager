import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
var mongoose = require('mongoose');

describe('ContactsController', () => {
  let contactsController: ContactsController;
  let contactsService: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService],
    }).compile();

    contactsController = module.get<ContactsController>(ContactsController);
    contactsService = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(contactsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new contact', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: 5555555555,
        userOwner: mongoose.Types.ObjectId(1)
      };

      jest.spyOn(contactsService, 'create').mockImplementation(async () => contactData);
      const result = await contactsController.create(contactData);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        userOwner: contactData.userOwner
      }));
    });
  });

  describe('create', () => {
    it('should create a new contact', async () => {
      const contactData = {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        phone: 5555555556,
        userOwner: mongoose.Types.ObjectId(1)
      };

      jest.spyOn(contactsService, 'create').mockImplementation(async () => contactData);
      const result = await contactsController.create(contactData);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        userOwner: contactData.userOwner
      }));
    });
  });

  describe('findOne', () => {
    it('should return a contact by ID', async () => {
      const contactId = 1;

      const result = await contactsService.findOne(contactId);

      expect(result).toEqual(expect.objectContaining({
        id: contactId,
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        userOwner: expect.any(Number)
      }));
    });
  });

  describe('update', () => {
    it('should update an existing contact', async () => {
      const contactId = 1;
      const contactData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: 5555555555
      };

      jest.spyOn(contactsService, 'update').mockImplementation(async () => contactData);
      const result = await contactsController.update(contactId, contactData);

      expect(result).toEqual(expect.objectContaining({
        id: contactId,
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone
      }));
    });
  });

  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      const contacts = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: 5555555555, userOwner: mongoose.Types.ObjectId(1) },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com', phone: 5555555556, userOwner: mongoose.Types.ObjectId(1) },
      ];

      jest.spyOn(contactsService, 'findAll').mockImplementation(async () => contacts);
      const result = await contactsController.findAll();

      expect(result).toEqual(contacts);
    });
  });

  describe('remove', () => {
    it('should remove an existing contact', async () => {
      const contactId = 2;

      const result = await contactsService.remove(contactId);

      expect(result).toEqual({ success: true });
    });
  });
});
