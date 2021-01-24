import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMarketDates1605867640088 implements MigrationInterface {
  name = 'AddMarketDates1605867640088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "market-sales" ADD "startDate" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market-sales" ADD "endDate" TIMESTAMP`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "market-sales" DROP COLUMN "endDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "market-sales" DROP COLUMN "startDate"`,
      undefined,
    );
  }
}
