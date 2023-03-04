import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @ApiProperty({ example: '1000.00' })
    amount?: number;

    @ApiProperty({ example: '200.00' })
    interestAmount?: number;

    @ApiProperty({ example: '2023-03-28' })
    date?: string;
}
