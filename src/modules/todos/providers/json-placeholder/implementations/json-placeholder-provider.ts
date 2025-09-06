import { Injectable } from '@nestjs/common';

import axios, { Axios } from 'axios';
import { IJSonPlaceholderProvider } from '../IJsonPlaceholderProvider';
import { TodoDTO } from 'src/modules/todos/dtos/todo.dto';

@Injectable()
export class JsonPlaceholderProvider implements IJSonPlaceholderProvider {
  private jsonPlaceholderApi: Axios;

  constructor() {
    this.jsonPlaceholderApi = axios.create({
      baseURL: process.env.API_URL_JSON_PLACEHOLDER,
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
