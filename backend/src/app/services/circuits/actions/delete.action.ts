import { BaseAction } from 'src/app/core/interfaces';
import { CircuitService } from '../circuit.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/app/core/entities';

@Injectable()
export class DeleteCircuitAction implements BaseAction<[User, number], void> {
  constructor(private readonly circuitService: CircuitService) {}

  async run(user: User, circuitId: number): Promise<void> {
    const circuit = await this.circuitService.getCircuit(circuitId);

    if (circuit.user.id !== user.id) return;
    await this.circuitService.deleteCircuit(circuitId);
  }
}
