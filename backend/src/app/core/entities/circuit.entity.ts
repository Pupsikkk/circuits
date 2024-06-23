import { BaseEntity } from '../interfaces';
import { Comment } from './comment.entity';
import { User } from './user.entity';

export interface CircuitData {
  id: number;
  label: string;
  description: string;
  logo: string;
  schema: string;
  updatedAt: Date;
  createdAt: Date;
  user?: User;
  comments?: Comment[];
}

export interface Circuit extends CircuitData {}
export class Circuit extends BaseEntity<CircuitData> {}
