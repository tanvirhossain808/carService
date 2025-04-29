/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/report.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  // eager: true means that when we fetch the user, we also fetch the reports
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log(
      `inserted  user with ID ${this.id} and email ${this.email} has been inserted.`,
    );
  }
  @AfterUpdate()
  afterUpdate() {
    console.log('Updated user', this.id);
  }
  @AfterRemove()
  afterRemove() {
    console.log('Deleted user', this.id);
  }
}
