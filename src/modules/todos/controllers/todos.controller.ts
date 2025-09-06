import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FindAllTodosService } from '../services/find-all-todos/find-all-todos.service';
import { FindTodoByIdService } from '../services/find-todo-by-id/find-todo-by-id.service';
import { TodoDTO } from '../dtos/todo.dto';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
export class TodosController {
  constructor(
    private readonly findAllTodosService: FindAllTodosService,
    private readonly findTodoByIdService: FindTodoByIdService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({
    status: 200,
    description: 'Return all todos',
    type: [TodoDTO],
  })
  async findAll(): Promise<TodoDTO[]> {
    return await this.findAllTodosService.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get todo by id' })
  @ApiResponse({
    status: 200,
    description: 'Return todo by id',
    type: TodoDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Todo not found',
  })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<TodoDTO> {
    return await this.findTodoByIdService.execute(id);
  }
}
