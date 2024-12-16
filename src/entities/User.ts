import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import * as bcrypt from "bcryptjs";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: "100" })
  username!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar" })
  confirm_password!: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async hashConfirmPassword() {
    if (this.confirm_password) {
      this.confirm_password = await bcrypt.hash(this.confirm_password, 10);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
