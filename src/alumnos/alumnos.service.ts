import { Injectable } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto.js';
import { UpdateAlumnoDto } from './dto/update-alumno.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity.js';
import { Repository } from 'typeorm/repository/Repository.js';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumno)
    private alumnosRepository: Repository<Alumno>,
  ) {}

  async create(dto: CreateAlumnoDto) {
    const alumno = this.alumnosRepository.create(dto);
    return await this.alumnosRepository.save(alumno);
  }

  async findAll() {
    return await this.alumnosRepository.find();
  }

  async findOne(id: number) {
    return await this.alumnosRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateAlumnoDto) {
    await this.alumnosRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.alumnosRepository.delete(id);
  }
}
