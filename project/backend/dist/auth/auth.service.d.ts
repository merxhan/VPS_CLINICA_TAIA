import { Repository } from 'typeorm';
import { Pacientes } from '../entities/Pacientes.entity';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private pacientesRepository;
    private configService;
    constructor(pacientesRepository: Repository<Pacientes>, configService: ConfigService);
    validateUser(cpf: string, dob: string): Promise<any>;
}
