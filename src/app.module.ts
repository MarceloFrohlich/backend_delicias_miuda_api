import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entity/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsModule } from './products/products.module';
import { ProductsSectionsEntity } from './products/entity/productsSections.entity';
import { SectionsOptionsEntity } from './products/entity/sectionsOptions.entity';
import { ProductEntity } from './products/entity/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 100,
          ttl: 1000,
        },
      ],
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    ProductsModule,
    MailerModule.forRoot({
      transport: {
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.MAIL_FROM_ADDRESS,
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: process.env.DB_URL,
      ssl: {
        rejectUnauthorized: false,  // Isso é necessário em alguns casos, mas use com cautela
      },
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, ProductsSectionsEntity, SectionsOptionsEntity, ProductEntity],
      synchronize: process.env.ENV === 'development',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
