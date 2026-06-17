import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { cpf: string; dob: string }) {
    const user = await this.authService.validateUser(body.cpf, body.dob);
    return {
      message: 'Autenticación exitosa',
      user,
      token: 'fake-jwt-token-for-sprint-1'
    };
  }
}
