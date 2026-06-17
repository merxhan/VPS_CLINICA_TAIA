import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexes1690000000001 implements MigrationInterface {
    name = 'AddIndexes1690000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_pacientes_cpf" ON "Pacientes" ("cpf")`);
        await queryRunner.query(`CREATE INDEX "IDX_diagnosticos_id_paciente" ON "Diagnosticos" ("id_paciente")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_diagnosticos_id_paciente"`);
        await queryRunner.query(`DROP INDEX "IDX_pacientes_cpf"`);
    }
}
