import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Books } from "./Books";

@Entity()
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => Books, book => book.reviews)
  book: Books;
}
export { Books };

