import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/public.decorator';
import { CreatedUserDto } from './dto/created-user.dto';
import constants from '../util/constants';
import * as bcrypt from 'bcrypt';

@Controller('users')
@ApiTags('user')  // OpenAPI decorator to group endpoints in Swagger UI
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * Creates a new user with the provided data. 
   * @param createUserDto - Object containing the user's data to be created
   * @returns The created user
  */
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    // Checks if the email or username already exist before creating the user. 
    let user = await this.usersService.findByEmail(createUserDto.email);
    if (user && user.email) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    user = await this.usersService.findByUsername(createUserDto.username);
    if (user && user.username) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
    // Hashes the user's password with bcrypt before saving it to the database.
    const hashedPassword = await bcrypt.hash(createUserDto.password, constants.auth.SALT_OR_ROUNDS);
    createUserDto.password = hashedPassword;
    return this.usersService.create(createUserDto);
  }

  /**
   * Returns a list of all users in the database.
   * @param request - Express request object
   * @returns A list of all users in the database
   */
  @Get()
  findAll(@Req() request?: Request) {
    return this.usersService.findAll(request);
  }

  /**
   * Returns the user with the provided ID.
   * @param id - The ID of the user to be retrieved
   * @returns The user with the provided ID
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Updates the user with the provided ID with the provided data.
   * @param id - The ID of the user to be updated
   * @param updateUserDto - Object containing the user's updated data
   * @returns The updated user
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Deletes the user with the provided ID.
   * @param id - The ID of the user to be deleted
   * @returns The deleted user
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id).then(() => {
      return {
        success: true
      };
    }).catch(() => {
      return {
        success: false
      };
    });
  }
}
