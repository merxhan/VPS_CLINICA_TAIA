import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaServicios } from '../../entities/CategoriaServicios.entity';
import { Servicios } from '../../entities/Servicios.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(CategoriaServicios)
    private repo: Repository<CategoriaServicios>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Partial<CategoriaServicios>) {
    if (!data.nombre || !data.nombre.trim()) {
      throw new BadRequestException('El campo Nombre es obligatorio.');
    }
    const categoria = this.repo.create(data);
    return this.repo.save(categoria);
  }

  async update(id: number, data: Partial<CategoriaServicios>) {
    if (data.nombre !== undefined && !data.nombre.trim()) {
      throw new BadRequestException('El campo Nombre no puede estar vacío.');
    }
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const serviciosCount = await this.repo.manager.getRepository(Servicios).count({ where: { categoria: { id } } });
    if (serviciosCount > 0) {
      throw new ConflictException('No se puede eliminar la categoría porque tiene servicios asociados.');
    }
    return this.repo.delete(id);
  }
}
