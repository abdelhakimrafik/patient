import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from 'src/config/jwt.config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, JwtModule.registerAsync(jwtConfig.asProvider())],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
