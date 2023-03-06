import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    // Define a validate method to be called when a user tries to authenticate
    async validate(username: string, password: string): Promise<any> {
        // Call the validateUser method of the AuthService and pass in the email and password
        const user = await this.authService.validateUser(username, password);

        // If user is not found, throw an UnauthorizedException error
        if (!user) {
            throw new UnauthorizedException();
        }
        // Return the user object if authentication is successful
        return user;
    }
}