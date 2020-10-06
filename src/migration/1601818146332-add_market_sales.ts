import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMarketSales1601818146332 implements MigrationInterface {
  name = 'AddMarketSales1601818146332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "market-sales_categories_enum" AS ENUM('FRESH', 'FROZEN', 'PASTEURIZED')`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "market-sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "marketId" uuid NOT NULL, "marketName" character varying(300) NOT NULL, "categories" "market-sales_categories_enum" array NOT NULL, "sales" jsonb NOT NULL, CONSTRAINT "PK_862d8bbbfe726b8f0046799cecd" PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "market-sales"`, undefined);
    await queryRunner.query(
      `DROP TYPE "market-sales_categories_enum"`,
      undefined,
    );
  }
}
