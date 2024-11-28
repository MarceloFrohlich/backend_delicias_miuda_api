import { IsNumber } from 'class-validator';
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
export class SectionsOptions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    price?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn({ nullable: true, default: null })
    deletedAt?: Date

}
