import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicios } from '../../entities/Servicios.entity';
import { Diagnosticos } from '../../entities/Diagnosticos.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicios) private repo: Repository<Servicios>,
  ) {}

  findAll(page: number = 1, limit: number = 10) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: { categoria: true },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: { categoria: true } });
  }

  create(data: Partial<Servicios>) {
    const srv = this.repo.create(data);
    return this.repo.save(srv);
  }

  async update(id: number, data: Partial<Servicios>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const diagnosticosCount = await this.repo.manager.getRepository(Diagnosticos).count({ where: { servicio: { id } } });
    if (diagnosticosCount > 0) {
      throw new ConflictException('No se puede eliminar el servicio porque tiene diagnósticos clínicos asociados.');
    }
    return this.repo.delete(id);
  }
}
