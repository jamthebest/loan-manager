import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { Loan, LoanSchema } from './schemas/loan.schema';
var mongoose = require('mongoose');

const loanData = {
  _id: '8h7f1f77bcf86cd7994cd2e0',
  userId: mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
  contactId: mongoose.Types.ObjectId('507f1f77bcf86cd799439012'),
  amount: 1000,
  interest: 20,
  date: '2023-02-28'
};

describe('LoansController', () => {
  let loansController: LoansController;
  let loansService: LoansService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let loanModel: Model<Loan>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    loanModel = mongoConnection.model(Loan.name, LoanSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoansController],
      providers: [
        LoansService,
        {
          provide: getModelToken(Loan.name),
          useValue: loanModel
        }
      ],
    }).compile();

    loansController = module.get<LoansController>(LoansController);
    loansService = module.get<LoansService>(LoansService);
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
    expect(loansController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new loan', async () => {
      jest.spyOn(loansService, 'create').mockImplementation(async () => loanData);
      const result = await loansController.create(loanData);
      
      expect(result).toMatchObject(expect.objectContaining({
        _id: expect.any(String),
        userId: loanData.userId,
        contactId: loanData.contactId,
        amount: loanData.amount,
        interest: loanData.interest,
        date: loanData.date,
        status: 'P' //Pending
      }));
    });
  });

  describe('findOne', () => {
    it('should return a loan by ID', async () => {
      jest.spyOn(loansService, 'findOne').mockImplementation(async () => loanData);
      const result = await loansService.findOne(loanData._id);

      expect(result).toMatchObject(expect.objectContaining({
        _id: expect.any(String),
        contactId: loanData.contactId,
        amount: loanData.amount,
        interest: loanData.interest,
        date: loanData.date,
        status: 'P'
      }));
    });
  });

  describe('update', () => {
    it('should update an existing loan', async () => {
      jest.spyOn(loansService, 'update').mockImplementation(async () => loanData);
      const result = await loansController.update(loanData._id, loanData);

      expect(result).toMatchObject(expect.objectContaining({
        _id: expect.any(String),
        userId: loanData.userId,
        contactId: loanData.contactId,
        amount: loanData.amount,
        interest: loanData.interest,
        date: loanData.date,
        status: 'P' //Pending
      }));
    });
  });

  describe('findAll', () => {
    it('should return an array of loans', async () => {
      jest.spyOn(loansService, 'findAll').mockImplementation(async () => [loanData]);
      const result = await loansController.findAll();

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(expect.objectContaining({
        _id: expect.any(String),
        userId: loanData.userId,
        contactId: loanData.contactId,
        amount: loanData.amount,
        interest: loanData.interest,
        date: loanData.date,
        status: 'P' //Pending
      }));
    });
  });

  describe('remove', () => {
    it('should remove an existing loan', async () => {
      const result = await loansService.remove(loanData._id);

      expect(result).toEqual({ success: true });
    });
  });
});
