import { Injectable } from '@nestjs/common';
import { BaseAction } from 'src/app/core/interfaces';
import { UpdateInboundDto } from '../dtos';
import { UserService } from '../user.service';
import { ProfileMapper } from '../mappers';

@Injectable()
export class UpdateAction
  implements BaseAction<[number, UpdateInboundDto], any>
{
  constructor(private readonly userService: UserService) {}

  async run(userId: number, dto: UpdateInboundDto) {
    const user = await this.userService.update(userId, dto);

    return new ProfileMapper(user).transform();
  }
}
