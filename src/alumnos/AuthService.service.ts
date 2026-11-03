import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(usuario: string) {
    const payload = { sub: usuario };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
