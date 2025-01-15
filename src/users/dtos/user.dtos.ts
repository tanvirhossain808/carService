/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';

/* eslint-disable prettier/prettier */
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
