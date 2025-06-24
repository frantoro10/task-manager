# 📋 Task Manager - Full Stack Application



![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Express](https://img.shields.io/badge/Express-5.1.0-green?style=for-the-badge&logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css)

**Una aplicación completa de gestión de tareas construida con Next.js, React, TypeScript y Express**

[🚀 Demo](#demo) • [✨ Características](#características) • [🛠️ Tecnologías](#tecnologías) • [📁 Estructura](#estructura) • [🚀 Instalación](#instalación) • [📖 Uso](#uso) • [🔧 API](#api)



---

## 🎯 Demo

Una aplicación moderna y responsive para gestionar tus tareas diarias con una interfaz intuitiva y funcionalidades completas de CRUD.

### ✨ Características Principales

- ✅ **Gestión completa de tareas** (Crear, Leer, Actualizar, Eliminar)
- 🎨 **Interfaz moderna y responsive** con Tailwind CSS
- ⚡ **Rendimiento optimizado** con Next.js 15 y React 19
- 🔄 **Actualización en tiempo real** del estado de las tareas
- 📱 **Diseño mobile-first** y completamente responsive
- 🎯 **Validación de formularios** en tiempo real
- 📊 **Estadísticas visuales** (total, completadas, pendientes)
- 💾 **Persistencia de datos** con almacenamiento local
- 🔧 **API RESTful** completa con Express

---

## 🛠️ Tecnologías

### Frontend
- **Next.js 15.3.4** - Framework de React con SSR
- **React 19.0.0** - Biblioteca de interfaz de usuario
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4.1.10** - Framework de CSS utility-first
- **PostCSS** - Procesador de CSS

### Backend
- **Express 5.1.0** - Framework web para Node.js
- **TypeScript 5.8.3** - Tipado estático
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **Node.js** - Runtime de JavaScript

---

## 📁 Estructura del Proyecto

```
task-manager/
├── 📁 front-end/                 # Aplicación Next.js
│   ├── 📁 src/
│   │   ├── 📁 app/              # App Router de Next.js
│   │   │   ├── 📁 tasks/        # Página de tareas
│   │   │   ├── layout.tsx       # Layout principal
│   │   │   └── page.tsx         # Página de inicio
│   │   ├── 📁 components/       # Componentes React
│   │   │   ├── TaskForm.tsx     # Formulario de tareas
│   │   │   ├── TaskItem.tsx     # Item individual de tarea
│   │   │   └── TaskList.tsx     # Lista de tareas
│   │   ├── 📁 lib/              # Utilidades y configuración
│   │   │   └── 📁 api/          # Cliente API
│   │   └── 📁 types/            # Definiciones de tipos
│   └── package.json
├── 📁 back-end/                 # API Express
│   ├── 📁 src/
│   │   ├── 📁 lib/              # Utilidades
│   │   │   └── taskStorage.ts   # Gestión de almacenamiento
│   │   ├── 📁 routes/           # Rutas de la API
│   │   │   └── tasks.ts         # Endpoints de tareas
│   │   ├── app.ts               # Configuración de Express
│   │   ├── index.ts             # Punto de entrada
│   │   └── types.ts             # Tipos de TypeScript
│   └── package.json
└── README.md
```

---

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd task-manager
```

### 2. Instalar dependencias del Backend
```bash
cd back-end
npm install
```

### 3. Instalar dependencias del Frontend
```bash
cd ../front-end
npm install
```

### 4. Configurar variables de entorno
Crear archivo `.env` en la raíz del frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 🚀 Ejecución

### Iniciar el Backend
```bash
cd back-end
npm run dev
```
El servidor estará disponible en: `http://localhost:4000`

### Iniciar el Frontend
```bash
cd front-end
npm run dev
```
La aplicación estará disponible en: `http://localhost:3000`

---

## 📖 Uso

### Funcionalidades Principales

1. **📝 Crear Tarea**
   - Haz clic en "Nueva Tarea"
   - Completa el título (obligatorio, mínimo 3 caracteres)
   - Agrega una descripción opcional (máximo 500 caracteres)
   - Marca si está completada
   - Guarda la tarea

2. **✏️ Editar Tarea**
   - Haz clic en "Editar" en cualquier tarea
   - Modifica los campos necesarios
   - Guarda los cambios

3. **✅ Marcar como Completada**
   - Haz clic en el círculo junto al título
   - La tarea se moverá a la sección "Completadas"

4. **🗑️ Eliminar Tarea**
   - Haz clic en "Eliminar"
   - Confirma la acción

5. **📊 Ver Estadísticas**
   - Total de tareas
   - Tareas completadas
   - Tareas pendientes

---

## 🔧 API

### Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Obtener todas las tareas |
| `POST` | `/api/tasks` | Crear nueva tarea |
| `PUT` | `/api/tasks/:id` | Actualizar tarea existente |
| `DELETE` | `/api/tasks/:id` | Eliminar tarea |

### Estructura de Tarea
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO string
  updatedAt?: string; // ISO string
}
```

### Ejemplos de Uso

#### Crear Tarea
```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primera tarea",
    "description": "Descripción de la tarea",
    "completed": false
  }'
```

#### Obtener Tareas
```bash
curl http://localhost:4000/api/tasks
```

---

## 🎨 Características de la UI

- **🎯 Diseño Moderno**: Interfaz limpia y profesional
- **📱 Responsive**: Funciona perfectamente en móviles y desktop
- **⚡ Animaciones**: Transiciones suaves y feedback visual
- **🎨 Tema Consistente**: Paleta de colores coherente
- **♿ Accesibilidad**: Navegación por teclado y screen readers

---

## 🔧 Scripts Disponibles

### Frontend
```bash
npm run dev      # Desarrollo con Turbopack
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

### Backend
```bash
npm run dev      # Desarrollo con hot reload
```

---

## 🐛 Solución de Problemas

### Error de Hidratación
Si encuentras errores de hidratación, asegúrate de:
- Usar la función `formatDate()` para fechas
- Normalizar fechas con `normalizeDate()`
- Tener `suppressHydrationWarning` en el layout

### CORS Issues
El backend está configurado con CORS habilitado para desarrollo local.

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

---



**¡Gracias por usar Task Manager! 🎉**

Si te gustó el proyecto, ¡dale una ⭐!

</div> 
