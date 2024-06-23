import { Circuit } from 'src/app/core/entities';
import { EntitySchema } from 'typeorm';

export const CircuitSchema = new EntitySchema<Circuit>({
  name: 'Circuit',
  target: Circuit,
  tableName: 'circuit',
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    label: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
    },
    logo: {
      type: 'varchar',
    },
    schema: {
      type: 'varchar',
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
    comments: {
      type: 'one-to-many',
      target: 'Comment',
      inverseSide: 'circuit',
    },
  },
});
