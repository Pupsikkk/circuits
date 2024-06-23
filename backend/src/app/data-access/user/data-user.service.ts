import { Injectable } from '@nestjs/common';
import { User } from 'src/app/core/entities';
import { EntityManager } from 'typeorm';
import { ProfileResource } from './resource';

@Injectable()
export class DataUserService {
  constructor(
    public readonly profile: ProfileResource,
    private readonly entityManager: EntityManager,
  ) {}

  async getById(id: number) {
    return this.entityManager.findOne(User, {
      where: { id },
      relations: { profile: true },
    });
  }

  async getByEmail(email: string) {
    return this.entityManager.findOne(User, {
      where: { email },
      relations: { profile: true },
    });
  }

  async create(userData: User) {
    return this.entityManager.save(new User({ ...userData }));
  }

  async update(user: User) {
    return this.entityManager.save(user);
  }
}
