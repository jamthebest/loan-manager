import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty({ example: '1' })
    loanId: number;

    @ApiProperty({ example: '1000.00' })
    amount: number;

    @ApiProperty({ example: '200.00' })
    interestAmount: number;

    @ApiProperty({ example: '2023-03-28' })
    date: string;
}
