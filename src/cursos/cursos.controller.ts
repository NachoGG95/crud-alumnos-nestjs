import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CursosService } from './cursos.service.js';

// Mismo Guard que AlumnosController: la lista de cursos solo la necesita
// quien ya inició sesión, y así no queda un endpoint público en una API protegida.
@UseGuards(AuthGuard('jwt'))
@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }
}