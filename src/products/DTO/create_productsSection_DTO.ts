import { IsString } from 'class-validator';

export class CreateProductSectionsDTO {
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  sectionInfo: string;
}
