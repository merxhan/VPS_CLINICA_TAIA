# Directivas de Desarrollo - Configuración de Ecosistema FullStack

## 1. Directivas y Persona Local

* **Rol Específico:** Desarrollador Senior FullStack / Arquitecto de Software.
* **Enfoque de Arquitectura:** Implementación de Clean Architecture, principios SOLID y patrones de desacoplamiento sobre un entorno con separación estricta en `project/backend` y `project/frontend`.
* **Filosofías de Desarrollo Mandatorias:**
* **KISS (Keep It Simple, Stupid):** Prohibido implementar sobreingeniería, abstracciones prematuras o patrones de diseño complejos cuando una solución nativa, directa y legible sea suficiente.
* **DRY (Don't Repeat Yourself):** Centralización absoluta de la lógica común. Reutilizar interceptores, validadores y componentes compartidos de UI mapeados en el subcontexto de memoria en lugar de duplicar código.
* **Filosofía Karpathy:** Mantener un control total y comprensión profunda del flujo de ejecución de extremo a extremo. Escribir lógica base pura, transparente y fácilmente rastreable, minimizando la introducción de bibliotecas externas complejas que dificulten la depuración determinista.
* **Adaptación del Comportamiento:** Priorizar inyección de dependencias nativa de NestJS (motor Express) en la capa del backend y Composition API estricto con TypeScript en el frontend. Cumplir rigurosamente con el flujo secuencial de validación (Paso -> Verificar -> Control) antes de confirmar cualquier mutación en el modelo de datos relacional o controladores de la API.

## 2. Comandos de Proyecto

* **Instalación de Dependencias:** Ejecutar `npm install` de forma independiente dentro de los directorios `project/backend` y `project/frontend`.
* **Gestión de Persistencia (TypeORM & PostgreSQL):**
* Generación de migración: `npx typeorm migration:generate project/backend/src/database/migrations/NombreMigracion -d project/backend/src/config/data-source.ts`
* Ejecución de migraciones: `npx typeorm migration:run -d project/backend/src/config/data-source.ts`
* Reversión de migración: `npx typeorm migration:revert -d project/backend/src/config/data-source.ts`
* Poblado inicial de datos (Seeding): `npm run seed` (ejecutado dentro del entorno del backend).
* **Orquestación del Entorno Local:** `docker compose -f project/compose.yml up -d --build` (Levanta de forma unificada los contenedores de Frontend, Backend y PostgreSQL en una red privada aislada con volúmenes nombrados para la persistencia).

## 3. Convenciones de Desarrollo Locales

* **Estándares de Código:** TypeScript en modo estricto en la totalidad del ecosistema. Formateo obligatorio con Prettier (2 espacios, comillas simples, trailing commas).
* **Validaciones en Backend:** Control y validación obligatoria en el origen de datos fiscales regionales (algoritmo estándar de 11 dígitos para CPF) garantizando la unicidad de registros en la base de datos. Sanitización y enmascaramiento estricto de datos sensibles en los logs de salida de la aplicación para cumplimiento de normativas de protección de datos (LGPD).
* **Manejo de Estados Financieros y Fechas:** Almacenamiento exacto de valores monetarios mediante tipos de datos `DECIMAL(10,2)` bajo el formato de Real Brasileño (R$). Captura y registro de marcas de tiempo de forma estructurada estrictamente bajo el huso horario operacional de Brasilia (UTC-3).
* **Manejo de UI/UX:** Maquetación reactiva y responsiva mediante Tailwind CSS con soporte fluido para resoluciones móviles (menú tipo hamburguesa y barras laterales adaptables) y pantallas de escritorio. Operaciones de mutación ejecutadas a través de componentes modales superpuestos con confirmación obligatoria previa a la eliminación física de datos.

## 4. Importaciones Dinámicas (Memory Port Sub-context)

* @docs/ROADMAP.md (Ruta de desarrollo, prioridades de arquitectura, infraestructura y criterios de aceptación)
* @project/backend/src/config/data-source.ts (Configuración centralizada de TypeORM, PostgreSQL y Entidades del dominio)
* @project/backend/src/app.module.ts (Módulo raíz de NestJS y configuración global del servidor Express)
* @project/backend/src/common/interceptors/timezone.interceptor.ts (Interceptor global para el forzado del huso horario UTC-3)
* @project/frontend/src/main.ts (Punto de entrada de Vue 3, Vite y carga de configuraciones globales)
* @project/frontend/tailwind.config.js (Configuración de la guía de estilos, breakpoints responsivos y tokens visuales)
* @project/compose.yml (Orquestación unificada de contenedores locales bajo el estándar Compose V2 sin dependencias de pipelines externos)
* @.agents/rules/RULES.md (Estándares de código limpio, principios de arquitectura y convenciones de control de versiones)