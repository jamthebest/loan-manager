import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
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

  async findAll(request: Request): Promise<Partial<Contact[]>> {
    return this.contactModel.find(request.query, { name: 1, email: 1, phone: 1, userOwner: 1 }).setOptions({ sanitizeFilter: true }).exec();
  }

  async findOne(id: string): Promise<Contact> {
    return this.contactModel.findById(id, { name: 1, email: 1, phone: 1, userOwner: 1 }).exec();
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Partial<Contact>> {
    return this.contactModel.findByIdAndUpdate(id, updateContactDto, { new: true, select: { name: 1, email: 1, phone: 1 } }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.contactModel.findByIdAndDelete(id).exec();
  }
}
