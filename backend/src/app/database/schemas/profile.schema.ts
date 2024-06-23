import { Profile } from 'src/app/core/entities';
import { EntitySchema } from 'typeorm';

export const ProfileSchema = new EntitySchema<Profile>({
  name: 'Profile',
  target: Profile,
  tableName: 'profile',
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    firstName: {
      type: 'varchar',
      nullable: false,
    },
    lastName: {
      type: 'varchar',
      nullable: false,
    },
    description: {
      type: 'varchar',
      nullable: true,
    },
    city: {
      type: 'varchar',
      nullable: true,
    },
    phone: {
      type: 'varchar',
      nullable: true,
    },
    country: {
      type: 'varchar',
      nullable: true,
    },
    avatar: {
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
      type: 'one-to-one',
      target: 'User',
      joinColumn: {
        referencedColumnName: 'id',
        name: 'user_id',
      },
    },
  },
});
