import { CategoriaServicios } from './CategoriaServicios.entity';
import { Diagnosticos } from './Diagnosticos.entity';
export declare class Servicios {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: CategoriaServicios;
    diagnosticos: Diagnosticos[];
}
