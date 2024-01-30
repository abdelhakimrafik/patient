import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'patient',
  logging: true,
  entities: [`${__dirname}/../**/*.entity.ts`],
  migrations: [`${__dirname}/migrations/**/*.ts`],
  synchronize: false,
  migrationsRun: false,
});
