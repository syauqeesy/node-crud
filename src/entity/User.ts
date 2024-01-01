import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { UserInfo } from "../payload/user";

@Entity("users")
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuid();

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
  })
  username!: string;

  @Column({
    type: "text",
    nullable: false,
  })
  password!: string;

  @Column({
    type: "bigint",
    nullable: false,
  })
  created_at: number = Date.now();

  @Column({
    type: "bigint",
    nullable: true,
  })
  updated_at: number | null = null;

  @Column({
    type: "bigint",
    nullable: true,
  })
  deleted_at: number | null = null;

  public getPublicInfo(): UserInfo {
    const userInfo: UserInfo = {
      id: this.id,
      username: this.username,
      created_at: this.getCreatedAt(),
    };

    return userInfo;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public setPassword(password: string): void {
    const salt = bcrypt.genSaltSync(10);

    this.password = bcrypt.hashSync(password, salt);
  }

  public comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  public getCreatedAt(): string {
    return new Date(+this.created_at).toISOString();
  }
}

export default User;
