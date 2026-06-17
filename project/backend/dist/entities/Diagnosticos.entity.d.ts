import { Pacientes } from './Pacientes.entity';
import { Servicios } from './Servicios.entity';
import { Sesiones } from './Sesiones.entity';
export declare class Diagnosticos {
    id: number;
    paciente: Pacientes;
    servicio: Servicios;
    fecha_diagnostico: Date;
    descripcion: string;
    sesiones: Sesiones[];
}
