import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO } from './DTO/auth-login-dto';
import { AuthRegisterDTO } from './DTO/auth-register-dto';
import { AuthForgetDTO } from './DTO/auth-forget-dto';
import { AuthResetDTO } from './DTO/auth-reset-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, confirmPassword, token }: AuthResetDTO) {
    return this.authService.reset(password, confirmPassword, token);
  }
}
