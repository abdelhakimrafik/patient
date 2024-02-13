import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessTokenTTL: process.env.JWT_ACCESS_TOKEN_TTL || '5m',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshTokenTTL: process.env.JWT_REFRESH_TOKEN_TTL || '7d',
  };
});
