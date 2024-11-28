import { IsJWT, IsString, MinLength } from 'class-validator';

export class AuthResetDTO {
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  confirmPassword: string;

  @IsJWT()
  token: string;
}
