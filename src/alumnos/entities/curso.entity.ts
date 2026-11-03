import { Column } from 'typeorm/decorator/columns/Column.js';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn.js';
import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany.js';
import { Alumno } from './alumno.entity.js';

@Entity()
export class Curso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Alumno, (alumno) => alumno.curso)
    alumnos: Alumno[];
}