import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { UserModule } from 'src/app/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity]), UserModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService]
})
export class TodoModule {}
