import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { JwtModule } from '@nestjs/jwt';
import { DataUserModule } from './data-access';
import { UserModule } from './services/user/user.module';
import { FilesModule } from './services/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CircuitModule } from './services/circuits/circuit.module';

@Module({
  imports: [
    DatabaseModule,
    DataUserModule,
    UserModule,
    FilesModule,
    CircuitModule,
    JwtModule.register({
      global: true,
      secret: 'SomeSecretForTest',
      signOptions: { expiresIn: '60d' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
  ],
})
export class AppModule {}
