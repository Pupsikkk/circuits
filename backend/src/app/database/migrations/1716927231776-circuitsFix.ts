import { MigrationInterface, QueryRunner } from 'typeorm';

export class CircuitsFix1716927231776 implements MigrationInterface {
  name = 'CircuitsFix1716927231776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "circuit" DROP CONSTRAINT "FK_721b7a23ba03112870de2c944a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit" DROP CONSTRAINT "REL_721b7a23ba03112870de2c944a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit" ADD CONSTRAINT "FK_721b7a23ba03112870de2c944a1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "circuit" DROP CONSTRAINT "FK_721b7a23ba03112870de2c944a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit" ADD CONSTRAINT "REL_721b7a23ba03112870de2c944a" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit" ADD CONSTRAINT "FK_721b7a23ba03112870de2c944a1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
