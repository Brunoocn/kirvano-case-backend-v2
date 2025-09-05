import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { UserBaseDTO } from 'src/common/dtos/user-base.dto';

export class UserResponseDTO extends UserBaseDTO {
  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Data de criação do usuário',
  })
  @IsDateString()
  @IsNotEmpty()
  readonly createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Data de última atualização do usuário',
  })
  @IsDateString()
  @IsNotEmpty()
  readonly updatedAt: Date;
}