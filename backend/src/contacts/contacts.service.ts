import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument>) { }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);
    return createdContact.save();
  }

  async findAll(): Promise<Partial<Contact[]>> {
    return this.contactModel.find().projection({ name: 1, email: 1, phone: 1, userOwner: 1 }).exec();
  }

  async findOne(id: number): Promise<Contact> {
    return this.contactModel.findById(id).projection({ name: 1, email: 1, phone: 1, userOwner: 1 }).exec();
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Partial<Contact>> {
    return this.contactModel.findByIdAndUpdate(id, updateContactDto, { new: true }).projection({ name: 1, email: 1, phone: 1 }).exec();
  }

  async remove(id: number): Promise<void> {
    await this.contactModel.findByIdAndDelete(id).exec();
  }
}
