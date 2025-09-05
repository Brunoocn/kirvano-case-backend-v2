import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { User } from '../database/entities/user.entity';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { CreateUserService } from './services/create-user/create-user.service';
import { FindAllUsersService } from './services/find-all-users/find-all-users.service';
import { FindUserService } from './services/find-user/find-user.service';
import { UpdateUserService } from './services/update-user/update-user.service';
import { DeleteUserService } from './services/delete-user/delete-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CryptographyModule],
  controllers: [UsersController],
  providers: [
    CreateUserService,
    FindAllUsersService,
    FindUserService,
    UpdateUserService,
    DeleteUserService,
  ],
  exports: [
    CreateUserService,
    FindAllUsersService,
    FindUserService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UsersModule {}