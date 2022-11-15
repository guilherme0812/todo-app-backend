import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,

    private readonly userService: UserService,
  ) {}

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOneOrFail(options: FindOneOptions<TodoEntity>) {
    try {
      return await this.todoRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateTodoDto) {
    const user = await this.userService.findOneOrFail({ where: { id: data.userId } });

    if ( user ) {
      const todo = {
        task: data.task,
        isDone: data.isDone,
        user: { id: data.userId },
      };
      return await this.todoRepository.save(this.todoRepository.create(todo));
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOneOrFail({ where: { id } });

    this.todoRepository.merge(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
  }

  async remove(id: string) {
    await this.findOneOrFail({ where: { id } });
    await this.todoRepository.softDelete(id);
  }
}
