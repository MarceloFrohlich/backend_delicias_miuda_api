import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './DTO/create_user_DTO';
import { UpdatePutUserDTO } from './DTO/update-put-user-dto';
import { UpdatePatchUserDTO } from './DTO/update-patch-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  async create(data: CreateUserDTO) {

    if (
      await this.usersRepository.exists({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Este email já está sendo usado');
    }

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async getAll() {
    return this.usersRepository.find();
  }

  async getById(id: string) {
    await this.exists(id);
    return this.usersRepository.findOneBy({ id });
  }

  async update(
    id: string,
    { email, name, password, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    await this.usersRepository.update(id, {
      email,
      name,
      password,
      role,
    });

    return this.getById(id);
  }

  async updatePartial(
    id: string,
    { email, name, password, role }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);

    const data: any = {};

    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    if (role) {
      data.role = role;
    }

    await this.usersRepository.update(id, {
      email,
      name,
      password: data.password,
      role,
    });

    return this.getById(id);
  }

  async delete(id: string) {
    await this.exists(id);

    await this.usersRepository.update(id, {
      deletedAt: new Date()
    });

    return {
      message: 'Usuário deletado com sucesso!'
    };
  }

  async exists(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!user) throw new Error('Usuário não encontrado!');

  }
}
