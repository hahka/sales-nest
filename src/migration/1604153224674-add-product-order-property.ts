import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductOrderProperty1604153224674
  implements MigrationInterface {
  name = 'AddProductOrderProperty1604153224674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "order" integer NOT NULL DEFAULT 1`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "order"`,
      undefined,
    );
  }
}
