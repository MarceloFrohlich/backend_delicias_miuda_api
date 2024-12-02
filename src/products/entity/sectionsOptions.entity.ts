import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductsSectionsEntity } from './productsSections.entity';

@Entity({
  name: 'section_options',
})
export class SectionsOptionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  price: string;

  @ManyToOne(() => ProductsSectionsEntity, (section) => section.options)
  @JoinColumn()
  section: ProductsSectionsEntity;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt?: Date;
}
