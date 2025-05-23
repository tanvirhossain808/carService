/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
