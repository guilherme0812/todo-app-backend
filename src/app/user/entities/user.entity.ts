import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({name: 'first_name'})
  firstName: string
  
  @Column({name: 'last_name'})
  lastName: string
  
  @Column()
  email: string
  
  @Column()
  password: string
  
  @CreateDateColumn({name: 'create_at'})
  createAt: string

  @UpdateDateColumn({name: 'update_at'})
  updateAt: string

  @DeleteDateColumn({name: 'delete_at'})
  deleteAt: string
}
