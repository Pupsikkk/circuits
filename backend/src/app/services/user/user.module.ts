import { Module } from '@nestjs/common';
import { DataUserModule } from 'src/app/data-access';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoginAction, LogoutAction, RegisterAction } from './action';
import { UpdateAction } from './action/update.action';

@Module({
  imports: [DataUserModule],
  providers: [
    UserService,
    RegisterAction,
    LoginAction,
    LogoutAction,
    UpdateAction,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
