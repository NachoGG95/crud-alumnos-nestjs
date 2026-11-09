import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Por defecto esta Strategy se registra con el nombre 'jwt',
// que es justamente el que usa AuthGuard('jwt') en el controller.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      // Dónde buscar el token: header "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // false = rechazar tokens vencidos (nunca lo pongas en true)
      ignoreExpiration: false,
      // getOrThrow corta el arranque si falta el secreto, en vez de
      // fallar de forma silenciosa más tarde.
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // Se ejecuta SOLO si la firma y la expiración ya fueron verificadas.
  // Lo que devuelve queda disponible como req.user en los controllers.
  validate(payload: { sub: string }) {
    return { usuario: payload.sub };
  }
}
