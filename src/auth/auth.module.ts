import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UserEntity } from '../users/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET),
    }),
    forwardRef(() => UsersModule),
    FileModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
