import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Loan } from '../../loans/schemas/loan.schema';

export type PaymentDocument = Payment & HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' })
    loanId: Loan;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    interestAmount: number;

    @Prop({ required: true })
    date: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);