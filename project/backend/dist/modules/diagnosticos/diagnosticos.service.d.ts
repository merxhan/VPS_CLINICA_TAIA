import { Repository } from 'typeorm';
import { Diagnosticos } from '../../entities/Diagnosticos.entity';
import { Sesiones } from '../../entities/Sesiones.entity';
export declare class DiagnosticosService {
    private repo;
    private sesionesRepo;
    constructor(repo: Repository<Diagnosticos>, sesionesRepo: Repository<Sesiones>);
    create(data: any): Promise<Diagnosticos>;
    update(id: number, data: any): Promise<Diagnosticos>;
    remove(id: number): Promise<void>;
    private validateFecha;
}
