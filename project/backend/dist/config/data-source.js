"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const CategoriaServicios_entity_1 = require("../entities/CategoriaServicios.entity");
const Servicios_entity_1 = require("../entities/Servicios.entity");
const Pacientes_entity_1 = require("../entities/Pacientes.entity");
const Diagnosticos_entity_1 = require("../entities/Diagnosticos.entity");
const Sesiones_entity_1 = require("../entities/Sesiones.entity");
const Funcionarios_entity_1 = require("../entities/Funcionarios.entity");
dotenv.config({ path: process.env.NODE_ENV === 'produccion' ? '.env.produccion' : '.env.homologacion' });
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [CategoriaServicios_entity_1.CategoriaServicios, Servicios_entity_1.Servicios, Pacientes_entity_1.Pacientes, Diagnosticos_entity_1.Diagnosticos, Sesiones_entity_1.Sesiones, Funcionarios_entity_1.Funcionarios],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
});
//# sourceMappingURL=data-source.js.map