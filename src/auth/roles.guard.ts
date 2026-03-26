import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/google/callback',
      scope: ['email', 'profile'],
      // ✅ This allows Google to pass `state` back to our callback
      passReqToCallback: true,
      state: true,
    });
  }

  // ✅ Called BEFORE redirecting to Google — embed redirect info into state
  authorizationParams(options: any): object {
    const state = options.state || {};
    return {
      ...options,
      state: Buffer.from(JSON.stringify(state)).toString('base64'),
    };
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // ✅ Decode state and attach to profile so controller can read it
    try {
      const rawState = req.query?.state;
      if (rawState) {
        profile._state = JSON.parse(
          Buffer.from(rawState, 'base64').toString('utf-8'),
        );
      }
    } catch {
      profile._state = {};
    }

    done(null, profile);
  }
}