import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnosModule } from './alumnos/alumnos.module.js';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      username: 'sa',
      password: 'Prueba1234',
      database: 'escuela',
      autoLoadEntities: true,
      synchronize: true,
      options: {
        instanceName: 'SQLEXPRESS', // la instancia va aquí
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    AlumnosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
