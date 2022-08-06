import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

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
  login(@Body() user: CreateUserDto): Promise<{ accessToken: string; }> {
    return this.authService.login(user);
  }

  @Post('refresh')
  refresh(@Body() refreshToken: string): string {
    return;
  }
}
