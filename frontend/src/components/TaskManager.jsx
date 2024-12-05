import React, { useState } from 'react'; 
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const TaskManager = () => {
  const [tasks, setTasks ] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <TaskForm taskAdded={addTask} />
      <TaskList tasks={tasks} setTasks={setTasks} />    
    </div>
  );
};

export default TaskManager;