/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
}
