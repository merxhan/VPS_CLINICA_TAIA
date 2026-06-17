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
exports.ServiciosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Servicios_entity_1 = require("../../entities/Servicios.entity");
const Diagnosticos_entity_1 = require("../../entities/Diagnosticos.entity");
let ServiciosService = class ServiciosService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll(page = 1, limit = 10) {
        return this.repo.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: { categoria: true },
        });
    }
    findOne(id) {
        return this.repo.findOne({ where: { id }, relations: { categoria: true } });
    }
    create(data) {
        const srv = this.repo.create(data);
        return this.repo.save(srv);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        const diagnosticosCount = await this.repo.manager.getRepository(Diagnosticos_entity_1.Diagnosticos).count({ where: { servicio: { id } } });
        if (diagnosticosCount > 0) {
            throw new common_1.ConflictException('No se puede eliminar el servicio porque tiene diagnósticos clínicos asociados.');
        }
        return this.repo.delete(id);
    }
};
exports.ServiciosService = ServiciosService;
exports.ServiciosService = ServiciosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Servicios_entity_1.Servicios)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiciosService);
//# sourceMappingURL=servicios.service.js.map