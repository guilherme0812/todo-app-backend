import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm' 
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll() {
    return await this.userRepository.find({select: ['id', 'firstName', 'lastName', 'email']});
  }

  async findOneOrFail(options: FindOneOptions<UserEntity>) {
    try {
      return await this.userRepository.findOneOrFail(options)
    } catch (error) {
      throw new NotFoundException(error.message) 
    }
  }

  async create(data: CreateUserDto) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail({where: {id}})
    this.userRepository.merge(user, data)
    return await this.userRepository.save(user)
  }

  async delete(id: string) {
    const user = await this.findOneOrFail({where: {id}})
    this.userRepository.softDelete({id})
  }

  
}
