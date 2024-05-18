import { User } from 'src/auth/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { JwtStrategy } from './jwt-strategy';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET || jwtConfig.secret,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
