import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatedUserDto } from './dto/created-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  /**
   * Creates a new user in the database
   * @param createUserDto - The DTO for creating a new user
   * @returns The created user
   */
  async create(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  /**
   * Finds all users in the database matching the given query parameters
   * @param request - The HTTP request object containing the query parameters
   * @returns The array of users matching the query parameters
   */
  async findAll(request?: Request): Promise<Partial<User[]>> {
    return this.userModel.find(request && request.query, { name: 1, email: 1, phone: 1, username: 1 }).setOptions({ sanitizeFilter: true }).exec();
  }

  /**
   * Finds a single user in the database by their ID
   * @param id - The ID of the user to find
   * @returns The found user
   */
  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id, { name: 1, email: 1, phone: 1, username: 1 }).exec();
  }

  /**
   * Finds a single user in the database by their username
   * @param username - The username of the user to find
   * @param getPassword - Whether to include the user's password in the result
   * @returns The found user
   */
  async findByUsername(username: string, getPassword?: boolean): Promise<User> {
    let projection = {
      name: 1,
      email: 1, 
      phone: 1, 
      username: 1,
      password: 1
    };
    if (!getPassword) {
      delete projection.password;
    }
    return this.userModel.findOne({ username }, projection).exec();
  }

  /**
   * Finds a single user in the database by their email address
   * @param email - The email address of the user to find
   * @returns The found user
   */
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }, { name: 1, email: 1, phone: 1, username: 1 }).exec();
  }

  /**
   * Updates a user in the database
   * @param id - The ID of the user to update
   * @param updateUserDto - The DTO for updating the user
   * @returns The updated user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true, select: { name: 1, email: 1, phone: 1 } }).exec();
  }

  /**
   * Deletes a user from the database
   * @param id - The ID of the user to delete
   */
  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
