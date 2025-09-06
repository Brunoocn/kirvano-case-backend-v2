import { Test, TestingModule } from '@nestjs/testing';
import { FindTodoByIdService } from './find-todo-by-id.service';
import { IJSonPlaceholderProvider } from '../../providers/json-placeholder/IJsonPlaceholderProvider';
import { TodoDTO } from '../../dtos/todo.dto';
import { vi } from 'vitest';
import { providersEnum } from 'src/shared/generic-enums/providers-enums';

describe('FindTodoByIdService', () => {
  let service: FindTodoByIdService;
  let jsonPlaceholderProvider: IJSonPlaceholderProvider;

  const mockTodo: TodoDTO = {
    id: '1',
    title: 'Test Todo',
    completed: false,
  };

  beforeEach(async () => {
    const mockJsonPlaceholderProvider = {
      getTodos: vi.fn(),
      getTodoById: vi.fn().mockResolvedValue(mockTodo),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindTodoByIdService,
        {
          provide: providersEnum.IJSonPlaceholderProvider,
          useValue: mockJsonPlaceholderProvider,
        },
      ],
    }).compile();

    service = module.get<FindTodoByIdService>(FindTodoByIdService);
    jsonPlaceholderProvider = module.get<IJSonPlaceholderProvider>(
      providersEnum.IJSonPlaceholderProvider,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return a todo by id', async () => {
      const todoId = 1;
      const result = await service.execute(todoId);

      expect(result).toEqual(mockTodo);
      expect(jsonPlaceholderProvider.getTodoById).toHaveBeenCalledWith(todoId);
      expect(jsonPlaceholderProvider.getTodoById).toHaveBeenCalledTimes(1);
    });
  });
});
