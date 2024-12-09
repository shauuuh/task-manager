import React from 'react';
import { createTask } from '../services/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const TaskForm = ({ taskAdded }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Constructor obtiene valores/keys actuales
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");

    try {
      const taskData = { title, description }; 

      const response = await createTask(taskData);
      
      taskAdded(response);

      e.target.reset();
      
    } catch (error) {
      console.error("Error creating the task", error.response?.data || error.message );
    }
  };

  return(
    <Card>
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-primary">Crea una Nueva Tarea</CardTitle>
      </CardHeader>
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-6 px-6">
        {/* --- Título --- */}
        <div className="space-y-2">
          <Input 
            type='text' 
            name='title' 
            placeholder='Título'
            className="h-12 text-lg"
            required/>
        </div>
        {/* --- Descripción --- */}
        <div className="space-y-2">
          <Textarea
            name='description'
            className="min-h-[100px] text-base"
            placeholder='Descripción'
          />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 flex justify-end">
        <Button type='submit' className="w-full sm:w-auto">
          Agregar Tarea
        </Button>
      </CardFooter>
        
    </form>
    </Card>
  );
};

export default TaskForm;