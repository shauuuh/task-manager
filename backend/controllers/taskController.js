import Task from '../models/Task.js';

/* --- Query db crear tarea ---*/
const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const response = await Task.create({ title, description});
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the task'});
  }
};

/* --- Query db obtener tareas ---*/
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [
        ["completed", "ASC"], 
        ["createdAt", "DESC"]],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error getting the tasks'});
  }
};

/* --- Query db actualizar estado tarea --- */
const updateProgress = async (req, res) => {
  const { completed } = req.body;
  const { taskId } = req.params;

  try {
    const task = await Task.findByPk(taskId);
    if(!task) return res.status(404).json({ error: "Task not found"});

    task.completed = completed;
    task.updated_at = new Date().toJSON();

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the progress'});
  }
};

/* --- Query db actualizar tarea --- */
const updateTask = async (req, res) => {
  const { title, description, completed } = req.body;
  const { taskId } = req.params;

  try {
    const task = await Task.findByPk(taskId);
    
    if(!task) return res.status(404).json({ error: "Task not found"});
    
    task.title = title;
    task.description = description;
    task.completed = completed;    
    task.updated_at = new Date().toJSON();

    await task.save();

    res.json(task);
  } catch(error) {
    res.status(500).json({ error: 'Error updating the task'});
  }
};

/* --- Query db eliminar tarea --- */
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const deletedTask = await Task.destroy({ where: { id: taskId }});
    if (deletedTask){
      res.status(200).json({ message: 'Task deleted successfully'});
    } else {
      res.status(404).json({ message: 'Task not found'})
    }
  
  } catch (error) {
    res.status(500).json({error: 'Error deleting the task'});
  }
};

export {createTask, getAllTasks, updateProgress, updateTask, deleteTask};