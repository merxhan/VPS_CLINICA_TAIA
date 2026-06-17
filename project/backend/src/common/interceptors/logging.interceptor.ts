import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    // LGPD Sanitization
    const sanitizedBody = body ? JSON.parse(JSON.stringify(body)) : {};
    if (sanitizedBody.cpf) sanitizedBody.cpf = '***.***.***-**';
    if (sanitizedBody.valor) sanitizedBody.valor = '***.**';
    if (sanitizedBody.descripcion) sanitizedBody.descripcion = '[REDACTED]';

    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        this.logger.log(`${method} ${url} ${response.statusCode} - Body: ${JSON.stringify(sanitizedBody)} - ${Date.now() - startTime}ms`);
      }),
    );
  }
}
