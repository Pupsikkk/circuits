import { ApiProperty } from '@nestjs/swagger';

export class RegisterInboundDto {
  @ApiProperty({ example: 'Vlad' })
  firstName: string;

  @ApiProperty({ example: 'Sh' })
  lastName: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}
