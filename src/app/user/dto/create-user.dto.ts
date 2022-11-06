import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from '../../../utils/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password)
  password: string;
}
