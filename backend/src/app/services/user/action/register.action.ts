import { BaseAction } from 'src/app/core/interfaces';
import { UserService } from '../user.service';
import { RegisterInboundDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ProfileMapper } from '../mappers';

@Injectable()
export class RegisterAction
  implements BaseAction<[RegisterInboundDto, Response], any>
{
  constructor(private readonly userService: UserService) {}

  async run(dto: RegisterInboundDto) {
    const user = await this.userService.register(dto);
    const token = await this.userService.getToken({ id: user.id });

    return { profile: new ProfileMapper(user).transform(), token };
  }
}
