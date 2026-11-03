import { Column } from 'typeorm/decorator/columns/Column.js';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn.js';
import { Entity } from 'typeorm/decorator/entity/Entity.js';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  email: string;

  @Column()
  curso: string;
}
