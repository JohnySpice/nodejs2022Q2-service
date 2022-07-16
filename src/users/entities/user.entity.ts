import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  @IsUUID()
  @IsNotEmpty()
  id: string; // uuid v4
  login: string;
  @Exclude()
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor({ login, password }: CreateUserDto) {
    this.id = v4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
