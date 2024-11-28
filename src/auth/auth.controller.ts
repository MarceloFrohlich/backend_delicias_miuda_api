import {
    BadRequestException,
    Body,
    Controller,
    FileTypeValidator,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import { AuthLoginDTO } from './dto/auth-login-dto';
  import { AuthRegisterDTO } from './dto/auth-register-dto';
  import { AuthForgetDTO } from './dto/auth-forget-dto';
  import { AuthResetDTO } from './dto/auth-reset-dto';
  import { AuthService } from './auth.service';
  import {
    FileInterceptor,
  } from '@nestjs/platform-express';
  import { AuthGuard } from '../guards/auth.guard';
import { UserEntity } from '../users/entity/user.entity';
import { User } from '../decorators/user.decorator';
import { FileService } from '../file/file.service';

  
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly fileService: FileService,
    ) {}
  
    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
      return this.authService.login(email, password);
    }
  
    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
      return this.authService.register(body);
    }
  
    @Post('forget')
    async forget(@Body() { email }: AuthForgetDTO) {
      return this.authService.forget(email);
    }
  
    @Post('reset')
    async reset(@Body() { password, confirmPassword, token }: AuthResetDTO) {
      return this.authService.reset(password, confirmPassword, token);
    }
  
    // @UseInterceptors(FileInterceptor('file')) // o Dado do interceptor é o nome do campo que espera o arquivo
    // @UseGuards(AuthGuard)
    // @Post('photo')
    // async uploadPhoto(
    //   @User() user: UserEntity,
    //   @UploadedFile(
    //     new ParseFilePipe({
    //       validators: [
    //         new FileTypeValidator({ fileType: 'image/*' }),
    //         new MaxFileSizeValidator({
    //           message: 'Tamanho máximo de 10Mmb excedido',
    //           maxSize: 1024 * 10000,
    //         }),
    //       ],
    //     }),
    //   )
    //   photo: Express.Multer.File,
    // ) {
    //   const filename = `photo-${user.id}.png`;
  
    //   try {
    //     await this.fileService.upload(photo, filename);
    //   } catch (error) {
    //     throw new BadRequestException(error);
    //   }
  
    //   return { success: true };
    // }
  
    // @UseInterceptors(FilesInterceptor('files')) // recebe multiplos arquivos dentro do mesmo field
    // @UseGuards(AuthGuard)
    // @Post('multiple')
    // async uploadMultiple(
    //   @User() user,
    //   @UploadedFiles() files: Express.Multer.File[],
    // ) {
    //   return files;
    // }
  
    // @UseInterceptors(
    //   FileFieldsInterceptor([
    //     {
    //       name: 'photo',
    //       maxCount: 1,
    //     },
    //     {
    //       name: 'documents',
    //       maxCount: 10,
    //     },
    //   ]),
    // ) // recebe multiplos arquivos dentro de vários fields diferentes
    // @UseGuards(AuthGuard)
    // @Post('multiple-fields')
    // async uploadMultipleFields(
    //   @User() user,
    //   @UploadedFiles()
    //   files: { photo: Express.Multer.File; documents: Express.Multer.File[] },
    // ) {
    //   return files;
    // }
  }
  