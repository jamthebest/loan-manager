import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanDto {
    userId: string;

    @ApiProperty({ example: '507c7f79bcf86cd7994f6c0e' })
    contactId: string;

    @ApiProperty({ example: '1000.00' })
    amount: number;

    @ApiProperty({ example: 20, minimum: 0, maximum: 100 })
    interest: number;

    @ApiProperty({ example: '2023-02-28' })
    date: string;

    @ApiProperty({ example: 'A', enum: ['A - Active', 'P - Paid', 'C - Cancelled'] })
    status?: string;
}
