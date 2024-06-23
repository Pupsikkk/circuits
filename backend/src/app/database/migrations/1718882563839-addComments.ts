import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddComments1718882563839 implements MigrationInterface {
  name = 'AddComments1718882563839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "comments" ADD "user_id" integer`);
    await queryRunner.query(`ALTER TABLE "comments" ADD "circuit_id" integer`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "comments_id_seq" OWNED BY "comments"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT nextval('"comments_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_5a234457bb544588395f9d0ee44" FOREIGN KEY ("circuit_id") REFERENCES "circuit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_5a234457bb544588395f9d0ee44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "comments_id_seq"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "circuit_id"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "updatedAt"`);
  }
}
