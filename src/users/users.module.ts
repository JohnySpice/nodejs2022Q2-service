import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { UsersRepository } from './repository/users.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UsersRepository],
})
export class UserModule {}
