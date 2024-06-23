import { User } from 'src/app/core/entities';

export class ProfileMapper {
  constructor(private readonly user: User) {}

  transform() {
    if (!this.user) return null;

    return {
      id: this.user.id,
      email: this.user.email,
      firstName: this.user?.profile?.firstName || null,
      lastName: this.user?.profile?.lastName || null,
      description: this.user?.profile?.description || null,
      city: this.user?.profile?.city || null,
      country: this.user?.profile?.country || null,
      phone: this.user?.profile?.phone || null,
      avatar: this.user?.profile?.avatar || null,
    };
  }
}
