import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DiagnosticosService } from './diagnosticos.service';

@Controller('diagnosticos')
export class DiagnosticosController {
  constructor(private readonly service: DiagnosticosService) {}

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
