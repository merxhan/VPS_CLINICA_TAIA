import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Pacientes } from '../entities/Pacientes.entity';
import { Funcionarios } from '../entities/Funcionarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pacientes, Funcionarios])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
