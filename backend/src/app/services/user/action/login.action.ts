import { BaseAction } from 'src/app/core/interfaces';
import { UserService } from '../user.service';
import { LoginInboundDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class LoginAction
  implements BaseAction<[LoginInboundDto, Response], any>
{
  constructor(private readonly userService: UserService) {}

  async run(dto: LoginInboundDto, response: Response) {
    const user = await this.userService.login(dto);

    const token = await this.userService.getToken({ id: user.id });
    response.cookie('acc_token', token, {
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
      domain: 'localhost',
    });

    return token;
  }
}
