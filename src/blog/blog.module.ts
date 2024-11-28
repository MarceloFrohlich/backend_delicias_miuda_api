import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { BlogEntity } from "./entity/blog.entity";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { FileModule } from "../file/file.module";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([BlogEntity]),
    forwardRef(() => AuthModule),
    FileModule,
    UsersModule
],
    controllers: [BlogController],
    providers: [BlogService],
    exports: [BlogService]
})

export class BlogModule { }
