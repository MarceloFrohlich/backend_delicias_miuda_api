import { Transform } from 'class-transformer';
import {IsNumber, IsString } from 'class-validator'

export class createOptionDTO {

    @IsString()
    description: string
  
    @IsString()
    price: string;

}