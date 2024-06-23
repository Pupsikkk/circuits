import { BaseEntity } from '../interfaces';
import { Circuit } from './circuit.entity';
import { Profile } from './profile.entity';

export interface UserData {
  id: number;
  email: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
  profile?: Profile;
  circuits?: Circuit[];
}

export interface User extends UserData {}
export class User extends BaseEntity<UserData> {}
