import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/database/entities/user.entity';
import { UpdateUserDTO } from '../../dtos/update-user.dto';
import { formatUserWithoutPassword } from '../../utils/formatUserWithoutPassword';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(id: string, updateUserDTO: UpdateUserDTO) {
    const user = await this.findUserOrFail(id);

    user.name = updateUserDTO.name;
    user.email = updateUserDTO.email;

    await this.userRepository.save(user);

    return formatUserWithoutPassword(user);
  }

  async findUserOrFail(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }
}
