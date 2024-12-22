import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthProvider {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any): string {
    return this.jwtService.sign(payload, { secret: 'yourSecretKey' });
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token, { secret: 'yourSecretKey' }); 
  }
}
