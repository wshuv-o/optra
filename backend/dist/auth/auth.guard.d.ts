import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { BlacklistService } from '../blacklist/blacklist.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    blacklistService: BlacklistService;
    constructor(jwtService: JwtService, reflector: Reflector, blacklistService: BlacklistService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
