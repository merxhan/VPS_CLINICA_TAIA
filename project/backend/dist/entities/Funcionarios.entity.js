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
exports.Funcionarios = exports.RolFuncionario = void 0;
const typeorm_1 = require("typeorm");
var RolFuncionario;
(function (RolFuncionario) {
    RolFuncionario["ADMINISTRADOR"] = "administrador";
    RolFuncionario["TERAPEUTA"] = "terapeuta";
})(RolFuncionario || (exports.RolFuncionario = RolFuncionario = {}));
let Funcionarios = class Funcionarios {
    id;
    nombre;
    cpf;
    password;
    rol;
};
exports.Funcionarios = Funcionarios;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Funcionarios.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Funcionarios.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Funcionarios.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Funcionarios.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RolFuncionario,
        default: RolFuncionario.TERAPEUTA,
    }),
    __metadata("design:type", String)
], Funcionarios.prototype, "rol", void 0);
exports.Funcionarios = Funcionarios = __decorate([
    (0, typeorm_1.Entity)('Funcionarios')
], Funcionarios);
//# sourceMappingURL=Funcionarios.entity.js.map