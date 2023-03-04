import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanDto {
    @ApiProperty({ example: 1 })
    userId: number;

    @ApiProperty({ example: 1 })
    contactId: number;

    @ApiProperty({ example: '1000.00' })
    amount: number;

    @ApiProperty({ example: 20, minimum: 0, maximum: 100 })
    interest: number;

    @ApiProperty({ example: '2023-02-28' })
    date: string;

    @ApiProperty({ example: 'P', enum: ['A - Active', 'P - Paid', 'C - Cancelled'] })
    status?: string;
}
