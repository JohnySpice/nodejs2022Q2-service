import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRTAuthGuard } from './jwt-rt-auth.guard';
import { JwtRTStrategy } from './jwt-rt.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
  }),],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRTStrategy]
})
export class AuthModule { }
