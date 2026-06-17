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
exports.PacientesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Pacientes_entity_1 = require("../../entities/Pacientes.entity");
const Diagnosticos_entity_1 = require("../../entities/Diagnosticos.entity");
let PacientesService = class PacientesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll(page = 1, limit = 10) {
        return this.repo.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: { diagnosticos: { servicio: true, sesiones: true } },
        });
    }
    findOne(id) {
        return this.repo.findOne({
            where: { id },
            relations: { diagnosticos: { servicio: true, sesiones: true } }
        });
    }
    async create(data) {
        if (!data.nombre || !data.cpf || !data.fecha_nacimiento || !data.telefono) {
            throw new common_1.BadRequestException('Los campos nombre, cpf, fecha de nacimiento y teléfono son obligatorios.');
        }
        try {
            const paciente = this.repo.create(data);
            return await this.repo.save(paciente);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('El CPF ingresado ya se encuentra registrado.');
            }
            throw new common_1.BadRequestException('Error al crear paciente: ' + error.message);
        }
    }
    async update(id, data) {
        if ((data.nombre !== undefined && !data.nombre.trim()) ||
            (data.cpf !== undefined && !data.cpf.trim()) ||
            (data.fecha_nacimiento !== undefined && !data.fecha_nacimiento) ||
            (data.telefono !== undefined && !data.telefono.trim())) {
            throw new common_1.BadRequestException('Los campos obligatorios no pueden estar vacíos.');
        }
        try {
            await this.repo.update(id, data);
            return await this.findOne(id);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('El CPF ingresado ya se encuentra registrado.');
            }
            throw new common_1.BadRequestException('Error al actualizar paciente: ' + error.message);
        }
    }
    async remove(id) {
        const diagnosticosCount = await this.repo.manager.getRepository(Diagnosticos_entity_1.Diagnosticos).count({ where: { paciente: { id } } });
        if (diagnosticosCount > 0) {
            throw new common_1.ConflictException('No se puede eliminar el paciente porque tiene diagnósticos asociados.');
        }
        return this.repo.delete(id);
    }
};
exports.PacientesService = PacientesService;
exports.PacientesService = PacientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Pacientes_entity_1.Pacientes)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PacientesService);
//# sourceMappingURL=pacientes.service.js.map