import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.refreshSecret'),
    });
  }

  async validate(payload: {
    sub: string;
    tokenId: string;
  }): Promise<{ id: string }> {
    const { sub: userId, tokenId } = payload;
    const isRefreshTokenValid = await this.authService.validateRefreshToken(
      userId,
      tokenId,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException();
    }

    return { id: userId };
  }
}
