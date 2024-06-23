import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import * as Migrations from './migrations';
import * as Schemas from './schemas';

config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [...Object.values(Schemas)],
  migrations: [...Object.values(Migrations)],
  logging: ['error'],
};

export default new DataSource({ ...dataSourceOptions });
