import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    // Override canActivate method from AuthGuard to check for public routes
    canActivate(context: ExecutionContext) {
        // Get the metadata for the current route from the reflector
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // If the route is marked as public, allow access
        if (isPublic) {
            return true;
        }
        // Otherwise, delegate to the parent canActivate method
        return super.canActivate(context);
    }
}