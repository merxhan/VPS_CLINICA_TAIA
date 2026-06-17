import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CategoriaServicios } from './CategoriaServicios.entity';
import { Diagnosticos } from './Diagnosticos.entity';

@Entity('Servicios')
export class Servicios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ManyToOne(() => CategoriaServicios, (categoria) => categoria.servicios)
  @JoinColumn({ name: 'id_categoria' })
  categoria: CategoriaServicios;

  @OneToMany(() => Diagnosticos, (diagnostico) => diagnostico.servicio)
  diagnosticos: Diagnosticos[];
}
