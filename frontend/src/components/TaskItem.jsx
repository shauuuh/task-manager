import React from 'react';

const TaskItem = ({ task, taskCompleted, editTask, deleteTask }) => {
  return(
    <div>
      <input 
        type="checkbox" 
        checked={task.completed}
        onChange={taskCompleted}
      />
      <span>{task.title}</span>
      <p>{task.description}</p>
      <button onClick={editTask}>Edit</button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};

export default TaskItem;