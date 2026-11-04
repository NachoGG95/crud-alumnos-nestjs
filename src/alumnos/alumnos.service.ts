import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto.js';
import { UpdateAlumnoDto } from './dto/update-alumno.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity.js';
import { Repository } from 'typeorm/repository/Repository.js';
import { Curso } from './entities/curso.entity.js';
import { ILike } from 'typeorm';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumno)
    private alumnosRepository: Repository<Alumno>,

    @InjectRepository(Curso)
    private cursosRepository: Repository<Curso>,
  ) {}

  async create(dto: CreateAlumnoDto) {
    const existente = await this.alumnosRepository.findOneBy({
      dni: dto.dni,
    });
    if (existente) {
      throw new ConflictException('Ya existe un alumno con ese DNI');
    }
    const curso = await this.cursosRepository.findOneBy({
      id: dto.cursoId,
    });

    if (!curso) {
      throw new NotFoundException('El curso indicado no existe');
    }

    const alumno = this.alumnosRepository.create({ ...dto, curso });
    return await this.alumnosRepository.save(alumno);
  }

  async findAll() {
    return await this.alumnosRepository.find({
      relations: { curso: true },
    });
  }

  async findOne(id: number) {
    const alumno = await this.alumnosRepository.findOne({
      where: { id },
      relations: { curso: true },
    });

    if (!alumno) {
      throw new NotFoundException(`Alumno con id ${id} no encontrado`);
    }

    return alumno;
  }

async update(id: number, dto: UpdateAlumnoDto) {
  const alumno = await this.findOne(id);

  const { cursoId, ...datos } = dto;

  if (cursoId !== undefined) {
    const curso = await this.cursosRepository.findOneBy({ id: cursoId });
    if (!curso) {
      throw new NotFoundException('El curso indicado no existe');
    }
    alumno.curso = curso;
  }

  Object.assign(alumno, datos);
  return await this.alumnosRepository.save(alumno);
}

  async remove(id: number) {
    const alumno = await this.findOne(id);
    return await this.alumnosRepository.remove(alumno);
  }
  async findByApellido(apellido: string) {
    const alumnos = await this.alumnosRepository.find({
      where: { apellido: ILike(`%${apellido}%`) },
      relations: { curso: true },
    });

    if (alumnos.length === 0) {
      throw new NotFoundException(
        `No se encontraron alumnos con apellido "${apellido}"`,
      );
    }

    return alumnos;
  }
}
