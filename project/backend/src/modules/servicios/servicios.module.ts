import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Servicios } from '../../entities/Servicios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servicios])],
  providers: [ServiciosService],
  controllers: [ServiciosController],
})
export class ServiciosModule {}
