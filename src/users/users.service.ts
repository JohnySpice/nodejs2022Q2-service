import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async update(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {
    const user: User = await this.findOne(id);
    if (!user) {
      return user;
    }
    if (user.password !== updateUserPasswordDto.oldPassword) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'old password is incorrect',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    await this.usersRepository.save({
      id: id,
      password: updateUserPasswordDto.newPassword,
    });
    return await this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.usersRepository.delete({ id: id });
    return result.affected ? result.raw : null;
  }
}
