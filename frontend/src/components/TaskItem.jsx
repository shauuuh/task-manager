import React from 'react';

const TaskItem = ({ task, taskCompleted, editTask, deleteTask }) => {
  return(
    <div>
      <input type="checkbox" onClick={() => taskCompleted(task.id)}/>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button onClick={() => editTask(task)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}

export default TaskItem;