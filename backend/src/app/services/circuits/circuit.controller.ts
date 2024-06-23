import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { SaveNewCircuitAction } from './actions/save-new-circuit.action';
import { Request } from 'express';
import { SaveNewCircuitInboundDto } from './dto';
import { UserService } from '../user/user.service';
import { GetUserCircuitsAction } from './actions/get-user-circuits.action';
import { GetCircuitAction } from './actions/get-circuit.action';
import { DeleteCircuitAction } from './actions/delete.action';

@Controller('circuit')
export class CircuitController {
  constructor(
    private readonly userService: UserService,
    private readonly saveNewCircuitAction: SaveNewCircuitAction,
    private readonly getUserCircuitsAction: GetUserCircuitsAction,
    private readonly getCircuitAction: GetCircuitAction,
    private readonly deleteCircuitAction: DeleteCircuitAction,
  ) {}

  @Get()
  async getUserCircuits(@Req() req: Request): Promise<any> {
    const authorizedUser = await this.userService.getAuthorizedUser(req);
    return this.getUserCircuitsAction.run(authorizedUser.id);
  }

  @Get(':id')
  async getCircuit(
    @Param('id', new ParseIntPipe()) circuitId: number,
  ): Promise<any> {
    return this.getCircuitAction.run(circuitId);
  }

  @Post('save')
  async saveNewCircuit(
    @Req() req: Request,
    @Body() dto: SaveNewCircuitInboundDto,
  ): Promise<any> {
    const authorizedUser = await this.userService.getAuthorizedUser(req);
    return this.saveNewCircuitAction.run(authorizedUser, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCircuit(
    @Req() req: Request,
    @Param('id', new ParseIntPipe()) circuitId: number,
  ): Promise<void> {
    const authorizedUser = await this.userService.getAuthorizedUser(req);
    await this.deleteCircuitAction.run(authorizedUser, circuitId);
  }
}
