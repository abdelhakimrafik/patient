import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IORedisKey } from './redis.constants';
import { Redis } from 'ioredis';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: IORedisKey,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        new Redis({
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
          username: configService.get<string>('redis.username'),
          password: configService.get<string>('redis.password'),
          db: configService.get<number>('redis.database'),
          keyPrefix: configService.get<string>('redis.keyPrefix'),
        }),
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
