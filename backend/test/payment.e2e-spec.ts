import { Test } from '@nestjs/testing';
import { PaymentsController } from '../payments.controller';
import { PaymentsService } from '../payments.service';

describe('PaymentsService', () => {
    let paymentsService: PaymentsService;
    let paymentsController: PaymentsController;

    beforeEach(() => {
        paymentsService = new PaymentsService();
        paymentsController = new PaymentsController(paymentsService);
    });

    describe('create', () => {
        it('should create a new payment', async () => {
            const paymentData = {
                loan_id: 1,
                amount: 1000.00,
                interest_amount: 200.00,
                date: '2023-03-28'
            };

            jest.spyOn(paymentsService, 'create').mockImplementation(() => paymentData);
            const result = await paymentsController.create(paymentData);

            expect(result).toEqual(expect.objectContaining({
                id: expect.any(Number),
                loan_id: paymentData.loan_id,
                amount: paymentData.amount,
                interest_amount: paymentData.interest_amount,
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
                interest_amount: expect.any(Number),
                date: expect.any(String),
                loan_id: expect.any(Number)
            }));
        });
    });
    
    describe('findAll', () => {
        it('should return an array of payments', async () => {
            const payments = [];

            jest.spyOn(paymentsService, 'create').mockImplementation(() => payments);
            const result = await paymentsController.findAll();

            expect(result).toHaveLength(1);
        });
    });

});
