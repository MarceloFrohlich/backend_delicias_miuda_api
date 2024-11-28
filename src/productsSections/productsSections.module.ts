import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { ProductsSectionsEntity } from "./entity/productsSections.entity";
import { ProductsSectionsController } from "./productsSections.controller";
import { ProductsSectionsService } from "./productsSections.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductsSectionsEntity]),
        forwardRef(() => AuthModule),
      ],
    controllers: [ProductsSectionsController],
    providers: [ProductsSectionsService],
    exports:[ProductsSectionsService]
})

export class ProductsSectionsModule {}