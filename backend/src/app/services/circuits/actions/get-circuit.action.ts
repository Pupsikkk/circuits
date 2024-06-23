import { BaseAction } from 'src/app/core/interfaces';
import { CircuitService } from '../circuit.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetCircuitAction implements BaseAction<[number], any> {
  constructor(private readonly circuitService: CircuitService) {}

  async run(circuitId: number) {
    const userCircuit = await this.circuitService.getCircuit(circuitId);
    return userCircuit;
  }
}
