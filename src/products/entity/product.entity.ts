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
import { ProductsSectionsEntity } from './productsSections.entity';


@Entity({
    name: 'products',
})
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    description?: string

    @Column( {type: 'varchar', length: 2048, nullable: true })
    image?: string

    @OneToMany(() => ProductsSectionsEntity, (section) => section.product)
    @JoinColumn()
    sections: ProductsSectionsEntity[]

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn({ nullable: true, default: null })
    deletedAt?: Date

}
