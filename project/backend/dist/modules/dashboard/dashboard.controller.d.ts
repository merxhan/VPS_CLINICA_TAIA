import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(): Promise<{
        totalPacientes: number;
        totalServicios: number;
        sesionesPendientes: number;
        receitaMensal: number;
    }>;
}
