import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const token = req.body.apiToken;
        if (!token) throw new UnauthorizedException({message: 'User is not authorized'})
        
        const isVerifyed = await this.authService.verify(token).then()
        if (!isVerifyed) throw new UnauthorizedException({message: 'User is not authorized'})
        return isVerifyed;
    }
    
}