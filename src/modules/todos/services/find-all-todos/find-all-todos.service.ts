import { Injectable, Inject } from '@nestjs/common';
import { IJSonPlaceholderProvider } from '../../providers/json-placeholder/IJsonPlaceholderProvider';
import { TodoDTO } from '../../dtos/todo.dto';
import { providersEnum } from 'src/shared/generic-enums/providers-enums';

@Injectable()
export class FindAllTodosService {
  constructor(
    @Inject(providersEnum.IJSonPlaceholderProvider)
    private readonly jsonPlaceholderProvider: IJSonPlaceholderProvider,
  ) { }

  async execute(): Promise<TodoDTO[]> {
    return await this.jsonPlaceholderProvider.getTodos();
  }
}
