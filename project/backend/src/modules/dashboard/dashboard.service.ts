import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pacientes } from '../../entities/Pacientes.entity';
import { Servicios } from '../../entities/Servicios.entity';
import { Sesiones } from '../../entities/Sesiones.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Pacientes)
    private pacientesRepository: Repository<Pacientes>,
    @InjectRepository(Servicios)
    private serviciosRepository: Repository<Servicios>,
    @InjectRepository(Sesiones)
    private sesionesRepository: Repository<Sesiones>,
  ) {}

  async getSummary() {
    const totalPacientes = await this.pacientesRepository.count();
    const totalServicios = await this.serviciosRepository.count();
    const sesionesPendientes = await this.sesionesRepository.count({
      where: { estado: 'Pendiente' },
    });

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Calculate revenue (Receita Mensal)
    const result = await this.sesionesRepository
      .createQueryBuilder('sesion')
      .select('SUM(sesion.valor)', 'total')
      .where('sesion.estado IN (:...estados)', { estados: ['Paga', 'Realizada'] })
      .andWhere('EXTRACT(MONTH FROM sesion.fecha_sesion) = :month', { month: currentMonth })
      .andWhere('EXTRACT(YEAR FROM sesion.fecha_sesion) = :year', { year: currentYear })
      .getRawOne();

    const receitaMensal = result && result.total ? parseFloat(result.total) : 0;

    return {
      totalPacientes,
      totalServicios,
      sesionesPendientes,
      receitaMensal,
    };
  }
}
