import { Module } from '@nestjs/common';
import { DataUserService } from './data-user.service';
import { ProfileResource } from './resource';

@Module({
  providers: [DataUserService, ProfileResource],
  exports: [DataUserService],
})
export class DataUserModule {}
