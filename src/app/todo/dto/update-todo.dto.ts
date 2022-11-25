import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length, IsIn } from 'class-validator'

export class UpdateTodoDto {
    @IsNotEmpty()
    @Length(3, 10, { message: 'Nome precisa ter entre 3 e 10 caracteres' })
    @ApiProperty()
    task: string

    @IsNotEmpty()
    @ApiProperty({ default: 1 })
    @IsIn([0, 1])
    isDone: number
}
