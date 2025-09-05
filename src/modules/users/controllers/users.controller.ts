import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserService } from '../services/create-user/create-user.service';
import { FindAllUsersService } from '../services/find-all-users/find-all-users.service';
import { FindUserService } from '../services/find-user/find-user.service';
import { UpdateUserService } from '../services/update-user/update-user.service';
import { DeleteUserService } from '../services/delete-user/delete-user.service';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UserResponseDTO } from '../dtos/user-response.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUsersService: FindAllUsersService,
    private readonly findUserService: FindUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar usuário(s)',
    description:
      'Cria um ou múltiplos usuários no sistema. Aceita um objeto único ou array de objetos.',
  })
  @ApiBody({
    description: 'Dados do usuário ou lista de usuários',
    examples: {
      'single-user': {
        summary: 'Criar um usuário',
        description: 'Exemplo para criar apenas um usuário',
        value: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'strongpassword123',
        },
      },
      'multiple-users': {
        summary: 'Criar múltiplos usuários',
        description: 'Exemplo para criar vários usuários de uma vez',
        value: [
          {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'strongpassword123',
          },
          {
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: 'anotherpassword456',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário(s) criado(s) com sucesso',
    type: [UserResponseDTO],
  })
  @ApiResponse({
    status: 400,
    description: 'Email já cadastrado, emails duplicados ou senha muito curta',
  })
  create(@Body() body: CreateUserDTO | CreateUserDTO[]) {
    if (Array.isArray(body)) {
      return this.createUserService.executeBatch({ users: body });
    }
    return this.createUserService.execute(body);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários',
    description: 'Retorna uma lista com todos os usuários cadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: [UserResponseDTO],
  })
  findAll() {
    return this.findAllUsersService.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar usuário por ID',
    description: 'Retorna os dados de um usuário específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: UserResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.findUserService.execute(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar usuário',
    description: 'Atualiza os dados de um usuário existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: UserResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Email já cadastrado',
  })
  update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.updateUserService.execute(id, updateUserDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover usuário',
    description: 'Remove um usuário do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuário removido com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  remove(@Param('id') id: string) {
    return this.deleteUserService.execute(id);
  }
}
