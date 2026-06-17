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
exports.DiagnosticosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Diagnosticos_entity_1 = require("../../entities/Diagnosticos.entity");
const Sesiones_entity_1 = require("../../entities/Sesiones.entity");
let DiagnosticosService = class DiagnosticosService {
    repo;
    sesionesRepo;
    constructor(repo, sesionesRepo) {
        this.repo = repo;
        this.sesionesRepo = sesionesRepo;
    }
    async create(data) {
        this.validateFecha(data.fecha_diagnostico);
        try {
            const diagnostico = this.repo.create({
                paciente: { id: data.id_paciente },
                servicio: { id: data.id_servicio },
                fecha_diagnostico: data.fecha_diagnostico,
                descripcion: data.descripcion,
                sesiones: data.sesiones || [],
            });
            return await this.repo.save(diagnostico);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al crear diagnóstico: ' + error.message);
        }
    }
    async update(id, data) {
        try {
            const diagnostico = await this.repo.findOne({ where: { id }, relations: { sesiones: true } });
            if (!diagnostico)
                throw new common_1.BadRequestException('Diagnóstico no encontrado');
            if (data.id_servicio)
                diagnostico.servicio = { id: data.id_servicio };
            if (data.fecha_diagnostico) {
                this.validateFecha(data.fecha_diagnostico);
                diagnostico.fecha_diagnostico = data.fecha_diagnostico;
            }
            if (data.descripcion !== undefined)
                diagnostico.descripcion = data.descripcion;
            if (data.sesiones) {
                await this.sesionesRepo.createQueryBuilder().delete().where("id_diagnostico = :id", { id }).execute();
                diagnostico.sesiones = data.sesiones.map((s) => {
                    delete s.id;
                    return s;
                });
            }
            return await this.repo.save(diagnostico);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al actualizar diagnóstico: ' + error.message);
        }
    }
    async remove(id) {
        const diagnostico = await this.repo.findOne({ where: { id }, relations: { sesiones: true } });
        if (!diagnostico)
            throw new common_1.BadRequestException('Diagnóstico no encontrado');
        const hasPaidOrCompleted = diagnostico.sesiones?.some(s => s.estado === 'Paga' || s.estado === 'Realizada');
        if (hasPaidOrCompleted) {
            throw new common_1.BadRequestException('No se puede eliminar el diagnóstico porque tiene sesiones pagas o realizadas.');
        }
        try {
            if (diagnostico.sesiones && diagnostico.sesiones.length > 0) {
                await this.sesionesRepo.createQueryBuilder().delete().where("id_diagnostico = :id", { id }).execute();
            }
            await this.repo.delete(id);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al eliminar diagnóstico: ' + error.message);
        }
    }
    validateFecha(fecha) {
        if (!fecha)
            return;
        const d = new Date(fecha);
        const today = new Date();
        const minDate = new Date();
        minDate.setDate(today.getDate() - 5);
        d.setUTCHours(0, 0, 0, 0);
        today.setUTCHours(23, 59, 59, 999);
        minDate.setUTCHours(0, 0, 0, 0);
        if (d > today || d < minDate) {
            throw new common_1.BadRequestException('La fecha del diagnóstico debe ser desde hoy hasta 5 días atrás máximo.');
        }
    }
};
exports.DiagnosticosService = DiagnosticosService;
exports.DiagnosticosService = DiagnosticosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Diagnosticos_entity_1.Diagnosticos)),
    __param(1, (0, typeorm_1.InjectRepository)(Sesiones_entity_1.Sesiones)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DiagnosticosService);
//# sourceMappingURL=diagnosticos.service.js.map