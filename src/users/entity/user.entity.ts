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
import { Role } from '../../enums/role.enum';
import { BlogEntity } from '../../blog/entity/blog.entity';


@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 63,
  })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column({
    length: 127,
  })
  password: string;

  @OneToMany(() => BlogEntity, (post) => post.user)
  @JoinColumn()
  blogPost: BlogEntity

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt?: Date

  @Column({
    default: Role.User,
  })
  role: number;
}
