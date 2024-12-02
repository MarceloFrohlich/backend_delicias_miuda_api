import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  tokenPayload?: { id: string; [key: string]: any }; // Estrutura do token decodificado
  user?: any; // Tipo do usuário (ajuste conforme sua entidade)
}
