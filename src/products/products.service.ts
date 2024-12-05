import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductSectionsDTO } from './DTO/create_productsSection_DTO';
import { ProductsSectionsEntity } from './entity/productsSections.entity';
import { createOptionDTO } from './DTO/create-option-DTO';
import { CreateProductDTO } from './DTO/create_products_DTO';
import { FileService } from '../file/file.service';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entity/user.entity';
import { ProductEntity } from './entity/product.entity';
import { SectionsOptionsEntity } from './entity/sectionsOptions.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly fileService: FileService,
    @InjectRepository(ProductsSectionsEntity)
    private productsSectionsService: Repository<ProductsSectionsEntity>,
    @InjectRepository(ProductEntity)
    private productService: Repository<ProductEntity>,
    @InjectRepository(SectionsOptionsEntity)
    private sectionOptionService: Repository<SectionsOptionsEntity>,
    private readonly userService: UsersService,
  ) { }

  async createProduct(
    data: CreateProductDTO,
    userJWT: UserEntity,
    image?: Express.Multer.File,
  ) {
    let imageUrl: string | null = null;
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const diaAtual = dataAtual.getDay();

    const user = await this.userService.getById(userJWT.id);

    if (!user) {
      throw new ForbiddenException('Usuário não localizado!');
    }

    if (image) {
      const filename = `${anoAtual}-${mesAtual}-${diaAtual}_${data.name.replace(/\s+/g, '')}`;
      imageUrl = await this.fileService.uploadToS3(image, filename);
    }

    const productData = {
      ...data,
      image: imageUrl,
      user: user,
    };

    const productsSection = this.productService.create(productData);

    return this.productService.save(productsSection);
  }

  async createSection(id: string, data: CreateProductSectionsDTO) {
    const product = await this.getProductById(id);

    const sectionData = {
      ...data,
      product: product,
    };

    const productsSection = this.productsSectionsService.create(sectionData);
    return this.productsSectionsService.save(productsSection);
  }

  async createOption(id: string, data: createOptionDTO) {
    await this.existsSection(id)
    
    const section = await this.getSectionById(id);

    const optionData = {
      ...data,
      section: section,
    };

    const sectionOption = this.sectionOptionService.create(optionData);
    return this.sectionOptionService.save(sectionOption);
  }

  async getAllProducts() {
    return this.productService.find({
      relations: ['sections', 'sections.options'],
    });
  }

  async getSectionsByProductId(id: string) {
    const product = await this.getProductById(id);

    const sections = await this.productsSectionsService.find({
      where: { product: { id: product.id } },
      // relations: ['product']
    });

    return sections;
  }

  async getProductById(id: string) {
    await this.existsProduct(id);
    return this.productService.findOne({
      where: { id },
      relations: ['sections', 'sections.options'],
    });
  }

  async getSectionById(id: string) {
    await this.existsSection(id);
    return this.productsSectionsService.findOneBy({ id });
  }

  async getOptionsBySectionId(id: string) {
    const sectionFound = await this.getSectionById(id);

    const options = await this.sectionOptionService.find({
      where: { section: { id: sectionFound.id } },
      relations: ['section'],
    });

    return options;
  }

  // async updatePartial(
  //   id: string,
  //   { description, sectionInfo, title }: UpdatePatchProductsSectionsDTO,
  // ) {
  //   await this.exists(id);

  //   const data: any = {};

  //   if (title) {
  //     data.title = title;
  //   }
  //   if (sectionInfo) {
  //     data.sectionInfo = sectionInfo;
  //   }

  //   if (description) {
  //     data.description = description;
  //   }

  //   await this.productsSections.update(id, {
  //     title, description, sectionInfo
  //   });

  //   return this.getById(id);
  // }

  // async delete(id: string) {
  //   await this.exists(id);

  //   await this.productsSections.update(id, {
  //     deletedAt: new Date()
  //   });

  //   return {
  //     message: 'Seção deletada com sucesso!'
  //   };
  // }

  async updateProductImage(id: string, image: Express.Multer.File) {
    await this.existsProduct(id);
    const productData = await this.productService.findOneBy({ id });

    let imageUrl: string | null = null;
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const diaAtual = dataAtual.getDay();

    const filename = `${anoAtual}-${mesAtual}-${diaAtual}_${productData.image.replaceAll(' ', '+')}`;
    imageUrl = await this.fileService.uploadToS3(image, filename);

    await this.productService.update(id, { image: imageUrl });

    return { message: 'Banner atualizado com sucesso' };
  }

  async deleteProduct(id: string) {
    await this.existsProduct(id)

    await this.productService.update(id, {
      deletedAt: new Date(),
    });

    return {
      message: 'Produto deletado com sucesso!',
    };
  }

  async deleteSection(id: string) {
    await this.existsSection(id)

    await this.productsSectionsService.update(id, {
      deletedAt: new Date(),
    });

    return {
      message: 'Seção deletada com sucesso!',
    };
  }

  async deleteOption(id: string) {
    await this.existsOption(id)

    await this.sectionOptionService.update(id, {
      deletedAt: new Date(),
    });

    return {
      message: 'Opção deletada com sucesso!',
    };
  }

  async existsProduct(id: string) {
    const product = await this.productService.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!product) throw new BadRequestException('Produto não encontrado!');
  }

  async existsSection(id: string) {
    const productsSection = await this.productsSectionsService.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!productsSection) throw new BadRequestException('Seção não encontrada!');
  }

  async existsOption(id: string) {
    const productsOption = await this.sectionOptionService.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!productsOption) throw new BadRequestException('Opção não encontrada!');
  }

}
