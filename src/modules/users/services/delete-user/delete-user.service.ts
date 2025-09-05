import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/database/entities/user.entity';

@Injectable()
export class DeleteUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(id: string) {
    try {
      const user = await this.findUserOrFail(id);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      await this.userRepository.remove(user);
    } catch (error) {
      console.log(error, 'erro');
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Erro ao deletar o usuário');
    }
  }

  private async findUserOrFail(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
