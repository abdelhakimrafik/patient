import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => {
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    database: parseInt(process.env.REDIS_DATABASE) || 0,
    keyPrefix: process.env.REDIS_KEY_PREFIX,
  };
});
