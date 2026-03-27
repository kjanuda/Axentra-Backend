import { Controller, Get, UseGuards, Req, Res, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // ─── STEP 1: Redirect to Google ─────────────────────────────────────────────
  @Get('google')
  async googleAuth(@Query('state') state: string, @Res() res) {
    const params = new URLSearchParams({
      client_id:     process.env.GOOGLE_CLIENT_ID!,
      redirect_uri:  'http://axentra-backend-production-e185.up.railway.app/auth/google/callback',
      response_type: 'code',
      scope:         'email profile',
      access_type:   'offline',
      prompt:        'select_account',
    });

    if (state) {
      params.set('state', state);
    }

    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    );
  }

  // ─── STEP 2: Google callback ─────────────────────────────────────────────────
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req,
    @Res() res,
    @Query('state') stateParam: string,
  ) {
    try {
      const profile = req.user;
      console.log('✅ Profile received:', profile);

      if (!profile) {
        console.error('❌ No profile in req.user');
        return res.status(401).json({ message: 'No profile returned from Google' });
      }

      const email = profile.emails[0].value;
      const name  = profile.displayName;
      const photo = profile.photos?.[0]?.value || null;

      let role         = 'user';
      let redirectPath = '/dashboard';

      console.log('✅ Raw state:', stateParam);

      if (stateParam) {
        try {
          const decoded = JSON.parse(
            Buffer.from(stateParam, 'base64').toString('utf-8'),
          );
          role         = decoded.role     || 'user';
          redirectPath = decoded.redirect || '/dashboard';
          console.log('✅ Decoded state:', decoded);
        } catch (e) {
          console.error('❌ Failed to decode state:', e);
        }
      }

      // =========================================
      // 🔥 1. RECOMMENDER
      // =========================================
      if (role === 'recommender') {
        const redirectUrl = new URL(`http://localhost:3000${redirectPath}`);
        redirectUrl.searchParams.set('email',     email);
        redirectUrl.searchParams.set('name',      name);
        redirectUrl.searchParams.set('photo',     photo || '');
        redirectUrl.searchParams.set('openModal', 'true');

        console.log('✅ Redirecting recommender to:', redirectUrl.toString());
        return res.redirect(redirectUrl.toString());
      }

      // =========================================
      // 🔥 2. NORMAL USER
      // =========================================
      const ip =
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress        ||
        req.ip;

      const result = await this.usersService.findOrCreate(email, name, ip, photo);
      const user   = result.user;

      const token = this.authService.generateToken({
        email: user.email,
        role:  user.role || 'user',
      });

      const redirectUrl = new URL('http://localhost:3000/dashboard');
      redirectUrl.searchParams.set('token', token);
      redirectUrl.searchParams.set('email', email);
      redirectUrl.searchParams.set('name',  name);
      redirectUrl.searchParams.set('role',  user.role || 'user');
      if (photo) redirectUrl.searchParams.set('photo', photo);

      console.log('✅ Redirecting normal user to:', redirectUrl.toString());
      return res.redirect(redirectUrl.toString());

    } catch (err) {
      console.error('❌ Google callback error:', err);
      return res
        .status(500)
        .json({ message: 'OAuth callback failed', error: err.message });
    }
  }
}