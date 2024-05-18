import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1716035760162 implements MigrationInterface {
    name = 'Migrate1716035760162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_de4653f1772167c1f81cd62a4ab" UNIQUE ("username", "email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
