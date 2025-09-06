import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/database/entities/user.entity';
import { CreateUserDTO } from '../../dtos/create-user.dto';
import { HashGenerator } from 'src/modules/cryptography/abstract/hash-generator';
import { formatUserWithoutPassword } from '../../utils/formatUserWithoutPassword';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(createUserDTO: CreateUserDTO) {
    const userExists = await this.userRepository.findOne({
      where: { email: createUserDTO.email },
    });

    if (userExists) {
      throw new BadRequestException('Email já cadastrado');
    }

    if (!this.isPasswordLengthValid(createUserDTO.password)) {
      throw new BadRequestException('Senha deve ter no mínimo 6 caracteres');
    }

    const hashedPassword = await this.hashPassword(createUserDTO.password);

    const user = this.userRepository.create({
      ...createUserDTO,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return formatUserWithoutPassword(user);
  }

  async executeBatch(batchData: { users: CreateUserDTO[] }) {
    const { users } = batchData;

    const emails = users.map((user) => user.email);
    const uniqueEmails = new Set(emails);

    if (emails.length !== uniqueEmails.size) {
      throw new BadRequestException('Existem emails duplicados no batch');
    }

    const existingUsers = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email IN (:...emails)', { emails })
      .getMany();

    if (existingUsers.length > 0) {
      const existingEmails = existingUsers.map((user) => user.email);
      throw new BadRequestException(
        `Emails já cadastrados: ${existingEmails.join(', ')}`,
      );
    }

    for (const userData of users) {
      if (!this.isPasswordLengthValid(userData.password)) {
        throw new BadRequestException(
          `Senha do usuário ${userData.email} deve ter no mínimo 6 caracteres`,
        );
      }
    }

    const usersToCreate = await Promise.all(
      users.map(async (userData) => {
        const hashedPassword = await this.hashPassword(userData.password);
        return this.userRepository.create({
          ...userData,
          password: hashedPassword,
        });
      }),
    );

    const savedUsers = await this.userRepository.save(usersToCreate);

    return savedUsers.map((user) => formatUserWithoutPassword(user));
  }

  private isPasswordLengthValid(password: string): boolean {
    return password.length >= 6;
  }

  private async hashPassword(password: string) {
    return await this.hashGenerator.hash(password);
  }
}
