import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Companies } from '../database/database.entity';
import { AuthGuard } from './auth.guard';
export declare class AuthService {
    private companiesRepo;
    private jwtService;
    constructor(companiesRepo: Repository<Companies>, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        access_token: string;
    }>;
    logout(token: string, authGuard: AuthGuard): Promise<void>;
}
