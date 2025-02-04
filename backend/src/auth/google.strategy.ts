import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
      callbackURL: 'https://nkf448kn-3000.asse.devtunnels.ms/auth/google/callback',
      scope: ['email', 'profile'],
    });
    
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails } = profile;
    const email = emails[0].value;

    if (email !== 'imtiajsajin@gmail.com') {
      done(new UnauthorizedException('Email is not authorized'), null);
    } else {
      const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        email,
      };
      done(null, user);
    }
  }
}