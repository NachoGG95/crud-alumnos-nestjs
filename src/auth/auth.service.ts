import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  login(dto: LoginDto) {
    // Credenciales temporales desde .env: sirven para probar el flujo completo
    // sin armar todavía una tabla de usuarios. Se reemplaza por una consulta
    // a BD con contraseñas hasheadas (bcrypt) en un proyecto real.
    const esValido =
      dto.usuario === this.config.get('AUTH_USER') &&
      dto.password === this.config.get('AUTH_PASSWORD');

    // Mensaje genérico a propósito: no revelar si falló el usuario o la
    // contraseña evita que un atacante averigüe qué usuarios existen.
    if (!esValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // "sub" (subject) es el estándar JWT para identificar al dueño del token.
    // No se guardan datos sensibles: el payload es legible por cualquiera.
    const payload = { sub: dto.usuario };

    return { access_token: this.jwtService.sign(payload) };
  }
}