import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSectionsDTO } from './create_productsSection_DTO';

export class UpdatePatchProductsSectionsDTO extends PartialType(
  CreateProductSectionsDTO,
) {}
