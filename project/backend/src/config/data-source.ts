import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { CategoriaServicios } from '../entities/CategoriaServicios.entity';
import { Servicios } from '../entities/Servicios.entity';
import { Pacientes } from '../entities/Pacientes.entity';
import { Diagnosticos } from '../entities/Diagnosticos.entity';
import { Sesiones } from '../entities/Sesiones.entity';
import { Funcionarios } from '../entities/Funcionarios.entity';

// Configuración manual para la CLI de TypeORM y uso dentro de NestJS
dotenv.config({ path: process.env.NODE_ENV === 'produccion' ? '.env.produccion' : '.env.homologacion' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [CategoriaServicios, Servicios, Pacientes, Diagnosticos, Sesiones, Funcionarios],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
});
