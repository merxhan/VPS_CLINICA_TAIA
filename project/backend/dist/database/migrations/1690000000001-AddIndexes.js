"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIndexes1690000000001 = void 0;
class AddIndexes1690000000001 {
    name = 'AddIndexes1690000000001';
    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_pacientes_cpf" ON "Pacientes" ("cpf")`);
        await queryRunner.query(`CREATE INDEX "IDX_diagnosticos_id_paciente" ON "Diagnosticos" ("id_paciente")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_diagnosticos_id_paciente"`);
        await queryRunner.query(`DROP INDEX "IDX_pacientes_cpf"`);
    }
}
exports.AddIndexes1690000000001 = AddIndexes1690000000001;
//# sourceMappingURL=1690000000001-AddIndexes.js.map