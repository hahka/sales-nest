import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStockTable1599902857184 implements MigrationInterface {
  name = 'AddStockTable1599902857184';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "product_category_enum" AS ENUM('FRESH', 'FROZEN', 'PASTEURIZED')`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "category" TYPE "product_category_enum" USING CASE WHEN category='FRESH' then 'FRESH'::product_category_enum
      WHEN category='FROZEN' then 'FROZEN'::product_category_enum
      else 'PASTEURIZED'::product_category_enum
      END;`,
      undefined,
    );

    await queryRunner.query(
      `CREATE TABLE "stock"
            (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "stock" jsonb,
                "lastUpdate" TIMESTAMP
            )`,
      undefined,
    );
    await queryRunner.query(`DROP TYPE "PRODUCT_CATEGORY"`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "PRODUCT_CATEGORY" AS ENUM('FRESH', 'FROZEN', 'PASTEURIZED')`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "stock"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "product.category" TYPE "product_category" USING CASE WHEN category='FRESH' then 'FRESH'::PRODUCT_CATEGORY
      WHEN category='FROZEN' then 'FROZEN'::PRODUCT_CATEGORY
      else 'PASTEURIZED'::PRODUCT_CATEGORY
      END;`,
      undefined,
    );
    await queryRunner.query(`DROP TYPE "product_category_enum"`, undefined);
  }
}
