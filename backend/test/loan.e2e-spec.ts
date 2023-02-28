import { Test } from '@nestjs/testing';
import { LoansController } from '../loans.controller';
import { LoansService } from '../loans.service';

describe('LoansService', () => {
    let loansService: LoansService;
    let loansController: LoansController;

    beforeEach(() => {
        loansService = new LoansService();
        loansController = new LoansController(loansService);
    });

    describe('create', () => {
        it('should create a new loan', async () => {
            const loanData = {
                user_id: 1,
                contact_id: 1,
                amount: 1000.00,
                interest: 20,
                date: '2023-02-28'
            };

            jest.spyOn(loansService, 'create').mockImplementation(() => loanData);
            const result = await loansController.create(loanData);

            expect(result).toEqual(expect.objectContaining({
                id: expect.any(Number),
                user_id: loanData.user_id,
                contact_id: loanData.contact_id,
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
                user_id: 1,
                contact_id: 1,
                amount: 1000.00,
                interest: 20,
                date: '2023-02-28'
            };

            jest.spyOn(loansService, 'create').mockImplementation(() => loanData);
            const result = await loansController.update(loanId, loanData);

            expect(result).toEqual(expect.objectContaining({
                id: loanId,
                user_id: loanData.user_id,
                contact_id: loanData.contact_id,
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

            jest.spyOn(loansService, 'create').mockImplementation(() => loans);
            const result = await loansController.findAll();

            expect(result).toHaveLength(1);
        });
    });

    describe('delete', () => {
        it('should delete an existing loan', async () => {
            const loanId = 1;

            const result = await loansService.delete(loanId);

            expect(result).toEqual({ success: true });
        });
    });

});
