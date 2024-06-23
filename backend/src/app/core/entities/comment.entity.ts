import { BaseEntity } from '../interfaces';
import { Circuit } from './circuit.entity';
import { User } from './user.entity';

export interface CommentData {
  id: number;
  rate: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  circuit?: Circuit;
}

export interface Comment extends CommentData {}
export class Comment extends BaseEntity<CommentData> {}
