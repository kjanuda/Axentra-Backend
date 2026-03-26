import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
  constructor(private jwtService: JwtService) {}

  generateToken(user: any) {
    return this.jwtService.sign({
      email: user.email,
      id: user._id,
    });
  }
}