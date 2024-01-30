import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isDevMode =
          configService.get<string>('app.nodeEnv') === 'development';

        console.log('CONFIG >>', configService.get('database'));

        return {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          migrations: [`${__dirname}/migrations/*.ts`],
          autoLoadEntities: true,
          synchronize: isDevMode,
          migrationsRun: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
