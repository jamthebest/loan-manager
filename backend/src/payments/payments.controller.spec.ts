import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
var mongoose = require('mongoose');

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();

    paymentsController = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(paymentsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payment', async () => {
      const paymentData = {
        loanId: mongoose.Types.ObjectId(1),
        amount: 1000.00,
        interestAmount: 200.00,
        date: '2023-03-28'
      };

      jest.spyOn(paymentsService, 'create').mockImplementation(async () => paymentData);
      const result = await paymentsController.create(paymentData);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(Number),
        loanId: paymentData.loanId,
        amount: paymentData.amount,
        interestAmount: paymentData.interestAmount,
        date: paymentData.date
      }));
    });
  });

  describe('findOne', () => {
    it('should return a payment by ID', async () => {
      const paymentId = 1;

      const result = await paymentsService.findOne(paymentId);

      expect(result).toEqual(expect.objectContaining({
        id: paymentId,
        amount: expect.any(Number),
        interestAmount: expect.any(Number),
        date: expect.any(String),
        loanId: expect.any(Number)
      }));
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      const payments = [];

      jest.spyOn(paymentsService, 'findAll').mockImplementation(async () => payments);
      const result = await paymentsController.findAll();

      expect(result).toHaveLength(1);
    });
  });
});
