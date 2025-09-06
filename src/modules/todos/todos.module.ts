import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos.controller';
import { FindAllTodosService } from './services/find-all-todos/find-all-todos.service';
import { FindTodoByIdService } from './services/find-todo-by-id/find-todo-by-id.service';
import { JsonPlaceholderProvider } from './providers/json-placeholder/implementations/json-placeholder-provider';
import { providersEnum } from 'src/shared/generic-enums/providers-enums';

@Module({
  controllers: [TodosController],
  providers: [
    FindAllTodosService,
    FindTodoByIdService,
    {
      provide: providersEnum.IJSonPlaceholderProvider,
      useClass: JsonPlaceholderProvider,
    },
  ],
})
export class TodosModule {}
