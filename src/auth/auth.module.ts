import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { AuthGuard } from './auth.guard'; // Import the AuthGuard
import { AuthProvider } from './auth.provider'; // Import the AuthProvider
import { JwtStrategy } from './jwt.strategy'; // Import JwtStrategy for JWT validation
import { PassportModule } from '@nestjs/passport'; // Passport module to integrate passport strategies

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Use a secure secret key here
      signOptions: { expiresIn: '60m' }, // Optional, set token expiration
    }),
  ],
  providers: [AuthGuard, AuthProvider, JwtStrategy],
  exports: [AuthGuard, AuthProvider],
})
export class AuthModule {}
