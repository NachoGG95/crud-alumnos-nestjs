import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service.js';
import { AlumnosController } from './alumnos.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno])],
  controllers: [AlumnosController],
  providers: [AlumnosService],
})
export class AlumnosModule {}
