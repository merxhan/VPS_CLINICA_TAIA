import { Repository } from 'typeorm';
import { Sesiones } from '../../entities/Sesiones.entity';
export declare class SesionesService {
    private sesionesRepository;
    constructor(sesionesRepository: Repository<Sesiones>);
    cambiarEstado(id: number, nuevoEstado: string): Promise<Sesiones>;
}
