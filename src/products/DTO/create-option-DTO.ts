import { IsString } from 'class-validator';

export class createOptionDTO {
  @IsString()
  description: string;

  @IsString()
  price: string;
}
