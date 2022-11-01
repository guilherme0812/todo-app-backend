import { ApiProperty } from '@nestjs/swagger'

export class BadRequestSweger {
  @ApiProperty()
  statusCode: number

  @ApiProperty()
  message: string[]
  
  @ApiProperty()
  error: string
}