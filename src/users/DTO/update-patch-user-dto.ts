import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create_user_DTO';

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO) {}
