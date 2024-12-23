import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants';
  import { Request } from 'express';
  import { Reflector } from '@nestjs/core';
  import { IS_PUBLIC_KEY } from './public.decorator';
  import { BlacklistService } from '../blacklist/blacklist.service'; 

  @Injectable()
  export class AuthGuard implements CanActivate {
  
    constructor(private jwtService: JwtService, private reflector: Reflector, public blacklistService: BlacklistService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
    //   console.log("inside canactivate: ", this.tokenBlacklist)

      // Check if token is blacklisted
      if (this.blacklistService.isTokenBlacklisted(token)) {
        throw new UnauthorizedException('Token has been invalidated');

      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        request['user'] = payload; // Attach user to the request
      } catch {
        throw new UnauthorizedException('Invalid or expired token');
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  