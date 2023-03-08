import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment, PaymentSchema } from './schemas/payment.schema';
var mongoose = require('mongoose');

const paymentData = {
  _id: '507f1f77bcf86cd799439011',
  loanId: mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
  amount: 1000,
  interestAmount: 200,
  date: '2023-03-28'
};

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;
  let paymentsService: PaymentsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let paymentModel: Model<Payment>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    paymentModel = mongoConnection.model(Payment.name, PaymentSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        PaymentsService,
        {
          provide: getModelToken(Payment.name),
          useValue: paymentModel
        }
      ],
    }).compile();

    paymentsController = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>(PaymentsService);
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
    expect(paymentsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payment', async () => {

      jest.spyOn(paymentsService, 'create').mockImplementation(async () => paymentData);
      const result = await paymentsController.create(paymentData);

      expect(result).toMatchObject(expect.objectContaining({
        _id: expect.any(String),
        loanId: paymentData.loanId,
        amount: paymentData.amount,
        interestAmount: paymentData.interestAmount,
        date: paymentData.date
      }));
    });
  });

  describe('findOne', () => {
    it('should return a payment by ID', async () => {
      jest.spyOn(paymentsService, 'findOne').mockImplementation(async () => paymentData);
      const result = await paymentsService.findOne(paymentData._id);

      expect(result).toMatchObject(expect.objectContaining({
        _id: expect.any(String),
        amount: paymentData.amount,
        interestAmount: paymentData.interestAmount,
        date: paymentData.date,
        loanId: paymentData.loanId
      }));
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      jest.spyOn(paymentsService, 'findAll').mockImplementation(async () => [paymentData]);
      const result = await paymentsController.findAll();

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(expect.objectContaining({
        _id: expect.any(String),
        amount: paymentData.amount,
        interestAmount: paymentData.interestAmount,
        date: paymentData.date,
        loanId: paymentData.loanId
      }));
    });
  });
});
