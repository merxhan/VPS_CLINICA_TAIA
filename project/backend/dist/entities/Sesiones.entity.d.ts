import { Diagnosticos } from './Diagnosticos.entity';
export declare class Sesiones {
    id: number;
    diagnostico: Diagnosticos;
    fecha_sesion: Date;
    numero_sesiones: number;
    valor: number;
    medio_pago: string;
    estado: string;
}
