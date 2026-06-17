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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Pacientes_entity_1 = require("../../entities/Pacientes.entity");
const Servicios_entity_1 = require("../../entities/Servicios.entity");
const Sesiones_entity_1 = require("../../entities/Sesiones.entity");
let DashboardService = class DashboardService {
    pacientesRepository;
    serviciosRepository;
    sesionesRepository;
    constructor(pacientesRepository, serviciosRepository, sesionesRepository) {
        this.pacientesRepository = pacientesRepository;
        this.serviciosRepository = serviciosRepository;
        this.sesionesRepository = sesionesRepository;
    }
    async getSummary() {
        const totalPacientes = await this.pacientesRepository.count();
        const totalServicios = await this.serviciosRepository.count();
        const sesionesPendientes = await this.sesionesRepository.count({
            where: { estado: 'Pendiente' },
        });
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const result = await this.sesionesRepository
            .createQueryBuilder('sesion')
            .select('SUM(sesion.valor)', 'total')
            .where('sesion.estado IN (:...estados)', { estados: ['Paga', 'Realizada'] })
            .andWhere('EXTRACT(MONTH FROM sesion.fecha_sesion) = :month', { month: currentMonth })
            .andWhere('EXTRACT(YEAR FROM sesion.fecha_sesion) = :year', { year: currentYear })
            .getRawOne();
        const receitaMensal = result && result.total ? parseFloat(result.total) : 0;
        return {
            totalPacientes,
            totalServicios,
            sesionesPendientes,
            receitaMensal,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Pacientes_entity_1.Pacientes)),
    __param(1, (0, typeorm_1.InjectRepository)(Servicios_entity_1.Servicios)),
    __param(2, (0, typeorm_1.InjectRepository)(Sesiones_entity_1.Sesiones)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map