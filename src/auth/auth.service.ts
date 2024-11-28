import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { AuthRegisterDTO } from './DTO/auth-register-dto';
import { UsersService } from '../users/users.service';
import { generateEmailHtml } from '../templates/password-recovery-email';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private readonly mailer: MailerService,
    ) { }

    private issuer = 'login';
    private audience = 'users';

    createToken(user: UserEntity) {
        return {
            accessToken: this.jwtService.sign(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                {
                    expiresIn: '7 days',
                    subject: String(user.id),
                    issuer: this.issuer,
                    audience: this.audience,
                },
            ),
        };
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });

            return data;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOneBy({
            email,
        });

        if (!user) {
            throw new UnauthorizedException('Email e/ou senha incorretos.');
        }

        //essa função compara o password fornecido pelo usuário com o hash salvo no banco de dados
        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Email e/ou senha incorretos.');
        } else {
            return this.createToken(user);
        }
    }

    async forget(email: string) {
        const user = await this.usersRepository.findOneBy({
            email,
        });

        if (!user) {
            throw new UnauthorizedException('E-mail está incorreto.');
        }

        const token = this.jwtService.sign(
            {
                id: user.id,
            },
            {
                expiresIn: '10 minutes',
                subject: String(user.id),
                issuer: 'forget',
                audience: this.audience,
            },
        );

        await this.mailer.sendMail({
            subject: 'Recuperação de senha',
            to: user.email,
            html: generateEmailHtml(user.name, token),
        });

        return {
            message: "Email enviado, verifique sua caixa de entrada.",
        };
    }

    async reset(password: string, confirmPassword: string, token: string) {
        const data = this.jwtService.verify(token, {
            issuer: 'forget',
            audience: this.audience,
        });

        if (password === confirmPassword) {
            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);

            await this.usersRepository.update(data.id, { password });
            const user = await this.userService.getById(data.id);
            return this.createToken(user);
        } else {
            throw new UnprocessableEntityException('As senhas não são iguais.')
        }

    }

    async register(data: AuthRegisterDTO) {
        delete data.role;

        const user = await this.userService.create(data);

        return this.createToken(user);
    }
}
