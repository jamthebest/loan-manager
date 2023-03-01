import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ContactDocument = Contact & HydratedDocument<Contact>;

@Schema({ timestamps: true })
export class Contact {
    @Prop({ required: true })
    name: string;

    @Prop({  })
    email: string;

    @Prop({  })
    phone: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userOwner: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);