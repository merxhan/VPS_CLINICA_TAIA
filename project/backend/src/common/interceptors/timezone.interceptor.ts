import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TimezoneInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Forzamos el uso horario de Brasilia de forma determinista para la ejecución del contexto
    process.env.TZ = 'America/Sao_Paulo';
    
    return next.handle().pipe(
      map((data) => {
        // En este punto se puede implementar cualquier mapeo recursivo de fechas en la respuesta si fuera necesario
        return data;
      }),
    );
  }
}
