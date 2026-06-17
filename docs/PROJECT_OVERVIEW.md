# Project Overview — Sistema de Gestión Clínica TAIA

## 1. Propósito del Sistema

Centralizar e integrar digitalmente el control clínico y financiero de la Clínica TAIA, ubicada exclusivamente en Goiânia - GO, Brasil. La plataforma sustituye los registros físicos por un sistema centralizado enfocado en la persistencia de datos de pacientes, diagnósticos, control de sesiones y flujos financieros.

---

## 2. Control de Accesos y Roles

### Mecanismo de Autenticación

* **Credenciales de Acceso:** El ingreso al sistema se realiza utilizando el Registro de Persona Física (**CPF**) como usuario y la **Fecha de nacimiento** (`fecha_nacimiento`) como contraseña.
* **Validación de Interfaz:** Verificación inmediata de los formatos de los campos en el formulario de ingreso. Ante credenciales incorrectas, se muestra un mensaje de alerta crítico y se bloquea el acceso sin recargar la pantalla.

### Perfiles de Usuario

* **Administrador:** Posee permisos totales para registrar y gestionar Categorías, Servicios y Pacientes dentro del sistema.
* **Paciente:** Perfil con restricciones estrictas de solo lectura. Al autenticarse, es redirigido de forma obligatoria a una vista exclusiva donde únicamente puede visualizar su diagnóstico, inhabilitando cualquier opción de modificación, descarga o exportación de datos.

---

## 3. Modelo de Datos (Entidades de la BD)

### 1. Categoria_Servicios

* `id`: INT (Clave Primaria, Autoincrementable)
* `nombre`: VARCHAR
* `descripcion`: TEXT

### 2. Servicios

* `id`: INT (Clave Primaria, Autoincrementable)
* `id_categoria`: INT (Clave Foránea -> `Categoria_Servicios`)
* `nombre`: VARCHAR
* `descripcion`: TEXT

### 3. Pacientes

* `id`: INT (Clave Primaria, Autoincrementable)
* `nombre`: VARCHAR
* `cpf`: VARCHAR (Único)
* `profesion`: VARCHAR
* `telefono`: VARCHAR
* `fecha_nacimiento`: DATE

### 4. Diagnosticos

* `id`: INT (Clave Primaria, Autoincrementable)
* `id_paciente`: INT (Clave Foránea -> `Pacientes`)
* `id_servicio`: INT (Clave Foránea -> `Servicios`)
* `fecha_diagnostico`: DATE
* `descripcion`: TEXT (Opcional)

### 5. Sesiones

* `id`: INT (Clave Primaria, Autoincrementable)
* `id_diagnostico`: INT (Clave Foránea -> `Diagnosticos`) [Vincula la sesión al diagnóstico, paciente y servicio correspondientes]
* `fecha_sesion`: DATETIME
* `numero_sesiones`: INT (Opcional)
* `valor`: DECIMAL(10,2)
* `medio_pago`: VARCHAR (Restringido estrictamente a: 'pix', 'tarjeta de credito')

---

## 4. Estructura de la Interfaz y Vistas (CRUD)

El sistema se organiza operativamente a través de dos vistas principales de gestión basadas en componentes tabulares y modales reactivos para las acciones de creación y edición.

### Vista para Servicios

* **Alcance:** CRUD integrado para la gestión del catálogo de prestaciones.
* **Componentes:** Permite el registro, modificación y visualización de las entidades `Categoria_Servicios` y `Servicios`. Los formularios reactivos asocian dinámicamente cada servicio a su respectiva categoría.

### Vista para Paciente

* **Alcance:** Centro de control operativo y clínico administrado por el perfil Administrador, estructurado de forma jerárquica a través de la relación de las entidades.
* **Componentes:** Integra en una sola interfaz la gestión secuencial de:
* **Pacientes:** Alta y edición de los datos personales, profesionales y fiscales del cliente.
* **Diagnosticos:** Registro de la evaluación clínica que vincula al paciente con un servicio específico del catálogo.
* **Sesiones:** Control financiero y cronológico de las atenciones vinculadas directamente a un diagnóstico activo, permitiendo la definición del valor numérico y el medio de pago autorizado ('pix' o 'tarjeta de credito').



---

## 5. Reglas de Negocio y Operación Local

### Restricciones y Validaciones

* **Validación Fiscal:** El CPF es obligatorio tanto para el acceso como para el alta en la entidad `Pacientes`, aplicando el algoritmo estándar de validación de 11 dígitos de la Receita Federal de Brasil y garantizando su unicidad en la base de datos.
* **Formato Monetario:** Todos los costos, campos de `valor` de sesiones y flujos financieros se registran internamente como `DECIMAL(10,2)` y se muestran bajo el formato de Real Brasileño (R$).
* **Huso Horario:** El registro del campo `fecha_sesion` (DATETIME) se rige estrictamente por el huso horario de Brasilia (UTC-3).
* **Confirmación de Eliminación:** La acción de eliminar cualquier registro desde los listados tabulares requiere la apertura obligatoria de un modal secundario de confirmación antes de impactar la persistencia de datos en la base de datos.

### Pie de Página Unificado

* Presente de forma inmutable en la base de todas las vistas del sistema con la leyenda textual estricta: "Desarrollado por SIAF".