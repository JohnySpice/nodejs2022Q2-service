
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  private _storage: User[] = [];

  _findById(id: string) {
    return this._storage.findIndex(user => user.id === id);
  }
  find(): User[] {
    return this._storage;
  }

  findById(id: string): User {
    return this._storage[this._findById(id)];
  }

  create(createUserDto: CreateUserDto): User {
    const newUser = new User(createUserDto);
    this._storage.push(newUser);
    return newUser;
  }

  findByIdAndUpdate(id: string, updateUserPasswordDto: UpdateUserPasswordDto): User {
    const user = this._storage[this._findById(id)];
    if (!user) {
      return;
    }
    if (user.password !== updateUserPasswordDto.oldPassword) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'oldPassowrd is incorrect',
      }, HttpStatus.FORBIDDEN);
    }
    user.password = updateUserPasswordDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return user;
  }

  deleteOne(id: string) {
    const userObjectId = this._findById(id);
    if (userObjectId === -1) {
      return;
    }
    return this._storage.splice(userObjectId, 1);
  }
}