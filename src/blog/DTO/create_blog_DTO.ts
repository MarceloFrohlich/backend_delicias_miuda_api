
import {IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateBlogDTO {

    @IsString()
    title: string

    @IsString()
    subtitle?: string

    @IsString()
    content: string

    @IsString()
    @MaxLength(150)
    quote: string
    
    @IsOptional()
    banner?: any // Typagem genérica, o file será validado no controller
}