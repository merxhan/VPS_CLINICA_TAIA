import { Diagnosticos } from './Diagnosticos.entity';
export declare class Pacientes {
    id: number;
    nombre: string;
    cpf: string;
    profesion: string;
    telefono: string;
    fecha_nacimiento: Date;
    diagnosticos: Diagnosticos[];
}
