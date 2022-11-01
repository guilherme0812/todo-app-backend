import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FindOneOptions, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm' 
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>
  ) {}
  
  async create(data: CreateTodoDto) {
    return await this.todoRepository.save(this.todoRepository.create(data));
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOneOrFail(options: FindOneOptions<TodoEntity>) {
    try {
      return await this.todoRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message) 
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOneOrFail({where: {id}})

    this.todoRepository.merge(todo, updateTodoDto)
    return await this.todoRepository.save(todo)
  }

  async remove(id: string) {
    await this.findOneOrFail({where: {id}})
    await this.todoRepository.softDelete(id)
  }
}
