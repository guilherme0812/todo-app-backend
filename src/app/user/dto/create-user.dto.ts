import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from '../../../utils/regex.helper';
import { ApiProperty } from '@nestjs/swagger'
import { MessagesHelper } from '../../../utils/messages.helper';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  @ApiProperty()
  password: string;
}
