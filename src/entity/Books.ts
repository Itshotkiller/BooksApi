import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reviews } from "./Reviews";

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @OneToMany(() => Reviews, review => review.book)
  reviews: Reviews[];
}
export { Reviews };

