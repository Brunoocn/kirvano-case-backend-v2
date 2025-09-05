import { describe, it, expect, beforeEach } from 'vitest';
import { FindUserService } from './find-user.service';
import { NotFoundException } from '@nestjs/common';
import { InMemoryUserRepository } from 'src/test/repositories/in-memory-user-repository';

describe('FindUserService', () => {
  let sut: FindUserService;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new FindUserService(userRepository as any);
  });

  it('should find and return user by id', async () => {
    const user = userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedpassword',
    });
    await userRepository.save(user);

    const result = await sut.execute(user.id);

    expect(result).toMatchObject({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should throw NotFoundException when user does not exist', async () => {
    const nonExistentId = 'non-existent-id';

    await expect(sut.execute(nonExistentId)).rejects.toThrow(
      new NotFoundException('Usuário não encontrado')
    );
  });
});