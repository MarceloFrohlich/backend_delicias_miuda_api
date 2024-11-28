import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";

@Entity({
    name: 'blog'
})
export class BlogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({nullable: false})
    title: string

    @Column()
    subtitle:string

    @Column()
    content: string

    @Column()
    quote: string

    @ManyToOne(() => UserEntity, (user) => user.blogPost)
    @JoinColumn()
    user: UserEntity

    @Column( {type: 'varchar', length: 2048, nullable: true })
    banner?: string

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn({ nullable: true, default: null })
    deletedAt?: Date
}