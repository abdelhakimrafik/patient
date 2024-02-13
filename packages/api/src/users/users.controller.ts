import { Controller, Delete, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getCurrentUser(@ActiveUser() user: User): Promise<User> {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  async deleteCurrentUser(@ActiveUser('id') userId: string): Promise<boolean> {
    return await this.usersService.delete(userId);
  }
}
