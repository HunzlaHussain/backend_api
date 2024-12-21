import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity("Course")
export class courses {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  course_name!: string;

  @Column()
  description!: string;

  @Column()
  course_duration!: string;

  @Column()
  course_picture!: string;

  @ManyToOne(() => User, (user) => user.courses)
  user!: User;
}
