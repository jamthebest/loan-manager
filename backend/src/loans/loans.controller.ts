import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loans')
@ApiTags('loan')  // OpenAPI decorator to group endpoints in Swagger UI
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  create(@Body() createLoanDto: CreateLoanDto, @Req() request?: Request) {
    if (request) {
      createLoanDto.userId = request.user._id;
    }
    createLoanDto.status = 'A'; // Active
    return this.loansService.create(createLoanDto);
  }

  @Get()
  findAll(@Req() request?: Request) {
    return this.loansService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(id, updateLoanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loansService.remove(id);
  }
}
