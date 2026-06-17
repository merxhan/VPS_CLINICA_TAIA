"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCoreTables1690000000000 = void 0;
class CreateCoreTables1690000000000 {
    name = 'CreateCoreTables1690000000000';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "Categoria_Servicios" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" text, CONSTRAINT "PK_categoria_servicios" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Servicios" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" text, "id_categoria" integer, CONSTRAINT "PK_servicios" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Pacientes" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "cpf" character varying NOT NULL, "profesion" character varying, "telefono" character varying, "fecha_nacimiento" date NOT NULL, CONSTRAINT "UQ_cpf" UNIQUE ("cpf"), CONSTRAINT "PK_pacientes" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Diagnosticos" ("id" SERIAL NOT NULL, "fecha_diagnostico" date NOT NULL, "descripcion" text, "id_paciente" integer, "id_servicio" integer, CONSTRAINT "PK_diagnosticos" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Sesiones" ("id" SERIAL NOT NULL, "fecha_sesion" TIMESTAMP NOT NULL, "numero_sesiones" integer, "valor" numeric(10,2) NOT NULL, "medio_pago" character varying(50) NOT NULL, "id_diagnostico" integer, CONSTRAINT "PK_sesiones" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Servicios" ADD CONSTRAINT "FK_servicios_categoria" FOREIGN KEY ("id_categoria") REFERENCES "Categoria_Servicios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" ADD CONSTRAINT "FK_diagnosticos_paciente" FOREIGN KEY ("id_paciente") REFERENCES "Pacientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" ADD CONSTRAINT "FK_diagnosticos_servicio" FOREIGN KEY ("id_servicio") REFERENCES "Servicios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sesiones" ADD CONSTRAINT "FK_sesiones_diagnostico" FOREIGN KEY ("id_diagnostico") REFERENCES "Diagnosticos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Sesiones" DROP CONSTRAINT "FK_sesiones_diagnostico"`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" DROP CONSTRAINT "FK_diagnosticos_servicio"`);
        await queryRunner.query(`ALTER TABLE "Diagnosticos" DROP CONSTRAINT "FK_diagnosticos_paciente"`);
        await queryRunner.query(`ALTER TABLE "Servicios" DROP CONSTRAINT "FK_servicios_categoria"`);
        await queryRunner.query(`DROP TABLE "Sesiones"`);
        await queryRunner.query(`DROP TABLE "Diagnosticos"`);
        await queryRunner.query(`DROP TABLE "Pacientes"`);
        await queryRunner.query(`DROP TABLE "Servicios"`);
        await queryRunner.query(`DROP TABLE "Categoria_Servicios"`);
    }
}
exports.CreateCoreTables1690000000000 = CreateCoreTables1690000000000;
//# sourceMappingURL=1690000000000-CreateCoreTables.js.map