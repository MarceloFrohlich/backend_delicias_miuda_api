import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SectionsOptionsEntity } from './sectionsOptions.entity';
import { ProductEntity } from './product.entity';


@Entity({
  name: 'products_sections',
})
export class ProductsSectionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  sectionInfo: string;

  @OneToMany(() => SectionsOptionsEntity, (option) => option.section)
  @JoinColumn()
  options: SectionsOptionsEntity[]

  @ManyToOne(() => ProductEntity, (product) => product.sections)
  @JoinColumn()
  product: ProductEntity

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt?: Date

}
