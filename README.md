# Proyecto Clínico TAIA

## Descripción General
Plataforma FullStack diseñada para la gestión de servicios de salud, control de pacientes, historiales de diagnósticos y seguimiento de sesiones. El sistema implementa un control de acceso basado en roles (Administrador y Paciente), permitiendo flujos de trabajo aislados, seguros y de solo lectura cuando corresponde.

## Arquitectura y Filosofía de Desarrollo
El código fuente sigue un estándar riguroso enfocado en el alto rendimiento, mantenibilidad y claridad:
- **Clean Architecture y SOLID:** Separación estricta de responsabilidades entre el frontend y el backend, y entre las capas lógicas del sistema.
- **KISS (Keep It Simple, Stupid):** Priorización de implementaciones nativas y legibles sobre sobreingeniería y dependencias externas prescindibles.
- **DRY (Don't Repeat Yourself):** Centralización absoluta de la lógica compartida, diccionarios de internacionalización y validaciones de seguridad.
- **Control de Flujo:** Implementación determinista de componentes y rutas, validación secuencial y rastreabilidad de estado de extremo a extremo.

## Ecosistema Tecnológico

### Frontend
- **Framework:** Vue 3 (Composition API)
- **Lenguaje:** TypeScript (Modo Estricto)
- **Empaquetador:** Vite
- **Estilos:** Tailwind CSS (Diseño responsivo con breakpoints definidos)
- **Ecosistema Vue:** Vue Router (protección perimetral de rutas) y Vue I18n (gestión de diccionarios PT, ES, EN).

### Backend
- **Framework:** NestJS (basado en Express)
- **Lenguaje:** TypeScript
- **ORM:** TypeORM
- **Base de Datos Relacional:** PostgreSQL 15

### Infraestructura y SysOps
- **Contenedores:** Docker y Docker Compose V2 (aislamiento de red, volúmenes de persistencia).
- **Enrutamiento Externo:** Soporte para Traefik como proxy inverso y resolución de certificados SSL en entornos de producción.

## Flujo de Trabajo y Reglas de Negocio

### Control de Acceso y Enrutamiento
- **Rutas Protegidas:** Cualquier intento de manipulación de URL redirige al usuario hacia el flujo autorizado.
- **Administrador:** Tiene acceso global al Dashboard, gestión de pacientes, creación de fichas clínicas, modificación de diagnósticos y registro de sesiones (estado financiero).
- **Paciente:** Su sesión está restringida de forma forzada a la visualización de su propia Ficha Clínica. Carece de menús de navegación laterales y de botones de edición.
- **Bloqueo de Modificación:** Los diagnósticos que poseen al menos una sesión en estado "Realizada" o "Paga" quedan inhabilitados para ser eliminados, preservando la integridad financiera y clínica.

### Estandarización de Datos
- **Manejo Monetario:** Almacenamiento estructurado a través de tipos `DECIMAL(10,2)` bajo la representación del Real Brasileño (R$).
- **Zona Horaria:** Interceptores y mapeadores de bases de datos configurados para operar estrictamente bajo el huso horario de Brasilia (UTC-3).
- **Validación Regional:** Comprobación lógica rigurosa de documentos CPF (11 dígitos).

## Comandos Operacionales

### Orquestación de Entorno

**Entorno de Desarrollo Local:**
```bash
# Desde la raíz del proyecto
docker compose -f project/compose.yml up -d --build

# O ingresando al directorio del proyecto
cd project && docker compose up -d --build
```

**Entorno de Producción:**
El entorno de producción utiliza variables de entorno para configurar dinámicamente los dominios del sistema mediante Traefik.
```bash
# Desde la raíz del proyecto
docker compose -f project/compose.prod.yml up -d --build

# O ingresando al directorio del proyecto
cd project && docker compose -f compose.prod.yml up -d --build
```

**Configuración Dinámica de Dominios:**
Defina las siguientes variables en su archivo `.env` o en el entorno de despliegue para configurar las rutas:
```ini
DOMAIN_NAME=clinicataia.com
SUBDOMAIN=portal
```

Con la configuración anterior, Traefik resolverá:
* **Frontend:** `https://portal.clinicataia.com`
* **Backend (API):** `https://api.portal.clinicataia.com`

*Nota: Si la variable `SUBDOMAIN` no se define en el entorno, se utilizará `app` por defecto, resultando en `https://app.clinicataia.com` y `https://api.app.clinicataia.com`.*


### Gestión de Dependencias
Para procesos de validación local o herramientas de IDE, ejecutar independientemente:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Operaciones de Persistencia (TypeORM)
Ejecutadas exclusivamente desde la ruta `project/backend`:
- **Generar Migración:**
  ```bash
  npx typeorm migration:generate src/database/migrations/Nombre -d src/config/data-source.ts
  ```
- **Ejecutar Migración:**
  ```bash
  npx typeorm migration:run -d src/config/data-source.ts
  ```
- **Poblado Inicial (Seeding):**
  ```bash
  npm run seed
  ```

### Panel de Control Interactivo (menu.sh)
El script `menu.sh` provee una interfaz de consola interactiva para la administración simplificada del entorno Docker local.

**Flujo de Funciones:**
1. **Construir y publicar:** Construcción de imágenes y levantamiento de servicios (`up -d --build`).
2. **Subir contenedores:** Inicio de los servicios en segundo plano (`up -d`).
3. **Bajar contenedores:** Detención y remoción de contenedores (`down`).
4. **Reiniciar contenedores:** Reinicio de los servicios (`restart`).
5. **Refrescar contenedores:** Recreación forzada de los contenedores (`up -d --force-recreate`).
6. **Ver logs:** Monitoreo en tiempo real de logs (`logs -f`).
7. **Estado de contenedores:** Visualización de servicios activos (`ps`) y consumo de recursos (`stats`).
8. **Acceder al contenedor:** Apertura de terminal (`sh`) interactiva en un servicio específico.
9. **Limpiar imágenes y caché:** Liberación de almacenamiento Docker (`prune`).

**Instrucciones de Ejecución:**
1. Otorgar permisos de ejecución al script:
   ```bash
   chmod +x menu.sh
   ```
2. Ejecutar el panel interactivo:
   ```bash
   ./menu.sh
   ```
