import React, { useEffect } from 'react';
import { getAllTasks, updateProgress, updateTask, deleteTask } from '../services/api';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks }) => {

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

  const handleCompleted = async (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task 
    );

    updatedTasks.sort((a,b) => a.completed - b.completed);
    setTasks(updatedTasks);

    const stateTask = updatedTasks.find(task => task.id === taskId).completed;
    
    try {
      await updateProgress(taskId, stateTask);
    } catch (error) {
      console.error("Error updating the state", error.response?.data || error.message);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure of delete this post?");
    
    if(!confirmDelete) return;

    try {
      await deleteTask(taskId);

      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error){
      console.error("Error deleting the task", error.response?.data || error.message );
    }
  };

  return (
    <div className='m-5'>
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          onCompleted={() => handleCompleted(task.id)}
          onEdit={submitEdit}
          onDelete={() => handleDelete(task.id)}
        />        
      ))}

      
    </div>
  );
};

export default TaskList;