import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Profile, User, UserData } from 'src/app/core/entities';
import { DataUserService } from 'src/app/data-access';
import { RegisterInboundDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    private readonly dataUsersService: DataUserService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(data: RegisterInboundDto): Promise<User> {
    const existingUser = await this.dataUsersService.getByEmail(data.email);
    if (existingUser) throw new BadRequestException('Such account exist');

    const user = await this.dataUsersService.create(new User(data));
    const profile = await this.dataUsersService.profile.create(
      new Profile({
        firstName: data.firstName,
        lastName: data.lastName,
        user,
        avatar: 'http://localhost:3000/static/emptyProfile.jpeg',
      }),
    );

    user.profile = profile;
    return user;
  }

  public async login(
    data: Pick<UserData, 'email' | 'password'>,
  ): Promise<User> {
    const existingUser = await this.dataUsersService.getByEmail(data.email);
    console.log(existingUser);

    if (!existingUser || existingUser.password !== data.password)
      throw new BadRequestException('Invalid credentials');

    return existingUser;
  }

  public async getAuthorizedUser(req: Request): Promise<User> {
    try {
      const token = String(req?.query['access_token']);

      const tokenData = this.jwtService.decode(token);
      const user = await this.dataUsersService.getById(tokenData.id);

      return user;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }

  public async getToken(payload: any) {
    return await this.jwtService.signAsync(payload);
  }

  public async update(
    id: number,
    data: {
      email?: string;
      firstName?: string;
      lastName?: string;
      avatar?: string;
      description?: string;
      city?: string;
      country?: string;
      phone?: string;
    },
  ): Promise<User> {
    delete (data as any).id;
    const { email, ...profileData } = data;

    const { profile, ...existingUserData } =
      await this.dataUsersService.getById(id);

    const user = new User(existingUserData);
    if (email) user.email = email;
    await this.dataUsersService.update(user);

    Object.assign(profile, profileData);
    await this.dataUsersService.profile.update(profile);

    return this.dataUsersService.getById(id);
  }
}
