import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<Partial<User[]>> {
    return this.userModel.find().projection({ name: 1, email: 1, phone: 1, username: 1 }).exec();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findById(id).projection({ name: 1, email: 1, phone: 1, username: 1 }).exec();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).projection({ name: 1, email: 1, phone: 1, username: 1 }).exec();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).projection({ name: 1, email: 1, phone: 1 }).exec();
  }

  async remove(id: number): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
