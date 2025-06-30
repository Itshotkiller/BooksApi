import { MigrationInterface, QueryRunner } from "typeorm";

export class Reviews1751268480000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "reviews"(
            "id" SERIAL PRIMARY KEY,
            "content" character varying NOT NULL,
            "rating" int NOT NULL,
            "bookId" int NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "FK_book_review" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE
          )`, undefined
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reviews"`, undefined);
    }
}
