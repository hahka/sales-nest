import {MigrationInterface, QueryRunner} from "typeorm";

export class addMarketSalesIncome1605881445793 implements MigrationInterface {
    name = 'addMarketSalesIncome1605881445793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "market-sales" ADD "income" real NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "market-sales" ALTER COLUMN "start_date" DROP DEFAULT`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "market-sales" ALTER COLUMN "start_date" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "market-sales" DROP COLUMN "income"`, undefined);
    }

}
