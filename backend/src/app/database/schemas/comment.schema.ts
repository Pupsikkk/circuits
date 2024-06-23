import { Circuit, Comment } from 'src/app/core/entities';
import { EntitySchema } from 'typeorm';

export const CommentSchema = new EntitySchema<Comment>({
  name: 'Comment',
  target: Comment,
  tableName: 'comments',
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    rate: {
      type: 'integer',
    },
    text: {
      type: 'varchar',
      nullable: true,
    },
    updatedAt: {
      type: 'timestamptz',
      updateDate: true,
    },
    createdAt: {
      type: 'timestamptz',
      createDate: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        referencedColumnName: 'id',
        name: 'user_id',
      },
    },
    circuit: {
      type: 'many-to-one',
      target: 'Circuit',
      joinColumn: {
        referencedColumnName: 'id',
        name: 'circuit_id',
      },
    },
  },
});
