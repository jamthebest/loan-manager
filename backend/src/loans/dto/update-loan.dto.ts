import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDto } from './create-loan.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
    @ApiProperty({ example: '1000.00' })
    amount?: number;

    balance?: number;

    @ApiProperty({ example: 20, minimum: 0, maximum: 100 })
    interest?: number;

    @ApiProperty({ example: '2023-02-28' })
    date?: string;

    @ApiProperty({ example: 'P', enum: ['A - Active', 'P - Paid', 'C - Cancelled'] })
    status?: string;
}
