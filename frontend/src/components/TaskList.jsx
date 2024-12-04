import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { getAllTasks, updateProgress, updateTask, deleteTask } from '../services/api';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    fetchTask();
  }, []);

  const handleCompleted = async (taskId) => {
    const completedTasks = tasks.map(task => {
      if(task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });

    setTasks(completedTasks);

    try {
      await updateProgress(taskId, completedTasks.find(task => task.id === taskId).completed);
    } catch (error) {
      console.error("Error updating the state", error.response?.data || error.message);
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task);
  }

  const submitEdit = (e, taskId ) => {

  }

  const deleteTask = (taskId) => {

  }

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          taskCompleted={handleCompleted}
          editTask={handleEdit}
          deleteTask={deleteTask}
        />        
      ))}

      {editingTask && (
        <ReactModal >

        </ReactModal>
      )}
    </div>
  );

};

export default TaskList;