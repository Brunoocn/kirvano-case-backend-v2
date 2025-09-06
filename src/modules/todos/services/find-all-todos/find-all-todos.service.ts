import { Injectable, Inject } from '@nestjs/common';
import { TodoDTO } from '../../dtos/todo.dto';
import { providersEnum } from 'src/shared/generic-enums/providers-enums';
import { JsonPlaceholderProvider } from '../../providers/json-placeholder/implementations/json-placeholder-provider';

@Injectable()
export class FindAllTodosService {
  constructor(
    @Inject(providersEnum.IJSonPlaceholderProvider)
    private readonly jsonPlaceholderProvider: JsonPlaceholderProvider,
  ) {}

  async execute(): Promise<TodoDTO[]> {
    return await this.jsonPlaceholderProvider.getTodos();
  }
}
