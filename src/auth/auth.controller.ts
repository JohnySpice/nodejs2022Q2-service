import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService, LoginResponse } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get()
  check() {
    return 'DONE';
  }

  @Post('signup')
  signUp(@Body() createUser: CreateUserDto): Promise<User> {
    return this.authService.create(createUser);
  }

  @Post('login')
  login(@Body() user: CreateUserDto): Promise<LoginResponse> {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refresh(@Body() { refreshToken }): Promise<LoginResponse> {
    return this.authService.refresh(refreshToken);
  }
}
