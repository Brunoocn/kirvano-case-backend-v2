import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário',
    required: false,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email do usuário',
    required: false,
  })
  @IsEmail()
  readonly email: string;
}
