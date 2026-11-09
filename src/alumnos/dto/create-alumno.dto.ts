import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, isString, IsString, Length } from "class-validator";

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @Length(7, 8)
  dni: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  cursoId: number;

  telefono: string;
}
