import { IsOptional, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsOptional()
  image?: any; // Typagem genérica, o file será validado no controller
}
