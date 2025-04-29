/* eslint-disable prettier/prettier */

import { Expose, Transform, Type } from 'class-transformer';

class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @Expose()
  @Type(() => UserDto)
  user: UserDto; // This will be transformed to UserDto when we use class-transformer to serialize the object
}
