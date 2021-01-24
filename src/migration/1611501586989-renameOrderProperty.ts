import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameOrderProperty1611501586989 implements MigrationInterface {
    name = 'RenameOrderProperty1611501586989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "order" TO "product_order"`, undefined);
        await queryRunner.query(`ALTER TABLE "market" ADD "market_order" integer NOT NULL DEFAULT 1`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "market" DROP COLUMN "market_order"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "product_order" TO "order"`, undefined);
    }

}
