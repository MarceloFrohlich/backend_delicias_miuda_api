import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { ProductsSectionsEntity } from "./entity/productsSections.entity";
import { SectionsOptionsEntity } from "./entity/sectionsOptions.entity";
import { UsersModule } from "../users/users.module";
import { ProductEntity } from "./entity/product.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { FileModule } from "../file/file.module";



@Module({
    imports: [
        TypeOrmModule.forFeature([ProductsSectionsEntity, SectionsOptionsEntity, ProductEntity]),
        forwardRef(() => AuthModule),
        UsersModule,
        FileModule
      ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports:[ProductsService]
})

export class ProductsModule {}