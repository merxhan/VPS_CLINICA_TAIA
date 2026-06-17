import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Diagnosticos } from './Diagnosticos.entity';

@Entity('Sesiones')
export class Sesiones {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Diagnosticos, (diagnostico) => diagnostico.sesiones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_diagnostico' })
  diagnostico: Diagnosticos;

  @Column({ type: 'timestamp' })
  fecha_sesion: Date;

  @Column({ type: 'int', nullable: true })
  numero_sesiones: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'varchar', length: 50 })
  medio_pago: string;

  @Column({ type: 'varchar', length: 20, default: 'Pendiente' })
  estado: string;
}
