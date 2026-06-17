import { Repository } from 'typeorm';
import { Pacientes } from '../../entities/Pacientes.entity';
export declare class PacientesService {
    private repo;
    constructor(repo: Repository<Pacientes>);
    findAll(page?: number, limit?: number): Promise<Pacientes[]>;
    findOne(id: number): Promise<Pacientes | null>;
    create(data: Partial<Pacientes>): Promise<Pacientes>;
    update(id: number, data: Partial<Pacientes>): Promise<Pacientes | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
