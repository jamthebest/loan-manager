import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty({ example: '507c7f79bcf86cd7994f6c0e' })
    loanId: string;

    @ApiProperty({ example: '1000.00' })
    amount: number;

    @ApiProperty({ example: '200.00' })
    interestAmount: number;

    @ApiProperty({ example: '2023-03-28' })
    date: string;
}
