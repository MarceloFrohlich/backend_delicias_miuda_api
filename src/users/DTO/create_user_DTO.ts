import { IsEmail, IsInt, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt({ message: 'Role deve ser um número' })
  role?: number;

  @MinLength(8, { message: 'Necessário mínimo de 8 caracteres' })
  @IsString()
  @Matches(/(?=.*[a-z])/, {
    message: 'A senha deve conter pelo menos uma letra minúscula',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
  })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'A senha deve conter pelo menos um caractere especial',
  })
  password: string;
}
