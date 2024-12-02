import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

import { ParamId } from '../decorators/param-id.decorator';
import { CreateProductSectionsDTO } from './DTO/create_productsSection_DTO';
import { createOptionDTO } from './DTO/create-option-DTO';
import { CreateProductDTO } from './DTO/create_products_DTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../pipes/file_pipe';
import { AuthenticatedRequest } from '../guards/authenticated_request.interface';
import { ProductsService } from './products.service';

@Roles(Role.Admin)
@UseGuards(ThrottlerGuard, AuthGuard, RoleGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsService) {}

  @Post('/create-product')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() data: CreateProductDTO,
    @UploadedFile(ImageValidationPipe) image: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const userJWT = req.user;

    if (!userJWT) {
      throw new Error('Usuário não autenticado.');
    }

    return this.productsServices.createProduct(data, userJWT, image);
  }

  @Post('/create-section/:id')
  async createSection(
    @ParamId() id: string,
    @Body() data: CreateProductSectionsDTO,
  ) {
    return this.productsServices.createSection(id, data);
  }

  @Post('/create-option/:id')
  async createOption(@ParamId() id: string, @Body() data: createOptionDTO) {
    return this.productsServices.createOption(id, data);
  }

  @Get('/get-all/')
  async getAll() {
    return this.productsServices.getAllProducts();
  }

  @Get('/get-product-by-id/:id')
  async getProductById(@ParamId() id: string) {
    return this.productsServices.getProductById(id);
  }

  @Get('/get-section-by-product-id/:id')
  async getSectionByProductId(@ParamId() id: string) {
    return this.productsServices.getSectionsByProductId(id);
  }

  @Get('/get-options-by-section-id/:id')
  async getOptionsBySectionId(@ParamId() id: string) {
    return this.productsServices.getOptionsBySectionId(id);
  }

  // @Get('/get-by-id/:id')
  // async getById(@ParamId() id: string) {
  //   return this.productsServices.getById(id);
  // }

  // @Patch('/update-partial/:id')
  // async updatePartial(@Body() data: UpdatePatchProductsSectionsDTO, @ParamId() id: string) {
  //   return this.productsServices.updatePartial(id, data);
  // }

  // @Patch('/delete/:id')
  // async delete(@ParamId() id: string) {
  //   return await this.productsServices.delete(id);
  // }

  @Post('update-image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProductImage(
    @ParamId('id') id: string,
    @UploadedFile(ImageValidationPipe) image: Express.Multer.File,
  ) {
    return this.productsServices.updateProductImage(id, image);
  }
}
