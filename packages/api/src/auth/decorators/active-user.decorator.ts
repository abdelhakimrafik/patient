import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

type UserField = keyof Omit<User, 'password'>;

export const ActiveUser = createParamDecorator(
  (
    field: UserField | undefined,
    context: ExecutionContext,
  ): User | User[UserField] => {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    return field ? user?.[field] : user;
  },
);
