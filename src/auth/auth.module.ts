import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'axentra_secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],

  // ✅ THIS IS THE FIX
  providers: [GoogleStrategy, AuthService],
})
export class AuthModule {}