import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto extends PartialType(CreateContactDto) {
    @ApiProperty({ example: 'Jane Doe' })
    name?: string;

    @ApiProperty({ example: 'janedoe@example.com' })
    email?: string;

    @ApiProperty({ example: '5555555556' })
    phone?: number;
}
