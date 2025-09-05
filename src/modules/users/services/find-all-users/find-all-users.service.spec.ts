import { describe, it, expect, beforeEach } from 'vitest';
import { FindAllUsersService } from './find-all-users.service';
import { InMemoryUserRepository } from 'src/test/repositories/in-memory-user-repository';

describe('FindAllUsersService', () => {
  let sut: FindAllUsersService;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new FindAllUsersService(userRepository as any);
  });

  it('should return all users', async () => {
    const user1 = userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword',
    });
    const user2 = userRepository.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'hashedpassword',
    });

    await userRepository.save(user1);
    await userRepository.save(user2);

    const result = await sut.execute();

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      id: user1.id,
      name: user1.name,
      email: user1.email,
    });
    expect(result[1]).toMatchObject({
      id: user2.id,
      name: user2.name,
      email: user2.email,
    });
  });

  it('should return empty array when no users exist', async () => {
    const result = await sut.execute();

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});