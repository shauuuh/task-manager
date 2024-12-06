import React, { useState } from 'react'; 
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const TaskManager = () => {
  const [tasks, setTasks ] = useState([]);

  // Actualiza array tasks con nueva task  
  const addTask = (task) => {
    const updatedTasks = [task, ...tasks].sort((a, b) => a.completed - b.completed);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-background">
      <TaskForm taskAdded={addTask} />
      <TaskList tasks={tasks} setTasks={setTasks} />    
    </div>
  );
};

export default TaskManager;