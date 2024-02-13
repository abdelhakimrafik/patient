import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { LoginResponseDto } from './dto/login.response.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RedisService } from 'src/database/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async login(user: User): Promise<LoginResponseDto> {
    return {
      user: user,
      tokens: await this.generateTokens(user.id.toString()),
    };
  }

  async register(user: CreateUserDto): Promise<User> {
    return await this.usersService.create(user);
  }

  async logout(userId: string): Promise<void> {
    await this.redisService.delete(`refresh-${userId}`);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const passwordMatch = await user.validatePassword(password);
      if (passwordMatch) {
        return user;
      }
    }
    return null;
  }

  async validateRefreshToken(
    userId: string,
    tokenId: string,
  ): Promise<boolean> {
    return await this.redisService.validate(`refresh-${userId}`, tokenId);
  }

  async generateTokens(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    const [refreshToken, refreshTokenId] = this.generateRefreshToken(userId);

    /** Save refresh token to redis database */
    await this.redisService.insert(`refresh-${userId}`, refreshTokenId);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.sign({ sub: userId });
  }

  private generateRefreshToken(userId: string) {
    const tokenId = randomUUID();
    const token = this.jwtService.sign(
      { sub: userId, tokenId },
      {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshTokenTTL'),
      },
    );
    return [token, tokenId];
  }
}
