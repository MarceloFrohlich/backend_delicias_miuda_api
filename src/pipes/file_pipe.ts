import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  private readonly parseFilePipe: ParseFilePipe;

  constructor() {
    this.parseFilePipe = new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'image/*' }),
        new MaxFileSizeValidator({
          maxSize: 1024 * 10000, // 10MB
          message: 'Tamanho máximo de 10MB excedido',
        }),
      ],
    });
  }

  async transform(value: any) {
    try {
      return await this.parseFilePipe.transform(value);
    } catch (error) {
      throw new BadRequestException(error.message || 'Arquivo inválido');
    }
  }
}
