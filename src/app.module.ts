import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './app/todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST','localhost'),
        port: Number(configService.get('DB_PORT',5432)),
        username: configService.get('DB_USERNAME','postgres'),
        password: configService.get('DB_PASSWORD','123'),
        database: configService.get('DB_DATABASE','postgres'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
    TodoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
