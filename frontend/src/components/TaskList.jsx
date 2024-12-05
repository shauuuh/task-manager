import React, {useState, useEffect} from 'react';
import { getAllTasks, updateProgress, updateTask, deleteTask } from '../services/api';
import ReactModal from 'react-modal';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null);

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

  const handleCompleted = async (taskId) => {
    const completedTasks = tasks.map(task => {
      if(task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });

    setTasks(completedTasks);
    const stateTask = completedTasks.find(task => task.id === taskId).completed;
    
    try {
      console.log(stateTask);

      await updateProgress(taskId, stateTask);
    } catch (error) {
      console.error("Error updating the state", error.response?.data || error.message);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if(!editingTask) return;

    try {
      const updatedTask = await updateTask(editingTask.id, editingTask);
      const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
      setTasks(updatedTasks);
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating the task", error.response?.data || error.message);
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
    <div>
      <h1>Tasks</h1>
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          taskCompleted={() => handleCompleted(task.id)}
          editTask={() => handleEdit(task)}
          deleteTask={() => handleDelete(task.id)}
        />        
      ))}

      {editingTask && (
        <ReactModal isOpen={!!editingTask} onRequestClose={() => setEditingTask(null) } ariaHideApp={false}>
          <h2>Edit task</h2>
          <form onSubmit={submitEdit}>
            <label>
              Title: 
              <input
                type='text'
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value})}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              />
              <label>
                Progress: 

              </label>
            </label>
            <button type='submit'>Save</button>
            <button type='submit' onClick={() => setEditingTask(null)}>Cancel</button>
          </form>
        </ReactModal>
      )}
    </div>
  );
};

export default TaskList;