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
exports.Sesiones = void 0;
const typeorm_1 = require("typeorm");
const Diagnosticos_entity_1 = require("./Diagnosticos.entity");
let Sesiones = class Sesiones {
    id;
    diagnostico;
    fecha_sesion;
    numero_sesiones;
    valor;
    medio_pago;
    estado;
};
exports.Sesiones = Sesiones;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sesiones.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Diagnosticos_entity_1.Diagnosticos, (diagnostico) => diagnostico.sesiones, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_diagnostico' }),
    __metadata("design:type", Diagnosticos_entity_1.Diagnosticos)
], Sesiones.prototype, "diagnostico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Sesiones.prototype, "fecha_sesion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Sesiones.prototype, "numero_sesiones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sesiones.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Sesiones.prototype, "medio_pago", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'Pendiente' }),
    __metadata("design:type", String)
], Sesiones.prototype, "estado", void 0);
exports.Sesiones = Sesiones = __decorate([
    (0, typeorm_1.Entity)('Sesiones')
], Sesiones);
//# sourceMappingURL=Sesiones.entity.js.map