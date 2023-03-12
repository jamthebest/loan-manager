import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { LoansService } from '../loans/loans.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
@ApiTags('payment')  // OpenAPI decorator to group endpoints in Swagger UI
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService, private readonly loanService: LoansService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const response = await this.paymentsService.create(createPaymentDto);
    if (response.loanId) {
      const loanUpdate = this.loanService.updateBalance(createPaymentDto.loanId, {
        amount: createPaymentDto.amount
      });
    }
    return response;
  }

  @Get()
  findAll(@Req() request?: Request) {
    return this.paymentsService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
