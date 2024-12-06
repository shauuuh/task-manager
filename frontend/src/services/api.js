import axios from 'axios';

const API_URL = 'https://task-manager-h8zu.onrender.com';

// Solicitud backend CREAR TAREA
export const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/tasks`, taskData);
  return response.data;
};

// Solicitud backend OBTENER TAREAS
export const getAllTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

// Solicitud backend ACTUALIZAR TAREA
export const updateProgress =  async (taskId, completed) => {  
  const response = await axios.patch(`${API_URL}/tasks/${taskId}`, { completed });
  console.log(response);
  
  return response.data;
};

// Solicitud backend ACTUALIZAR ESTADO TAREA
export const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData);
  return response.data;
};

// Solicitud backend ELIMINAR TAREA
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
  return response.data;
};