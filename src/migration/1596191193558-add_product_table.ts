import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductTable1596191193558 implements MigrationInterface {
  name = 'AddProductTable1596191193558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "PRODUCT_CATEGORY" AS ENUM('FRESH', 'FROZEN');`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "product"
        (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying(300) COLLATE pg_catalog."default" NOT NULL,
            "price" real NOT NULL,
            "category" "PRODUCT_CATEGORY",
            "image" text COLLATE pg_catalog."default",
            CONSTRAINT "product_pkey" PRIMARY KEY ("id"),
            CONSTRAINT "name" UNIQUE ("name")
        )`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`, undefined);
    await queryRunner.query(`DROP TYPE "PRODUCT_CATEGORY";`, undefined);
  }
}
