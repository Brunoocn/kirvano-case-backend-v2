import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateUserService } from './update-user.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDTO } from '../../dtos/update-user.dto';
import { InMemoryUserRepository } from 'src/test/repositories/in-memory-user-repository';

describe('UpdateUserService', () => {
  let sut: UpdateUserService;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new UpdateUserService(userRepository as any, null as any);
  });

  it('should update user successfully', async () => {
    const user = userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword',
    });
    await userRepository.save(user);

    const updateData: UpdateUserDTO = {
      name: 'John Updated',
      email: 'john.updated@example.com',
    };

    const result = await sut.execute(user.id, updateData);

    expect(result.name).toBe('John Updated');
    expect(result.email).toBe('john.updated@example.com');
    expect(result.id).toBe(user.id);
  });

  it('should throw NotFoundException when user does not exist', async () => {
    const updateData: UpdateUserDTO = { name: 'New Name' };

    await expect(sut.execute('non-existent-id', updateData)).rejects.toThrow(
      new NotFoundException('Usuário não encontrado')
    );
  });

  it('should update only changed fields', async () => {
    const user = userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword',
    });
    await userRepository.save(user);

    // Simula payload completo mas com apenas name alterado
    const updateData: UpdateUserDTO = {
      name: 'John Updated',
      email: 'john@example.com', // Mesmo valor atual
    };

    const result = await sut.execute(user.id, updateData);

    expect(result.name).toBe('John Updated');
    expect(result.email).toBe('john@example.com');
  });
});