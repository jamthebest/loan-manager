import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }

    // Method to validate user credentials
    async validateUser(username: string, password: string): Promise<any> {
        // Find the user by username in the database
        const user = await this.usersService.findByUsername(username, true);
        // If the user is not found, throw a NotAcceptableException
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        // Check if the provided password matches the hashed password in the database using bcrypt
        const passwordValid = await bcrypt.compare(password, user.password);
        // If the user exists and the password is valid, return the user object
        if (user && passwordValid) {
            return user;
        }
        // If the user is not found or the password is invalid, return null
        return null;
    }

    // Method to generate JWT token upon successful login
    async login(user: any) {
        // Create a JWT payload with the user ID and username
        const payload = { username: user.username, sub: user._id };
        // Generate a JWT token using the JWT service's sign() method with the payload and return it
        return {
            access_token: this.jwtService.sign(payload),
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email
        };
    }
}
