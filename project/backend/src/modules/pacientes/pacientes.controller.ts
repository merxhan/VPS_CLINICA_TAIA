import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { Pacientes } from '../../entities/Pacientes.entity';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly service: PacientesService) {}

  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    return this.service.findAll(+page || 1, +limit || 10);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Pacientes>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Pacientes>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
