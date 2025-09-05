import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/database/entities/user.entity';
import { formatUserWithoutPassword } from '../../utils/formatUserWithoutPassword';

@Injectable()
export class FindAllUsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute() {
    const users = await this.userRepository.find();
    return users.map((user) => formatUserWithoutPassword(user));
  }
}
