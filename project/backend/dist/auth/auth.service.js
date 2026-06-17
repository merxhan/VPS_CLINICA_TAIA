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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Pacientes_entity_1 = require("../entities/Pacientes.entity");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    pacientesRepository;
    configService;
    constructor(pacientesRepository, configService) {
        this.pacientesRepository = pacientesRepository;
        this.configService = configService;
    }
    async validateUser(cpf, dob) {
        const adminCpf = this.configService.get('ADMIN_CPF');
        const adminDob = this.configService.get('ADMIN_DOB');
        if (cpf === adminCpf && dob === adminDob) {
            return { id: 0, role: 'admin', nombre: 'Administrador' };
        }
        const paciente = await this.pacientesRepository.findOne({ where: { cpf } });
        if (!paciente) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const pacienteDob = new Date(paciente.fecha_nacimiento).toISOString().split('T')[0];
        if (pacienteDob !== dob) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return { id: paciente.id, role: 'paciente', nombre: paciente.nombre };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Pacientes_entity_1.Pacientes)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map