import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimezoneInterceptor } from './common/interceptors/timezone.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuthModule } from './auth/auth.module';
import { SesionesModule } from './modules/sesiones/sesiones.module';
import { ServiciosModule } from './modules/servicios/servicios.module';
import { PacientesModule } from './modules/pacientes/pacientes.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DiagnosticosModule } from './modules/diagnosticos/diagnosticos.module';

import { CategoriaServicios } from './entities/CategoriaServicios.entity';
import { Servicios } from './entities/Servicios.entity';
import { Pacientes } from './entities/Pacientes.entity';
import { Diagnosticos } from './entities/Diagnosticos.entity';
import { Sesiones } from './entities/Sesiones.entity';
import { Funcionarios } from './entities/Funcionarios.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'produccion' ? '.env.produccion' : '.env.homologacion',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [CategoriaServicios, Servicios, Pacientes, Diagnosticos, Sesiones, Funcionarios],
        synchronize: false,
      }),
    }),
    AuthModule,
    SesionesModule,
    ServiciosModule,
    PacientesModule,
    CategoriasModule,
    DashboardModule,
    DiagnosticosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimezoneInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
