import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity({
  name: 'productsSections',
})
export class ProductsSectionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  sectionInfo: string;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt?: Date

}
