import { User } from 'src/modules/database/entities/user.entity';

export function formatUserWithoutPassword(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
