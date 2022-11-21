import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { TodoEntity } from '../../todo/entities/todo.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: string;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: string;

  @DeleteDateColumn({ name: 'delete_at' })
  deleteAt: string;

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[]

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  constructor(todo: Partial<UserEntity>) {
    this.id = todo?.id
    this.firstName = todo?.firstName
    this.lastName = todo?.lastName
    this.email = todo?.email
    this.password = todo?.password
    this.createAt = todo?.createAt
    this.updateAt = todo?.updateAt
    this.deleteAt = todo?.deleteAt
    this.todos = todo?.todos
  }
}
