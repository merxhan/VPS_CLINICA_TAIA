import { Controller, Patch, Param, Body } from '@nestjs/common';
import { SesionesService } from './sesiones.service';

@Controller('sesiones')
export class SesionesController {
  constructor(private readonly sesionesService: SesionesService) {}

  @Patch(':id/estado')
  async cambiarEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.sesionesService.cambiarEstado(+id, estado);
  }
}
