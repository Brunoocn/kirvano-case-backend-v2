import { TodoDTO } from '../../dtos/todo.dto';

export interface IJSonPlaceholderProvider {
  getTodos(): Promise<TodoDTO[]>;
  getTodoById(id: number): Promise<TodoDTO>;
}
