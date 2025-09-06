import { Test, TestingModule } from '@nestjs/testing';
import { FindAllTodosService } from './find-all-todos.service';
import { IJSonPlaceholderProvider } from '../../providers/json-placeholder/IJsonPlaceholderProvider';
import { TodoDTO } from '../../dtos/todo.dto';
import { vi } from 'vitest';
import { providersEnum } from 'src/shared/generic-enums/providers-enums';

describe('FindAllTodosService', () => {
  let service: FindAllTodosService;
  let jsonPlaceholderProvider: IJSonPlaceholderProvider;

  const mockTodos: TodoDTO[] = [
    {
      id: '1',
      title: 'Test Todo 1',
      completed: false,
    },
    {
      id: '2',
      title: 'Test Todo 2',
      completed: true,
    },
  ];

  beforeEach(async () => {
    const mockJsonPlaceholderProvider = {
      getTodos: vi.fn().mockResolvedValue(mockTodos),
      getTodoById: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTodosService,
        {
          provide: providersEnum.IJSonPlaceholderProvider,
          useValue: mockJsonPlaceholderProvider,
        },
      ],
    }).compile();

    service = module.get<FindAllTodosService>(FindAllTodosService);
    jsonPlaceholderProvider = module.get<IJSonPlaceholderProvider>(
      providersEnum.IJSonPlaceholderProvider,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return all todos', async () => {
      const result = await service.execute();

      expect(result).toEqual(mockTodos);
      expect(jsonPlaceholderProvider.getTodos).toHaveBeenCalledTimes(1);
    });
  });
});
