import { Test, TestingModule } from '@nestjs/testing';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
var mongoose = require('mongoose');

describe('LoansController', () => {
  let loansController: LoansController;
  let loansService: LoansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoansController],
      providers: [LoansService],
    }).compile();

    loansController = module.get<LoansController>(LoansController);
    loansService = module.get<LoansService>(LoansService);
  });

  it('should be defined', () => {
    expect(loansController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new loan', async () => {
      const loanData = {
        userId: mongoose.Types.ObjectId(1),
        contactId: mongoose.Types.ObjectId(1),
        amount: 1000.00,
        interest: 20,
        date: '2023-02-28'
      };

      jest.spyOn(loansService, 'create').mockImplementation(async () => loanData);
      const result = await loansController.create(loanData);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(Number),
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
      const loanId = 1;

      const result = await loansService.findOne(loanId);

      expect(result).toEqual(expect.objectContaining({
        id: loanId,
        contact: expect.any(Object), //Expect the contact information
        amount: expect.any(Number),
        interest: expect.any(Number),
        date: expect.any(String),
        status: expect.any(String)
      }));
    });
  });

  describe('update', () => {
    it('should update an existing loan', async () => {
      const loanId = 1;
      const loanData = {
        userId: mongoose.Types.ObjectId(1),
        contactId: mongoose.Types.ObjectId(1),
        amount: 1000.00,
        interest: 20,
        date: '2023-02-28'
      };

      jest.spyOn(loansService, 'update').mockImplementation(async () => loanData);
      const result = await loansController.update(loanId, loanData);

      expect(result).toEqual(expect.objectContaining({
        id: loanId,
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
      const loans = [];

      jest.spyOn(loansService, 'findAll').mockImplementation(async () => loans);
      const result = await loansController.findAll();

      expect(result).toHaveLength(1);
    });
  });

  describe('remove', () => {
    it('should remove an existing loan', async () => {
      const loanId = 1;

      const result = await loansService.remove(loanId);

      expect(result).toEqual({ success: true });
    });
  });
});
