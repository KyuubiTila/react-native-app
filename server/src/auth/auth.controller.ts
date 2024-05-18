import { LoginCredentialDto } from './dto/login-credential.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RegisterCredentialDto } from './dto/register-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from './get-authenticated-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body() registerCredentialDto: RegisterCredentialDto) {
    try {
      await this.authService.signUp(registerCredentialDto);
      return { message: 'User created successfully' };
    } catch (error) {
      throw error;
    }
  }

  @Post('/signIn')
  async signIn(
    @Body() loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    const result =
      await this.authService.validateUserPassword(loginCredentialDto);

    if (!result) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return result;
  }

  @UseGuards(AuthGuard())
  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.authService.getUserByIdService(id);
  }

  @UseGuards(AuthGuard())
  @Post('/user')
  async getAuthUser(@GetAuthenticatedUser() user: User) {
    return { user };
  }
}
