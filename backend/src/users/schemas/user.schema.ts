import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the User document type by combining the User class with the Mongoose Document type
export type UserDocument = User & Document;

// Define the Mongoose schema for the User collection, including timestamps for when documents are created or modified
@Schema({ timestamps: true })
export class User {
    // Define all the User properties
    @Prop({ required: true })
    name: string;

    // Define the email property, which is required and must be unique across all documents in the collection
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({  })
    phone: number;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;
}

// Create the UserSchema by using the SchemaFactory to generate a Mongoose schema from the User class
export const UserSchema = SchemaFactory.createForClass(User);