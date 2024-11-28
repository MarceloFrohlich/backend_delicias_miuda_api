import {
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductSectionsDTO } from './DTO/create_productsSection_DTO';
import { ProductsSectionsEntity } from './entity/productsSections.entity';
import { UpdatePatchProductsSectionsDTO } from './DTO/update-patch-productsSections-dto';


@Injectable()
export class ProductsSectionsService {
  constructor(
    @InjectRepository(ProductsSectionsEntity)
    private productsSections: Repository<ProductsSectionsEntity>,
  ) { }

  async create(data: CreateProductSectionsDTO) {

    const productsSection = this.productsSections.create(data);
    return this.productsSections.save(productsSection);
  }

  async getAll() {
    return this.productsSections.find();
  }

  async getById(id: string) {
    await this.exists(id);
    return this.productsSections.findOneBy({ id });
  }

  async updatePartial(
    id: string,
    { description, sectionInfo, title }: UpdatePatchProductsSectionsDTO,
  ) {
    await this.exists(id);

    const data: any = {};

    if (title) {
      data.title = title;
    }
    if (sectionInfo) {
      data.sectionInfo = sectionInfo;
    }

    if (description) {
      data.description = description;
    }

    await this.productsSections.update(id, {
      title, description, sectionInfo
    });

    return this.getById(id);
  }

  async delete(id: string) {
    await this.exists(id);

    await this.productsSections.update(id, {
      deletedAt: new Date()
    });

    return {
      message: 'Seção deletada com sucesso!'
    };
  }

  async exists(id: string) {
    const productsSection = await this.productsSections.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!productsSection) throw new Error('Seção não encontrada!');

  }
}
