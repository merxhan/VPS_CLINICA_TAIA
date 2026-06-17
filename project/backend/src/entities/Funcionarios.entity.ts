import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RolFuncionario {
  ADMINISTRADOR = 'administrador',
  TERAPEUTA = 'terapeuta',
}

@Entity('Funcionarios')
export class Funcionarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar', unique: true })
  cpf: string;

  @Column({ type: 'varchar' })
  password: string; // Stored in plain text as per user request

  @Column({
    type: 'enum',
    enum: RolFuncionario,
    default: RolFuncionario.TERAPEUTA,
  })
  rol: RolFuncionario;
}
