import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { compare, createHash } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await createHash(createUserDto.password);
    const user = this.usersRepository.create({ ...createUserDto, password });
    return this.usersRepository.save(user);
  }

  async findByLogin(login: string): Promise<User> {
    return this.usersRepository.findOne({ where: { login } });
  }

  async login(user: CreateUserDto): Promise<{ accessToken: string; }> {
    const userInDB: User = await this.findByLogin(user.login);
    if (!userInDB || !(await compare(user.password, userInDB.password))) {
      throw new ForbiddenException('Incorrect login or password');
    }
    const payload = { login: userInDB.login, userId: userInDB.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

}
