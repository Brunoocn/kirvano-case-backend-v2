import { randomUUID } from 'node:crypto';
import { User } from 'src/modules/database/entities/user.entity';

export class InMemoryUserRepository {
  private users: User[] = [];

  async findOne({
    where: { email },
  }: {
    where: { email: string };
  }): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  create(data: { name: string; email: string; password: string }): User {
    return {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    } as User;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
