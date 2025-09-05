import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserBaseDTO } from 'src/common/dtos/user-base.dto';

export class LoginResponseDTO {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT para autenticação',
  })
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @ApiProperty({
    description: 'Dados do usuário logado',
    type: UserBaseDTO,
  })
  @ValidateNested()
  @Type(() => UserBaseDTO)
  @IsNotEmpty()
  readonly user: UserBaseDTO;
}
