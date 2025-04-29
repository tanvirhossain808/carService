/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/users/user.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  @ManyToMany(() => UserEntity, (user) => user.reports)
  user: UserEntity; // Many reports can be created by many users, so we use ManyToMany relationship
}
