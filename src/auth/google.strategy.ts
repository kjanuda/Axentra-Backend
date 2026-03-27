import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    // ✅ Debug — check if env vars are loaded
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ loaded' : '❌ MISSING');
    console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ loaded' : '❌ MISSING');

    super({
      clientID:          process.env.GOOGLE_CLIENT_ID!,
      clientSecret:      process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL:       'http://axentra-backend-production-e185.up.railway.app/auth/google/callback',
      scope:             ['email', 'profile'],
      passReqToCallback: true,
      skipLocalState:    true,
    });
  }

  async validate(
    req:          any,
    accessToken:  string,
    refreshToken: string,
    profile:      any,
    done:         Function,
  ) {
    console.log('✅ Strategy validate called:', profile.displayName);
    done(null, profile);
  }
}