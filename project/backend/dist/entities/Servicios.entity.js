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
exports.Servicios = void 0;
const typeorm_1 = require("typeorm");
const CategoriaServicios_entity_1 = require("./CategoriaServicios.entity");
const Diagnosticos_entity_1 = require("./Diagnosticos.entity");
let Servicios = class Servicios {
    id;
    nombre;
    descripcion;
    categoria;
    diagnosticos;
};
exports.Servicios = Servicios;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Servicios.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Servicios.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Servicios.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CategoriaServicios_entity_1.CategoriaServicios, (categoria) => categoria.servicios),
    (0, typeorm_1.JoinColumn)({ name: 'id_categoria' }),
    __metadata("design:type", CategoriaServicios_entity_1.CategoriaServicios)
], Servicios.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Diagnosticos_entity_1.Diagnosticos, (diagnostico) => diagnostico.servicio),
    __metadata("design:type", Array)
], Servicios.prototype, "diagnosticos", void 0);
exports.Servicios = Servicios = __decorate([
    (0, typeorm_1.Entity)('Servicios')
], Servicios);
//# sourceMappingURL=Servicios.entity.js.map