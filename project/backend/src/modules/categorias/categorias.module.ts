import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { CategoriaServicios } from '../../entities/CategoriaServicios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaServicios])],
  providers: [CategoriasService],
  controllers: [CategoriasController],
})
export class CategoriasModule {}
