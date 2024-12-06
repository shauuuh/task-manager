import React, { useEffect } from 'react';
import { getAllTasks, updateProgress, updateTask, deleteTask } from '../services/api';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks }) => {

  // Solicitud a backend para obtener array tasks
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getAllTasks();  
        setTasks(data);
      } catch(error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    };
    fetchTask();
  }, []);

  // Envio y ordenamiento de tarea actualizada 
  const submitEdit = async (taskId, updatedData) => {
    try {
      const updatedTask = await updateTask(taskId, updatedData); 
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
  
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating the task:", error.response?.data || error.message);
    }
  };

  // Maneja cambio de estado de tarea incompleta/completada
  const handleCompleted = async (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task 
    );

    const sortedTasks = updatedTasks.sort((a, b) => a.completed - b.completed);
    setTasks(sortedTasks);

    const stateTask = sortedTasks.find(task => task.id === taskId).completed;
    
    try {
      await updateProgress(taskId, stateTask);
    } catch (error) {
      console.error("Error updating the state", error.response?.data || error.message);
    }
  };

  // Solicitud para eliminar una tarea
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure of delete this post?");
    
    if(!confirmDelete) return;

    try {
      await deleteTask(taskId);

      const updatedTasks = tasks.filter(task => task.id !== taskId);
      const sortedTasks = updatedTasks.sort((a, b) => a.completed - b.completed);

      setTasks(sortedTasks);
    } catch (error){
      console.error("Error deleting the task", error.response?.data || error.message );
    }
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className='m-5'>
      {/* Lista tareas pendientes */}
      {pendingTasks.length > 0 ? (
        pendingTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onCompleted={() => handleCompleted(task.id)}
            onEdit={submitEdit}
            onDelete={() => handleDelete(task.id)}
          />
        ))
      ) : (
        <p className="text-gray-500">No hay tareas pendientes.</p>
      )}

      {/* Lista tareas completadas */}
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onCompleted={() => handleCompleted(task.id)}
            onEdit={submitEdit}
            onDelete={() => handleDelete(task.id)}
          />
        ))
      ) : (
        <p className="text-gray-500">No hay tareas completadas.</p>
      )}
    </div>
  );
};

export default TaskList;