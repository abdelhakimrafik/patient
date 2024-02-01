import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import jwtConfig from 'src/config/jwt.config';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    return await this.generateAuthorizationTokens(user.id);
  }

  async signUp(signUpDto: SignUpDto) {
    return await this.usersService.create(signUpDto);
  }

  async signOut(userId: string): Promise<void> {
    this.redisService.delete(`user-${userId}`);
  }

  async refreshToken(refreshToken: string) {
    const { id, tokenId } = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.jwtConfiguration.secret,
    });

    const isValidToken = await this.redisService.validate(
      `refresh-${id}`,
      tokenId,
    );
    if (!isValidToken) {
      throw new UnauthorizedException('Refresh token is not valid');
    }

    return await this.generateAuthorizationTokens(id);
  }

  private async generateAuthorizationTokens(userId: string) {
    const access_token = await this.generateToken(
      'user',
      userId,
      { id: userId },
      this.jwtConfiguration.signOptions.expiresIn,
    );
    const refresh_token = await this.generateToken(
      'refresh',
      userId,
      { id: userId },
      this.jwtConfiguration.refreshExpiresIn,
    );

    return { access_token, refresh_token };
  }

  private async generateToken(
    prefix: string,
    userId: string,
    payload: Record<string, string>,
    expiresIn: string | number,
  ) {
    const tokenId = randomUUID();
    await this.redisService.insert(`${prefix}-${userId}`, tokenId);

    const token = await this.jwtService.signAsync(
      { ...payload, tokenId },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
    return token;
  }
}
