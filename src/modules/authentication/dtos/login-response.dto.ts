import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UserResponseDTO {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID único do usuário',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

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
    type: UserResponseDTO,
  })
  @ValidateNested()
  @Type(() => UserResponseDTO)
  @IsNotEmpty()
  readonly user: UserResponseDTO;
}
