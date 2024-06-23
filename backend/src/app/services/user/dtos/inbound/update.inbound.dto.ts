import { ApiProperty } from '@nestjs/swagger';

export class UpdateInboundDto {
  @ApiProperty({ example: 'example@gmail.com' })
  email?: string;

  @ApiProperty({ example: 'Vlad' })
  firstName?: string;

  @ApiProperty({ example: 'Sh' })
  lastName?: string;

  @ApiProperty({ example: '**someUrl**' })
  avatar?: string;

  @ApiProperty({ example: '**someText**' })
  description?: string;

  @ApiProperty({ example: 'Kiev' })
  city?: string;

  @ApiProperty({ example: 'Ukraine' })
  country?: string;

  @ApiProperty({ example: '+380686799689' })
  phone?: string;
}
