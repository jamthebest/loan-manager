import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
    @ApiProperty({ example: 'Jane Doe' })
    name: string;

    @ApiProperty({ example: 'janedoe@example.com' })
    email?: string;

    @ApiProperty({ example: '5555555556' })
    phone?: number;

    userOwner: string;
}
