import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { Pacientes } from '../../entities/Pacientes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pacientes])],
  providers: [PacientesService],
  controllers: [PacientesController],
})
export class PacientesModule {}
