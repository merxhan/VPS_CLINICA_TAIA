import { ServiciosService } from './servicios.service';
import { Servicios } from '../../entities/Servicios.entity';
export declare class ServiciosController {
    private readonly service;
    constructor(service: ServiciosService);
    findAll(page: string, limit: string): Promise<Servicios[]>;
    create(data: Partial<Servicios>): Promise<Servicios>;
    update(id: string, data: Partial<Servicios>): Promise<Servicios | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
