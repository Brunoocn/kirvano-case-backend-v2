import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateUserService } from './create-user.service';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDTO } from '../../dtos/create-user.dto';
import { HashGenerator } from 'src/modules/cryptography/abstract/hash-generator';
import { InMemoryUserRepository } from 'src/test/repositories/in-memory-user-repository';

class HashGeneratorMock implements HashGenerator {
  public hashSpy = vi.fn();

  async hash(value: string): Promise<string> {
    this.hashSpy(value);
    return `hashed-${value}`;
  }
}

describe('CreateUserService', () => {
  let sut: CreateUserService;
  let userRepository: InMemoryUserRepository;
  let hashGenerator: HashGeneratorMock;

  const makeFakeUserData = (
    overrides: Partial<CreateUserDTO> = {},
  ): CreateUserDTO => ({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
    ...overrides,
  });

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hashGenerator = new HashGeneratorMock();
    sut = new CreateUserService(userRepository as any, hashGenerator);
  });

  it('should create a new user successfully', async () => {
    const userData = makeFakeUserData();

    const result = await sut.execute(userData);

    expect(result).toMatchObject({
      id: expect.any(String),
      name: userData.name,
      email: userData.email,
    });
    expect(result).not.toHaveProperty('password');
  });

  it('should hash the password before saving', async () => {
    const userData = makeFakeUserData({ password: 'mypassword' });

    await sut.execute(userData);

    expect(hashGenerator.hashSpy).toHaveBeenCalledWith('mypassword');
  });

  it('should throw BadRequestException when email already exists', async () => {
    const userData = makeFakeUserData();
    await sut.execute(userData);

    await expect(sut.execute(userData)).rejects.toThrow(
      new BadRequestException('Email já cadastrado'),
    );
  });

  it('should throw BadRequestException when password is too short', async () => {
    const userData = makeFakeUserData({ password: '12345' });

    await expect(sut.execute(userData)).rejects.toThrow(
      new BadRequestException('Senha deve ter no mínimo 6 caracteres'),
    );
  });

  describe('Batch Creation', () => {
    const makeFakeBatchData = (users: Partial<CreateUserDTO>[] = []) => ({
      users: users.map((user) => ({
        name: 'User',
        email: 'user@example.com',
        password: '123456',
        ...user,
      })),
    });

    it('should create multiple users successfully', async () => {
      const batchData = makeFakeBatchData([
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
      ]);

      const result = await sut.executeBatch(batchData);

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john@example.com',
      });
      expect(result[1]).toMatchObject({
        id: expect.any(String),
        name: 'Jane Smith',
        email: 'jane@example.com',
      });
    });

    it('should throw BadRequestException when there are duplicate emails in batch', async () => {
      const batchData = makeFakeBatchData([
        { name: 'John Doe', email: 'duplicate@example.com' },
        { name: 'Jane Smith', email: 'duplicate@example.com' },
      ]);

      await expect(sut.executeBatch(batchData)).rejects.toThrow(
        new BadRequestException('Existem emails duplicados no batch'),
      );
    });

    it('should throw BadRequestException when any password is too short', async () => {
      const batchData = makeFakeBatchData([
        { name: 'John Doe', email: 'john@example.com', password: 'valid123' },
        { name: 'Jane Smith', email: 'jane@example.com', password: '123' },
      ]);

      await expect(sut.executeBatch(batchData)).rejects.toThrow(
        new BadRequestException(
          'Senha do usuário jane@example.com deve ter no mínimo 6 caracteres',
        ),
      );
    });
  });
});
