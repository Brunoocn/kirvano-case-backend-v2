import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteUserService } from './delete-user.service';
import { NotFoundException } from '@nestjs/common';
import { InMemoryUserRepository } from 'src/test/repositories/in-memory-user-repository';

describe('DeleteUserService', () => {
  let sut: DeleteUserService;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new DeleteUserService(userRepository as any);
  });

  it('should delete user successfully', async () => {
    const user = userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword',
    });
    await userRepository.save(user);

    await sut.execute(user.id);

    const deletedUser = await userRepository.findOne({ where: { id: user.id } });
    expect(deletedUser).toBeNull();
  });

  it('should throw NotFoundException when user does not exist', async () => {
    const nonExistentId = 'non-existent-id';

    await expect(sut.execute(nonExistentId)).rejects.toThrow(
      new NotFoundException('Usuário não encontrado')
    );
  });
});