import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pacientes } from '../entities/Pacientes.entity';
import { Funcionarios } from '../entities/Funcionarios.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Pacientes)
    private pacientesRepository: Repository<Pacientes>,
    @InjectRepository(Funcionarios)
    private funcionariosRepository: Repository<Funcionarios>,
  ) {}

  async validateUser(cpf: string, passwordOrDob: string): Promise<any> {
    // 1. Validar primero si es un Funcionario
    const funcionario = await this.funcionariosRepository.findOne({ where: { cpf } });
    if (funcionario) {
      if (funcionario.password === passwordOrDob) {
        return { id: funcionario.id, role: funcionario.rol, nombre: funcionario.nombre };
      }
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Si no es funcionario, verificar si es un Paciente
    const paciente = await this.pacientesRepository.findOne({ where: { cpf } });
    if (!paciente) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // El input viene en formato YYYYMMDD (sin guiones)
    const dbDate = new Date(paciente.fecha_nacimiento);
    const yyyy = dbDate.getUTCFullYear();
    const mm = String(dbDate.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(dbDate.getUTCDate()).padStart(2, '0');
    const pacienteDobFormatted = `${yyyy}${mm}${dd}`;

    if (pacienteDobFormatted !== passwordOrDob) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return { id: paciente.id, role: 'paciente', nombre: paciente.nombre };
  }
}
