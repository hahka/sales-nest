import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixColumns1599905550299 implements MigrationInterface {
  name = 'FixColumns1599905550299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "category" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ADD CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id")`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ALTER COLUMN "stock" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ALTER COLUMN "lastUpdate" SET NOT NULL`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock" ALTER COLUMN "lastUpdate" DROP NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ALTER COLUMN "stock" DROP NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" DROP CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "category" DROP NOT NULL`,
      undefined,
    );
  }
}
