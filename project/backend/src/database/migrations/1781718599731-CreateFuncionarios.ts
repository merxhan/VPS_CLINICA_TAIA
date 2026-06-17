import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFuncionarios1781718599731 implements MigrationInterface {
    name = 'CreateFuncionarios1781718599731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sesiones" DROP CONSTRAINT "FK_sesiones_diagnostico"`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" DROP CONSTRAINT "FK_diagnosticos_paciente"`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" DROP CONSTRAINT "FK_diagnosticos_servicio"`);
        await queryRunner.query(`ALTER TABLE "Servicios" DROP CONSTRAINT "FK_servicios_categoria"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_pacientes_cpf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_diagnosticos_id_paciente"`);
        await queryRunner.query(`CREATE TYPE "public"."Funcionarios_rol_enum" AS ENUM('administrador', 'terapeuta')`);
        await queryRunner.query(`CREATE TABLE "Funcionarios" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "cpf" character varying NOT NULL, "password" character varying NOT NULL, "rol" "public"."Funcionarios_rol_enum" NOT NULL DEFAULT 'terapeuta', CONSTRAINT "UQ_5de2d7bad1862fa1eb0cb2e8237" UNIQUE ("cpf"), CONSTRAINT "PK_302ee46cf537922edb91d8cbef7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Sesiones" ADD CONSTRAINT "FK_36eb1c7d0e3c1c010d038613837" FOREIGN KEY ("id_diagnostico") REFERENCES "Diagnosticos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" ADD CONSTRAINT "FK_a13fef12d72d4fe46eab3a37338" FOREIGN KEY ("id_paciente") REFERENCES "Pacientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" ADD CONSTRAINT "FK_25ae1039dcfedba266856e9f01a" FOREIGN KEY ("id_servicio") REFERENCES "Servicios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Servicios" ADD CONSTRAINT "FK_5e337112b80aad616c443c6817d" FOREIGN KEY ("id_categoria") REFERENCES "Categoria_Servicios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        // Insert initial administrator
        await queryRunner.query(`INSERT INTO "Funcionarios" (nombre, cpf, password, rol) VALUES ('Administrador Principal', '12345678909', '12345678', 'administrador')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Servicios" DROP CONSTRAINT "FK_5e337112b80aad616c443c6817d"`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" DROP CONSTRAINT "FK_25ae1039dcfedba266856e9f01a"`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" DROP CONSTRAINT "FK_a13fef12d72d4fe46eab3a37338"`);
        await queryRunner.query(`ALTER TABLE "Sesiones" DROP CONSTRAINT "FK_36eb1c7d0e3c1c010d038613837"`);
        await queryRunner.query(`DROP TABLE "Funcionarios"`);
        await queryRunner.query(`DROP TYPE "public"."Funcionarios_rol_enum"`);
        await queryRunner.query(`CREATE INDEX "IDX_diagnosticos_id_paciente" ON "Diagnosticos" USING btree ("id_paciente") `);
        await queryRunner.query(`CREATE INDEX "IDX_pacientes_cpf" ON "Pacientes" USING btree ("cpf") `);
        await queryRunner.query(`ALTER TABLE "Servicios" ADD CONSTRAINT "FK_servicios_categoria" FOREIGN KEY ("id_categoria") REFERENCES "Categoria_Servicios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" ADD CONSTRAINT "FK_diagnosticos_servicio" FOREIGN KEY ("id_servicio") REFERENCES "Servicios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" ADD CONSTRAINT "FK_diagnosticos_paciente" FOREIGN KEY ("id_paciente") REFERENCES "Pacientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sesiones" ADD CONSTRAINT "FK_sesiones_diagnostico" FOREIGN KEY ("id_diagnostico") REFERENCES "Diagnosticos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
