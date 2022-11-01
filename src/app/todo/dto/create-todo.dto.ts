import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsIn } from 'class-validator'

export class CreateTodoDto {
  @IsNotEmpty()
  @ApiProperty()
  task: string
  
  @IsNotEmpty()
  @ApiProperty({default: 1})
  @IsIn([0,1])
  isDone: number
}
