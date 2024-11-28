import { Body, Controller, Get, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../enums/role.enum";
import { RoleGuard } from "../guards/role.guard";
import { AuthGuard } from "../guards/auth.guard";
import { ThrottlerGuard } from "@nestjs/throttler";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateBlogDTO } from "./DTO/create_blog_DTO";
import { ParamId } from "../decorators/param-id.decorator";
import { UpdatePatchBlogDTO } from "./DTO/update_partial_blog_DTO";
import { ImageValidationPipe } from "../pipes/file_pipe";
import { AuthenticatedRequest } from "../guards/authenticated_request.interface";

@Roles(Role.Admin)
@UseGuards(ThrottlerGuard, AuthGuard, RoleGuard)
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }


    @Post('create')
    @UseInterceptors(FileInterceptor('banner'))
    async create(
        @Body() data: CreateBlogDTO,
        @UploadedFile(ImageValidationPipe) banner: Express.Multer.File,
        @Req() req: AuthenticatedRequest
    ) {
        const userJWT = req.user;

        if (!userJWT) {
            throw new Error('Usuário não autenticado.');
        }

        return this.blogService.create(data, userJWT, banner);
    }

    @Patch('update-partial/:id')
    async update(@ParamId('id') id: string, @Body() data: UpdatePatchBlogDTO) {
        return this.blogService.updatePartial(id, data)
    }

    @Get('get-all')
    async getAll() {
        return this.blogService.getAll()
    }

    @Get('get-by-id/:id')
    async getById(@ParamId('id') id: string) {
        return this.blogService.getById(id)
    }

    @Get('get-last-three')
    async getLastThree() {
        return this.blogService.getLastThree()
    }


    @Patch('delete/:id')
    async deletePost(@ParamId('id') id: string) {
        return this.blogService.deletePost(id)
    }

    @Post('update-banner/:id')
    @UseInterceptors(FileInterceptor('banner'))
    async updatePostBanner(
        @ParamId('id') id: string,
        @UploadedFile(ImageValidationPipe) banner: Express.Multer.File) {

        return this.blogService.updatePostBanner(id, banner)
    }

}