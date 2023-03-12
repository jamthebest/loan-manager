import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { LoansService } from '../loans/loans.service';
import { Loan, LoanSchema } from '../loans/schemas/loan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, LoansService]
})
export class PaymentsModule { }
