import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions & { refreshExpiresIn: string } => {
    return {
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_TTL || '300s',
      },
      refreshExpiresIn: process.env.JWT_REFRESH_TOKEN_TTL || '30000s',
    };
  },
);
