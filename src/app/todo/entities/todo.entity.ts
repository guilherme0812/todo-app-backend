import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'

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

}