import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEstadoToSesiones1690000000002 implements MigrationInterface {
    name = 'AddEstadoToSesiones1690000000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sesiones" ADD "estado" character varying(20) NOT NULL DEFAULT 'Pendiente'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sesiones" DROP COLUMN "estado"`);
    }
}
