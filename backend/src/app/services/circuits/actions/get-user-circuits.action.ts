import { BaseAction } from 'src/app/core/interfaces';
import { CircuitService } from '../circuit.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserCircuitsAction implements BaseAction<[number], any> {
  constructor(private readonly circuitService: CircuitService) {}

  async run(userId: number) {
    const userCircuits = await this.circuitService.getUserCircuits(userId);
    return userCircuits;
  }
}
