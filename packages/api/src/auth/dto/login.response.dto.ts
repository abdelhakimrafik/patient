import { User } from 'src/users/entities/user.entity';
import { TokensResponseDto } from './tokens.response.dto';

export class LoginResponseDto {
  user: User;
  tokens: TokensResponseDto;
}
