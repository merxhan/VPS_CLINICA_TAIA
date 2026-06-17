import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pacientes } from '../../entities/Pacientes.entity';
import { Diagnosticos } from '../../entities/Diagnosticos.entity';

@Injectable()
export class PacientesService {
  constructor(@InjectRepository(Pacientes) private repo: Repository<Pacientes>) {}

  findAll(page: number = 1, limit: number = 10) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: { diagnosticos: { servicio: true, sesiones: true } },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({ 
      where: { id }, 
      relations: { diagnosticos: { servicio: true, sesiones: true } } 
    });
  }

  async create(data: Partial<Pacientes>) {
    if (!data.nombre || !data.cpf || !data.fecha_nacimiento || !data.telefono) {
      throw new BadRequestException('Los campos nombre, cpf, fecha de nacimiento y teléfono son obligatorios.');
    }
    try {
      const paciente = this.repo.create(data);
      return await this.repo.save(paciente);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El CPF ingresado ya se encuentra registrado.');
      }
      throw new BadRequestException('Error al crear paciente: ' + error.message);
    }
  }

  async update(id: number, data: Partial<Pacientes>) {
    if ((data.nombre !== undefined && !data.nombre.trim()) || 
        (data.cpf !== undefined && !data.cpf.trim()) || 
        (data.fecha_nacimiento !== undefined && !data.fecha_nacimiento) || 
        (data.telefono !== undefined && !data.telefono.trim())) {
      throw new BadRequestException('Los campos obligatorios no pueden estar vacíos.');
    }
    try {
      await this.repo.update(id, data);
      return await this.findOne(id);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El CPF ingresado ya se encuentra registrado.');
      }
      throw new BadRequestException('Error al actualizar paciente: ' + error.message);
    }
  }

  async remove(id: number) {
    const diagnosticosCount = await this.repo.manager.getRepository(Diagnosticos).count({ where: { paciente: { id } } });
    if (diagnosticosCount > 0) {
      throw new ConflictException('No se puede eliminar el paciente porque tiene diagnósticos asociados.');
    }
    return this.repo.delete(id);
  }
}
