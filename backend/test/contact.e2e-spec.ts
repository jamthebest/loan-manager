import { Test } from '@nestjs/testing';
import { ContactsController } from '../contacts.controller';
import { ContactsService } from '../contacts.service';

describe('ContactsService', () => {
    let contactsService: ContactsService;
    let contactsController: ContactsController;

    beforeEach(() => {
        contactsService = new ContactsService();
        contactsController = new ContactsController(contactsService);
    });

    describe('create', () => {
        it('should create a new contact', async () => {
            const contactData = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                phone: '555-555-5555',
                userOwner: 1
            };

            jest.spyOn(contactsService, 'create').mockImplementation(() => contactData);
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
                phone: '555-555-5556',
                userOwner: 1
            };

            jest.spyOn(contactsService, 'create').mockImplementation(() => contactData);
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
                phone: '555-555-5555',
                userOwner: 1
            };

            jest.spyOn(contactsService, 'create').mockImplementation(() => contactData);
            const result = await contactsController.update(contactId, contactData);

            expect(result).toEqual(expect.objectContaining({
                id: contactId,
                name: contactData.name,
                email: contactData.email,
                phone: contactData.phone,
                userOwner: contactData.userOwner
            }));
        });
    });
    
    describe('findAll', () => {
        it('should return an array of contacts', async () => {
            const contacts = [
                { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '555-555-5555', userOwner: 1 },
                { id: 2, name: 'Jane Doe', email: 'janedoe@example.com', phone: '555-555-5556', userOwner: 1 },
            ];

            jest.spyOn(contactsService, 'create').mockImplementation(() => contacts);
            const result = await contactsController.findAll();

            expect(result).toEqual(contacts);
        });
    });

    describe('delete', () => {
        it('should delete an existing contact', async () => {
            const contactId = 2;

            const result = await contactsService.delete(contactId);

            expect(result).toEqual({ success: true });
        });
    });

});
