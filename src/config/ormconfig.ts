import 'dotenv/config';
import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  migrationsRun: false,
  entities: [resolve(__dirname, '../users/entities/user.entity.{js,ts}')],
  migrations: [resolve(__dirname, '../migrations/*.{ts,js}')],
  logging: true,
  logger: 'file',
  cli: {
    migrationsDir: resolve(__dirname + '/src/migrations'),
    entityDir: resolve(__dirname + '../users/entities'),
  },
} as DataSourceOptions;
