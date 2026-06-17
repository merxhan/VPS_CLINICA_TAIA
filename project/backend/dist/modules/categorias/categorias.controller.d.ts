import { CategoriasService } from './categorias.service';
import { CategoriaServicios } from '../../entities/CategoriaServicios.entity';
export declare class CategoriasController {
    private readonly service;
    constructor(service: CategoriasService);
    findAll(): Promise<CategoriaServicios[]>;
    findOne(id: string): Promise<CategoriaServicios | null>;
    create(data: Partial<CategoriaServicios>): Promise<CategoriaServicios>;
    update(id: string, data: Partial<CategoriaServicios>): Promise<CategoriaServicios | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
