# Sistema de Diseño e Identidad Visual — Sistema de Gestión Clínica TAIA

Este manifiesto especifica la configuración visual obligatoria, los componentes de interfaz y las directivas de experiencia de usuario para la interfaz de la plataforma.

---

## 1. Configuración de Paleta de Colores (Tailwind CSS)

El archivo `src/frontend/tailwind.config.js` debe extender los siguientes tokens de color para garantizar la coherencia semántica jurídica, médica y financiera del sistema:

```javascript
colors: {
  taia: {
    brand: '#0A2540',      // Azul Clínico TAIA: Sidebar, navegación principal y títulos del control de accesos
    primary: '#1E3A8A',    // Azul Operativo: Acciones principales, enlaces activos y botones de CRUD
    light: '#F4F6F9',      // Gris Clínico Claro: Fondo general de vistas y contenedores de ciclos de tratamiento
  },
  goiania: {
    green: '#0F5132',      // Verde Buriti: KPIs positivos, éxito financiero y sesiones en estado Pagada o Realizada
    accent: '#198754',     // Verde Activo: Badges de estado para ciclos de tratamiento "Activo" o servicios habilitados
    ipe: '#FFC107',        // Oro Ipê: Alertas, sesiones en estado Pendiente o Pendiente por Pagar
    ipeHover: '#E0A800',   // Hover de estados de alerta e interacciones de elementos pendientes
  },
  neutral: {
    dark: '#212529',       // Texto principal de alta legibilidad para notas evolutivas y diagnósticos
    muted: '#6C757D',      // Subtítulos, etiquetas secundarias de auditoría y placeholders
    border: '#DEE2E6',     // Líneas divisorias, bordes de tablas y cuadrículas de sesiones
  }
}

```

### Aplicación y Rol Semántico de los Colores

* **Azul Clínico TAIA (`taia.brand` / `#0A2540`):** Destinado de forma exclusiva a fondos de navegación principal, Sidebar corporativo y títulos del control de accesos. Transmite solidez institucional.
* **Azul Operativo (`taia.primary` / `#1E3A8A`):** Asignado a las acciones principales del sistema, enlaces activos y botones de control de los formularios CRUD.
* **Verde Buriti (`goiania.green` / `#0F5132`):** Utilizado en indicadores numéricos positivos, gráficas de éxito financiero y filas o celdas de sesiones en estado Pagada o Realizada.
* **Verde Activo (`goiania.accent` / `#198754`):** Aplicado a etiquetas y badges de estado para ciclos de tratamiento en condiciones activas o servicios del catálogo habilitados.
* **Oro Ipê (`goiania.ipe` / `#FFC107`):** Reservado estrictamente para llamadas de atención, advertencias preventivas y celdas correspondientes a sesiones en estado Pendiente o Pendiente por Pagar.
* **Gris Clínico Claro (`taia.light` / `#F4F6F9`):** Configurado como fondo general de la aplicación y para los contenedores deshabilitados de ciclos de tratamiento. Su propósito es mitigar la fatiga visual del usuario.

---

## 2. Tipografía y Jerarquía Visual

Se selecciona la familia tipográfica **Inter** debido a su alta legibilidad en entornos clínicos densos en datos, optimizando la lectura de históricos y ejecuciones de tratamiento.

* **Títulos Principales (`h1`):** 1.875rem (text-3xl) | Bold (font-bold) | Color: `taia.brand`. Cabeceras de módulos CRUD, Dashboard centralizado e ingresos de perfiles.
* **Subtítulos de Sección (`h2`):** 1.5rem (text-2xl) | Semibold (font-semibold) | Color: `taia.primary` con bordes inferiores limpios para delimitar bloques operativos.
* **Texto de Cuerpo / Tablas:** 0.875rem (text-sm) | Regular (font-normal) | Color: `neutral.dark`. Estilo compacto optimizado para tablas de datos y texto libre acumulativo de evolución.

---

## 3. Componentes de Interfaz Estándar (UI Kit)

Se aplica un diseño plano con bordes definidos bajo el principio KISS, omitiendo sombras complejas o efectos pesados.

### A. Tarjetas de Métricas (KPI Cards)

```html
<div class="bg-white border border-neutral-border p-4 rounded-none flex flex-col justify-between">
  <span class="text-neutral-muted text-xs font-semibold uppercase tracking-wider">Pacientes Activos</span>
  <span class="text-taia-brand text-3xl font-bold mt-2">0</span>
</div>

```

### B. Botones

* **Primario (Confirmar / Guardar / Validar):** Fondo `taia.primary`, texto blanco, bordes rectos sin redondeado (`rounded-none`).
* **Secundario (Cancelar / Volver / Revertir):** Fondo transparente, borde `taia.primary`, texto `taia.primary`, sin efectos de degradado y bordes rectos.

### C. Tablas de Datos

* **Cabecera (`thead`):** Fondo `taia.brand`, texto blanco, alineación a la izquierda, padding estricto.
* **Cuerpo (`tbody`):** Alternancia de filas con fondos neutros (`bg-white` y `bg-taia-light`) y líneas divisorias limpias ejecutadas con `border-b border-neutral-border`.

### D. Badges de Estado Operativo

* **Ciclo Activo / Servicio Habilitado:** Fondo verde claro suave con texto en color `goiania.accent`.
* **Sesión Pagada / Realizada:** Fondo azul claro suave con texto en color `goiania.green`.
* **Sesión Pendiente / Pendiente por Pagar:** Fondo amarillo claro suave con texto en color de alerta derivado de `goiania.ipe`.

---

## 4. Estructura del Layout y Responsividad

* **Menú de Navegación (Sidebar):**
* **Dispositivos Desktop (Ordenadores):** Posicionamiento fijo e inamovible en el lateral izquierdo de la pantalla con persistencia visual completa.
* **Dispositivos Móviles:** Posicionamiento en el lateral derecho de la pantalla, manteniéndose oculto por defecto y activándose mediante el despliegue dinámico de un botón tipo menú hamburguesa en la barra superior.
---

## 5. Patrón Estándar de Modales e Interacciones

* **Formularios de Creación y Edición:** Activados mediante los botones dedicados "Nuevo Usuario" o "Editar". Las operaciones no generan cambios de ruta en el navegador; se ejecutan exclusivamente a través de un componente modal reactivo superpuesto y centrado en la pantalla, aplicando un fondo translúcido bloqueante sobre la vista subyacente.
* **Confirmación Crítica (Eliminar):** La acción de eliminar cualquier registro desde el listado tabular requiere la apertura obligatoria de un modal secundario de confirmación antes de impactar la persistencia de datos o despachar la petición HTTP hacia el backend.

---

## 6. Directivas UX y Accesibilidad

* **Formateo de Datos de Negocio:** Todos los valores financieros de los servicios y sesiones se renderizan exclusivamente con el símbolo de Real Brasileño (`R$`), utilizando punto como separador de miles y coma para decimales (ej. `R$ 1.500,00`). El Registro de Persona Física (CPF) se formatea bajo la máscara estricta `000.000.000-00` antes de evaluar sus 11 dígitos frente al algoritmo de la Receita Federal. Las marcas de tiempo de pago y ejecución se despliegan en formato `DD/MM/AAAA HH:mm` bajo el huso horario de Brasilia (UTC-3).
* **Restricción de Colores Críticos:** Se prohíbe el uso de tonalidades verdes para elementos en estado Pendiente. Las sesiones pendientes deben usar de manera obligatoria `goiania.ipe`. El color rojo queda reservado estrictamente para denegar transiciones de estado inválidas y para alertas de credenciales incorrectas.
* **Diseño Elástico:** Se prohíbe el uso de anchos fijos en píxeles para las celdas y contenedores de la cuadrícula operativa. Se deben forzar estructuras flexibles de Tailwind (`flex`, `grid`, `gap-4`, `p-4`) para absorber variaciones en las longitudes de los nombres técnicos de los servicios e internacionalización i18n.
* **Seguridad visual del Paciente:** Al ingresar un usuario con rol Paciente, la interfaz oculta de forma nativa los controles de descarga, exportación o copia. El diagnóstico inicial se bloquea en un contenedor deshabilitado de color `bg-taia-light`.

---

## 7. Directivas de UX pipelines y Feedback de Usuario (Toast Notifications)

* **Sistema de Feedback:** Sistema global de notificaciones flotantes (Toasts) reactivo y no bloqueante, posicionado en la esquina superior derecha de la pantalla.
* **Estados y Colores Semánticos:**
* **Errores (Rojo):** Activación inmediata ante fallas de comunicación con la API (clases de estado HTTP 4xx/5xx) o cuando se intenta forzar una transición de estado inválida en la cuadrícula de sesiones (ej. Pendiente directo a Realizada). El elemento infractor de la interfaz se tiñe de rojo en paralelo.
* **Alertas (Amarillo / Oro Ipê):** Advertencias preventivas del sistema, errores de validación local en el formato del CPF o contraseñas, y solicitudes de confirmación obligatoria cuando el Administrador ejecuta una reversión de estado.
* **Ediciones y Guardado de Datos (Verde):** Confirmación tras la persistencia exitosa de datos. Se activa un Toast verde tras cambiar correctamente el estado de una sesión (Pendiente a Pagada, o Pagada a Realizada) o al actualizar el catálogo de servicios.