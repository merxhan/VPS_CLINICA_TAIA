# Product Roadmap — Sistema de Gestión Clínica TAIA

El agente de codificación marcará secuencialmente las tareas completadas modificando el estado a `- [x]` a medida que avance con éxito en el espacio de trabajo.

**Status:** En Progreso (Nuevas tareas de QA, Seguridad y Arquitectura añadidas)
**Current Sprint:** Sprint 1: Foundation, Infrastructure & Core Domain

## Filosofía de Construcción (Build Philosophy)
1. **Entregables Operacionales Continuos:** Cada incremento de desarrollo debe asegurar un entorno completamente ejecutable y estable de forma local mediante la infraestructura de contenedores provista.
2. **Estilización Centralizada y Responsiva:** Uso de componentes basados estrictamente en la paleta semántica parametrizada en Tailwind CSS, asegurando la adaptabilidad móvil y de escritorio en cada interfaz.
3. **Validación en el Origen:** Las reglas de negocio, tipos de datos y restricciones críticas deben estar validadas estrictamente en la capa del Backend antes de impactar la persistencia o el cliente.
4. **Principio KISS (Keep It Simple, Stupid):** Evitar de forma rigurosa la sobreingeniería. Se prioriza el uso de soluciones directas, legibles y nativas (como restricciones de base de datos y composición limpia de APIs) antes de introducir patrones arquitectónicos complejos o capas de abstracción innecesarias.
5. **Principio DRY (Don't Repeat Yourself):** Centralización absoluta de la lógica común. Los validadores (como el algoritmo de CPF), los interceptores globales de la API y los componentes compartidos de la interfaz (Toasts, Modales) deben programarse una sola vez y reutilizarse en todo el ecosistema del proyecto.
6. **Filosofía Karpathy:** Mantener un control total y una comprensión profunda del flujo de ejecución de extremo a extremo. Escribir lógica base transparente y rastreable desde cero, minimizando la introducción de bibliotecas externas de "caja negra" hasta que sea estrictamente necesario, garantizando ciclos de feedback inmediatos y una depuración determinista de cada línea de estado.

---

## 1. Infraestructura

* [x] **TASK-001** — Sincronización de Huso Horario Operacional
* **Files:** `project/backend/src/common/interceptors/timezone.interceptor.ts`, `project/backend/package.json`
* **Notes:** Configurar la sincronización de tiempo en el entorno de ejecución bajo el huso horario oficial de Brasilia (UTC-3) para la correcta captura de marcas temporales en el sistema.
* **Verify:** Ejecutar el backend y comprobar mediante logs o endpoints de prueba que las marcas de tiempo emitidas correspondan estrictamente a UTC-3.
* [x] **TASK-002** — Aislamiento de Entornos Lógicos
* **Files:** `project/backend/.env.homologacion`, `project/backend/.env.produccion`, `project/frontend/.env.homologacion`, `project/frontend/.env.produccion`
* **Notes:** Configuración y separación lógica estricta de las variables de entorno para diferenciar la ejecución en homologación y producción, mitigando fallas colaterales en los datos.
* **Verify:** Levantar el sistema alternando las variables de entorno y certificar que cada configuración apunte exclusivamente a sus fuentes de datos correspondientes.

---

## 2. Base de Datos

* [x] **TASK-003** — Migración del Esquema Relacional
* **Files:** `project/backend/src/database/migrations/[timestamp]-CreateCoreTables.ts`
* **Notes:** Ejecución de scripts DDL a través de las migraciones de TypeORM para la creación física de las tablas `Categoria_Servicios`, `Servicios`, `Pacientes`, `Diagnosticos` y `Sesiones`.
* **Verify:** Ejecutar el comando de migración del CLI y validar mediante un cliente de base de datos que las cinco estructuras relacionales se crearon correctamente.
* [x] **TASK-004** — Restricciones de Integridad y Relaciones
* **Files:** `project/backend/src/entities/CategoriaServicios.entity.ts`, `project/backend/src/entities/Servicios.entity.ts`, `project/backend/src/entities/Pacientes.entity.ts`, `project/backend/src/entities/Diagnosticos.entity.ts`, `project/backend/src/entities/Sesiones.entity.ts`
* **Notes:** Configurar dentro del ORM las claves primarias autoincrementables (`INT`), las claves foráneas de relación jerárquica y el índice de unicidad `UNIQUE` sobre el campo `cpf` en la tabla de pacientes.
* **Verify:** Intentar insertar un registro con un CPF duplicado y comprobar que el motor de base de datos aborte la operación por violación de restricción de unicidad.
* [x] **TASK-005** — Optimización e Indexación de Consultas
* **Files:** `project/backend/src/database/migrations/[timestamp]-AddIndexes.ts`
* **Notes:** Creación de índices específicos en la base de datos sobre los campos de búsqueda de alta frecuencia (`cpf` de la tabla Pacientes e `id_paciente` de la tabla Diagnosticos) para acelerar las consultas paginadas del servidor.
* **Verify:** Ejecutar un plan de explicación de consulta (`EXPLAIN ANALYZE`) y comprobar que el motor realice un Index Scan en lugar de un Sequential Scan ante los criterios indexados.
* [x] **TASK-006** — Script de Inicialización y Poblado de Datos (Database Seeding)
* **Files:** `project/backend/src/database/seeds/initial-seed.ts`
* **Notes:** Implementar un mecanismo de seeding automatizado que se ejecute de forma posterior a las migraciones para pre-poblar las categorías y el catálogo inicial de servicios, además de registrar la cuenta del Administrador inicial. Las credenciales base deben tomarse estrictamente de las variables de entorno para evitar valores fijos en el código fuente.
* **Verify:** Reiniciar el contenedor de la base de datos, ejecutar el comando de seeding y validar mediante una consulta SQL que las tablas `Categoria_Servicios` y `Servicios` contengan los registros maestros requeridos para la operación del sistema.
* [x] **TASK-007** — Estrategia de Respaldo Local de Persistencia (Backup & Restore)
* **Files:** `project/compose.yml`
* **Notes:** Configurar un script o servicio auxiliar que ejecute de forma programada tareas de volcado (`pg_dump`) sobre el contenedor de PostgreSQL. El objetivo es mitigar el riesgo de pérdida catastrófica de historias clínicas y estados financieros ante corrupciones del volumen nombrado de Docker.
* **Verify:** Ejecutar el script de respaldo, forzar la eliminación del volumen de datos de PostgreSQL mediante comandos de Docker, reconfigurar el entorno y aplicar el archivo de restauración para validar la recuperación del 100% de la estructura y registros.

---

## 3. UX (Experiencia de Usuario)

* [x] **TASK-008** — Estandarización de Layout Global e Identidad
* **Files:** `project/frontend/src/components/layout/LandingPage.vue`, `project/frontend/src/components/layout/Header.vue`, `project/frontend/src/components/layout/Footer.vue`
* **Notes:** Diseño y maquetación de la Landing Page pública con botón único de acceso, el Encabezado privado fijo (marca "TAIA" a la izquierda y botón "Desconectar" a la derecha) y el Footer inmutable en la base de las vistas con el texto literal: "Desarrollado por SIAF".
* **Verify:** Renderizar la aplicación en el navegador y certificar visualmente la presencia exacta y consistencia tipográfica de las estructuras globales indicadas.
* [x] **TASK-009** — Adaptabilidad y Responsividad de Interfaces
* **Files:** `project/frontend/src/components/layout/Sidebar.vue`, `project/frontend/src/assets/styles/responsive.css`
* **Notes:** Implementación de diseños fluidos basados en Flexbox/Grid para garantizar que la navegación, tablas y modales se adapten a smartphones, tablets y pantallas de escritorio. El Sidebar debe posicionarse fijo a la izquierda en ordenadores y oculto tras un menú tipo hamburguesa en móviles.
* **Verify:** Redimensionar la pantalla del navegador a resoluciones de dispositivos móviles (ej. 375px y 768px) y comprobar la adaptabilidad de la cuadrícula operativa y el comportamiento correcto del menú hamburguesa.
* [x] **TASK-010** — Diseño de Componentes Modales Reactivos
* **Files:** `project/frontend/src/components/shared/BaseModal.vue`, `project/frontend/src/components/shared/ConfirmDeleteModal.vue`
* **Notes:** Maquetar los componentes modales superpuestos centrados en pantalla para la ejecución de las acciones de creación y edición (sin cambiar de ruta), así como el modal secundario intermedio para la confirmación de la acción de eliminación.
* **Verify:** Accionar los botones "Nuevo" o "Editar" en los listados operativos, comprobando la apertura limpia del modal reactivo en primer plano y el bloqueo de fondo correspondiente.
* [x] **TASK-011** — Lógica Visual de Alertas y Toasts Semánticos
* **Files:** `project/frontend/src/components/shared/ToastNotification.vue`, `project/frontend/tailwind.config.js`
* **Notes:** Configurar el mapa de colores y animaciones dentro de la interfaz: notificaciones flotantes temporales en color verde ante operaciones exitosas, y teñido en rojo con mensajes explícitos ante bloqueos o credenciales incorrectas.
* **Verify:** Provocar un error de validación local y un guardado exitoso en el cliente, certificando que los Toasts emerjan con los colores semánticos asignados de forma inmediata.

---

## 4. Desarrollo

* [ ] **TASK-012** — Configuración de Arquitectura Base
* **Files:** `project/backend/src/app.module.ts`, `project/frontend/src/main.ts`
* **Notes:** Establecer la estructura modular limpia del Backend (NestJS/Express) y Frontend (Vue 3/Vite/TS) respetando estrictamente los principios SOLID y Clean Architecture.
* **Verify:** Compilar ambos proyectos de forma independiente y certificar que no existan errores de tipado o dependencias circulares en las consolas de desarrollo.
* [ ] **TASK-013** — Módulo de Autenticación Segura (JWT)
* **Files:** `project/backend/src/auth/auth.service.ts`, `project/backend/src/auth/jwt-auth.guard.ts`, `project/frontend/src/views/Login.vue`
* **Notes:** Programación del flujo de acceso validando el campo CPF como usuario y fecha de nacimiento (`fecha_nacimiento`) como contraseña inicial. Implementar la generación y retorno de un JSON Web Token (JWT) firmado, requiriendo este token vía `JwtAuthGuard` para todas las rutas protegidas.
* **Verify:** Enviar peticiones válidas al endpoint de autenticación, extraer el JWT y certificar que una petición HTTP posterior a un endpoint protegido (ej. GET /pacientes) con el token en la cabecera retorne 200 OK.
* [x] **TASK-014** — Desarrollo de API REST para CRUDs Core
* **Files:** `project/backend/src/modules/servicios/servicios.controller.ts`, `project/backend/src/modules/pacientes/pacientes.controller.ts`
* **Notes:** Construcción de endpoints lógicos y optimizados para resolver los CRUDs asociados a servicios y la gestión integrada de pacientes, con soporte nativo para paginación desde el servidor.
* **Verify:** Realizar peticiones HTTP GET, POST, PUT y DELETE verificando respuestas JSON conformes al modelo de datos y códigos de estado HTTP correctos (200, 201).
* [x] **TASK-015** — Vistas y Componentes Reactivos del Frontend
* **Files:** `project/frontend/src/views/Servicios.vue`, `project/frontend/src/views/Pacientes.vue`, `project/frontend/src/views/PacienteView.vue`
* **Notes:** Implementación de la interfaz tabular principal para Servicios y Pacientes. Crear la pantalla de redirección obligatoria de solo lectura para el perfil Paciente, bloqueando su diagnóstico inicial y ocultando los controles de descarga o copia de datos.
* **Verify:** Iniciar sesión con un rol de Paciente y certificar visualmente que la interfaz restrinja el acceso a las funciones administrativas, exponiendo únicamente su bloque de diagnóstico.
* [x] **TASK-016** — Lógica de Negocio y Control de Flujo de Sesiones
* **Files:** `project/backend/src/modules/sesiones/sesiones.service.ts`, `project/backend/src/modules/sesiones/sesiones.controller.ts`
* **Notes:** Implementación del flujo lineal obligatorio de estados de la sesión: **Pendiente → Paga → Realizada**. Desarrollar los bloqueos lógicos que impidan pasar de Pendiente a Realizada de forma directa o añadir notas de evolución clínica si la sesión no está en estado Paga.
* **Verify:** Intentar forzar un cambio de estado inválido mediante API y corroborar que el backend bloquee la petición arrojando una excepción de negocio.
* [x] **TASK-017** — Sanitización de Logs y Protección de Datos Sensibles (Cumplimiento LGPD)
* **Files:** `project/backend/src/common/interceptors/logging.interceptor.ts`, `project/backend/src/entities/Diagnosticos.entity.ts`
* **Notes:** Desarrollar un interceptor global en el backend para enmascarar datos críticos como el `cpf` y campos financieros en los logs de salida de la aplicación. Asegurar que las descripciones clínicas de la tabla `Diagnosticos` no sean expuestas en texto plano dentro de los archivos de registro o consolas del sistema para cumplir con la Ley General de Protección de Datos (LGPD) de Brasil.
* **Verify:** Realizar peticiones HTTP de creación de pacientes y diagnósticos, revisar la salida de texto en la consola de Docker y certificar que la información sensible aparezca oculta o cifrada.
* [ ] **TASK-017.5** — Autodocumentación de la API (Swagger)
* **Files:** `project/backend/src/main.ts`, `project/backend/src/modules/**/*.controller.ts`
* **Notes:** Configurar `@nestjs/swagger` para exponer la especificación OpenAPI de los endpoints, DTOs y tipos de respuestas, garantizando un contrato técnico claro entre Frontend y Backend.
* **Verify:** Iniciar el servidor local y acceder a `http://localhost:3000/api` comprobando la visualización correcta e interactiva de los endpoints del sistema.
* [ ] **TASK-017.6** — Configuración de Estado Global Persistente (Pinia)
* **Files:** `project/frontend/src/main.ts`, `project/frontend/src/store/auth.store.ts`, `project/frontend/src/store/ui.store.ts`
* **Notes:** Integrar y estructurar Pinia como mecanismo para la gestión reactiva de la sesión del usuario (Guardado de Token JWT y perfil) y el estado visual de la UI (Modo oscuro y diccionario i18n seleccionado).
* **Verify:** Autenticarse en el sistema, recargar la pestaña del navegador y validar que la sesión del usuario persista correctamente al extraer los datos desde localStorage a través de Pinia.

---

## 5. QA (Aseguramiento de Calidad)

* [ ] **TASK-018** — Pruebas Unitarias de Rutas Críticas (Backend)
* **Files:** `project/backend/src/modules/sesiones/sesiones.service.spec.ts`, `project/backend/src/common/validators/cpf.validator.spec.ts`
* **Notes:** Reincorporación de QA para lógicas sensibles. Desarrollar test unitarios utilizando Jest nativo de NestJS para validar la estricta transición de estados de las sesiones (Pendiente -> Paga -> Realizada) y el algoritmo de verificación de CPF, evadiendo regresiones.
* **Verify:** Ejecutar el comando `npm run test` dentro de `project/backend` y certificar el pase en verde (100% success) de las suites de validación crítica.
* [ ] **TASK-019** — Pruebas Unitarias de Componentes Visuales (Frontend)
* **Files:** `project/frontend/src/components/shared/ToastNotification.spec.ts`, `project/frontend/src/components/shared/BaseModal.spec.ts`
* **Notes:** Configurar `Vitest` para el aseguramiento del comportamiento de los componentes compartidos (UI reactiva) verificando la correcta propagación de props, eventos (emits) y visibilidad de los estados modales.
* **Verify:** Ejecutar `npm run test:unit` dentro de `project/frontend` y validar la renderización correcta sin errores en un entorno de jsdom.
* [-] **TASK-020** — Pruebas de Sistema Extremo a Extremo (E2E) (Removido)
* **Files:** N/A
* **Notes:** Tarea E2E descartada temporalmente en favor de priorizar el QA Quirúrgico (Unitario).
* **Verify:** N/A

---

## 6. CI/CD (compose.yml)

* [ ] **TASK-021** — Dockerización de Servicios Individuales
* **Files:** `project/backend/Dockerfile`, `project/frontend/Dockerfile`
* **Notes:** Creación de archivos Dockerfile optimizados utilizando la estrategia de construcción multi-stage para empaquetar de forma ligera y aislada las aplicaciones de Frontend y Backend.
* **Verify:** Compilar localmente las imágenes mediante el comando `docker build` de forma individual, verificando que el tamaño final de las imágenes se encuentre optimizado y sin archivos de desarrollo residuales.
* [ ] **TASK-022** — Orquestación del Entorno Local con compose.yml
* **Files:** `project/compose.yml`
* **Notes:** Configuración integral del archivo `compose.yml` declarando de forma unificada los servicios de Frontend, Backend y el motor PostgreSQL. Configurar redes internas aisladas, volúmenes con nombre para garantizar la persistencia de datos y variables de entorno iniciales. Excluir dependencias de pipelines de ejecución externos.
* **Verify:** Ejecutar `docker compose up -d --build` en la raíz y validar que los tres contenedores levanten en estado activo, comunicándose internamente en la red aislada declarada.
* [ ] **TASK-023** — Flujo de Validación Estática (CI/CD Pipeline Base)
* **Files:** `project/backend/package.json`, `project/frontend/package.json`, `.github/workflows/main.yml` (o script bash local)
* **Notes:** Implementar una barrera de integración continua (Linter, Prettier, TypeScript checker) que aborte el proceso de construcción de imágenes Docker (`docker build`) si se detecta alguna falla de tipos o de estilo.
* **Verify:** Insertar intencionadamente un error de sintaxis en TypeScript, correr el flujo automatizado y verificar que se aborte la compilación con un código de salida `1`.