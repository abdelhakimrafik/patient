import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import jwtConfig from 'src/config/jwt.config';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
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

    return await this.generateAccessToken(user);
  }

  async signUp(signUpDto: SignUpDto) {
    return await this.usersService.create(signUpDto);
  }

  async signOut(userId: string): Promise<void> {
    this.redisService.delete(`user-${userId}`);
  }

  private async generateAccessToken(user: User) {
    const tokenId = randomUUID();

    await this.redisService.insert(`user-${user.id}`, tokenId);

    const payload = { id: user.id, tokenId };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfiguration.secret,
      expiresIn: this.jwtConfiguration.signOptions.expiresIn,
    });
    return {
      access_token: accessToken,
    };
  }
}
