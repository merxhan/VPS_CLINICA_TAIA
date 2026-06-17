import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diagnosticos } from '../../entities/Diagnosticos.entity';
import { Sesiones } from '../../entities/Sesiones.entity';

@Injectable()
export class DiagnosticosService {
  constructor(
    @InjectRepository(Diagnosticos)
    private repo: Repository<Diagnosticos>,
    @InjectRepository(Sesiones)
    private sesionesRepo: Repository<Sesiones>,
  ) {}

  async create(data: any): Promise<Diagnosticos> {
    this.validateFecha(data.fecha_diagnostico);
    try {
      const diagnostico = this.repo.create({
        paciente: { id: data.id_paciente },
        servicio: { id: data.id_servicio },
        fecha_diagnostico: data.fecha_diagnostico,
        descripcion: data.descripcion,
        sesiones: data.sesiones || [],
      });
      return await this.repo.save(diagnostico);
    } catch (error) {
      throw new BadRequestException('Error al crear diagnóstico: ' + error.message);
    }
  }

  async update(id: number, data: any): Promise<Diagnosticos> {
    try {
      const diagnostico = await this.repo.findOne({ where: { id }, relations: { sesiones: true } });
      if (!diagnostico) throw new BadRequestException('Diagnóstico no encontrado');

      if (data.id_servicio) diagnostico.servicio = { id: data.id_servicio } as any;
      if (data.fecha_diagnostico) {
        this.validateFecha(data.fecha_diagnostico);
        diagnostico.fecha_diagnostico = data.fecha_diagnostico;
      }
      if (data.descripcion !== undefined) diagnostico.descripcion = data.descripcion;

      if (data.sesiones) {
        await this.sesionesRepo.createQueryBuilder().delete().where("id_diagnostico = :id", { id }).execute();
        diagnostico.sesiones = data.sesiones.map((s: any) => {
          delete s.id;
          return s;
        });
      }

      return await this.repo.save(diagnostico);
    } catch (error) {
      throw new BadRequestException('Error al actualizar diagnóstico: ' + error.message);
    }
  }

  async remove(id: number): Promise<void> {
    const diagnostico = await this.repo.findOne({ where: { id }, relations: { sesiones: true } });
    if (!diagnostico) throw new BadRequestException('Diagnóstico no encontrado');

    const hasPaidOrCompleted = diagnostico.sesiones?.some(s => s.estado === 'Paga' || s.estado === 'Realizada');
    if (hasPaidOrCompleted) {
      throw new BadRequestException('No se puede eliminar el diagnóstico porque tiene sesiones pagas o realizadas.');
    }

    try {
      if (diagnostico.sesiones && diagnostico.sesiones.length > 0) {
        await this.sesionesRepo.createQueryBuilder().delete().where("id_diagnostico = :id", { id }).execute();
      }
      await this.repo.delete(id);
    } catch (error) {
      throw new BadRequestException('Error al eliminar diagnóstico: ' + error.message);
    }
  }

  private validateFecha(fecha: string) {
    if (!fecha) return;
    const d = new Date(fecha);
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() - 5);
    
    // Normalize to start of day for comparison
    d.setUTCHours(0,0,0,0);
    today.setUTCHours(23,59,59,999);
    minDate.setUTCHours(0,0,0,0);

    if (d > today || d < minDate) {
      throw new BadRequestException('La fecha del diagnóstico debe ser desde hoy hasta 5 días atrás máximo.');
    }
  }
}
