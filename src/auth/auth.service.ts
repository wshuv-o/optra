
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companies } from '../database/database.entity';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Companies) private companiesRepo: Repository<Companies>,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string,): Promise<{ access_token: string }> {
    const company = await this.companiesRepo.findOne({ where: { email } });
    if (!company) throw new NotFoundException('Invalid email or password');
    const isPasswordValid = bcrypt.compare(password, company.password);
    if (!isPasswordValid) throw new NotFoundException('Invalid email or password');
    const payload = { email: company.email, sub: company.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async logout(token: string, authGuard: AuthGuard): Promise<void> {
    if (!token) throw new UnauthorizedException('No token provided');
    authGuard.blacklistService.addToken(token);
  }
}