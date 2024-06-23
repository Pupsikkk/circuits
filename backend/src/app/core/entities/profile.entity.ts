import { BaseEntity } from '../interfaces';
import { User } from './user.entity';

export interface ProfileData {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  description: string;
  city: string;
  country: string;
  phone: string;
  updatedAt: Date;
  createdAt: Date;
  user?: User;
}

export interface Profile extends ProfileData {}
export class Profile extends BaseEntity<ProfileData> {}
