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
    return data;
  }

  async getTodoById(id: number): Promise<TodoDTO> {
    const { data } = await this.jsonPlaceholderApi.get<TodoDTO>(`/todos/${id}`);
    return data;
  }
}
