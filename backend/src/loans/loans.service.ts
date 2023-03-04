import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loan, LoanDocument } from './schemas/loan.schema';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoansService {
  constructor(@InjectModel(Loan.name) private loanModel: Model<LoanDocument>) { }

  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    createLoanDto.status = 'P';
    const createdLoan = new this.loanModel(createLoanDto);
    return createdLoan.save();
  }

  async findAll(): Promise<Partial<Loan[]>> {
    return this.loanModel.find().projection().exec();
  }

  async findOne(id: number): Promise<Loan> {
    return this.loanModel.findById(id).projection().exec();
  }

  async update(id: number, updateLoanDto: UpdateLoanDto): Promise<Partial<Loan>> {
    return this.loanModel.findByIdAndUpdate(id, updateLoanDto, { new: true }).projection({ amount: 1, interest: 1, date: 1, status: 1 }).exec();
  }

  async remove(id: number): Promise<void> {
    await this.loanModel.findByIdAndDelete(id).exec();
  }
}
