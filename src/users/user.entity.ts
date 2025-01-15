/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
