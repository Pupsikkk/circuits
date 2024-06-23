import { Injectable } from '@nestjs/common';
import { Circuit, User } from 'src/app/core/entities';
import { DataCircuitService } from 'src/app/data-access';

@Injectable()
export class CircuitService {
  constructor(private readonly dataCircuitService: DataCircuitService) {}

  async saveNewCircuit(data: {
    user: User;
    logo: string;
    label: string;
    schema: string;
    description: string;
  }): Promise<Circuit> {
    return this.dataCircuitService.create(new Circuit(data));
  }

  async getUserCircuits(userId: number): Promise<Circuit[]> {
    return this.dataCircuitService.getCircuitByUserId(userId);
  }

  async getCircuit(circuitId: number): Promise<Circuit> {
    return this.dataCircuitService.getById(circuitId);
  }

  async deleteCircuit(circuitId: number): Promise<void> {
    await this.dataCircuitService.delete(circuitId);
  }
}
