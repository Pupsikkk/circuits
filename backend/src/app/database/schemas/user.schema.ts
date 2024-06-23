import { User } from 'src/app/core/entities/user.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'user',
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    createdAt: {
      type: 'timestamptz',
      createDate: true,
    },
  },
  relations: {
    circuits: {
      type: 'one-to-many',
      target: 'Circuit',
      inverseSide: 'circuits',
    },
    profile: {
      type: 'one-to-one',
      target: 'Profile',
      inverseSide: 'user',
    },
  },
});
