import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogEntity } from "./entity/blog.entity";
import { CreateBlogDTO } from "./DTO/create_blog_DTO";
import { FileService } from "../file/file.service";
import { UpdatePatchBlogDTO } from "./DTO/update_partial_blog_DTO";
import { UsersService } from "../users/users.service";
import { UserEntity } from "../users/entity/user.entity";

@Injectable()
export class BlogService {
    constructor(
        private readonly fileService: FileService,
        @InjectRepository(BlogEntity)
        private blogRepository: Repository<BlogEntity>,
        private readonly userService: UsersService
    ) { }

    async create(data: CreateBlogDTO, userJWT: UserEntity, banner?: Express.Multer.File) {
        let bannerUrl: string | null = null
        const dataAtual = new Date()
        const anoAtual = dataAtual.getFullYear()
        const mesAtual = dataAtual.getMonth() + 1
        const diaAtual = dataAtual.getDay()

        const user = await this.userService.getById(userJWT.id)

        if (!user){
            throw new ForbiddenException('Usuário não localizado!')
        }

        if (banner) {
            const filename = `${anoAtual}-${mesAtual}-${diaAtual}_${(data.title).replaceAll(" ","+")}`
            bannerUrl = await this.fileService.uploadToS3(banner, filename)
        }

        const blogPostData = {
            ...data,
            banner: bannerUrl,
            user: user
        }

        const post = this.blogRepository.create(blogPostData)

        return await this.blogRepository.save(post)
    }


    async updatePartial(id: string, data: UpdatePatchBlogDTO) {
        await this.existsBlogPost(id)

        const dados: any = {}

        if (data.content) {
            dados.content = data.content
        }
        if (data.quote) {
            dados.quote = data.quote
        }
        if (data.subtitle) {
            dados.subtitle = data.subtitle
        }
        if (data.title) {
            dados.title = data.title
        }

        await this.blogRepository.update(id, dados)

        return this.getById(id)
        
    }

    async deletePost(id: string){
        this.existsBlogPost(id)

        await this.blogRepository.update(id, {deletedAt: new Date()})

        return {
            message: 'Post deletado com sucesso!'
        }
    }

    async getAll(){
        return this.blogRepository.find()
    }

    async getById(id: string){
        await this.existsBlogPost(id)

        return this.blogRepository.findOneBy({id})
    }

    async getLastThree(){
        const lastPosts = await this.blogRepository.find({
            order: {createdAt: 'DESC'},
            take: 3
        })

        return lastPosts
    }

    async updatePostBanner(id: string, banner: Express.Multer.File){
        await this.existsBlogPost(id)
        const postData = await this.blogRepository.findOneBy({id})

        let bannerUrl: string | null = null
        const dataAtual = new Date()
        const anoAtual = dataAtual.getFullYear()
        const mesAtual = dataAtual.getMonth() + 1
        const diaAtual = dataAtual.getDay()

        const filename = `${anoAtual}-${mesAtual}-${diaAtual}_${(postData.title).replaceAll(" ","+")}`
        bannerUrl = await this.fileService.uploadToS3(banner, filename)

        await this.blogRepository.update(id, {banner: bannerUrl})

        return {message: 'Banner atualizado com sucesso'}
    }

    async existsBlogPost(id: string) {
        const post = await this.blogRepository.findOne({ where: { id, deletedAt: null } })

        if (!post) throw new NotFoundException('Post não encontrado.');
    }

}