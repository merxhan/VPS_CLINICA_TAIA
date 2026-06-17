import { DiagnosticosService } from './diagnosticos.service';
export declare class DiagnosticosController {
    private readonly service;
    constructor(service: DiagnosticosService);
    create(data: any): Promise<import("../../entities/Diagnosticos.entity").Diagnosticos>;
    update(id: string, data: any): Promise<import("../../entities/Diagnosticos.entity").Diagnosticos>;
    remove(id: string): Promise<void>;
}
