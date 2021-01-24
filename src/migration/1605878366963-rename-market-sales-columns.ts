import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameMarketSalesColumns1605878366963
  implements MigrationInterface {
  name = 'RenameMarketSalesColumns1605878366963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "market-sales" RENAME COLUMN "marketId" to "market_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market-sales" RENAME COLUMN "marketName" to "market_name"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market-sales" RENAME COLUMN "startDate" to "start_date"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market-sales" RENAME COLUMN "endDate" to "end_date"`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "market-sales" RENAME COLUMN "end_date" to "endDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market-sales" RENAME COLUMN "start_date" to "startDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market-sales" RENAME COLUMN "market_name" to "marketName"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market-sales" RENAME COLUMN "market_id" to "marketId"`,
      undefined,
    );
  }
}
