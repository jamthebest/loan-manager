import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import constants from '../util/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        // Call the super() method with the options for the JwtStrategy
        super({
            // Extract the JWT from the authorization header as a bearer token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Do not ignore token expiration
            secretOrKey: constants.auth.SECRET, // Use the secret key defined in the constants file to decode the token
        });
    }

    // Define the validate() method to verify the user's identity based on the token payload
    async validate(payload: any) {
        // Return an object with the user ID and username
        return { _id: payload.sub, username: payload.username };
    }
}