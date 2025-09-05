import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RegisterResponseDTO {
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
