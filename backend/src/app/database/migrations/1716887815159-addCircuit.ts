import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCircuit1716887815159 implements MigrationInterface {
  name = 'AddCircuit1716887815159';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "circuit" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, "description" character varying NOT NULL, "logo" character varying NOT NULL, "schema" character varying NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_721b7a23ba03112870de2c944a" UNIQUE ("user_id"), CONSTRAINT "PK_16d20c94e486b3613872aa43cad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit" ADD CONSTRAINT "FK_721b7a23ba03112870de2c944a1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "circuit" DROP CONSTRAINT "FK_721b7a23ba03112870de2c944a1"`,
    );
    await queryRunner.query(`DROP TABLE "circuit"`);
  }
}
