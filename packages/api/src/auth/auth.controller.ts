import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { TokensResponseDto } from './dto/tokens.response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './auth.service';
import { ActiveUser } from './decorators/active-user.decorator';
import { Public } from './decorators/public.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @ActiveUser() user: User,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(user);
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshToken(@ActiveUser('id') id: string): Promise<TokensResponseDto> {
    return await this.authService.generateTokens(id);
  }

  @ApiBearerAuth('access-token')
  @Post('logout')
  async logout(@ActiveUser('id') id: string): Promise<void> {
    await this.authService.logout(id);
  }
}
