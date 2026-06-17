"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEstadoToSesiones1690000000002 = void 0;
class AddEstadoToSesiones1690000000002 {
    name = 'AddEstadoToSesiones1690000000002';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Sesiones" ADD "estado" character varying(20) NOT NULL DEFAULT 'Pendiente'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Sesiones" DROP COLUMN "estado"`);
    }
}
exports.AddEstadoToSesiones1690000000002 = AddEstadoToSesiones1690000000002;
//# sourceMappingURL=1690000000002-AddEstadoToSesiones.js.map