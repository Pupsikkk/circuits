import { ApiProperty } from '@nestjs/swagger';

export class SaveNewCircuitInboundDto {
  @ApiProperty({ example: 'label' })
  label: string;

  @ApiProperty({ example: 'description' })
  description: string;

  @ApiProperty({ example: 'logo' })
  logo: string;

  @ApiProperty({ example: 'smth' })
  schema: string;
}
