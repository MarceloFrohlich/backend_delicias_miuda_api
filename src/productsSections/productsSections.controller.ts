import { Body, Controller, Get, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { RoleGuard } from "../guards/role.guard";
import { AuthGuard } from "../guards/auth.guard";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../enums/role.enum";

import { ParamId } from "../decorators/param-id.decorator";
import { ProductsSectionsService } from "./productsSections.service";
import { CreateProductSectionsDTO } from "./DTO/create_productsSection_DTO";
import { UpdatePatchProductsSectionsDTO } from "./DTO/update-patch-productsSections-dto";

@Roles(Role.Admin)
@UseGuards(ThrottlerGuard, AuthGuard, RoleGuard)
@Controller('products-sections')
export class ProductsSectionsController{
    constructor(private readonly productsServices: ProductsSectionsService){}

    @Post('/create')
    async create(@Body() data: CreateProductSectionsDTO) {
      return this.productsServices.create(data);
    }

    @Get('/get-all/')
    async getAll() {
      return this.productsServices.getAll();
    }
  
    @Get('/get-by-id/:id')
    async getById(@ParamId() id: string) {
      return this.productsServices.getById(id);
    }
    
    @Patch('/update-partial/:id')
    async updatePartial(@Body() data: UpdatePatchProductsSectionsDTO, @ParamId() id: string) {
      return this.productsServices.updatePartial(id, data);
    }
  
    @Patch('/delete/:id')
    async delete(@ParamId() id: string) {
      return await this.productsServices.delete(id);
    }

}

