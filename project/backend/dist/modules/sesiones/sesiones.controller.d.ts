import { SesionesService } from './sesiones.service';
export declare class SesionesController {
    private readonly sesionesService;
    constructor(sesionesService: SesionesService);
    cambiarEstado(id: string, estado: string): Promise<import("../../entities/Sesiones.entity").Sesiones>;
}
