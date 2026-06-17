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
exports.Pacientes = void 0;
const typeorm_1 = require("typeorm");
const Diagnosticos_entity_1 = require("./Diagnosticos.entity");
let Pacientes = class Pacientes {
    id;
    nombre;
    cpf;
    profesion;
    telefono;
    fecha_nacimiento;
    diagnosticos;
};
exports.Pacientes = Pacientes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pacientes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Pacientes.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Pacientes.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Pacientes.prototype, "profesion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Pacientes.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Pacientes.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Diagnosticos_entity_1.Diagnosticos, (diagnostico) => diagnostico.paciente),
    __metadata("design:type", Array)
], Pacientes.prototype, "diagnosticos", void 0);
exports.Pacientes = Pacientes = __decorate([
    (0, typeorm_1.Entity)('Pacientes')
], Pacientes);
//# sourceMappingURL=Pacientes.entity.js.map