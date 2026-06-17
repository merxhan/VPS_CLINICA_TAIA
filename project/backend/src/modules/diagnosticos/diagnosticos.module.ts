import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosticos } from '../../entities/Diagnosticos.entity';
import { DiagnosticosController } from './diagnosticos.controller';
import { DiagnosticosService } from './diagnosticos.service';

import { Sesiones } from '../../entities/Sesiones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnosticos, Sesiones])],
  controllers: [DiagnosticosController],
  providers: [DiagnosticosService],
})
export class DiagnosticosModule {}
