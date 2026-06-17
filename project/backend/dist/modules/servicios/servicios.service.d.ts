import { Repository } from 'typeorm';
import { Servicios } from '../../entities/Servicios.entity';
export declare class ServiciosService {
    private repo;
    constructor(repo: Repository<Servicios>);
    findAll(page?: number, limit?: number): Promise<Servicios[]>;
    findOne(id: number): Promise<Servicios | null>;
    create(data: Partial<Servicios>): Promise<Servicios>;
    update(id: number, data: Partial<Servicios>): Promise<Servicios | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
