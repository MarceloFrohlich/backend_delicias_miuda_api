import { IsString } from "class-validator"

export class GetDateTitleDTO {

    @IsString()
    title: string
    
    @IsString()
    date: string
}