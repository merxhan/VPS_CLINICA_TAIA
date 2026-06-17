"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Diagnosticos_entity_1 = require("../../entities/Diagnosticos.entity");
const diagnosticos_controller_1 = require("./diagnosticos.controller");
const diagnosticos_service_1 = require("./diagnosticos.service");
const Sesiones_entity_1 = require("../../entities/Sesiones.entity");
let DiagnosticosModule = class DiagnosticosModule {
};
exports.DiagnosticosModule = DiagnosticosModule;
exports.DiagnosticosModule = DiagnosticosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Diagnosticos_entity_1.Diagnosticos, Sesiones_entity_1.Sesiones])],
        controllers: [diagnosticos_controller_1.DiagnosticosController],
        providers: [diagnosticos_service_1.DiagnosticosService],
    })
], DiagnosticosModule);
//# sourceMappingURL=diagnosticos.module.js.map