import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: 'johndoe@example.com' })
    email: string;

    @ApiProperty({ example: '5555555555' })
    phone: number;

    @ApiProperty({ example: 'johndoe' })
    username: string;

    @ApiProperty({ example: '@sD123' })
    password: string;
}
