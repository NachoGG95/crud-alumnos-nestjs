import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from '../alumnos/entities/curso.entity.js';
import { CursosController } from './cursos.controller.js';
import { CursosService } from './cursos.service.js';

@Module({
  // forFeature registra el repositorio de Curso para poder inyectarlo
  // en este módulo; cada módulo declara los repositorios que usa.
  imports: [TypeOrmModule.forFeature([Curso])],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}