import { ApiProperty } from '@nestjs/swagger';

export class LoginInboundDto {
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}
