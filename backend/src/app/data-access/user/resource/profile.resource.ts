import { Injectable } from '@nestjs/common';
import { Profile } from 'src/app/core/entities';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProfileResource {
  constructor(private readonly entityManager: EntityManager) {}

  public async create(profile: Profile): Promise<Profile> {
    return this.entityManager.save(profile);
  }

  public async update(profile: Profile): Promise<Profile> {
    return this.entityManager.save(profile);
  }
}
