import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { compare, createHash } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

export type LoginResponse = {
  accessToken: string,
  refreshToken: string;
};
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await createHash(createUserDto.password);
    const user = this.usersRepository.create({ ...createUserDto, password });
    return this.usersRepository.save(user);
  }
  getTokens(payload) {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME
      }),
    };
  }

  async login(user: CreateUserDto): Promise<LoginResponse> {
    const userInDB: User = await this.usersRepository.findOne({ where: { login: user.login } });
    if (!userInDB || !(await compare(user.password, userInDB.password))) {
      throw new ForbiddenException('Incorrect login or password');
    }
    const payload = { login: userInDB.login, userId: userInDB.id };
    return this.getTokens(payload);
  }

  async refresh(refreshToken: string): Promise<LoginResponse> {
    const tokenData = this.jwtService.verify(refreshToken);
    const userInDB: User = await this.usersRepository.findOne({ where: { id: tokenData.id } });
    const isExpired = tokenData.exp - Date.now();
    if (!userInDB || isExpired) {
      throw new ForbiddenException('Authentification failed');
    }
    const payload = { login: tokenData.login, userId: tokenData.id };
    return this.getTokens(payload);
  }

}
