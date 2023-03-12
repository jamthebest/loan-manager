import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Contact } from '../../contacts/schemas/contact.schema';

export type LoanDocument = Loan & HydratedDocument<Loan>;

@Schema({ timestamps: true })
export class Loan {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' })
    contactId: Contact;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    balance: number;

    @Prop({ required: true })
    interest: number;

    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    status?: string;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);