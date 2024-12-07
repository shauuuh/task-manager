# Task Manager

Este es un sistema para gestionar las tareas, permite a los usuarios crear, editar, completar y eliminar tareas.

Funcionalidades principales:

- Crear tareas con título y descripción.
- Editar tareas existentes.
- Marcar tareas como completadas.
- Eliminar tareas.

Este proyecto no requiere autenticación para probar sus funcionalidades.

### Enlaces
- **Frontend:** [https://task-manager-git-main-shauuuhs-projects.vercel.app/](https://task-manager-git-main-shauuuhs-projects.vercel.app/)
- **Backend:** [https://task-manager-h8zu.onrender.com/](https://task-manager-h8zu.onrender.com/)

Instrucciones para ejecutar el proyecto:

### Ejecución local
1. Clonar este repositorio.
   git clone https://github.com/shauuuh/task-manager.git

2. Ir a directorio de backend y frontend e instalar las dependencias:
  cd backend
  npm install
  cd ../frontend
  npm install

3. Configurar las variables de entorno:
   DATABASE_URL=<>
   CORS_ORIGIN=https://task-manager-j6934amx3-shauuhs-projects.vercel.app

4. Iniciar el backend y frontend:
   cd backend
   npm run dev
   cd ../frontend
   npm start

5. Abrir navegador en http://localhost:3000.
   
### Dependencias necesarias
- **Backend:**
  - Express
  - Sequelize
  - PostgreSQL
  - Cors
- **Frontend:**
  - React
  - Axios
  - TailwindCSS
 
### Funcionamiento
El sistema consta de dos partes:
1. **Backend:** API RESTful que maneja las operaciones de CRUD en una base de datos PostgreSQL.
2. **Frontend:** Interfaz de usuario desarrollada con React para consumir la API y realizar las operaciones.
   

 
  
 
