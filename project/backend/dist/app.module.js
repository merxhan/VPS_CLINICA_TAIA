"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const timezone_interceptor_1 = require("./common/interceptors/timezone.interceptor");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const auth_module_1 = require("./auth/auth.module");
const sesiones_module_1 = require("./modules/sesiones/sesiones.module");
const servicios_module_1 = require("./modules/servicios/servicios.module");
const pacientes_module_1 = require("./modules/pacientes/pacientes.module");
const categorias_module_1 = require("./modules/categorias/categorias.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const diagnosticos_module_1 = require("./modules/diagnosticos/diagnosticos.module");
const CategoriaServicios_entity_1 = require("./entities/CategoriaServicios.entity");
const Servicios_entity_1 = require("./entities/Servicios.entity");
const Pacientes_entity_1 = require("./entities/Pacientes.entity");
const Diagnosticos_entity_1 = require("./entities/Diagnosticos.entity");
const Sesiones_entity_1 = require("./entities/Sesiones.entity");
const Funcionarios_entity_1 = require("./entities/Funcionarios.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'produccion' ? '.env.produccion' : '.env.homologacion',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [CategoriaServicios_entity_1.CategoriaServicios, Servicios_entity_1.Servicios, Pacientes_entity_1.Pacientes, Diagnosticos_entity_1.Diagnosticos, Sesiones_entity_1.Sesiones, Funcionarios_entity_1.Funcionarios],
                    synchronize: false,
                }),
            }),
            auth_module_1.AuthModule,
            sesiones_module_1.SesionesModule,
            servicios_module_1.ServiciosModule,
            pacientes_module_1.PacientesModule,
            categorias_module_1.CategoriasModule,
            dashboard_module_1.DashboardModule,
            diagnosticos_module_1.DiagnosticosModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: timezone_interceptor_1.TimezoneInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map