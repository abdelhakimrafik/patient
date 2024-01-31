import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(@ActiveUser('id') userId: string) {
    return this.usersService.findOne(userId);
  }
}
