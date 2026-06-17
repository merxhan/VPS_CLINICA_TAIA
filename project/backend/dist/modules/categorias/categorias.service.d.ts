import { Repository } from 'typeorm';
import { CategoriaServicios } from '../../entities/CategoriaServicios.entity';
export declare class CategoriasService {
    private repo;
    constructor(repo: Repository<CategoriaServicios>);
    findAll(): Promise<CategoriaServicios[]>;
    findOne(id: number): Promise<CategoriaServicios | null>;
    create(data: Partial<CategoriaServicios>): Promise<CategoriaServicios>;
    update(id: number, data: Partial<CategoriaServicios>): Promise<CategoriaServicios | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
