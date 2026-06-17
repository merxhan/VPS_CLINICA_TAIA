"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnosticos = void 0;
const typeorm_1 = require("typeorm");
const Pacientes_entity_1 = require("./Pacientes.entity");
const Servicios_entity_1 = require("./Servicios.entity");
const Sesiones_entity_1 = require("./Sesiones.entity");
let Diagnosticos = class Diagnosticos {
    id;
    paciente;
    servicio;
    fecha_diagnostico;
    descripcion;
    sesiones;
};
exports.Diagnosticos = Diagnosticos;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Diagnosticos.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pacientes_entity_1.Pacientes, (paciente) => paciente.diagnosticos),
    (0, typeorm_1.JoinColumn)({ name: 'id_paciente' }),
    __metadata("design:type", Pacientes_entity_1.Pacientes)
], Diagnosticos.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Servicios_entity_1.Servicios, (servicio) => servicio.diagnosticos),
    (0, typeorm_1.JoinColumn)({ name: 'id_servicio' }),
    __metadata("design:type", Servicios_entity_1.Servicios)
], Diagnosticos.prototype, "servicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Diagnosticos.prototype, "fecha_diagnostico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Diagnosticos.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sesiones_entity_1.Sesiones, (sesion) => sesion.diagnostico, { cascade: true }),
    __metadata("design:type", Array)
], Diagnosticos.prototype, "sesiones", void 0);
exports.Diagnosticos = Diagnosticos = __decorate([
    (0, typeorm_1.Entity)('Diagnosticos')
], Diagnosticos);
//# sourceMappingURL=Diagnosticos.entity.js.map