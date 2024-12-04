import React, { useState } from 'react';
import { createTask } from '../services/api';

const TaskForm = ({ taskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        title: formData.title,
        description: formData.description
      }; 

      const response = await createTask(taskData);
      taskAdded(response.data);
      setForm({ title: '', description: ''});

    } catch (error) {
      console.error(error.response.data);
    }
  };

  return(
    <form onSubmit={handleSubmit}>
      <input 
        type='text' 
        name='title' 
        value={formData.title} 
        placeholder='Title'
        onChange={handleChange}
        required/>

      <textarea
        name='description'
        value={formData.description}
        placeholder='Description'
        onChange={handleChange}
        />
        <button type='submit'>Submit</button>

    </form>
  );

};

export default TaskForm;