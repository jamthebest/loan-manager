import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    // Import the User model and schema from the User module
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UsersController], // Register the UsersController to handle requests to the /users route
  providers: [UsersService] // Register the UsersService to handle all user-related logic and data persistence
})
export class UsersModule { }
