import { Injectable } from '@nestjs/common';
import { Circuit } from 'src/app/core/entities';
import { EntityManager } from 'typeorm';

@Injectable()
export class DataCircuitService {
  constructor(private readonly entityManager: EntityManager) {}

  public async create(circuit: Circuit): Promise<Circuit> {
    return this.entityManager.save(circuit);
  }

  public async getCircuitByUserId(userId: number): Promise<Circuit[]> {
    return this.entityManager.find(Circuit, {
      where: { user: { id: userId } },
      relations: {
        user: true,
      },
    });
  }

  public async getById(id: number): Promise<Circuit> {
    return this.entityManager.findOne(Circuit, {
      where: { id },
      relations: { user: true },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.entityManager.delete(Circuit, { id });
  }
}
