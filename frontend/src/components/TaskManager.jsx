import React, { useState } from 'react'; 
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const TaskManager = () => {
  const [tasks, setTask ] = useState([]);

  const addTask = (task) => {
    setTask([...tasks, task]);
  };

  return (
    <div>
      <TaskForm taskAdded={addTask}/>
      <TaskList />    

    </div>
  );
};

export default TaskManager;