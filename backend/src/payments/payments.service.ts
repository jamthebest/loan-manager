import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const createdPayment = new this.paymentModel(createPaymentDto);
    return createdPayment.save();
  }

  async findAll(request: Request): Promise<Partial<Payment[]>> {
    return this.paymentModel.find(request.query).setOptions({ sanitizeFilter: true }).exec();
  }

  async findOne(id: string): Promise<Payment> {
    return this.paymentModel.findById(id).exec();
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Partial<Payment>> {
    return this.paymentModel.findByIdAndUpdate(id, updatePaymentDto, { new: true, select: { amount: 1, date: 1, interestAmount: 1 } }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.paymentModel.findByIdAndDelete(id).exec();
  }
}
