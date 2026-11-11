import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from '../alumnos/entities/curso.entity.js';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  // Se ordena por nombre para que el <select> del frontend muestre los
  // cursos siempre en el mismo orden, sin depender del orden de la tabla.
  findAll() {
    return this.cursoRepository.find({ order: { nombre: 'ASC' } });
  }
}