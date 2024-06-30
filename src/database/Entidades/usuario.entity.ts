import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class usuario {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 20 })
  cedula: string;
  @Column({ type: 'varchar', length: 50 })
  nombre: string;
  @Column({ type: 'varchar', length: 50 })
  apellido: string;
  @Column({ type: 'date' })
  fechaNacimiento: Date;
  @Column({ type: 'varchar', length: 15 })
  telefono: string;
  @Column({ type: 'varchar', length: 50 })
  correo: string;
  @Column({ type: 'varchar', length: 100 })
  direccion: string;
  @Exclude()
  @Column({ type: 'varchar', length: 200 })
  password: string;
}
