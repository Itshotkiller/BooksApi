import { MigrationInterface, QueryRunner } from "typeorm";

export class Books1751268360671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "books"(
            "id" SERIAL PRIMARY KEY,
            "title" character varying NOT NULL,
            "author" character varying NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
          )`, undefined
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`, undefined);
    }
}
