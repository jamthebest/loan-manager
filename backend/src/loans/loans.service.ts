import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { Loan, LoanDocument } from './schemas/loan.schema';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoansService {
  constructor(@InjectModel(Loan.name) private loanModel: Model<LoanDocument>) { }

  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    const createdLoan = new this.loanModel(createLoanDto);
    return createdLoan.save();
  }

  async findAll(request?: Request): Promise<Partial<Loan[]>> {
    if (request) {
      request.query.userId = request.user._id;
    }
    return this.loanModel.find(request && request.query || {}).setOptions({ sanitizeFilter: true }).exec();
  }

  async findOne(id: string): Promise<Loan> {
    return this.loanModel.findById(id).exec();
  }

  async update(id: string, updateLoanDto: UpdateLoanDto): Promise<Partial<Loan>> {
    return this.loanModel.findByIdAndUpdate(id, updateLoanDto, { new: true, select: { amount: 1, interest: 1, date: 1, status: 1 } }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.loanModel.findByIdAndDelete(id).exec();
  }
}
