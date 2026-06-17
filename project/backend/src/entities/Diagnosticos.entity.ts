import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Pacientes } from './Pacientes.entity';
import { Servicios } from './Servicios.entity';
import { Sesiones } from './Sesiones.entity';

@Entity('Diagnosticos')
export class Diagnosticos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pacientes, (paciente) => paciente.diagnosticos)
  @JoinColumn({ name: 'id_paciente' })
  paciente: Pacientes;

  @ManyToOne(() => Servicios, (servicio) => servicio.diagnosticos)
  @JoinColumn({ name: 'id_servicio' })
  servicio: Servicios;

  @Column({ type: 'date' })
  fecha_diagnostico: Date;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Sesiones, (sesion) => sesion.diagnostico, { cascade: true })
  sesiones: Sesiones[];
}
