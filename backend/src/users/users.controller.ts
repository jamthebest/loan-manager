import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/public.decorator';
import constants from '../util/constants';
import * as bcrypt from 'bcrypt';

@Controller('users')
@ApiTags('user')  // OpenAPI decorator to group endpoints in Swagger UI
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let user = await this.usersService.findByEmail(createUserDto.email);
    if (user && user.email) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    user = await this.usersService.findByUsername(createUserDto.username);
    if (user && user.username) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, constants.auth.SALT_OR_ROUNDS);
    createUserDto.password = hashedPassword;
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    console.log(request.user);
    return this.usersService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
