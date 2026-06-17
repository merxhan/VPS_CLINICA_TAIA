import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Servicios } from './Servicios.entity';

@Entity('Categoria_Servicios')
export class CategoriaServicios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Servicios, (servicio) => servicio.categoria)
  servicios: Servicios[];
}
