import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { LoginAction, LogoutAction, RegisterAction } from './action';
import { LoginInboundDto, RegisterInboundDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UpdateInboundDto } from './dtos/inbound/update.inbound.dto';
import { UpdateAction } from './action/update.action';
import { ProfileMapper } from './mappers';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(
    private readonly registerAction: RegisterAction,
    private readonly loginAction: LoginAction,
    private readonly logoutAction: LogoutAction,
    private readonly updateAction: UpdateAction,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterInboundDto) {
    return this.registerAction.run(dto);
  }

  @Post('login')
  login(
    @Body() dto: LoginInboundDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.loginAction.run(dto, response);
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.logoutAction.run(response);
  }

  @Get('profile')
  async check(@Req() req: Request) {
    const authorizedUser = await this.userService.getAuthorizedUser(req);
    console.log(authorizedUser);
    return new ProfileMapper(authorizedUser).transform();
  }

  @Put('update')
  async update(
    @Req() req: Request,
    @Body() body: UpdateInboundDto,
  ): Promise<any> {
    const authorizedUser = await this.userService.getAuthorizedUser(req);
    return this.updateAction.run(authorizedUser.id, body);
  }
}
