import { Repository } from 'typeorm';
import { Pacientes } from '../../entities/Pacientes.entity';
import { Servicios } from '../../entities/Servicios.entity';
import { Sesiones } from '../../entities/Sesiones.entity';
export declare class DashboardService {
    private pacientesRepository;
    private serviciosRepository;
    private sesionesRepository;
    constructor(pacientesRepository: Repository<Pacientes>, serviciosRepository: Repository<Servicios>, sesionesRepository: Repository<Sesiones>);
    getSummary(): Promise<{
        totalPacientes: number;
        totalServicios: number;
        sesionesPendientes: number;
        receitaMensal: number;
    }>;
}
