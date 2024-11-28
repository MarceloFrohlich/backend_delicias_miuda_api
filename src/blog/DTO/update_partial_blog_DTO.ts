import { PartialType } from "@nestjs/mapped-types";
import { CreateBlogDTO } from "./create_blog_DTO";



export class UpdatePatchBlogDTO extends PartialType(CreateBlogDTO) {}
