import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  task: string;

  @Column({ name: 'is_done', type: 'int', width: 1 })
  @ApiProperty()
  isDone: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;


  @ManyToOne(() => UserEntity, (user) => user.todos, { eager: true })
  user: UserEntity

  constructor(todo: Partial<TodoEntity>) {
    this.id = todo?.id
    this.task = todo?.task
    this.id = todo?.id
    this.isDone = todo?.isDone
    this.createdAt = todo?.createdAt
    this.updatedAt = todo?.updatedAt
    this.deletedAt = todo?.deletedAt
    this.user = todo?.user
  }
}