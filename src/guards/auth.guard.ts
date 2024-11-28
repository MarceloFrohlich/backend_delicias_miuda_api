import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { AuthenticatedRequest } from './authenticated_request.interface';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return false;
    }
  
    try {
      const token = authorization.split(' ')[1];
      const data = this.authService.checkToken(token); // Valida e decodifica o token
      request.tokenPayload = data;

      // Busca o usuário associado ao token
      request.user = await this.userService.getById(data.id);

      return true;
    } catch (error) {
      console.error('Erro na validação do token:', error.message);
      return false;
    }
  }
}
