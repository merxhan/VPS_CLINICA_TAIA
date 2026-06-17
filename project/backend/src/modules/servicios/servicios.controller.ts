import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { Servicios } from '../../entities/Servicios.entity';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly service: ServiciosService) {}

  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    return this.service.findAll(+page || 1, +limit || 10);
  }

  @Post()
  create(@Body() data: Partial<Servicios>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Servicios>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
