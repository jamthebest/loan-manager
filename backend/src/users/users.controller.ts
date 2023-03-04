import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('user')  // OpenAPI decorator to group endpoints in Swagger UI
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Req() request: Request) {
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
