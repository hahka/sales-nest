import { MigrationInterface, QueryRunner } from 'typeorm';

export class MarketNameUnicity1588955291112 implements MigrationInterface {
  name = 'MarketNameUnicity1588955291112';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "unique_name"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "market" ADD CONSTRAINT "UQ_1aeb3f3714d39ebc4697c220e97" UNIQUE ("name")`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "market" DROP CONSTRAINT "UQ_1aeb3f3714d39ebc4697c220e97"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_name" ON "market" ("name") `,
      undefined,
    );
  }
}
