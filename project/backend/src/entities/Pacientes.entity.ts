import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Diagnosticos } from './Diagnosticos.entity';

@Entity('Pacientes')
export class Pacientes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar', unique: true })
  cpf: string;

  @Column({ type: 'varchar', nullable: true })
  profesion: string;

  @Column({ type: 'varchar', nullable: true })
  telefono: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @OneToMany(() => Diagnosticos, (diagnostico) => diagnostico.paciente)
  diagnosticos: Diagnosticos[];
}
