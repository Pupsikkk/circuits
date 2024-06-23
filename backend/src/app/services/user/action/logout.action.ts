import { BaseAction } from 'src/app/core/interfaces';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class LogoutAction implements BaseAction<[Response], any> {
  constructor(private readonly userService: UserService) {}

  async run(response: Response) {
    response.cookie('acc_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }
}
