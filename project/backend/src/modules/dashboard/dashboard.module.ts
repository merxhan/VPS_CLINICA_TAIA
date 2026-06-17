import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Pacientes } from '../../entities/Pacientes.entity';
import { Servicios } from '../../entities/Servicios.entity';
import { Sesiones } from '../../entities/Sesiones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pacientes, Servicios, Sesiones])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
