import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sesiones } from '../../entities/Sesiones.entity';

@Injectable()
export class SesionesService {
  constructor(
    @InjectRepository(Sesiones)
    private sesionesRepository: Repository<Sesiones>,
  ) {}

  async cambiarEstado(id: number, nuevoEstado: string): Promise<Sesiones> {
    const sesion = await this.sesionesRepository.findOne({ where: { id } });
    if (!sesion) throw new BadRequestException('Sesión no encontrada');

    if (sesion.estado === 'Pendiente' && nuevoEstado === 'Realizada') {
      throw new BadRequestException('Transición de estado inválida: No se puede pasar de Pendiente a Realizada directamente sin el estado intermedio Paga.');
    }

    sesion.estado = nuevoEstado;
    return this.sesionesRepository.save(sesion);
  }
}
