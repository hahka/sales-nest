import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStockCreateDate1616149554807 implements MigrationInterface {
  name = 'AddStockCreateDate1616149554807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "market" DROP COLUMN "market_order"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market" ADD "market_order" integer NOT NULL DEFAULT 1`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ADD "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock" DROP COLUMN "created_at"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market" DROP COLUMN "market_order"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market" ADD "market_order" integer NOT NULL DEFAULT 1`,
      undefined,
    );
  }
}
