import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  signOut(@ActiveUser('id') userId: string) {
    return this.usersService.findOne(userId);
  }
}
