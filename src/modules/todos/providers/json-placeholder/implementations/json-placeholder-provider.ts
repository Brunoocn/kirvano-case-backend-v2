import { Injectable } from '@nestjs/common';

import axios, { Axios } from 'axios';
import { IJSonPlaceholderProvider } from '../IJsonPlaceholderProvider';
import { TodoDTO } from 'src/modules/todos/dtos/todo.dto';

@Injectable()
export class JsonPlaceholderProvider implements IJSonPlaceholderProvider {
  private jsonPlaceholderApi: Axios;
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor() {
    this.jsonPlaceholderApi = axios.create({
      baseURL: this.apiUrl,
    });
  }

  async getTodos(): Promise<TodoDTO[]> {
    const { data } = await this.jsonPlaceholderApi.get<TodoDTO[]>('/todos');
    return data.map((todo) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }));
  }

  async getTodoById(id: number): Promise<TodoDTO> {
    const { data } = await this.jsonPlaceholderApi.get<TodoDTO>(`/todos/${id}`);
    return {
      id: data.id,
      title: data.title,
      completed: data.completed,
    };
  }
}
