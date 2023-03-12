import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDto } from './create-loan.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBalanceDto extends PartialType(CreateLoanDto) {
    @ApiProperty({ example: '1000.00' })
    amount?: number;
}
