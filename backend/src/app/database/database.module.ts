import { DynamicModule, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitySchema } from 'typeorm';

import * as Migrations from './migrations';
import * as Schemas from './schemas';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        migrations: [...Object.values(Migrations)],
        entities: [...Object.values(Schemas)],
        synchronize: false,
        logging: ['error'],
        migrationsRun: true,
      }),
    }),
  ],
})
export class DatabaseModule {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static forFeature(entities?: (Function | EntitySchema)[]): DynamicModule {
    return TypeOrmModule.forFeature(entities);
  }
}
