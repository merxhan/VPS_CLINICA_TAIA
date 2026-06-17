import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SesionesService } from './sesiones.service';
import { SesionesController } from './sesiones.controller';
import { Sesiones } from '../../entities/Sesiones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sesiones])],
  providers: [SesionesService],
  controllers: [SesionesController],
})
export class SesionesModule {}
