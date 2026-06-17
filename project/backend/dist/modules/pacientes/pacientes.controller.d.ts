import { PacientesService } from './pacientes.service';
import { Pacientes } from '../../entities/Pacientes.entity';
export declare class PacientesController {
    private readonly service;
    constructor(service: PacientesService);
    findAll(page: string, limit: string): Promise<Pacientes[]>;
    findOne(id: string): Promise<Pacientes | null>;
    create(data: Partial<Pacientes>): Promise<Pacientes>;
    update(id: string, data: Partial<Pacientes>): Promise<Pacientes | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
